export interface ProjectItem {
  id: string;
  title: string;
  tagline?: string;
  badge?: string;
  problem: string;
  role: string;
  solution: string;
  technologies: string[];
  result: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "verified" | "placeholder";
}

export interface ProjectsContent {
  kicker: string;
  title: string;
  description: string;
  items: ProjectItem[];
  status: "verified" | "placeholder";
  placeholderNotice?: string;
  placeholderText?: string;
}
