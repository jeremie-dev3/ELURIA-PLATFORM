export interface ServiceCategory {
  title: string;
  description: string;
  slug: string;
  iconName: 'Wrench' | 'Leaf' | 'FlaskConical' | 'Droplet' | 'HeartPulse' | 'ShieldCheck' | 'Recycle' | 'CalendarDays';
  keyCapabilities: string[];
  relevantProjects: string[];
  ctaLabel: 'Discuss Your Project';
}
