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
  /**
   * Presentation tier defining the display hierarchy across the portfolio:
   * - 'featured': Selected Work showcase (flagship & primary selected systems)
   * - 'core': Core Engineering scan-friendly panels
   * - 'archive': Technical catalogue & foundation work index
   */
  presentationTier: PresentationTier;
  /**
   * @deprecated Single source of truth is `presentationTier === 'featured'`. Retained for external interface compatibility.
   */
  featured: boolean;
  evidenceDepth?: "rich" | "basic" | "minimal";
  repository?: import("./evidence").ProjectRepository;
  evidence?: import("./evidence").EvidenceReference[];
}

export type PresentationTier = "featured" | "core" | "archive";

export interface ProjectsContent {
  kicker: string;
  title: string;
  description: string;
  categories: ProjectCategory[];
  items: ProjectItem[];
}
