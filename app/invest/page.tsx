'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Navbar } from '../../components/public-platform/Navbar';
import { ELURIA_OPPORTUNITIES } from '../../data/eluria/opportunities';

const selectClass = 'h-11 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none focus:border-amber-500';

export default function InvestmentDirectoryPage() {
  const [sector, setSector] = useState('All sectors');
  const [location, setLocation] = useState('All locations');
  const [investmentSize, setInvestmentSize] = useState('Any investment size');
  const [status, setStatus] = useState('All statuses');

  const sectors = [...new Set(ELURIA_OPPORTUNITIES.map((item) => item.sector))];
  const locations = [...new Set(ELURIA_OPPORTUNITIES.map((item) => item.location))];
  const filteredOpportunities = ELURIA_OPPORTUNITIES.filter((item) => {
    const ticket = Number(item.minTicket.replace(/[^\d]/g, ''));
    const matchesSector = sector === 'All sectors' || item.sector === sector;
    const matchesLocation = location === 'All locations' || item.location === location;
    const matchesStatus = status === 'All statuses' || item.status === status;
    const matchesSize = investmentSize === 'Any investment size' ||
      (investmentSize === 'Under $100K' && ticket < 100000) ||
      (investmentSize === '$100K - $500K' && ticket >= 100000 && ticket <= 500000) ||
      (investmentSize === '$500K+' && ticket > 500000);
    return matchesSector && matchesLocation && matchesStatus && matchesSize;
  });

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Investment Opportunities</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Capital for essential infrastructure</h1>
          <p className="mt-5 text-base leading-relaxed text-slate-300">Review public project information and register to request access to confidential diligence materials.</p>
        </header>

        <section aria-label="Filter opportunities" className="mt-10 grid gap-4 border-y border-slate-800 py-5 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs font-medium text-slate-400">Sector<select value={sector} onChange={(event) => setSector(event.target.value)} className={`${selectClass} mt-2`}><option>All sectors</option>{sectors.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="text-xs font-medium text-slate-400">Location<select value={location} onChange={(event) => setLocation(event.target.value)} className={`${selectClass} mt-2`}><option>All locations</option>{locations.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="text-xs font-medium text-slate-400">Minimum investment<select value={investmentSize} onChange={(event) => setInvestmentSize(event.target.value)} className={`${selectClass} mt-2`}><option>Any investment size</option><option>Under $100K</option><option>$100K - $500K</option><option>$500K+</option></select></label>
          <label className="text-xs font-medium text-slate-400">Status<select value={status} onChange={(event) => setStatus(event.target.value)} className={`${selectClass} mt-2`}><option>All statuses</option><option>Seeking Investment</option><option>Funding</option><option>Under Review</option><option>Closed</option></select></label>
        </section>

        <div className="mt-7 flex items-center justify-between"><p className="text-sm text-slate-400">{filteredOpportunities.length} opportunities</p><Link href="/contact" className="text-sm font-semibold text-amber-400 hover:text-amber-300">Discuss an investment <ArrowRight className="ml-1 inline h-4 w-4" /></Link></div>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredOpportunities.map((opportunity) => (
            <article key={opportunity.id} className="overflow-hidden border border-slate-800 bg-slate-900/70">
              <div className="relative h-52 bg-slate-800"><img src={opportunity.featuredImage} alt="" className="h-full w-full object-cover" /><span className="absolute left-4 top-4 bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-950">{opportunity.status}</span></div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">{opportunity.category}</p>
                <h2 className="mt-2 text-xl font-bold text-white">{opportunity.title}</h2>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400"><MapPin className="h-4 w-4" />{opportunity.location}</p>
                <p className="mt-4 min-h-12 text-sm leading-relaxed text-slate-300">{opportunity.shortDescription}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4 text-sm"><div><dt className="text-xs text-slate-500">Investment range</dt><dd className="mt-1 font-semibold text-white">{opportunity.investmentRange}</dd></div><div><dt className="text-xs text-slate-500">Expected return</dt><dd className="mt-1 font-semibold text-white">{opportunity.expectedReturns}</dd></div></dl>
                <Link href={`/invest/${opportunity.slug}`} className="mt-5 flex h-11 items-center justify-center gap-2 bg-amber-500 px-4 text-sm font-bold text-slate-950 transition hover:bg-amber-400">View Opportunity <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          ))}
        </div>
        {filteredOpportunities.length === 0 && <p className="py-16 text-center text-slate-400">No opportunities match these filters.</p>}
      </main>
    </div>
  );
}
