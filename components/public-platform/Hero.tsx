import React from 'react';

export function Hero() {
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
      </div>
    </section>
  );
}