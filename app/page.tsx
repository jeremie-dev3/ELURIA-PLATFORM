'use client';

import React, { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Navbar } from '../components/public-platform/Navbar';
import { Hero } from '../components/public-platform/Hero';
import { InvestorRegistrationModal } from '../components/public-platform/InvestorRegistrationModal';
import { ELURIA_SERVICES } from '../data/eluria/services';
import { ELURIA_PORTFOLIO } from '../data/eluria/portfolio';
import { ELURIA_OPPORTUNITIES } from '../data/eluria/opportunities';
import { ELURIA_LEADERSHIP } from '../data/eluria/team';
import { ArrowRight, CalendarDays, CheckCircle2, Droplet, FlaskConical, HeartPulse, Leaf, Mail, MapPin, Phone, Recycle, ShieldCheck, Wrench } from 'lucide-react';

const serviceIconMap = { Wrench, Leaf, FlaskConical, Droplet, HeartPulse, ShieldCheck, Recycle, CalendarDays };

export default function PublicHomePage() {
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const handleOpenRegistration = () => setIsInvestorModalOpen(true);

  function handleConsultationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const request = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      submittedAt: new Date().toISOString(),
    };
    let requests: unknown[] = [];
    try {
      const existing: unknown = JSON.parse(localStorage.getItem('eluria_consultation_requests') ?? '[]');
      if (Array.isArray(existing)) requests = existing;
    } catch {
      requests = [];
    }
    localStorage.setItem('eluria_consultation_requests', JSON.stringify([request, ...requests]));
    event.currentTarget.reset();
    setConsultationSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#0a1e4c_0%,#071b73_28%,#06142d_100%)] text-slate-100 selection:bg-brand-gold selection:text-brand-navy">
      <Navbar />

      <main>
        <Hero onBecomeInvestor={handleOpenRegistration} />
        <section id="about" className="border-b border-slate-800 bg-slate-900/50 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  About Eluria Group
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Engineering Sustainable Industrial Growth Across Africa
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  Eluria Group is an integrated engineering, environmental compliance, and infrastructure development consortium. We identify, structure, and de-risk high-conviction industrial opportunities, providing accredited investors with transparent pipelines and institutional execution rigor.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-6 border-t border-slate-800 pt-6">
                  <div>
                    <h3 className="text-xs font-semibold uppercase text-slate-400">Our Mission</h3>
                    <p className="mt-1 text-sm text-slate-300">Deploy world-class technical solutions that drive resource efficiency and industrial capacity.</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase text-slate-400">Our Vision</h3>
                    <p className="mt-1 text-sm text-slate-300">To be West Africa&apos;s leading infrastructure and environmental services partner.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-500">Core Values</h3>
                <div className="mt-4 space-y-4">
                  {[
                    { title: 'Technical Excellence', desc: 'Rigorous engineering standards adhering to ISO and regional regulatory standards.' },
                    { title: 'Environmental Stewardship', desc: 'Balancing industrial expansion with closed-loop circular sustainability.' },
                    { title: 'Governance & Integrity', desc: 'Institutional transparency, auditable data rooms, and compliance with data governance laws.' },
                  ].map((val, idx) => (
                    <div key={idx} className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-400" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{val.title}</h4>
                        <p className="text-xs text-slate-400">{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-b border-slate-800 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Comprehensive Solutions</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Core Service Capabilities</h2>
              </div>
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 md:mt-0">
                Discuss Your Project <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ELURIA_SERVICES.map((service) => {
                const Icon = serviceIconMap[service.iconName];
                return <article key={service.slug} className="flex flex-col justify-between border border-slate-800 bg-slate-900/60 p-6"><div><div className="flex size-10 items-center justify-center bg-amber-500/10 text-amber-400"><Icon className="size-5" /></div><h3 className="mt-4 text-base font-bold text-white">{service.title}</h3><p className="mt-2 text-xs leading-relaxed text-slate-400">{service.description}</p></div><Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:underline">Explore service <ArrowRight className="size-3.5" /></Link></article>;
              })}
            </div>
          </div>
        </section>

        <section id="opportunities" className="border-b border-slate-800 bg-slate-900/40 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Active Pipeline</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Investment Opportunities</h2>
                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  Explore approved industrial opportunities. Confidential diligence material is available to registered investors.
                </p>
              </div>
              <Link href="/invest" className="mt-4 inline-flex items-center justify-center gap-2 bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-amber-400 md:mt-0">View all opportunities <ArrowRight className="size-4" /></Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ELURIA_OPPORTUNITIES.slice(0, 3).map((opportunity) => <article key={opportunity.id} className="overflow-hidden border border-slate-800 bg-slate-950"><img src={opportunity.featuredImage} alt="" className="h-48 w-full object-cover" /><div className="p-5"><p className="text-xs uppercase tracking-wider text-amber-400">{opportunity.category}</p><h3 className="mt-2 text-lg font-bold text-white">{opportunity.title}</h3><p className="mt-2 text-sm text-slate-400">{opportunity.shortDescription}</p><Link href={`/invest/${opportunity.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-400">View opportunity <ArrowRight className="size-4" /></Link></div></article>)}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-800 bg-[#0B192C] py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
            <div><span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Responsible growth</span><h2 className="mt-3 text-3xl font-bold text-white">Infrastructure with environmental performance in view</h2><p className="mt-4 text-sm leading-relaxed text-slate-300">Eluria integrates environmental review, resource efficiency, and circular economy thinking into project planning, helping partners evaluate impacts alongside engineering and commercial priorities.</p><Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-400">Explore sustainability services <ArrowRight className="size-4" /></Link></div>
            <div className="grid gap-3 sm:grid-cols-3">{[
              { title: 'Assess', text: 'Environmental and social considerations built into early project review.' },
              { title: 'Use efficiently', text: 'Water, energy, and material efficiency considered in design.' },
              { title: 'Close the loop', text: 'Reuse, recovery, and waste-to-value opportunities explored.' },
            ].map((item) => <article key={item.title} className="border border-slate-800 bg-slate-900/70 p-5"><Leaf className="size-5 text-amber-400" /><h3 className="mt-4 font-bold text-white">{item.title}</h3><p className="mt-2 text-xs leading-relaxed text-slate-400">{item.text}</p></article>)}</div>
          </div>
          <div className="mx-auto mt-14 max-w-7xl border-y border-slate-800 px-6 py-8 lg:px-8"><p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Why Eluria</p><div className="mt-5 grid gap-6 sm:grid-cols-3"><div><h3 className="font-bold text-white">Integrated expertise</h3><p className="mt-2 text-sm leading-relaxed text-slate-400">Engineering, environmental compliance, and infrastructure development brought together across the project lifecycle.</p></div><div><h3 className="font-bold text-white">Regional perspective</h3><p className="mt-2 text-sm leading-relaxed text-slate-400">Project opportunities shaped around industrial and infrastructure needs in Ghana and West Africa.</p></div><div><h3 className="font-bold text-white">Clear investor journey</h3><p className="mt-2 text-sm leading-relaxed text-slate-400">Public opportunity summaries with a defined registration and review process for protected diligence materials.</p></div></div></div>
          <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Project portfolio</p><h3 className="mt-2 text-2xl font-bold text-white">Projects moving from concept to delivery</h3></div><Link href="/projects" className="hidden items-center gap-2 text-sm font-semibold text-amber-400 sm:inline-flex">Browse projects <ArrowRight className="size-4" /></Link></div><div className="mt-5 grid gap-4 md:grid-cols-3">{ELURIA_PORTFOLIO.map((project) => <Link key={project.id} href={`/projects/${project.slug}`} className="border border-slate-800 bg-slate-950 p-4 hover:border-amber-500/60"><p className="text-xs uppercase tracking-wider text-amber-400">{project.category}</p><h4 className="mt-2 font-bold text-white">{project.name}</h4><p className="mt-2 text-xs text-slate-400">{project.location} · {project.status}</p></Link>)}</div></div>
        </section>

        <section id="leadership" className="border-b border-slate-800 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Governance & Leadership</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Executive Leadership</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ELURIA_LEADERSHIP.map((leader) => (
                <div key={leader.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                  <div className="relative mb-5 h-64 w-full overflow-hidden rounded-xl bg-slate-800">
                    <img src={leader.imageUrl} alt={leader.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">{leader.role}</span>
                    <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{leader.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-800 bg-amber-500 py-12 text-slate-950">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 sm:flex-row sm:items-center lg:px-8"><div><p className="text-xs font-bold uppercase tracking-widest">Build with confidence</p><h2 className="mt-2 text-2xl font-bold">Explore a project with Eluria</h2></div><div className="flex flex-wrap gap-3"><button onClick={handleOpenRegistration} className="h-11 bg-slate-950 px-5 text-sm font-bold text-white">Request investor access</button><Link href="/contact" className="h-11 border border-slate-950/40 px-5 py-3 text-sm font-bold">Book a consultation</Link></div></div>
        </section>

        <section id="contact" className="border-b border-slate-800 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Contact</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Partner with Eluria Group</h2>
                <p className="mt-4 max-w-2xl text-base text-slate-300">
                  Whether you are an investor, industrial operator, or strategic partner, our team can guide your next project discussion.
                </p>
              </div>

              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Mail className="h-4 w-4 text-amber-400" />
                  <span>invest@eluriagroup.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Phone className="h-4 w-4 text-amber-400" />
                  <span>+233 24 000 0000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <MapPin className="h-4 w-4 text-amber-400" />
                  <span>Accra, Ghana</span>
                </div>
              </div>
              <form id="consultation" onSubmit={handleConsultationSubmit} className="grid gap-3 border border-slate-800 bg-slate-900/60 p-6 sm:grid-cols-2"><label className="text-xs text-slate-400">Name<input name="name" required className="mt-1 h-10 w-full border border-slate-700 bg-slate-950 px-3 text-sm text-white" /></label><label className="text-xs text-slate-400">Email<input name="email" type="email" required className="mt-1 h-10 w-full border border-slate-700 bg-slate-950 px-3 text-sm text-white" /></label><label className="text-xs text-slate-400 sm:col-span-2">How can we help?<textarea name="message" required className="mt-1 min-h-24 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" /></label>{consultationSubmitted && <p role="status" className="text-sm text-emerald-300 sm:col-span-2">Your consultation request has been saved. Our team will follow up.</p>}<button type="submit" className="h-10 bg-amber-500 px-4 text-sm font-bold text-slate-950 sm:col-span-2">Request a consultation</button></form>
            </div>
          </div>
        </section>

        {isInvestorModalOpen && <InvestorRegistrationModal onClose={() => setIsInvestorModalOpen(false)} />}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-slate-400 md:flex-row">
          <p>© 2026 Eluria Group. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/invest" className="hover:text-white">Opportunities</Link>
            <Link href="/projects" className="hover:text-white">Projects</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
