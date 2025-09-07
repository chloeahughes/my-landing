import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { supaAdmin, upsertEmails, linkEmailsToDeals } from '@/lib/db';
import { GmailProvider } from '@/providers';


async function verifyOidc(req: Request) {
// Verify Google Pub/Sub OIDC token (recommended). If you didn't enable it on the subscription, return true.
const auth = req.headers.get('authorization') || '';
const m = auth.match(/^Bearer (.+)$/);
if (!m) return true; // skip if not configured
const token = m[1];
const client = new OAuth2Client();
const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_PUBSUB_AUDIENCE });
return Boolean(ticket.getPayload());
}


export async function POST(req: Request) {
if (!(await verifyOidc(req))) return NextResponse.json({ ok: false }, { status: 401 });


const body = await req.json();
const dataStr = Buffer.from(body?.message?.data || '', 'base64').toString('utf8');
const data = dataStr ? JSON.parse(dataStr) : null; // { emailAddress, historyId }


// Ack quickly even if malformed
if (!data?.emailAddress) return NextResponse.json({ ok: true });


// 1) Find the connection row by provider + account
const { data: conn, error } = await supaAdmin
.from('email_connections')
.select('*')
.eq('provider','gmail')
.eq('provider_account_id', data.emailAddress)
.single();
if (error || !conn) return NextResponse.json({ ok: true });


// 2) Ask provider for deltas using tokens + current cursor
const { emails, nextCursor } = await GmailProvider.fetchDeltas({
access_token: conn.access_token,
refresh_token: conn.refresh_token,
history_cursor: conn.history_cursor,
} as any);


// 3) Upsert emails & link to deals
await upsertEmails(conn.id, emails);
await linkEmailsToDeals(conn.user_id, conn.id, emails);


// 4) Advance the cursor
if (nextCursor) {
await supaAdmin
.from('email_connections')
.update({ history_cursor: nextCursor })
.eq('id', conn.id);
}


return NextResponse.json({ ok: true });
}