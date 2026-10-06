import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, CalendarCheck2, FileCheck2, UsersRound } from 'lucide-react';
import type { DashboardMetric } from '../../types/eluria/dashboard';

interface MetricCardsProps {
  metrics: DashboardMetric[];
}

const iconMap = {
  investors: UsersRound,
  nda: FileCheck2,
  meetings: CalendarCheck2,
  opportunities: BriefcaseBusiness,
};

const iconStyles = {
  investors: 'bg-brand-navy/10 text-brand-navy',
  nda: 'bg-brand-gold/10 text-brand-gold',
  meetings: 'bg-brand-navy/10 text-brand-navy',
  opportunities: 'bg-brand-gold/10 text-brand-gold',
};

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = iconMap[metric.icon];
        const TrendIcon = metric.trend === 'up' ? ArrowUpRight : ArrowDownRight;
        return (
          <article key={metric.label} className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] font-medium text-slate-500">{metric.label}</p>
                <p className="mt-3 text-[30px] font-bold leading-none tabular-nums tracking-normal text-slate-900">{metric.value}</p>
              </div>
              <div className={`grid size-10 place-items-center rounded-md ${iconStyles[metric.icon]}`}>
                <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px]">
              <span className={`inline-flex items-center gap-0.5 font-semibold ${metric.trend === 'up' ? 'text-emerald-700' : 'text-rose-600'}`}>
                <TrendIcon size={13} aria-hidden="true" />
                {metric.change}
              </span>
              <span className="text-slate-400">{metric.note}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}