export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  responsibilities?: string[];
  technologies: string[];
  status: "verified" | "placeholder";
}

export interface ExperienceContent {
  kicker: string;
  title: string;
  description: string;
  items: ExperienceItem[];
  status: "verified" | "placeholder";
  placeholderNotice?: string;
  placeholderText?: string;
}
