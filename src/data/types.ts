export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  role: string;
  bioBrief: string;
  githubUsername: string;
  githubUrl: string;
  navItems: NavItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  problem: string;
  role: string;
  solution: string;
  technologies: string[];
  result: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "verified" | "placeholder";
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  status: "verified" | "placeholder";
}

export interface SkillCategory {
  category: string;
  skills: string[];
  status: "verified" | "placeholder";
}
