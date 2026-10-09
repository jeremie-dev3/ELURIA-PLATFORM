export type OpportunityStatus = 'Seeking Investment' | 'Funding' | 'Under Review' | 'Closed';

export interface InvestmentOpportunity {
  id: string;
  slug: string;
  title: string;
  category: string;
  sector: string;
  location: string;
  investmentRange: string;
  minTicket: string;
  targetRaise: string;
  expectedReturns: string;
  shortDescription: string;
  overview: string;
  marketIndustry: string;
  status: OpportunityStatus;
  featuredImage: string;
  publicHighlights: string[];
  isConfidential: boolean;
  protectedDocCount: number;
}
