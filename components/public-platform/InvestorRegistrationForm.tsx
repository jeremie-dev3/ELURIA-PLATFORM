'use client';

import React, { useState } from 'react';
import { registerInvestor } from '../../data/lib/data/investors';

interface Props {
  onSuccess?: () => void;
}

export function InvestorRegistrationForm({ onSuccess }: Props) {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [investmentCapacity, setInvestmentCapacity] = useState('$50,000 - $100,000');
  const [consentGiven, setConsentGiven] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentGiven) {
      alert('You must provide consent under the Ghana Data Protection Act.');
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      await registerInvestor({
        fullName,
        company,
        email,
        phone,
        investmentCapacity,
        consentGiven,
      });

      setStatusMessage('Registration successfully recorded in CRM.');
      setFullName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setConsentGiven(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed.';
      setStatusMessage(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Investor Onboarding
        </span>
        <h3 className="mt-1 text-2xl font-bold text-white">Investor Registration</h3>
        <p className="mt-1.5 text-xs text-slate-400">
          Register to access confidential due diligence materials and project virtual data rooms.
        </p>
      </div>

      {statusMessage && (
        <div className="mb-5 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-300">
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300">Full Legal Name *</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Kwame Mensah"
            className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-slate-300">Work Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="investor@fund.com"
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300">Company / Entity *</label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Gold Coast Capital"
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-slate-300">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+233 20 000 0000"
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300">Investment Capacity</label>
            <select
              value={investmentCapacity}
              onChange={(e) => setInvestmentCapacity(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="$50,000 - $100,000">$50,000 - $100,000</option>
              <option value="$100,000 - $500,000">$100,000 - $500,000</option>
              <option value="$500,000 - $2,000,000">$500,000 - $2,000,000</option>
              <option value="$2,000,000+">$2,000,000+</option>
            </select>
          </div>
        </div>

        {/* Section 30.5 Ghana Data Protection Act Consent */}
        <label className="flex items-start gap-2.5 pt-2 text-xs text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="mt-0.5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
          />
          <span>
            I consent to Eluria Group Ltd processing and storing my information for investor relations outreach in accordance with the Ghana Data Protection Act[cite: 11].
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-amber-500 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-400 disabled:opacity-50"
        >
          {loading ? 'Submitting Registration...' : 'Submit Investor Registration →'}
        </button>
      </form>
    </div>
  );
}