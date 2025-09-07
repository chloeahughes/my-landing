import { createClient } from '@supabase/supabase-js';


export const supaAdmin = createClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!,
{ auth: { persistSession: false } }
);


export async function saveConnection({ userId, provider, providerAccountId, tokens, historyCursor, watchExpiresAt }: any) {
const { data, error } = await supaAdmin
.from('email_connections')
.upsert({
user_id: userId,
provider,
provider_account_id: providerAccountId,
access_token: tokens.access_token,
refresh_token: tokens.refresh_token,
token_expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
scope: tokens.scope,
history_cursor: historyCursor,
watch_expires_at: watchExpiresAt?.toISOString()
}, { onConflict: 'provider,provider_account_id' })
.select()
.single();
if (error) throw error;
return data;
}


export async function upsertEmails(connectionId: string, emails: any[]) {
if (!emails.length) return;
const rows = emails.map(e => ({
id: e.id,
connection_id: connectionId,
thread_id: e.threadId,
subject: e.subject,
snippet: e.snippet,
from_name: e.from.name || null,
from_email: e.from.email,
to_emails: e.to,
cc_emails: e.cc,
bcc_emails: e.bcc,
date_received: e.dateReceived,
is_unread: e.isUnread,
labels: e.labels,
raw_size_bytes: e.rawSize || null,
}));
const { error } = await supaAdmin.from('emails').upsert(rows);
if (error) throw error;
}


export async function linkEmailsToDeals(userId: string, connectionId: string, emails: any[]) {
// Heuristics: address/entity match → deal
const deals = await fetchUserDeals(userId);
const rules = buildMatchingRules(deals);
const activities: any[] = [];


for (const e of emails) {
const match = matchDeal(rules, e);
if (match) {
activities.push({
deal_id: match.deal_id,
}