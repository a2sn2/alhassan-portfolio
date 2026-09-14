import { ProjectsContent, ProjectItem, ProjectCategory } from "@/contracts";

export const projectItems: ProjectItem[] = [
  {
    id: "real-time-object-detection",
    slug: "real-time-object-detection",
    title: "Real-Time Object Detection",
    tagline:
      "Live Python/PyTorch + OpenCV pipeline implemented on a live camera feed with real-time visualization of results.",
    category: "Computer Vision & AI",
    badge: "Graduation Project",
    period: "2024 – 2025",
    role: "Lead Developer & Researcher",
    problem:
      "Need for real-time visual tracking and object identification directly on local Linux systems from a live camera feed.",
    solution:
      "Engineered an object-tracking algorithm on Linux using Python, PyTorch, and OpenCV, processing live camera input and providing real-time visual feedback.",
    technologies: ["Python", "PyTorch", "OpenCV", "Linux", "Computer Vision"],
    result:
      "Successfully deployed on Linux with live video visualization; served as B.Sc. Computer Science graduation project with full documentation and repository.",
    githubUrl: "https://github.com/a2sn2",
    featured: true,
    evidenceDepth: "rich",
  },
  {
    id: "pump-station-analytics",
    slug: "pump-station-analytics",
    title: "Pump Station Analytics",
    tagline:
      "Predictive maintenance system for municipal wastewater pumps.",
    category: "Systems & Robotics",
    badge: "Industrial Automation",
    technologies: ["PLC", "Sensors", "Predictive Maintenance", "Industrial Control"],
    featured: true,
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
    technologies: ["Python", "Flask", "REST API", "Machine Learning"],
    githubUrl: "https://github.com/a2sn2",
    featured: true,
    evidenceDepth: "basic",
  },
  {
    id: "robocam-controller",
    slug: "robocam-controller",
    title: "ROBOCAM Controller",
    tagline:
      "Android application for controlling a camera-equipped robot via an on-screen joystick.",
    category: "Systems & Robotics",
    badge: "Mobile & Robotics",
    technologies: ["Flutter", "Dart", "Android", "Robot Control"],
    githubUrl: "https://github.com/a2sn2",
    featured: true,
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
    featured: true,
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
    technologies: ["Arduino", "Embedded C/C++", "Hardware Logic", "Sensors"],
    featured: false,
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
    technologies: ["TensorFlow", "Python", "Depth Estimation", "Obstacle Avoidance"],
    featured: false,
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
    technologies: ["Python", "Pygame", "Minimax Algorithm", "Game AI"],
    featured: false,
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
    technologies: ["Python", "Pygame", "Game AI", "Collision Detection"],
    featured: false,
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
    technologies: ["Python", "NLP", "Desktop Application"],
    featured: false,
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
    technologies: ["Oracle Forms 6i", "PL/SQL", "Oracle Database", "Access Control"],
    featured: false,
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
    technologies: ["Web Development", "CRUD", "Databases", "Inventory Management"],
    featured: false,
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
    technologies: ["C#", "Desktop (.NET)", "PHP", "Web", "Role-Based Access"],
    featured: false,
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
    technologies: ["Java Swing", "JDBC", "SQL", "Point of Sale"],
    featured: false,
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
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    featured: false,
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
    technologies: ["Systems Architecture", "Concept Design", "Urban Air Mobility"],
    featured: false,
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
    "An exploration of software systems, computer vision pipelines, automation workflows, and applications built across academic and professional initiatives.",
  categories: projectCategories,
  items: projectItems,
};

export function getFeaturedProjects(): ProjectItem[] {
  return projectItems.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projectItems.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectItems.map((p) => p.slug);
}
