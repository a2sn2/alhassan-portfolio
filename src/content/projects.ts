import { ProjectsContent, ProjectItem, ProjectCategory } from "@/contracts";
import { attachProjectEvidence } from "./evidence";

const rawProjectItems: ProjectItem[] = [
  {
    id: "foundationkit-dotnet",
    slug: "foundationkit-dotnet",
    title: "FoundationKit — .NET Full-Stack System Foundation",
    tagline:
      "Composable .NET 10 developer platform with 17 reusable packages, deterministic Composer generation, Project Studio, and an executable Workbench host.",
    category: "Full-Stack & Web",
    badge: "Developer Platform",
    period: "2026",
    problem:
      "Repeatedly assembling enterprise full-stack .NET foundations, platform capabilities, transport contracts, data access, frontend wiring, and generated project structure while keeping the generated source code inspectable, reproducible, and consumer-owned.",
    solution:
      "FoundationKit provides a composable .NET 10 system-building foundation combining reusable Core platform packages, deterministic schema-driven Composer generation, Project Studio visual composition, Workbench runtime reference host, SQL-first read models, OpenAPI-driven transport, strongly-typed clients, and generated Blazor applications.",
    architecture:
      "Project Studio / Composer → Domain → Application → Infrastructure → Web API / SQL Server → Runtime OpenAPI → Postman + Typed C# Client → Blazor WebAssembly",
    implementationHighlights: [
      "17 reusable NuGet packages + symbol packages covering cross-cutting platform abstractions and infrastructure",
      "Schema-driven deterministic Composer code generation (schema-v1/schema-v2) producing inspectable, consumer-owned Clean Architecture layers",
      "Project Studio visual composition workspace enabling interactive preview-before-write generation workflows",
      "Executable Workbench reference host validating end-to-end integration across Web API, EF Core, and SQL Server persistence",
      "Runtime OpenAPI transport contracts powering automated Postman collection sync and strongly-typed C# client generation",
      "Automated architecture rule gates, CodeQL security scanning, and multi-stage generation proof verification workflows",
    ],
    technologies: [
      ".NET 10",
      "C#",
      "ASP.NET Core",
      "Blazor WebAssembly",
      "Entity Framework Core",
      "SQL Server",
      "OpenAPI",
      "xUnit",
    ],
    result:
      "Consumer-ready Core baseline — Pre-production. Delivers 17 reusable NuGet packages, deterministic project generation, interactive Project Studio, executable Workbench testbed, and a complete inspectable full-stack application path.",
    featured: true,
    presentationTier: "featured",
    evidenceDepth: "rich",
  },
  {
    id: "real-time-object-detection",
    slug: "real-time-object-detection",
    title: "Real-Time Object Detection",
    tagline:
      "Live Python/PyTorch + OpenCV pipeline.",
    category: "Computer Vision & AI",
    badge: "Vision Pipeline",
    problem:
      "Real-time object detection on a live video stream.",
    solution:
      "Python/PyTorch + OpenCV pipeline for live object detection.",
    technologies: ["Python", "PyTorch", "OpenCV"],
    result:
      "Live pipeline with real-time visual output.",
    featured: true,
    presentationTier: "featured",
    evidenceDepth: "rich",
  },
  {
    id: "robocam-controller",
    slug: "robocam-controller",
    title: "ROBOCAM Controller",
    tagline:
      "Android application for controlling a camera-equipped robot via an on-screen joystick.",
    category: "Systems & Robotics",
    badge: "Mobile & Robotics",
    technologies: ["Flutter", "Dart", "Android"],
    featured: true,
    presentationTier: "featured",
    evidenceDepth: "basic",
  },
  {
    id: "pump-station-analytics",
    slug: "pump-station-analytics",
    title: "Pump Station Analytics",
    tagline:
      "Predictive maintenance for wastewater pumps.",
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
    featured: false,
    presentationTier: "core",
    evidenceDepth: "basic",
  },
  {
    id: "urbanmindos",
    slug: "urbanmindos",
    title: "URBANMINDOS — Smart City Operating System",
    tagline:
      "Smart-city concept showcasing autonomous urban air mobility coordination.",
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
    title: "MikroTik Hotspot Portal",
    tagline:
      "Dual-WAN RouterOS setup with PPPoE links, a Hotspot portal, and RADIUS integration.",
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
    title: "Arduino Traffic Light Controller",
    tagline:
      "Two-way intersection controller with safety protections and a pedestrian crossing button.",
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
    tagline:
      "Unbeatable Minimax AI with an interactive Pygame interface.",
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
    title: "Pac-Man with Pygame",
    tagline:
      "Game recreation featuring animation, collision detection, ghost AI, and power-ups.",
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
      "Desktop application for extractive document summarization with adjustable output length.",
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
      "Create and update users, reset passwords, and assign permissions using Oracle Forms 6i and PL/SQL.",
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
    tagline:
      "CRUD web application for consumer electronics retail (Laptops, Phones, PS5).",
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
      "Attendance and grades system with role-based access (Admin/Teacher/Student) using C# Desktop and PHP Web.",
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
    tagline:
      "Point-of-sale desktop system with login, CRUD items, sales, and reports using Java Swing and JDBC.",
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
    tagline:
      "Single-page responsive website layout with a hero section and anchor navigation.",
    category: "Full-Stack & Web",
    badge: "Web Design",
    technologies: ["Responsive Web"],
    featured: false,
    presentationTier: "archive",
    evidenceDepth: "basic",
  },
];

export const projectItems: ProjectItem[] = rawProjectItems.map(attachProjectEvidence);

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
    "An exploration of software systems, computer vision pipelines, automation workflows, and applications built across academic and professional initiatives.",
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
