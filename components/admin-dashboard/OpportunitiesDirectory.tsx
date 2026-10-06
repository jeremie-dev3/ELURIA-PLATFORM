'use client';

import { useState } from 'react';
import { ArrowDownWideNarrow, Building2, FileCheck2, Search, ShieldCheck } from 'lucide-react';
import { NdaModal } from '../public-platform/NdaModal';
import type { ProjectOpportunity, ProjectStatus } from '../../types/eluria/project';

type StatusFilter = 'All' | ProjectStatus;
type SortOrder = 'name' | 'raise' | 'return';

interface OpportunitiesDirectoryProps {
  projects: ProjectOpportunity[];
}

const statusFilters: StatusFilter[] = ['All', 'Seeking Investment', 'Funded', 'Upcoming'];

function parseAmount(value: string) {
  const amount = Number.parseFloat(value.replace(/[$,]/g, ''));
  return value.toUpperCase().includes('M') ? amount * 1_000_000 : amount;
}

export function OpportunitiesDirectory({ projects }: OpportunitiesDirectoryProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('name');
  const [selectedProject, setSelectedProject] = useState<ProjectOpportunity | null>(null);
  const [signedProjectIds, setSignedProjectIds] = useState<string[]>([]);

  const visibleProjects = projects
    .filter((project) => status === 'All' || project.status === status)
    .filter((project) => `${project.title} ${project.sector} ${project.summary}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((first, second) => {
      if (sortOrder === 'raise') return parseAmount(second.targetRaise) - parseAmount(first.targetRaise);
      if (sortOrder === 'return') return Number.parseFloat(second.expectedReturns) - Number.parseFloat(first.expectedReturns);
      return first.title.localeCompare(second.title);
    });

  const countForStatus = (filter: StatusFilter) =>
    filter === 'All' ? projects.length : projects.filter((project) => project.status === filter).length;

  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <article className="rounded-lg border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-medium text-slate-500">Total opportunities</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{projects.length}</p>
        </article>
        <article className="rounded-lg border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-medium text-slate-500">Open for investment</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-brand-navy">{countForStatus('Seeking Investment')}</p>
        </article>
        <article className="rounded-lg border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-medium text-slate-500">Confidential projects</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-brand-gold">{projects.filter((project) => project.isConfidential).length}</p>
        </article>
      </div>

      <section aria-label="Opportunity directory" className="rounded-lg border border-slate-200/80 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex gap-1 overflow-x-auto pb-1" role="group" aria-label="Filter by project status">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={status === filter}
                  onClick={() => setStatus(filter)}
                  className={`flex min-h-9 shrink-0 items-center gap-2 rounded-md px-3 text-xs font-semibold transition-colors ${status === filter ? 'bg-brand-navy text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
                >
                  {filter}
                  <span className={`tabular-nums ${status === filter ? 'text-white/70' : 'text-slate-400'}`}>{countForStatus(filter)}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-slate-200 px-3 text-slate-400 sm:w-64">
                <Search size={15} aria-hidden="true" />
                <input
                  aria-label="Search opportunities"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="Search opportunities..."
                />
              </label>
              <label className="flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-slate-500">
                <ArrowDownWideNarrow size={15} aria-hidden="true" />
                <span className="sr-only">Sort opportunities</span>
                <select
                  aria-label="Sort opportunities"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                  className="min-w-0 bg-transparent text-xs font-medium text-slate-700 outline-none"
                >
                  <option value="name">Name</option>
                  <option value="raise">Largest target</option>
                  <option value="return">Highest return</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {visibleProjects.map((project) => (
            <article key={project.id} className="p-4 transition-colors hover:bg-slate-50/70 sm:p-5">
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.9fr)] xl:items-center">
                <div className="flex min-w-0 gap-3.5">
                  <div className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-navy/5 text-brand-navy">
                    <Building2 size={20} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-navy">{project.sector}</span>
                      {project.isConfidential && (
                        <span className="inline-flex items-center gap-1 rounded-sm bg-brand-gold/10 px-1.5 py-0.5 text-[9px] font-semibold text-brand-gold">
                          <ShieldCheck size={11} aria-hidden="true" /> Confidential
                        </span>
                      )}
                    </div>
                    <h2 className="text-[15px] font-bold leading-snug text-slate-900">{project.title}</h2>
                    <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-500">{project.summary}</p>
                    <span className={`mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold ${project.status === 'Seeking Investment' ? 'text-brand-gold' : 'text-slate-500'}`}>
                      <span className={`size-1.5 rounded-full ${project.status === 'Seeking Investment' ? 'bg-brand-gold' : 'bg-slate-400'}`} />
                      {project.status}
                    </span>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-md bg-slate-50/80 p-3 sm:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4">
                  <div>
                    <dt className="text-[10px] font-medium text-slate-500">Target raise</dt>
                    <dd className="mt-1 text-[13px] font-bold tabular-nums text-slate-800">{project.targetRaise}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-medium text-slate-500">Minimum investment</dt>
                    <dd className="mt-1 text-[13px] font-bold tabular-nums text-slate-800">{project.minimumInvestment}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-medium text-slate-500">Expected returns</dt>
                    <dd className="mt-1 text-[13px] font-bold tabular-nums text-brand-navy">{project.expectedReturns}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-medium text-slate-500">Term</dt>
                    <dd className="mt-1 text-[13px] font-bold tabular-nums text-slate-800">{project.durationMonths} months</dd>
                  </div>
                </dl>
              </div>
              <div className="mt-4 flex justify-end">
                {signedProjectIds.includes(project.id) ? (
                  <span className="inline-flex h-9 items-center gap-2 rounded-md bg-emerald-50 px-3 text-xs font-semibold text-emerald-800">
                    <ShieldCheck size={15} aria-hidden="true" /> NDA signed
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-brand-navy transition hover:bg-slate-50"
                  >
                    <FileCheck2 size={15} aria-hidden="true" /> Request NDA
                  </button>
                )}
              </div>
            </article>
          ))}

          {visibleProjects.length === 0 && (
            <div className="px-5 py-14 text-center">
              <p className="text-sm font-semibold text-slate-700">No opportunities match these filters</p>
              <p className="mt-1 text-xs text-slate-500">Try a different status or search term.</p>
            </div>
          )}
        </div>
        <footer className="flex flex-col gap-1 border-t border-slate-100 px-4 py-3 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <span>Showing {visibleProjects.length} of {projects.length} opportunities</span>
          <span>Project details are managed in the internal data room.</span>
        </footer>
      </section>
      <NdaModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        onSignSuccess={(projectId) => {
          setSignedProjectIds((current) => current.includes(projectId) ? current : [...current, projectId]);
          setSelectedProject(null);
        }}
      />
    </>
  );
}