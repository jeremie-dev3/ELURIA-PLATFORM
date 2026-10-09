import Image from 'next/image';
import {
  Activity,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  FileCheck2,
  LayoutDashboard,
  Settings2,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  section: 'dashboard' | 'opportunities' | 'investors' | 'meetings' | 'ndas' | 'updates' | 'reports' | 'settings';
}

const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, section: 'dashboard' },
  { label: 'Opportunities', href: '/invest/opportunities', icon: BriefcaseBusiness, section: 'opportunities' },
  { label: 'Investors', href: '/admin/dashboard#investors', icon: UsersRound, section: 'investors' },
  { label: 'Meetings', href: '/admin/dashboard#meeting-stage', icon: CalendarDays, section: 'meetings' },
  { label: 'NDAs', href: '/admin/dashboard#nda-stage', icon: FileCheck2, section: 'ndas' },
  { label: 'Updates', href: '/admin/dashboard#recent-activity', icon: Activity, section: 'updates' },
  { label: 'Reports', href: '/admin/dashboard#reports', icon: BarChart3, section: 'reports' },
  { label: 'Settings', href: '/admin/dashboard#dashboard', icon: Settings2, section: 'settings' },
];

interface SidebarProps {
  activeSection?: NavigationItem['section'];
}

export function Sidebar({ activeSection = 'dashboard' }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col bg-[#0B192C] px-4 py-5 text-slate-300 shadow-xl shadow-slate-950/10 max-lg:static max-lg:h-auto max-lg:w-full max-lg:px-4 max-lg:py-3 lg:overflow-y-auto">
      <div className="mb-8 flex items-center gap-4 px-1 max-lg:mb-3">
        <div className="grid h-[72px] w-[92px] shrink-0 place-items-center rounded-2xl bg-white p-2.5 shadow-sm shadow-slate-950/20 ring-1 ring-white/70">
          <Image
            src="/brand/ELURIA%20GROUP%20LTD%20LOGO.png"
            alt="Eluria Group Ltd"
            width={220}
            height={72}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
        <div className="flex min-w-0 flex-col justify-center leading-none">
          <p className="text-[16px] font-black uppercase tracking-[0.22em] text-[#D8C57A]">Eluria</p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Group Ltd</p>
          <p className="mt-3 max-w-[150px] text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400">Investor Relations</p>
        </div>
      </div>

      <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.13em] text-slate-500 max-lg:hidden">Workspace</div>
      <nav aria-label="Main navigation" className="flex flex-1 flex-col gap-1 max-lg:flex-row max-lg:overflow-x-auto max-lg:pb-1">
        {navigationItems.map(({ label, href, icon: Icon, section }) => {
          const active = section === activeSection;
          return (
          <a
            key={label}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-10 shrink-0 items-center gap-3 rounded-md px-3 text-[13px] font-medium transition-colors ${
              active
                ? 'bg-brand-navy text-white shadow-sm shadow-brand-navy/20 ring-1 ring-brand-gold/70'
                : 'text-slate-400 hover:bg-white/[0.07] hover:text-white'
            }`}
          >
            <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </a>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-white/10 px-3 pt-4 text-[11px] leading-relaxed text-slate-500 max-lg:hidden">
        <p className="font-medium text-slate-400">ELURIA GROUP LTD</p>
        <p className="mt-1">Investor workspace · 2026</p>
      </div>
    </aside>
  );
}