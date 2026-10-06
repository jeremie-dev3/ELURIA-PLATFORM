import { ArrowUpRight, Building2 } from 'lucide-react';
import type { InvestorActivityEvent } from '../../types/eluria/dashboard';

interface ActivityFeedProps {
  activity: InvestorActivityEvent[];
}

export function ActivityFeed({ activity }: ActivityFeedProps) {
  return (
    <section id="recent-activity" className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900">Recent investor activity</h2>
          <p className="mt-1 text-xs text-slate-500">Latest engagement from your investor network</p>
        </div>
        <span className="mt-1 flex size-2 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-emerald-50" aria-label="Live activity" />
      </div>

      <ol className="divide-y divide-slate-100">
        {activity.map((event) => (
          <li key={event.id} className="flex gap-3 py-4 first:pt-1 last:pb-1">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-gold/10 text-brand-gold">
              <Building2 size={18} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="truncate text-[13px] font-semibold text-slate-800">{event.firm}</p>
                <time className="shrink-0 pt-0.5 text-[10px] text-slate-400">{event.occurredAt}</time>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {event.action} <a href="#top-opportunities" className="font-medium text-brand-navy hover:underline">{event.target}</a>
              </p>
            </div>
          </li>
        ))}
      </ol>
      <button className="mt-4 flex w-full items-center justify-center gap-1.5 border-t border-slate-100 pt-4 text-xs font-semibold text-brand-navy hover:underline">
        View activity log <ArrowUpRight size={13} aria-hidden="true" />
      </button>
    </section>
  );
}