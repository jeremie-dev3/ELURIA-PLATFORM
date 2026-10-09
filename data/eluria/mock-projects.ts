import { ProjectOpportunity } from '../../types/eluria/project';


export const ELURIA_PROJECTS: ProjectOpportunity[] = [
  {
    id: 'project-water-treatment',
    title: 'Agape Water Treatment Facility',
    sector: 'Infrastructure & Utilities',
    summary: 'Comprehensive industrial and commercial water purification and distribution system.',
    minimumInvestment: '$100,000',
    targetRaise: '$2.5M',
    expectedReturns: '18% IRR',
    durationMonths: 36,
    imageUrl: '/media/water-treatment/20260509_132922%202.jpg',
    status: 'Seeking Investment',
    isConfidential: true,
  },
  {
    id: 'project-grain-economy',
    title: 'CE Grains Commercial Infrastructure',
    sector: 'Agribusiness & Processing',
    summary: 'Large-scale commercial grain storage, value-addition, and regional distribution hub.',
    minimumInvestment: '$75,000',
    targetRaise: '$1.8M',
    expectedReturns: '21% IRR',
    durationMonths: 24,
    imageUrl: '/media/water-treatment/20260509_132927%201%20(1).jpg',
    status: 'Seeking Investment',
    isConfidential: true,
  }
];