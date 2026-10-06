'use client';

import React, { useEffect, useState } from 'react';
import { ActivityFeed } from '../../components/admin-dashboard/ActivityFeed';
import { FunnelView } from '../../components/admin-dashboard/FunnelView';
import { MetricCards } from '../../components/admin-dashboard/MetricCards';
import { Sidebar } from '../../components/admin-dashboard/Sidebar';
import {
  dashboardMetrics,
  investorActivity,
  investorPipeline,
  topOpportunities,
} from '../../data/eluria/admin-dashboard';
import { loadInvestorLeads, saveInvestorLead, type InvestorLead } from '../../data/eluria/investors';
import { ArrowDownRight, ArrowUpRight, Bell, CalendarDays, Plus, Search } from 'lucide-react';

export default function InvestPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [investors, setInvestors] = useState<InvestorLead[]>([]);

  useEffect(() => {
    setInvestors(loadInvestorLeads());
  }, []);

  const handleSaveInvestor = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');

    try {
      const record = saveInvestorLead({ fullName, email, company });
      if (!record) return;
      setInvestors((current) => [record, ...current]);
      setShowAddModal(false);
      setFullName('');
      setEmail('');
      setCompany('');
      setConsentGiven(false);
    } catch {
      setSaveError('Could not save this investor in this browser. Check available storage and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-slate-900">
      <Sidebar />

      <main id="dashboard" className="min-h-screen lg:pl-65">
        <div className="mx-auto max-w-375 px-4 pb-10 pt-5 sm:px-6 lg:px-9 lg:pt-8">
          
          {/* Section 30.3 Compliance: Sample Data Global Banner */}
          <div className="mb-4 flex items-center justify-between rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs text-amber-900 shadow-sm">
            <span className="font-medium">
              Notice: Pipeline metrics and figures displayed below are for demonstration purposes.
            </span>
            <span className="rounded bg-amber-200/80 px-2 py-0.5 font-bold uppercase tracking-wider text-amber-900">
              Sample data
            </span>
          </div>

          <header className="mb-8 flex flex-col gap-5 border-b border-slate-200/80 pb-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-navy">Investor relations</p>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-[28px]">Dashboard overview</h1>
              <p className="mt-1.5 text-sm text-slate-500">Monitor your investor pipeline and platform activity.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <label className="flex h-10 min-w-52 flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-slate-400 shadow-sm sm:flex-none">
                <Search size={16} aria-hidden="true" />
                <input aria-label="Search investors and opportunities" className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:w-44" placeholder="Search anything..." />
                <kbd className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400 sm:inline">⌘ K</kbd>
              </label>
              <button aria-label="Notifications" className="relative grid size-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50">
                <Bell size={17} aria-hidden="true" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" />
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex h-10 items-center gap-2 rounded-md bg-brand-navy px-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-navy/90"
              >
                <Plus size={16} aria-hidden="true" />
                <span>Add investor</span>
              </button>
            </div>
          </header>

          <section id="reports" aria-label="Key investor metrics" className="mb-7">
            <MetricCards metrics={dashboardMetrics} />
          </section>

          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Investor intelligence</h2>
                <p className="mt-0.5 text-sm text-slate-500">A live view of conversion and investor interest.</p>
              </div>
              <span className="rounded border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                Sample data
              </span>
            </div>
            <button className="hidden items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm sm:flex">
              <CalendarDays size={15} aria-hidden="true" />
              Last 30 days
              <ArrowDownRight size={14} aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.9fr)]">
            <FunnelView stages={investorPipeline} />
            <div className="grid gap-5">
              <section id="top-opportunities" className="rounded-lg border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[15px] font-bold text-slate-900">Top opportunities by interest</h2>
                    <p className="mt-1 text-xs text-slate-500">Investor views across active projects</p>
                  </div>
                  <span className="rounded border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                    Sample data
                  </span>
                </div>
                <div className="space-y-4.5">
                  {topOpportunities.map((opportunity, index) => (
                    <div key={opportunity.name}>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <span className="truncate text-[13px] font-medium text-slate-700">{opportunity.name}</span>
                        <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-600">{opportunity.interest}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className={`h-full rounded-full ${['bg-brand-navy', 'bg-brand-gold', 'bg-brand-navy/70', 'bg-brand-gold/70'][index]}`} style={{ width: `${opportunity.interest}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <a href="#top-opportunities" className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand-navy hover:underline">
                  View all opportunities <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </section>
              <ActivityFeed activity={investorActivity} />
            </div>
          </div>

          <section id="investors" aria-labelledby="investors-heading" className="mt-8 rounded-lg border border-slate-200/80 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <div>
                <h2 id="investors-heading" className="text-[15px] font-bold text-slate-900">Investor leads</h2>
                <p className="mt-1 text-xs text-slate-500">Saved locally in this browser</p>
              </div>
              <span className="text-xs font-medium tabular-nums text-slate-500">{investors.length} {investors.length === 1 ? 'lead' : 'leads'}</span>
            </div>
            {investors.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-slate-500">No investor leads have been added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                    <tr>
                      <th scope="col" className="px-5 py-3">Name</th>
                      <th scope="col" className="px-5 py-3">Email</th>
                      <th scope="col" className="px-5 py-3">Company</th>
                      <th scope="col" className="px-5 py-3">Pipeline stage</th>
                      <th scope="col" className="px-5 py-3">Added</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {investors.map((investor) => (
                      <tr key={investor.id}>
                        <td className="px-5 py-3 font-medium text-slate-800">{investor.fullName}</td>
                        <td className="px-5 py-3 text-slate-600">{investor.email}</td>
                        <td className="px-5 py-3 text-slate-600">{investor.company}</td>
                        <td className="px-5 py-3 text-slate-600">{investor.pipelineStage}</td>
                        <td className="px-5 py-3 text-slate-500">{new Date(investor.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Add Investor Modal with Persistent Storage */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Add New Investor Lead</h3>
            <p className="mt-1 text-xs text-slate-500">
              Creates a local investor record that persists across page refreshes.
            </p>
            <form onSubmit={handleSaveInvestor} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-navy"
                  placeholder="e.g. Samuel Mensah"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-navy"
                  placeholder="investor@firm.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">Company / Firm</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-navy"
                  placeholder="e.g. Accra Capital"
                />
              </div>
              <label className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                <input
                  type="checkbox"
                  required
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-1 rounded border-slate-300 text-brand-navy focus:ring-brand-navy"
                />
                <span>I consent to Eluria Group processing my personal data for investor communications in accordance with the Ghana Data Protection Act.</span>
              </label>
              {saveError && <p role="alert" className="text-xs text-rose-700">{saveError}</p>}
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSaveError('');
                  }}
                  className="rounded-md border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-brand-navy px-4 py-2 text-xs font-semibold text-white hover:bg-brand-navy/90"
                >
                  Save Investor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}