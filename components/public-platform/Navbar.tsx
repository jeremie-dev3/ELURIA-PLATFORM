import React from 'react';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/invest" className="text-xl font-bold tracking-tight text-white">
          ELURIA<span className="text-amber-500">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="#opportunities" className="hover:text-white transition">
            Opportunities
          </Link>
          <a
            href="#opportunities"
            className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition"
          >
            Investor Portal
          </a>
        </nav>
      </div>
    </header>
  );
}