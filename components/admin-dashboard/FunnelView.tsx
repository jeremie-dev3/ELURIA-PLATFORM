import { ArrowDownRight } from 'lucide-react';
import type { PipelineStage } from '../../types/eluria/dashboard';

interface FunnelViewProps {
  stages: PipelineStage[];
}

export function FunnelView({ stages }: FunnelViewProps) {
  const startingCount = stages[0]?.count ?? 0;

  return (
    <section id="investor-pipeline" className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900">Investor pipeline</h2>
          <p className="mt-1 text-xs text-slate-500">Progress across investor conversion stages</p>
        </div>
          <button className="flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-brand-navy">
          All stages <ArrowDownRight size={13} aria-hidden="true" />
        </button>
      </div>

      <div className="mb-3 grid grid-cols-[minmax(120px,1fr)_minmax(100px,1.7fr)_44px_52px] gap-3 px-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400 max-sm:grid-cols-[minmax(105px,1fr)_minmax(60px,1fr)_40px]">
        <span>Stage</span>
        <span className="max-sm:hidden">Conversion</span>
        <span className="text-right">Count</span>
        <span className="text-right max-sm:hidden">Rate</span>
      </div>

      <div className="space-y-1">
        {stages.map((stage) => {
          const rate = startingCount ? Math.round((stage.count / startingCount) * 100) : 0;
          return (
            <div id={stage.id} key={stage.id} className="grid min-h-11.75 grid-cols-[minmax(120px,1fr)_minmax(100px,1.7fr)_44px_52px] items-center gap-3 rounded-md px-1 transition-colors hover:bg-slate-50 max-sm:grid-cols-[minmax(105px,1fr)_minmax(60px,1fr)_40px]">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className={`size-2 shrink-0 rounded-sm ${stage.color}`} />
                <span className="truncate text-[12px] font-medium text-slate-700">{stage.label}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 max-sm:hidden">
                <div className={`h-full rounded-full ${stage.color}`} style={{ width: `${rate}%` }} />
              </div>
              <span className="text-right text-[13px] font-bold tabular-nums text-slate-800">{stage.count}</span>
              <span className="text-right text-[11px] tabular-nums text-slate-400 max-sm:hidden">{rate}%</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-[11px] text-slate-500">
        <span>Enquiry to close</span>
        <span className="font-semibold tabular-nums text-slate-700">{startingCount ? ((stages.at(-1)?.count ?? 0) / startingCount * 100).toFixed(1) : '0.0'}% conversion</span>
      </div>
    </section>
  );
}