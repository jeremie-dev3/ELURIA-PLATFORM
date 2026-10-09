'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationLinks = [
    { label: 'Opportunities', href: '/invest' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
    { label: 'About', href: '/about' },
    { label: 'Leadership', href: '/leadership' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-gold/30 bg-brand-deep/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-28 items-center justify-center overflow-hidden rounded-lg bg-white/95 p-1.5 shadow-sm ring-1 ring-white/60">
            <Image
              src="/brand/ELURIA%20GROUP%20LTD%20LOGO.png"
              alt="Eluria Group Ltd logo"
              width={220}
              height={72}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          {navigationLinks.map((item) => <Link key={item.href} href={item.href} className="transition hover:text-brand-gold">{item.label}</Link>)}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="text-xs font-semibold text-slate-300 transition hover:text-white"
          >
            Admin Portal
          </Link>
          <Link
            href="/invest"
            className="hidden rounded-lg bg-brand-gold px-4 py-2 text-xs font-bold text-brand-deep transition hover:bg-[#e3c45d] sm:inline-flex"
          >
            Become an Investor
          </Link>
          <button type="button" aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)} className="grid size-10 place-items-center border border-slate-700 text-slate-200 md:hidden">
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {isMenuOpen && <nav aria-label="Mobile navigation" className="border-t border-slate-800 bg-brand-deep px-6 py-3 md:hidden">{navigationLinks.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="block border-b border-slate-800/70 py-3 text-sm font-medium text-slate-200 last:border-0 hover:text-brand-gold">{item.label}</Link>)}<Link href="/invest" onClick={() => setIsMenuOpen(false)} className="mt-3 block bg-brand-gold px-4 py-3 text-center text-sm font-bold text-brand-deep">Become an Investor</Link></nav>}
    </header>
  );
}