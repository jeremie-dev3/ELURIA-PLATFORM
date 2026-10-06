export type ProjectStatus = 'Seeking Investment' | 'Funded' | 'Upcoming';

export interface ProjectOpportunity {
  id: string;
  title: string;
  sector: string;
  summary: string;
  minimumInvestment: string;
  targetRaise: string;
  expectedReturns: string;
  durationMonths: number;
  imageUrl: string;
  status: ProjectStatus;
  isConfidential: boolean;
}