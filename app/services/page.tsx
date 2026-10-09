import Link from 'next/link';
import { ArrowRight, CalendarDays, Droplet, FlaskConical, HeartPulse, Leaf, Recycle, ShieldCheck, Wrench } from 'lucide-react';
import { Navbar } from '../../components/public-platform/Navbar';
import { ELURIA_SERVICES } from '../../data/eluria/services';
import type { ServiceCategory } from '../../types/eluria/service';

const serviceIcons = { Wrench, Leaf, FlaskConical, Droplet, HeartPulse, ShieldCheck, Recycle, CalendarDays };

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100"><Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <header className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Services</p><h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Practical expertise for complex projects</h1><p className="mt-5 text-base leading-relaxed text-slate-300">Engineering, environmental, and operational capabilities from early assessment through delivery.</p></header>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ELURIA_SERVICES.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
        <section id="contact" className="mt-16 flex flex-col justify-between gap-6 border-y border-slate-800 py-8 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">Start a conversation</p><h2 className="mt-2 text-2xl font-bold text-white">Discuss your project requirements</h2></div><Link href="/contact" className="inline-flex h-11 items-center justify-center gap-2 bg-amber-500 px-5 text-sm font-bold text-slate-950">Discuss Your Project <ArrowRight className="h-4 w-4" /></Link></section>
      </main>
    </div>
  );
}

function ServiceCard({ service }: { service: ServiceCategory }) {
  const Icon = serviceIcons[service.iconName];
  return <article className="flex flex-col border border-slate-800 bg-slate-900/70 p-5">
    <div className="flex size-10 items-center justify-center border border-amber-500/30 text-amber-400"><Icon className="size-5" /></div>
    <h2 className="mt-4 text-lg font-bold text-white">{service.title}</h2>
    <p className="mt-2 min-h-16 text-sm leading-relaxed text-slate-400">{service.description}</p>
    <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-300">Key capabilities</h3>
    <ul className="mt-3 space-y-2">{service.keyCapabilities.map((capability) => <li key={capability} className="flex gap-2 text-xs leading-relaxed text-slate-400"><span className="text-amber-400">•</span>{capability}</li>)}</ul>
    <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-300">Relevant projects</h3>
    <div className="mt-2 flex flex-wrap gap-1.5">{service.relevantProjects.map((project) => <span key={project} className="border border-slate-700 px-2 py-1 text-[10px] text-slate-400">{project}</span>)}</div>
    <Link href="/contact" className="mt-6 inline-flex h-10 items-center justify-center gap-2 border border-amber-500/60 text-xs font-semibold text-amber-300 hover:bg-amber-500/10">{service.ctaLabel}<ArrowRight className="size-3.5" /></Link>
  </article>;
}
