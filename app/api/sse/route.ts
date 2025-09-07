import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

// Required in Node for Realtime websocket
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require('ws');

export const dynamic = 'force-dynamic'; // keep connection open on Vercel

export async function GET(req: Request) {
  const url = new URL(req.url);
  const dealId = url.searchParams.get('dealId');
  if (!dealId) {
    return new NextResponse('Missing dealId', { status: 400 });
  }

  const supabaseUser = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabaseUser.auth.getUser();
  if (!user) return new NextResponse('Unauthorized', { status: 401 });

  // Verify this deal belongs to the user (owner check)
  const { data: owned } = await supabaseUser
    .from('deals')
    .select('id')
    .eq('id', dealId)
    .eq('user_id', user.id)
    .limit(1);

  if (!owned?.length) return new NextResponse('Forbidden', { status: 403 });

  // Prepare SSE stream
  const stream = new ReadableStream({
    start: async (controller) => {
      const encoder = new TextEncoder();

      const send = (eventName: string, payload: any) => {
        controller.enqueue(
          encoder.encode(`event: ${eventName}\n`)
        );
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
        );
      };

      // Heartbeat to keep proxies happy
      const ping = setInterval(() => controller.enqueue(encoder.encode(`: ping\n\n`)), 15000);

      // 1) Send recent history (last 20)
      const svc = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { global: { headers: { 'X-Client-Info': 'sse-stream' } } }
      );

      const { data: recent } = await svc
        .from('deal_activity')
        .select('*')
        .eq('deal_id', dealId)
        .order('occurred_at', { ascending: false })
        .limit(20);

      send('bootstrap', { items: (recent || []).reverse() });

      // 2) Realtime subscription (INSERT on this deal_id)
      const channel = svc
        .channel(`deal-activity-${dealId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'deal_activity', filter: `deal_id=eq.${dealId}` },
          (payload) => {
            send('insert', payload.new);
          }
        );

      await channel.subscribe((status: string) => {
        if (status === 'SUBSCRIBED') {
          // Connected
        }
      });

      // Close handling
      // @ts-ignore – supported by edge/node runtimes
      const close = () => {
        clearInterval(ping);
        try { svc.removeChannel(channel); } catch {}
        controller.close();
      };

      // When the client disconnects, close things down
      // @ts-ignore
      req.signal?.addEventListener('abort', close);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
