import { supabase } from './clients';
import type { InvestorRegistration } from '../../../types/eluria/investor';

type InvestorRow = {
  id: string;
  full_name: string;
  company: string;
  email: string;
  phone: string | null;
  investment_capacity: string | null;
  consent_given: boolean;
  pipeline_stage: string;
  created_at: string;
};

export interface InvestorPayload {
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  investmentCapacity?: string;
  consentGiven: boolean;
  country?: string;
  investorType?: string;
  industry?: string;
  investmentInterests?: string[];
  preferredSectors?: string[];
  message?: string;
}

export interface InvestorRecord extends InvestorPayload {
  id: string;
  pipelineStage: string;
  createdAt: string;
}

export async function registerInvestor(payload: InvestorPayload): Promise<InvestorRecord> {
  // Mode A: Live Supabase Postgres
  if (supabase) {
    const { data, error } = await supabase
      .from('investors')
      .insert([
        {
          full_name: payload.fullName,
          company: payload.company,
          email: payload.email,
          phone: payload.phone || null,
          investment_capacity: payload.investmentCapacity || '$50,000 - $100,000',
          consent_given: payload.consentGiven,
          pipeline_stage: 'New Lead',
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: data.id,
      fullName: data.full_name,
      company: data.company,
      email: data.email,
      phone: data.phone ?? undefined,
      investmentCapacity: data.investment_capacity ?? undefined,
      consentGiven: data.consent_given,
      pipelineStage: data.pipeline_stage,
      createdAt: data.created_at,
    };
  }

  // Mode B: Local Persistent Fallback (survives refresh)
  const existing: InvestorRecord[] = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('eluria_investors') || '[]')
    : [];

  const newRecord: InvestorRecord = {
    id: `inv-${Date.now()}`,
    ...payload,
    pipelineStage: 'New Lead',
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem('eluria_investors', JSON.stringify([newRecord, ...existing]));
  }

  return newRecord;
}

export async function getInvestors(): Promise<InvestorRecord[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('investors')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data.map((item: InvestorRow) => ({
        id: item.id,
        fullName: item.full_name,
        company: item.company,
        email: item.email,
        phone: item.phone ?? undefined,
        investmentCapacity: item.investment_capacity ?? undefined,
        consentGiven: item.consent_given,
        pipelineStage: item.pipeline_stage,
        createdAt: item.created_at,
      }));
    }
  }

  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('eluria_investors') || '[]');
  }

  return [];
}

export async function registerInvestorApplication(payload: InvestorRegistration): Promise<'supabase' | 'local' | 'local-fallback'> {
  if (typeof window === 'undefined') throw new Error('Registration is only available in a browser.');

  const storageKey = 'eluria_investor_registrations';
  let existing: unknown[] = [];
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    if (Array.isArray(stored)) existing = stored;
  } catch {
    existing = [];
  }
  const record = { ...payload, submittedAt: new Date().toISOString() };
  localStorage.setItem(storageKey, JSON.stringify([record, ...existing]));

  if (!supabase) return 'local';

  try {
    const { error } = await supabase.from('investors').insert([{
      full_name: payload.fullName,
      company: payload.company,
      email: payload.email,
      phone: payload.phone || null,
      investment_capacity: payload.investmentCapacity,
      consent_given: payload.consentGiven,
      pipeline_stage: 'Access Requested',
    }]);
    return error ? 'local-fallback' : 'supabase';
  } catch {
    return 'local-fallback';
  }
}