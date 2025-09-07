import { NextResponse } from 'next/server';
import { supaAdmin } from '@/lib/db';
import { GmailProvider } from '@/providers';


export async function POST() {
const soon = new Date(Date.now() + 24*3600*1000).toISOString();
const { data: conns } = await supaAdmin
.from('email_connections')
.select('*')
.eq('provider','gmail')
.lte('watch_expires_at', soon);


for (const c of conns || []) {
const { watchExpiresAt } = await GmailProvider.startWatch({
access_token: c.access_token,
refresh_token: c.refresh_token,
} as any);
await supaAdmin
.from('email_connections')
.update({ watch_expires_at: watchExpiresAt?.toISOString() || null })
.eq('id', c.id);
}
return NextResponse.json({ ok: true });
}