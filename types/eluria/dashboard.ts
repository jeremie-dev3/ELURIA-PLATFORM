export interface DashboardMetric {
  label: string;
  value: number;
  change: string;
  trend: 'up' | 'down';
  note: string;
  icon: 'investors' | 'nda' | 'meetings' | 'opportunities';
}

export interface PipelineStage {
  id: string;
  label: string;
  count: number;
  color: string;
}

export interface OpportunityInterest {
  name: string;
  interest: number;
}

export interface InvestorActivityEvent {
  id: string;
  firm: string;
  action: string;
  target: string;
  occurredAt: string;
}