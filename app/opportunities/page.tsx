'use client';

import { useState } from 'react';
import { Navbar } from '../../components/public-platform/Navbar';
import { ProjectCard } from '../../components/public-platform/ProjectCard';
import { InvestorRegistrationForm } from '../../components/public-platform/InvestorRegistrationForm';
import { ELURIA_PROJECTS } from '../../data/eluria/mock-projects';
import { X } from 'lucide-react';

export default function OpportunitiesPage() {
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);

  const handleOpenRegistration = (projectId?: string) => {
    if (projectId) setSelectedOpportunityId(projectId);
    setIsInvestorModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0a1e4c_0%,_#071b73_28%,_#06142d_100%)] text-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Active Pipeline
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Featured Investment Opportunities
          </h1>
          <p className="mt-4 text-base text-slate-300">
            Explore approved industrial opportunities. Confidential models, engineering schematics, and full VDR data require accredited registration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ELURIA_PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={(id) => handleOpenRegistration(id)}
            />
          ))}
        </div>
      </main>

      {isInvestorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4">
          <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl sm:p-6">
            <button
              type="button"
              aria-label="Close registration dialog"
              onClick={() => setIsInvestorModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 pr-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Secure Investor Registration</p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                {selectedOpportunityId ? 'Project Investor Access' : 'Investor Registration'}
              </h2>
            </div>
            <InvestorRegistrationForm onSuccess={() => setIsInvestorModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
