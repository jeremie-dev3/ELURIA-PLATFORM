export type InvestorType = 'Institutional' | 'Family Office' | 'Private Equity' | 'Angel' | 'High Net Worth';
export type InvestorCapacity = 'Under $100K' | '$100K - $500K' | '$500K - $2M' | '$2M+';

export interface InvestorRegistration {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  investorType: InvestorType;
  industry: string;
  investmentInterests: string[];
  investmentCapacity: InvestorCapacity;
  preferredSectors: string[];
  message: string;
  consentGiven: boolean;
  ndaRequested?: boolean;
}
