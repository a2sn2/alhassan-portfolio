import { ProjectsContent, ProjectItem, ProjectCategory } from "@/contracts";

export const projectItems: ProjectItem[] = [
  {
    id: "real-time-object-detection",
    slug: "real-time-object-detection",
    title: "Real-Time Object Detection",
    tagline: "Live Python/PyTorch + OpenCV pipeline.",
    category: "Computer Vision & AI",
    badge: "Vision Pipeline",
    problem: "Real-time object detection on a live video stream.",
    solution: "Python/PyTorch + OpenCV pipeline for live object detection.",
    technologies: ["Python", "PyTorch", "OpenCV"],
    result: "Live pipeline with real-time visual output.",
    githubUrl: "https://github.com/a2sn2",
    featured: true,
    presentationTier: "featured",
    evidenceDepth: "rich",
  },
  {
    id: "robocam-controller",
    slug: "robocam-controller",
    title: "ROBOCAM CONTROLLER (FLUTTER + DART)",
    tagline:
      "Android application for controlling a camera-equipped robot via an on-screen joystick.",
    category: "Systems & Robotics",
    badge: "Mobile & Robotics",
    technologies: ["Flutter", "Dart", "Android"],
    githubUrl: "https://github.com/a2sn2",
    featured: true,
    presentationTier: "featured",
    evidenceDepth: "basic",
  },
  {
    id: "pump-station-analytics",
    slug: "pump-station-analytics",
    title: "Pump Station Analytics",
    tagline: "Predictive maintenance for wastewater pumps.",
    category: "Systems & Robotics",
    badge: "Industrial Automation",
    technologies: ["Predictive Maintenance"],
    featured: true,
    presentationTier: "featured",
    evidenceDepth: "basic",
  },
  {
    id: "real-time-image-classification-api",
    slug: "real-time-image-classification-api",
    title: "Real-Time Image Classification API",
    tagline:
      "Lightweight Flask service that accepts an image and returns the top three classes.",
    category: "Computer Vision & AI",
    badge: "Microservice API",
    technologies: ["Python", "Flask", "API"],
    githubUrl: "https://github.com/a2sn2",
    featured: false,
    presentationTier: "core",
    evidenceDepth: "basic",
  },
  {
    id: "urbanmindos",
    slug: "urbanmindos",
    title: "URBANMINDOS — Smart City Operating System",
    tagline: "Showcases autonomous aerial mobility.",
    category: "Systems & Robotics",
    badge: "Concept Design",
    technologies: ["Concept Design", "Urban Air Mobility"],
    featured: false,
    presentationTier: "core",
    evidenceDepth: "basic",
  },
  {
    id: "mikrotik-hotspot-portal",
    slug: "mikrotik-hotspot-portal",
    title: "MIKROTIK Hotspot Portal",
    tagline:
      "Dual-WAN RouterOS setup with PPPoE links, a Hotspot portal, and RADIUS.",
    category: "Embedded & IoT",
    badge: "Network Engineering",
    technologies: ["MikroTik RouterOS", "Dual-WAN", "PPPoE", "Hotspot Portal", "RADIUS"],
    featured: false,
    presentationTier: "core",
    evidenceDepth: "basic",
  },
  {
    id: "arduino-traffic-light",
    slug: "arduino-traffic-light",
    title: "ARDUINO Traffic Light Controller",
    tagline:
      "Two-way intersection with safety protections and a pedestrian crossing button.",
    category: "Embedded & IoT",
    badge: "Embedded Systems",
    technologies: ["Arduino"],
    featured: false,
    presentationTier: "core",
    evidenceDepth: "basic",
  },
  {
    id: "obstacle-avoidance",
    slug: "obstacle-avoidance",
    title: "Obstacle Avoidance",
    tagline:
      "Real-time monocular depth estimation with TensorFlow for detection and avoidance.",
    category: "Computer Vision & AI",
    badge: "Robotics & AI",
    technologies: ["TensorFlow", "Depth Estimation"],
    featured: false,
    presentationTier: "core",
    evidenceDepth: "basic",
  },
  {
    id: "ai-tic-tac-toe",
    slug: "ai-tic-tac-toe",
    title: "AI Tic-Tac-Toe",
    tagline: "Unbeatable Minimax AI with an interactive Pygame interface.",
    category: "Computer Vision & AI",
    badge: "Game AI",
    technologies: ["Python", "Pygame", "Minimax AI"],
    featured: false,
    presentationTier: "archive",
    evidenceDepth: "basic",
  },
  {
    id: "pacman-pygame",
    slug: "pacman-pygame",
    title: "Pac-Man with PYGAME",
    tagline: "Version with animation, collision detection, ghost AI, and power-ups.",
    category: "Full-Stack & Web",
    badge: "Game Development",
    technologies: ["Python", "Pygame", "Collision Detection"],
    featured: false,
    presentationTier: "archive",
    evidenceDepth: "basic",
  },
  {
    id: "text-summarizer",
    slug: "text-summarizer",
    title: "Text Summarizer",
    tagline:
      "Desktop application for extractive summarization with adjustable output length.",
    category: "Computer Vision & AI",
    badge: "NLP Tool",
    technologies: ["Desktop Application", "Extractive Summarization"],
    featured: false,
    presentationTier: "archive",
    evidenceDepth: "basic",
  },
  {
    id: "user-role-manager",
    slug: "user-role-manager",
    title: "User & Role Manager",
    tagline:
      "Create/update users, reset passwords, and assign permissions (Oracle Forms 6i + PL/SQL).",
    category: "Full-Stack & Web",
    badge: "Enterprise Systems",
    technologies: ["Oracle Forms 6i", "PL/SQL"],
    featured: false,
    presentationTier: "archive",
    evidenceDepth: "basic",
  },
  {
    id: "inventory-sales-manager",
    slug: "inventory-sales-manager",
    title: "Inventory & Sales Manager",
    tagline: "CRUD web application for electronics (laptops/phones/PS5).",
    category: "Full-Stack & Web",
    badge: "Web Application",
    technologies: ["Web Application", "CRUD"],
    featured: false,
    presentationTier: "archive",
    evidenceDepth: "basic",
  },
  {
    id: "student-evaluation-system",
    slug: "student-evaluation-system",
    title: "Student Evaluation System",
    tagline:
      "Attendance and grades system with role-based access (Admin/Teacher/Student) — C# Desktop + PHP Web.",
    category: "Full-Stack & Web",
    badge: "Multi-Tier Application",
    technologies: ["C#", "Desktop", "PHP", "Web"],
    featured: false,
    presentationTier: "archive",
    evidenceDepth: "basic",
  },
  {
    id: "cafe-pos-system",
    slug: "cafe-pos-system",
    title: "Café POS System",
    tagline: "Login, CRUD items, sales, and reports (Java Swing + JDBC).",
    category: "Full-Stack & Web",
    badge: "Desktop Application",
    technologies: ["Java Swing", "JDBC"],
    featured: false,
    presentationTier: "archive",
    evidenceDepth: "basic",
  },
  {
    id: "omnifood-landing-page",
    slug: "omnifood-landing-page",
    title: "OMNIFOOD — Responsive Landing Page",
    tagline: "Single-page layout with a hero section and anchor navigation.",
    category: "Full-Stack & Web",
    badge: "Web Design",
    technologies: ["Responsive Web"],
    featured: false,
    presentationTier: "archive",
    evidenceDepth: "basic",
  },
];

export const projectCategories: ProjectCategory[] = [
  "All",
  "Computer Vision & AI",
  "Full-Stack & Web",
  "Systems & Robotics",
  "Embedded & IoT",
];

export const projectsContent: ProjectsContent = {
  kicker: "Works & Engineering Archive",
  title: "Projects Across Systems, Vision & Applications",
  description:
    "The official English CV project catalogue, enhanced with portfolio-specific hierarchy, filters, and case-study framing.",
  categories: projectCategories,
  items: projectItems,
};

export function getFeaturedProjects(): ProjectItem[] {
  return projectItems.filter((p) => p.presentationTier === "featured");
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projectItems.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectItems.map((p) => p.slug);
}
