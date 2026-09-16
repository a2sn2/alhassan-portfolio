export type ProjectCategory =
  | "All"
  | "Computer Vision & AI"
  | "Full-Stack & Web"
  | "Systems & Robotics"
  | "Embedded & IoT";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Computer Vision & AI" | "Full-Stack & Web" | "Systems & Robotics" | "Embedded & IoT";
  badge?: string;
  period?: string;
  role?: string;
  problem?: string;
  solution?: string;
  technologies: string[];
  result?: string;
  architecture?: string;
  implementationHighlights?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  presentationTier?: "featured" | "core" | "archive";
  evidenceDepth?: "rich" | "basic" | "minimal";
}

export type PresentationTier = "featured" | "core" | "archive";

export interface ProjectsContent {
  kicker: string;
  title: string;
  description: string;
  categories: ProjectCategory[];
  items: ProjectItem[];
}
