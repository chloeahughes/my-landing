import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { DealActivityFeed } from '@/components/DealActivityFeed';

export default async function DealPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div className="p-6">Please sign in.</div>;

  // Load the deal header (and verify ownership via RLS)
  const { data: deal, error } = await supabase
    .from('deals')
    .select('id, property_address, city, state')
    .eq('id', params.id)
    .single();

  if (error || !deal) return <div className="p-6">Deal not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{deal.property_address}</h1>
        <p className="text-gray-500 text-sm">
          {deal.city}, {deal.state}
        </p>
      </div>

      <h2 className="text-lg font-semibold">Activity</h2>
      <DealActivityFeed dealId={deal.id} />
    </div>
  );
}
