'use client';

import { useEffect, useRef, useState } from 'react';

type Activity = {
  id: string;
  deal_id: string;
  kind: 'email.received' | 'email.updated' | 'note';
  summary: string | null;
  details: any;
  occurred_at: string;
};

export function DealActivityFeed({ dealId }: { dealId: string }) {
  const [items, setItems] = useState<Activity[]>([]);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const es = new EventSource(`/api/sse?dealId=${dealId}`);
    esRef.current = es;

    es.addEventListener('bootstrap', (e: MessageEvent) => {
      const payload = JSON.parse(e.data) as { items: Activity[] };
      setItems(payload.items);
    });

    es.addEventListener('insert', (e: MessageEvent) => {
      const row = JSON.parse(e.data) as Activity;
      setItems((prev) => [...prev, row]);
    });

    es.onerror = () => {
      // EventSource auto-reconnects; you can show a toast here
    };

    return () => {
      es.close();
    };
  }, [dealId]);

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No activity yet.</p>
      ) : (
        items.map((a) => (
          <div key={a.id} className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-gray-500">{a.kind}</span>
              <span className="text-xs text-gray-400">{new Date(a.occurred_at).toLocaleString()}</span>
            </div>
            <div className="mt-1 font-medium">{a.summary || 'New activity'}</div>
            {a.details?.snippet && (
              <p className="mt-1 text-sm text-gray-600 line-clamp-3">{a.details.snippet}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
