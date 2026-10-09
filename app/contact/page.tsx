'use client';

import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Navbar } from '../../components/public-platform/Navbar';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const entry = { name: String(formData.get('name') ?? ''), email: String(formData.get('email') ?? ''), message: String(formData.get('message') ?? ''), submittedAt: new Date().toISOString() };
    let existingRequests: unknown[] = [];
    try {
      const existing: unknown = JSON.parse(localStorage.getItem('eluria_consultation_requests') ?? '[]');
      if (Array.isArray(existing)) existingRequests = existing;
    } catch {
      existingRequests = [];
    }
    localStorage.setItem('eluria_consultation_requests', JSON.stringify([entry, ...existingRequests]));
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return <div className="min-h-screen bg-[#0B192C] text-slate-100"><Navbar /><main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
    <header className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Contact Eluria</p><h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Let’s discuss your next project</h1><p className="mt-5 text-base leading-relaxed text-slate-300">Tell us what you are planning and our team will direct your enquiry to the right people.</p></header>
    <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="space-y-3"><div className="flex gap-4 border-b border-slate-800 py-5"><Mail className="mt-1 size-5 text-amber-400" /><div><h2 className="font-semibold text-white">Email</h2><a href="mailto:invest@eluriagroup.com" className="mt-1 text-sm text-slate-400 hover:text-amber-300">invest@eluriagroup.com</a></div></div><div className="flex gap-4 border-b border-slate-800 py-5"><Phone className="mt-1 size-5 text-amber-400" /><div><h2 className="font-semibold text-white">Phone</h2><a href="tel:+233240000000" className="mt-1 text-sm text-slate-400 hover:text-amber-300">+233 24 000 0000</a></div></div><div className="flex gap-4 border-b border-slate-800 py-5"><MapPin className="mt-1 size-5 text-amber-400" /><div><h2 className="font-semibold text-white">Location</h2><p className="mt-1 text-sm text-slate-400">Accra, Ghana</p></div></div></section>
      <form id="consultation" onSubmit={handleSubmit} className="border border-slate-800 bg-slate-900/60 p-6 sm:p-8"><h2 className="text-xl font-bold text-white">Consultation intake</h2><p className="mt-2 text-sm text-slate-400">Share your contact details and a short project brief.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-xs font-medium text-slate-300">Name<input name="name" required className="mt-1.5 h-11 w-full border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-amber-400" /></label><label className="text-xs font-medium text-slate-300">Email<input name="email" type="email" required className="mt-1.5 h-11 w-full border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-amber-400" /></label><label className="text-xs font-medium text-slate-300 sm:col-span-2">Project or enquiry<textarea name="message" required className="mt-1.5 min-h-36 w-full border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400" /></label></div>{submitted && <p role="status" className="mt-4 text-sm text-emerald-300">Your consultation request has been saved. Our team will follow up.</p>}<button type="submit" className="mt-5 h-11 bg-amber-500 px-5 text-sm font-bold text-slate-950">Request a consultation</button></form>
    </div>
  </main></div>;
}
