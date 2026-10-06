import type {
  DashboardMetric,
  InvestorActivityEvent,
  OpportunityInterest,
  PipelineStage,
} from '../../types/eluria/dashboard';

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Total Investors', value: 128, change: '+12.8%', trend: 'up', note: 'vs. last month', icon: 'investors' },
  { label: 'NDAs Signed', value: 67, change: '+8.2%', trend: 'up', note: 'vs. last month', icon: 'nda' },
  { label: 'Meetings Booked', value: 23, change: '+4.5%', trend: 'up', note: 'vs. last month', icon: 'meetings' },
  { label: 'Active Opportunities', value: 12, change: '-2.1%', trend: 'down', note: 'vs. last month', icon: 'opportunities' },
];

export const investorPipeline: PipelineStage[] = [
  { id: 'investors', label: 'New Enquiries', count: 128, color: 'bg-brand-navy' },
  { id: 'nda-stage', label: 'NDA Signed', count: 67, color: 'bg-brand-gold' },
  { id: 'meeting-stage', label: 'Meeting Booked', count: 23, color: 'bg-brand-navy/80' },
  { id: 'qualified', label: 'Qualified', count: 15, color: 'bg-brand-gold/85' },
  { id: 'proposal', label: 'Proposal Sent', count: 8, color: 'bg-brand-navy/65' },
  { id: 'negotiation', label: 'Negotiation', count: 4, color: 'bg-brand-gold/70' },
  { id: 'closed', label: 'Investment Closed', count: 2, color: 'bg-brand-navy/45' },
];

export const topOpportunities: OpportunityInterest[] = [
  { name: 'Waste Water Treatment Plant', interest: 45 },
  { name: 'Renewable Energy Project', interest: 32 },
  { name: 'Water Treatment Facility', interest: 18 },
  { name: 'Industrial Processing Plant', interest: 12 },
];

export const investorActivity: InvestorActivityEvent[] = [
  {
    id: 'activity-1',
    firm: 'GreenFuture Capital',
    action: 'Viewed',
    target: 'Waste Water Treatment Plant',
    occurredAt: '2h ago',
  },
];