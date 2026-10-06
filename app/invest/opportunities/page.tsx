import { Sidebar } from '../../../components/admin-dashboard/Sidebar';
import { OpportunitiesDirectory } from '../../../components/admin-dashboard/OpportunitiesDirectory';
import { ELURIA_PROJECTS } from '../../../data/eluria/mock-projects';
import { ArrowUpRight } from 'lucide-react';

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-canvas text-slate-900">
      <Sidebar activeSection="opportunities" />
      <main className="min-h-screen lg:pl-65">
        <div className="mx-auto max-w-375 px-4 pb-10 pt-5 sm:px-6 lg:px-9 lg:pt-8">
          <header className="mb-7 flex flex-col gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                <a href="/invest" className="hover:text-brand-navy">Dashboard</a>
                <span aria-hidden="true">/</span>
                <span className="text-brand-navy">Opportunities</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-[28px]">Opportunities</h1>
              <p className="mt-1.5 text-sm text-slate-500">Review active projects and their investment terms.</p>
            </div>
            <a href="/invest#top-opportunities" className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-md border border-slate-200 bg-white px-3.5 text-xs font-semibold text-brand-navy shadow-sm transition hover:bg-slate-50 sm:self-auto">
              Dashboard interest <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </header>

          <OpportunitiesDirectory projects={ELURIA_PROJECTS} />
        </div>
      </main>
    </div>
  );
}