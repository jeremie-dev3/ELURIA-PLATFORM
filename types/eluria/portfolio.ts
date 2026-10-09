export interface ProjectPortfolioItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  technicalInfo: string[];
  projectImage: string;
  status: string;
  relatedOpportunities: string[];
}
