import { NextResponse } from 'next/server';
import { exchangeCode } from '@/lib/gmail';
import { supaAdmin, saveConnection } from '@/lib/db';
import { GmailProvider } from '@/providers';


export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const code = searchParams.get('code');
const state = searchParams.get('state') || '';
const userId = new URLSearchParams(state).get('u');
if (!code || !userId) return NextResponse.json({ error: 'missing code or user' }, { status: 400 });


// 1) Exchange OAuth code → tokens & the Gmail account email
const { tokens, email } = await exchangeCode(code);


// 2) Save (or upsert) connection row
const conn = await saveConnection({
userId,
provider: 'gmail',
providerAccountId: email,
tokens,
});


// 3) Start Gmail watch via the provider
const { watchExpiresAt, nextCursor } = await GmailProvider.startWatch({
access_token: tokens.access_token,
refresh_token: tokens.refresh_token,
} as any);


// 4) Persist watch expiry + initial history cursor
await supaAdmin
.from('email_connections')
.update({
watch_expires_at: watchExpiresAt?.toISOString() || null,
history_cursor: nextCursor || null,
})
.eq('id', conn.id);


return NextResponse.redirect(`${process.env.APP_BASE_URL}/settings/integrations?connected=gmail`);
}