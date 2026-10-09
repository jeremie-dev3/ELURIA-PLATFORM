'use client';

import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { registerInvestorApplication } from '../../data/lib/data/investors';
import type { InvestorCapacity, InvestorRegistration, InvestorType } from '../../types/eluria/investor';

interface InvestorRegistrationModalProps {
  onClose: () => void;
  onAccessRequested?: () => void;
}

const investorTypes: InvestorType[] = ['Institutional', 'Family Office', 'Private Equity', 'Angel', 'High Net Worth'];
const capacities: InvestorCapacity[] = ['Under $100K', '$100K - $500K', '$500K - $2M', '$2M+'];
const sectorOptions = ['Infrastructure & Utilities', 'Agribusiness & Processing', 'Energy & Utilities', 'Water Infrastructure'];
const inputClass = 'mt-1.5 h-11 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-400';

export function InvestorRegistrationModal({ onClose, onAccessRequested }: InvestorRegistrationModalProps) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [savedTo, setSavedTo] = useState<'supabase' | 'local' | 'local-fallback'>('local');
  const [error, setError] = useState('');
  const [form, setForm] = useState<InvestorRegistration>({
    fullName: '', company: '', email: '', phone: '', country: '', investorType: 'Institutional',
    industry: '', investmentInterests: [], investmentCapacity: 'Under $100K', preferredSectors: [],
    message: '', consentGiven: false, ndaRequested: false,
  });

  function update<K extends keyof InvestorRegistration>(key: K, value: InvestorRegistration[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleChoice(key: 'investmentInterests' | 'preferredSectors', choice: string) {
    const current = form[key];
    update(key, current.includes(choice) ? current.filter((item) => item !== choice) : [...current, choice]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!form.consentGiven) {
      setError('Consent under the Ghana Data Protection Act is required to submit this request.');
      return;
    }
    setStatus('saving');
    try {
      const persistence = await registerInvestorApplication(form);
      setSavedTo(persistence);
      setStatus('success');
      onAccessRequested?.();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to submit your request.');
      setStatus('idle');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="registration-heading" className="max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-slate-700 bg-[#0B192C] p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-5 border-b border-slate-800 pb-5">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">Investor relations</p><h2 id="registration-heading" className="mt-2 text-2xl font-bold text-white">Request Investor Access</h2><p className="mt-2 text-sm text-slate-400">Share your investment profile to begin the confidential diligence process.</p></div>
          <button type="button" onClick={onClose} aria-label="Close registration" className="grid size-9 shrink-0 place-items-center border border-slate-700 text-slate-300 hover:bg-slate-800"><X className="size-4" /></button>
        </div>

        {status === 'success' ? (
          <div className="py-12 text-center"><p className="text-lg font-semibold text-white">Access request received</p><p className="mt-2 text-sm text-slate-400">Our investor relations team will review your profile and follow up.</p><p className="mt-3 text-xs text-slate-500">{savedTo === 'supabase' ? 'Request synced to the investor database.' : savedTo === 'local-fallback' ? 'Request saved on this device; database sync is unavailable.' : 'Request saved on this device.'}</p><button type="button" onClick={onClose} className="mt-6 h-11 bg-amber-500 px-6 text-sm font-bold text-slate-950">Done</button></div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-medium text-slate-300">Full name<input className={inputClass} required autoComplete="name" value={form.fullName} onChange={(event) => update('fullName', event.target.value)} /></label>
              <label className="text-xs font-medium text-slate-300">Company<input className={inputClass} required autoComplete="organization" value={form.company} onChange={(event) => update('company', event.target.value)} /></label>
              <label className="text-xs font-medium text-slate-300">Email<input className={inputClass} required type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} /></label>
              <label className="text-xs font-medium text-slate-300">Phone<input className={inputClass} required type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} /></label>
              <label className="text-xs font-medium text-slate-300">Country<input className={inputClass} required autoComplete="country-name" value={form.country} onChange={(event) => update('country', event.target.value)} /></label>
              <label className="text-xs font-medium text-slate-300">Investor type<select className={inputClass} value={form.investorType} onChange={(event) => update('investorType', event.target.value as InvestorType)}>{investorTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
              <label className="text-xs font-medium text-slate-300">Industry<input className={inputClass} required value={form.industry} onChange={(event) => update('industry', event.target.value)} /></label>
              <label className="text-xs font-medium text-slate-300">Investment capacity<select className={inputClass} value={form.investmentCapacity} onChange={(event) => update('investmentCapacity', event.target.value as InvestorCapacity)}>{capacities.map((capacity) => <option key={capacity}>{capacity}</option>)}</select></label>
            </div>

            <fieldset><legend className="text-xs font-medium text-slate-300">Investment interests</legend><div className="mt-3 flex flex-wrap gap-2">{['Direct investment', 'Co-investment', 'Project finance', 'Strategic partnership'].map((choice) => <label key={choice} className="flex items-center gap-2 border border-slate-800 px-3 py-2 text-xs text-slate-300"><input type="checkbox" checked={form.investmentInterests.includes(choice)} onChange={() => toggleChoice('investmentInterests', choice)} className="accent-amber-500" />{choice}</label>)}</div></fieldset>
            <fieldset><legend className="text-xs font-medium text-slate-300">Preferred sectors</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{sectorOptions.map((sector) => <label key={sector} className="flex items-center gap-2 border border-slate-800 px-3 py-2.5 text-xs text-slate-300"><input type="checkbox" checked={form.preferredSectors.includes(sector)} onChange={() => toggleChoice('preferredSectors', sector)} className="accent-amber-500" />{sector}</label>)}</div></fieldset>
            <label className="block text-xs font-medium text-slate-300">Message<textarea className="mt-1.5 min-h-24 w-full border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-400" value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Tell us about your investment objectives." /></label>
            <label className="flex items-start gap-3 text-xs leading-5 text-slate-400"><input type="checkbox" checked={form.ndaRequested === true} onChange={(event) => update('ndaRequested', event.target.checked)} className="mt-1 accent-amber-500" /><span>Please provide an NDA for review before confidential project materials are shared.</span></label>
            <label className="flex items-start gap-3 border-t border-slate-800 pt-5 text-xs leading-5 text-slate-400"><input type="checkbox" required checked={form.consentGiven} onChange={(event) => update('consentGiven', event.target.checked)} className="mt-1 accent-amber-500" /><span>I consent to Eluria Group Ltd collecting and processing this information for investor relations purposes in accordance with the Ghana Data Protection Act, 2012 (Act 843).</span></label>
            {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
            <div className="flex justify-end"><button type="submit" disabled={status === 'saving'} className="h-11 bg-amber-500 px-6 text-sm font-bold text-slate-950 transition hover:bg-amber-400 disabled:cursor-wait disabled:opacity-60">{status === 'saving' ? 'Submitting...' : 'Submit access request'}</button></div>
          </form>
        )}
      </section>
    </div>
  );
}
