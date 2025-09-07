import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { GmailConnectorTile } from '@/components/GmailConnectorTile';

export default async function IntegrationsPage() {
  const supabase = createServerComponentClient({ cookies });

  // who is logged in?
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div className="p-6">Please sign in.</div>;

  // is Gmail already connected?
  // email_connections has no RLS in our schema; if you enabled RLS, expose a view or query via an API route.
  const { data: connections } = await supabase
    .from('email_connections')
    .select('id')
    .eq('user_id', user.id)
    .eq('provider', 'gmail')
    .limit(1);

  const connected = Boolean(connections && connections.length);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Integrations</h1>
      <GmailConnectorTile connected={connected} />
    </div>
  );
}
