'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { Navbar } from '../../components/public-platform/Navbar';
import { ELURIA_PORTFOLIO } from '../../data/eluria/portfolio';

export default function ProjectsPage() {
  const categories = ['All projects', ...new Set(ELURIA_PORTFOLIO.map((project) => project.category))];
  const [category, setCategory] = useState('All projects');
  const [query, setQuery] = useState('');
  const projects = ELURIA_PORTFOLIO.filter((project) => {
    const matchesCategory = category === 'All projects' || project.category === category;
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = !normalizedQuery || `${project.name} ${project.category} ${project.location} ${project.shortDescription}`.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  return <div className="min-h-screen bg-[#0B192C] text-slate-100"><Navbar /><main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <header className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Project portfolio</p><h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Infrastructure built for lasting impact</h1><p className="mt-5 text-base leading-relaxed text-slate-300">Explore Eluria’s project pipeline across water, energy, and essential commercial infrastructure.</p></header>
    <div className="mt-10 flex flex-col gap-5 border-y border-slate-800 py-5 lg:flex-row lg:items-center lg:justify-between"><label className="flex h-11 max-w-md items-center gap-3 border border-slate-700 bg-slate-900 px-3 text-slate-400"><Search className="size-4" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" /></label><div role="tablist" aria-label="Project category" className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`min-h-10 px-3 text-xs font-semibold ${category === item ? 'bg-amber-500 text-slate-950' : 'border border-slate-700 text-slate-300 hover:border-amber-500/60'}`}>{item}</button>)}</div></div>
    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <article key={project.id} className="overflow-hidden border border-slate-800 bg-slate-900/70"><img src={project.projectImage} alt="" className="h-52 w-full object-cover" /><div className="p-5"><div className="flex items-center justify-between gap-3"><span className="text-xs font-semibold uppercase tracking-wider text-amber-400">{project.category}</span><span className="text-xs text-slate-400">{project.status}</span></div><h2 className="mt-3 text-xl font-bold text-white">{project.name}</h2><p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400"><MapPin className="size-4" />{project.location}</p><p className="mt-4 text-sm leading-relaxed text-slate-300">{project.shortDescription}</p><Link href={`/projects/${project.slug}`} className="mt-5 inline-flex h-10 items-center gap-2 text-sm font-semibold text-amber-400">View project <ArrowRight className="size-4" /></Link></div></article>)}</div>
    {projects.length === 0 && <p className="py-16 text-center text-slate-400">No projects match your search.</p>}
  </main></div>;
}
