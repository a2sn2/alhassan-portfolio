export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  isCurrent?: boolean;
}

export interface ExperienceContent {
  kicker: string;
  title: string;
  description: string;
  items: ExperienceItem[];
}
