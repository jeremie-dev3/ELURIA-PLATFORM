export interface InvestorLeadInput {
  fullName: string;
  email: string;
  company: string;
}

export interface InvestorLead extends InvestorLeadInput {
  id: string;
  pipelineStage: 'NDA Pending' | 'NDA Signed';
  consentGiven: boolean;
  ndaSigned?: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'eluria_investors';

export function loadInvestorLeads(): InvestorLead[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((record): record is Record<string, unknown> => typeof record === 'object' && record !== null && !Array.isArray(record))
      .map((record) => ({
        ...record,
        id: typeof record.id === 'string' ? record.id : `inv-${Date.now()}`,
        fullName: typeof record.fullName === 'string' ? record.fullName : typeof record.name === 'string' ? record.name : '',
        email: typeof record.email === 'string' ? record.email : '',
        company: typeof record.company === 'string' ? record.company : '',
        pipelineStage: record.pipelineStage === 'NDA Signed' || record.stage === 'NDA Signed' ? 'NDA Signed' : 'NDA Pending',
        consentGiven: record.consentGiven === true,
        createdAt: typeof record.createdAt === 'string' ? record.createdAt : new Date().toISOString(),
      }))
      .filter((record) => record.fullName && record.email) as InvestorLead[];
  } catch {
    return [];
  }
}

export function saveInvestorLead(
  newInvestor: InvestorLeadInput,
  options: { pipelineStage?: InvestorLead['pipelineStage']; ndaSigned?: boolean } = {},
): InvestorLead | undefined {
  if (typeof window === 'undefined') return undefined;

  const existing = loadInvestorLeads();
  const record: InvestorLead = {
    id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...newInvestor,
    pipelineStage: options.pipelineStage ?? 'NDA Pending',
    consentGiven: true,
    ...(options.ndaSigned ? { ndaSigned: true } : {}),
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing]));
  return record;
}