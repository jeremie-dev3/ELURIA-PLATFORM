import React from 'react';
import Link from 'next/link';

interface HeroProps {
  onBecomeInvestor?: () => void;
}

export function Hero({ onBecomeInvestor }: HeroProps) {
  return (
    <section className="border-b border-slate-800 bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
          The Eluria Investor Relations Platform
        </span>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Direct Access to Verified Industrial & Infrastructure Projects
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-400">
          A secure digital platform designed to attract, qualify, and engage investors—turning interest into investment conversations.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/invest" className="rounded-lg bg-amber-500 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-400">
            Explore Opportunities
          </Link>
          <button
            type="button"
            onClick={onBecomeInvestor}
            className="rounded-lg bg-amber-500 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Become an Investor
          </button>
          <Link href="/contact#consultation" className="rounded-lg border border-slate-700 px-5 py-3 text-xs font-bold text-slate-200 transition hover:border-amber-400 hover:text-white">
            Book a Consultation
          </Link>
          <Link href="/contact" className="px-3 py-3 text-xs font-semibold text-slate-300 transition hover:text-white">
            Contact Eluria
          </Link>
        </div>
      </div>
    </section>
  );
}