import { ProjectsContent } from "@/contracts/projects";

export const projectsContent = {
  kicker: "03 / Case Studies",
  title: "Featured Projects",
  description: "In-depth analysis of engineering challenges, architectural solutions, and measured outcomes.",
  items: [
    {
      id: "case-study-schema",
      title: "Case Study Structural Schema",
      tagline: "Engineering Case Study Blueprint",
      badge: "Schema Blueprint",
      problem: "The core real-world technical constraint, bottleneck, or opportunity being addressed.",
      role: "Individual engineering responsibility, architectural leadership, and scope.",
      solution: "Specific system design, algorithms, protocols, or UI architecture implemented.",
      technologies: ["TypeScript", "Next.js", "CSS Architecture", "Systems Design"],
      result: "Empirical metrics, verified performance impact, stability improvements, or user outcomes.",
      status: "placeholder",
    },
  ],
  status: "placeholder",
  placeholderNotice: "[Section Architecture: Awaiting Verified Project Data]",
  placeholderText:
    "Production case study cards will be populated using verified project data, repository links, and live demos without inventing facts.",
} satisfies ProjectsContent;
