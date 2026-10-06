import React, { useState } from 'react';
import { ProjectOpportunity } from '../../types/eluria/project';
import { saveInvestorLead } from '../../data/eluria/investors';

interface NdaModalProps {
  project: ProjectOpportunity | null;
  isOpen: boolean;
  onClose: () => void;
  onSignSuccess: (projectId: string) => void;
}

export function NdaModal({ project, isOpen, onClose, onSignSuccess }: NdaModalProps) {
  const [fullName, setFullName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [saveError, setSaveError] = useState('');

  if (!isOpen || !project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !consentGiven) return;
    setSaveError('');

    try {
      saveInvestorLead(
        { fullName, email, company: firmName },
        { pipelineStage: 'NDA Signed', ndaSigned: true },
      );
    } catch {
      setSaveError('Could not save your investor details. Please try again.');
      return;
    }

    onSignSuccess(project.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
              Confidentiality Access Gate
            </span>
            <h3 className="text-lg font-bold text-white">Digital Non-Disclosure Agreement</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition text-lg"
          >
            ✕
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-400 leading-relaxed">
          Accessing complete due diligence, financial projections, and site engineering reports for{' '}
          <strong className="text-slate-200">{project.title}</strong> requires an executed mutual NDA.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-300">Full Legal Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Samuel Mensah"
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300">Firm / Investment Entity</label>
            <input
              type="text"
              required
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              placeholder="e.g. Accra Capital Partners"
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300">Work Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="investor@firm.com"
              className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-400 max-h-24 overflow-y-auto">
            By checking the box below, you agree not to distribute, copy, or disclose any confidential financial models, investor briefs, or operational specifications obtained through Eluria's platform.
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
            />
            <span>I acknowledge and execute this Digital NDA</span>
          </label>

          <label className="flex items-start gap-2 text-xs leading-5 text-slate-300">
            <input
              type="checkbox"
              required
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-1 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
            />
            <span>I consent to Eluria Group processing my personal data for investor communications in accordance with the Ghana Data Protection Act.</span>
          </label>

          {saveError && <p role="alert" className="text-xs text-rose-400">{saveError}</p>}

          <button
            type="submit"
            disabled={!agreed || !consentGiven}
            className="mt-4 w-full rounded-lg bg-amber-500 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-40"
          >
            Sign NDA & Unlock Data Room &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}