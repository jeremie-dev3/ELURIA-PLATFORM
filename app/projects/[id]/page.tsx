import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { Navbar } from '../../../components/public-platform/Navbar';
import { ELURIA_PORTFOLIO } from '../../../data/eluria/portfolio';
import { ELURIA_OPPORTUNITIES } from '../../../data/eluria/opportunities';

export function generateStaticParams() {
  return ELURIA_PORTFOLIO.map((project) => ({ id: project.slug }));
}

export default async function ProjectDetailPage({ params }: PageProps<'/projects/[id]'>) {
  const { id } = await params;
  const project = ELURIA_PORTFOLIO.find((item) => item.slug === id || item.id === id);
  if (!project) notFound();
  const relatedOpportunities = ELURIA_OPPORTUNITIES.filter((item) => project.relatedOpportunities.includes(item.id) || project.relatedOpportunities.includes(item.slug));

  return <div className="min-h-screen bg-[#0B192C] text-slate-100"><Navbar /><main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
    <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="size-4" />All projects</Link>
    <div className="mt-7 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">{project.category}</p><h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">{project.name}</h1><p className="mt-4 flex items-center gap-2 text-slate-300"><MapPin className="size-4 text-amber-400" />{project.location}</p><p className="mt-7 text-lg leading-relaxed text-slate-300">{project.fullDescription}</p></div><img src={project.projectImage} alt={project.name} className="h-72 w-full object-cover lg:h-80" /></div>
    <section className="mt-14 grid gap-10 border-t border-slate-800 py-10 lg:grid-cols-[1fr_0.7fr]"><div><h2 className="text-2xl font-bold text-white">Technical overview</h2><ul className="mt-5 space-y-3">{project.technicalInfo.map((detail) => <li key={detail} className="flex gap-3 text-sm leading-relaxed text-slate-300"><span className="text-amber-400">•</span>{detail}</li>)}</ul></div><div className="border border-slate-800 bg-slate-900/60 p-6"><p className="text-xs uppercase tracking-wider text-slate-500">Project status</p><p className="mt-2 text-lg font-semibold text-amber-300">{project.status}</p><h2 className="mt-8 text-lg font-bold text-white">Related investment opportunities</h2>{relatedOpportunities.length ? relatedOpportunities.map((opportunity) => <Link key={opportunity.id} href={`/invest/${opportunity.slug}`} className="mt-4 flex items-center justify-between gap-4 border-t border-slate-800 pt-4 text-sm text-slate-300 hover:text-amber-300"><span>{opportunity.title}</span><ArrowRight className="size-4 shrink-0" /></Link>) : <p className="mt-3 text-sm text-slate-400">No public investment opportunity is currently linked to this project.</p>}<Link href="/contact" className="mt-7 flex h-11 items-center justify-center bg-amber-500 px-4 text-sm font-bold text-slate-950">Contact Eluria</Link></div></section>
  </main></div>;
}
