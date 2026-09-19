/**
 * Canonical English Standard CV Projects & Work
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf (Page 4)
 */
export interface CanonicalProjectItem {
  index: number;
  slug: string;
  officialTitle: string;
  officialDescription: string;
}

export const canonicalProjects: CanonicalProjectItem[] = [
  {
    index: 1,
    slug: "pump-station-analytics",
    officialTitle: "Pump Station Analytics",
    officialDescription: "Predictive maintenance for wastewater pumps.",
  },
  {
    index: 2,
    slug: "real-time-image-classification-api",
    officialTitle: "Real-Time Image Classification API",
    officialDescription:
      "Lightweight Flask service that accepts an image and returns the top three classes.",
  },
  {
    index: 3,
    slug: "real-time-object-detection",
    officialTitle: "Real-Time Object Detection",
    officialDescription: "Live Python/PyTorch + OpenCV pipeline.",
  },
  {
    index: 4,
    slug: "omnifood-landing-page",
    officialTitle: "OMNIFOOD — Responsive Landing Page",
    officialDescription:
      "Single-page layout with a hero section and anchor navigation.",
  },
  {
    index: 5,
    slug: "urbanmindos",
    officialTitle: "URBANMINDOS — Smart City Operating System",
    officialDescription: "Showcases autonomous aerial mobility.",
  },
  {
    index: 6,
    slug: "obstacle-avoidance",
    officialTitle: "Obstacle Avoidance",
    officialDescription:
      "Real-time monocular depth estimation with TensorFlow for detection and avoidance.",
  },
  {
    index: 7,
    slug: "ai-tic-tac-toe",
    officialTitle: "AI Tic-Tac-Toe",
    officialDescription:
      "Unbeatable Minimax AI with an interactive Pygame interface.",
  },
  {
    index: 8,
    slug: "pacman-pygame",
    officialTitle: "Pac-Man with PYGAME",
    officialDescription:
      "Version with animation, collision detection, ghost AI, and power-ups.",
  },
  {
    index: 9,
    slug: "text-summarizer",
    officialTitle: "Text Summarizer",
    officialDescription:
      "Desktop application for extractive summarization with adjustable output length.",
  },
  {
    index: 10,
    slug: "inventory-sales-manager",
    officialTitle: "Inventory & Sales Manager",
    officialDescription:
      "CRUD web application for electronics (laptops/phones/PS5).",
  },
  {
    index: 11,
    slug: "user-role-manager",
    officialTitle: "User & Role Manager",
    officialDescription:
      "Create/update users, reset passwords, and assign permissions (Oracle Forms 6i + PL/SQL).",
  },
  {
    index: 12,
    slug: "robocam-controller",
    officialTitle: "ROBOCAM CONTROLLER (FLUTTER + DART)",
    officialDescription:
      "Android application for controlling a camera-equipped robot via an on-screen joystick.",
  },
  {
    index: 13,
    slug: "student-evaluation-system",
    officialTitle: "Student Evaluation System",
    officialDescription:
      "Attendance and grades system with role-based access (Admin/Teacher/Student) — C# Desktop + PHP Web.",
  },
  {
    index: 14,
    slug: "cafe-pos-system",
    officialTitle: "Café POS System",
    officialDescription:
      "Login, CRUD items, sales, and reports (Java Swing + JDBC).",
  },
  {
    index: 15,
    slug: "mikrotik-hotspot-portal",
    officialTitle: "MIKROTIK Hotspot Portal",
    officialDescription:
      "Dual-WAN RouterOS setup with PPPoE links, a Hotspot portal, and RADIUS.",
  },
  {
    index: 16,
    slug: "arduino-traffic-light",
    officialTitle: "ARDUINO Traffic Light Controller",
    officialDescription:
      "Two-way intersection with safety protections and a pedestrian crossing button.",
  },
];

export const canonicalProjectsFooterNotice = {
  text: "Explore my future projects in programming, engineering, and graphic design on GITHUB",
  url: "https://github.com/a2sn2",
};
