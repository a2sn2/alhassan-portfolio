import { ProjectsContent, ProjectItem, ProjectCategory } from "@/contracts";

export const projectItems: ProjectItem[] = [
  {
    id: "real-time-object-detection",
    slug: "real-time-object-detection",
    title: "Real-Time Object Detection",
    tagline:
      "Live camera stream object detection pipeline with real-time bounding box visualization.",
    category: "Computer Vision & AI",
    badge: "Graduation Project Basis",
    period: "2024 – 2025",
    problem:
      "Need for low-latency visual detection and tracking on standard computing hardware without heavy cloud dependency.",
    role: "Lead Developer & Researcher",
    solution:
      "Designed a multi-object detection pipeline utilizing Python, PyTorch, and OpenCV, processing live video inputs and overlaying class-labeled bounding boxes in real time.",
    technologies: ["Python", "PyTorch", "OpenCV", "Computer Vision", "Linux"],
    result:
      "Delivered accurate real-time bounding-box inference on streaming video feeds; served as the technical core of Twintech Computer Science graduation research.",
    architecture:
      "Video Stream Input → OpenCV Frame Preprocessing → Model Feature Extraction → Bounding Box Coordinate Mapping → Live Rendering Loop.",
    implementationHighlights: [
      "Optimized frame capture and color conversion pipelines to minimize latency on local Linux runtimes.",
      "Calibrated confidence thresholds to suppress false positives in varying ambient lighting conditions.",
      "Rendered dynamic bounding coordinates and class labels directly onto the display canvas.",
    ],
    githubUrl: "https://github.com/a2sn2",
    featured: true,
  },
  {
    id: "pump-station-analytics",
    slug: "pump-station-analytics",
    title: "Pump Station Analytics",
    tagline:
      "Predictive maintenance and anomaly monitoring system for municipal wastewater pumps.",
    category: "Systems & Robotics",
    badge: "Industrial Automation",
    period: "2024",
    problem:
      "Unexpected pump breakdowns caused sewage overflows and expensive emergency repairs in municipal utilities.",
    role: "Control & Analytics Engineer",
    solution:
      "Integrated field sensor telemetry (vibration, temperature, fluid levels) from PLC control panels into predictive analytical algorithms.",
    technologies: [
      "PLC",
      "Sensors",
      "Predictive Algorithms",
      "Control Systems",
      "Industrial Automation",
    ],
    result:
      "Provided early warnings for abnormal vibration and thermal drift, enabling proactive servicing before critical mechanical failure.",
    architecture:
      "Field Sensors (Vibration/Temp) → PLC Signal Processing → Analog-Digital Logging → Predictive Threshold Evaluation → Maintenance Alerts.",
    implementationHighlights: [
      "Mapped telemetry from industrial PLC panels at the Water & Sanitation Local Corporation.",
      "Established baseline operating bounds to detect thermal creep and mechanical vibration anomalies.",
      "Documented fault recovery procedures to safely resume automated pump cycles.",
    ],
    featured: true,
  },
  {
    id: "real-time-image-classification-api",
    slug: "real-time-image-classification-api",
    title: "Real-Time Image Classification API",
    tagline:
      "Lightweight Flask microservice serving top-3 predicted classes for uploaded images.",
    category: "Computer Vision & AI",
    badge: "Microservice API",
    period: "2025",
    problem:
      "Client applications required a fast, low-overhead microservice to classify arbitrary images without monolithic dependencies.",
    role: "Full-Stack & ML Engineer",
    solution:
      "Engineered a container-friendly Flask REST API backed by a pre-trained image classifier, returning structured JSON with confidence scores.",
    technologies: ["Python", "Flask", "REST API", "Machine Learning", "JSON"],
    result:
      "Sub-second inference responses with structured JSON output, easily integrated into web frontends and automated pipelines.",
    architecture:
      "HTTP POST Image Multipart → In-Memory Decoding → Model Tensor Transformation → Inference Evaluation → Top-K JSON Response.",
    implementationHighlights: [
      "Built non-blocking request endpoints capable of handling concurrent classification payloads.",
      "Standardized error handling for unsupported image formats or malformed request envelopes.",
      "Provided top-3 class probabilities and response execution timings in headers.",
    ],
    githubUrl: "https://github.com/a2sn2",
    featured: true,
  },
  {
    id: "robocam-controller",
    slug: "robocam-controller",
    title: "ROBOCAM Controller",
    tagline:
      "Cross-platform mobile application controlling a camera-equipped robot with live video and joystick.",
    category: "Systems & Robotics",
    badge: "Mobile & Robotics",
    period: "2024",
    problem:
      "Operating remote inspection hardware required an intuitive mobile control interface capable of low-latency video and directional telemetry.",
    role: "Mobile Developer",
    solution:
      "Built a Flutter/Dart Android application connecting to the robotic platform, displaying a real-time RTSP/HTTP video feed and on-screen directional joystick.",
    technologies: ["Flutter", "Dart", "Android", "Robotics", "Video Streaming"],
    result:
      "Smooth low-latency remote navigation with responsive directional controls and stable video telemetry.",
    architecture:
      "Robot Hardware Controller ↔ Wi-Fi Socket Connection ↔ Flutter App UI (Touch Joystick + Streaming Surface).",
    implementationHighlights: [
      "Implemented a low-latency touch joystick sending directional velocity commands over UDP/TCP sockets.",
      "Embedded an asynchronous video player widget receiving streaming frame buffers.",
      "Integrated emergency stop overrides and signal ping monitors.",
    ],
    githubUrl: "https://github.com/a2sn2",
    featured: true,
  },
  {
    id: "mikrotik-hotspot-portal",
    slug: "mikrotik-hotspot-portal",
    title: "MikroTik Hotspot Portal & Network Architecture",
    tagline:
      "Dual-WAN load balancing, captive hotspot portal, and RADIUS subscriber accounting.",
    category: "Systems & Robotics",
    badge: "Network Engineering",
    period: "2023 – 2024",
    problem:
      "High client density in institutional environments caused connection throttling, unequal bandwidth distribution, and unauthenticated access.",
    role: "Network Systems Engineer",
    solution:
      "Deployed MikroTik RouterOS with PCC dual-WAN load balancing, failover routing, customized captive portal, and RADIUS integration for session accounting.",
    technologies: [
      "MikroTik RouterOS",
      "Dual-WAN",
      "RADIUS",
      "PPPoE",
      "Network Security",
    ],
    result:
      "Achieved seamless multi-provider link failover, fair-share queue bandwidth allocation, and secure subscriber authentication.",
    architecture:
      "ISP Links 1 & 2 → MikroTik PCC Load Balancer → Hotspot Captive Gateway → RADIUS Auth Server → Managed Switch & AP Clusters.",
    implementationHighlights: [
      "Configured Per Connection Classifier (PCC) rules to evenly distribute sessions across diverse ISP uplinks.",
      "Designed an accessible branded captive login portal with session expiration timers.",
      "Implemented bandwidth throttling queues to prevent single-client network saturation.",
    ],
    featured: false,
  },
  {
    id: "obstacle-avoidance",
    slug: "obstacle-avoidance",
    title: "Monocular Depth Obstacle Avoidance",
    tagline:
      "Real-time monocular depth estimation for mobile robotic obstacle avoidance.",
    category: "Computer Vision & AI",
    badge: "Autonomous Navigation",
    period: "2024",
    problem:
      "Robotic navigation on limited budgets cannot always support expensive LiDAR arrays.",
    role: "Computer Vision Engineer",
    solution:
      "Implemented a TensorFlow-based monocular depth estimation pipeline in Python to generate dense depth maps from single camera streams.",
    technologies: [
      "TensorFlow",
      "Python",
      "Computer Vision",
      "Depth Estimation",
      "Robotics",
    ],
    result:
      "Generated reliable distance gradient matrices allowing mobile robots to identify near-field obstacles and execute detour maneuvers.",
    architecture:
      "Monocular Camera → Normalization Pipeline → Neural Depth Estimator → Disparity Map Segmentation → Steering Sector Decision.",
    implementationHighlights: [
      "Segmented image space into left, center, and right navigation sectors to evaluate clear paths.",
      "Optimized inference batch size to maintain interactive loop speeds on CPU/GPU runtimes.",
    ],
    githubUrl: "https://github.com/a2sn2",
    featured: false,
  },
  {
    id: "arduino-traffic-light",
    slug: "arduino-traffic-light",
    title: "Arduino Traffic Light Controller",
    tagline:
      "Two-way intersection controller with safety interlocks and pedestrian priority.",
    category: "Embedded & IoT",
    badge: "Embedded Logic",
    period: "2024",
    problem:
      "Simulating reliable traffic intersection control requires robust state-machine logic and hardware fail-safes.",
    role: "Embedded Systems Developer",
    solution:
      "Programmed an Arduino microcontroller in C/C++ implementing non-blocking state-machine timing, pedestrian interrupt buttons, and transition states.",
    technologies: [
      "Arduino",
      "C/C++",
      "Embedded Systems",
      "Hardware Logic",
      "State Machines",
    ],
    result:
      "Zero-conflict phase switching with verified pedestrian crossing priority and debounced hardware interrupts.",
    architecture:
      "Hardware Buttons / Sensors → Debounce Interrupters → Finite State Machine Engine → Relay / LED Signal Drivers.",
    implementationHighlights: [
      "Built non-blocking timer loops (`millis()`) avoiding thread starvation or missed pedestrian inputs.",
      "Enforced hardware mutual-exclusion interlocks to prevent hazardous dual-green conditions.",
    ],
    featured: false,
  },
  {
    id: "student-evaluation-system",
    slug: "student-evaluation-system",
    title: "Student Evaluation & Portal System",
    tagline:
      "Multi-tier desktop and web system for academic attendance, grading, and role permissions.",
    category: "Full-Stack & Web",
    badge: "Multi-Tier System",
    period: "2023",
    problem:
      "Educational institutions struggled with fragmented paper records for attendance, grading, and parent communications.",
    role: "Full-Stack Developer",
    solution:
      "Engineered a unified architecture combining a C# desktop management suite with a PHP/MySQL web portal, implementing role-based access for Admins, Teachers, and Students.",
    technologies: ["C#", ".NET", "PHP", "MySQL", "Desktop & Web"],
    result:
      "Consolidated grade-book calculation, automated attendance reporting, and secure parental grade inquiries.",
    architecture:
      "Relational MySQL Core ↔ C# Desktop Client (Administrative) + PHP Web Portal (Teachers & Parents).",
    implementationHighlights: [
      "Configured fine-grained role-based permissions preventing unauthorized grade alterations.",
      "Implemented parameterized SQL queries to safeguard academic transcripts against injection vulnerabilities.",
    ],
    featured: false,
  },
  {
    id: "cafe-pos-system",
    slug: "cafe-pos-system",
    title: "Café Point of Sale System",
    tagline:
      "Point-of-sale desktop application handling order catalogs, receipts, and daily sales auditing.",
    category: "Systems & Robotics",
    badge: "Desktop Application",
    period: "2023",
    problem:
      "Local hospitality venues required a fast, offline-capable POS solution to manage order queues and cash reconciliations.",
    role: "Software Developer",
    solution:
      "Developed a Java Swing desktop application connected via JDBC to a relational SQL database, featuring custom item tables, receipt generation, and daily ledger summaries.",
    technologies: ["Java Swing", "JDBC", "SQL", "Desktop UI", "Accounting Reports"],
    result:
      "Streamlined table ordering, real-time cashier balancing, and printable order summaries.",
    architecture:
      "Java Swing GUI Event Dispatch Thread → Service Controller → JDBC Driver → Local SQL Database Engine.",
    implementationHighlights: [
      "Constructed custom table models for rapid touch/keyboard product entry.",
      "Generated formatted daily audit summaries calculating revenue, taxes, and operator totals.",
    ],
    featured: false,
  },
  {
    id: "user-role-manager",
    slug: "user-role-manager",
    title: "Enterprise User & Role Manager",
    tagline:
      "Granular administrative security portal for user provisioning and permission matrices.",
    category: "Full-Stack & Web",
    badge: "Enterprise Security",
    period: "2023",
    problem:
      "Enterprise database operations required strict administrative governance over operator access rights and credential resets.",
    role: "Database & Applications Developer",
    solution:
      "Implemented an administrative interface using Oracle Forms 6i and PL/SQL procedures to manage user creation, credential resets, and permission groups.",
    technologies: [
      "Oracle Forms 6i",
      "PL/SQL",
      "Oracle Database",
      "Access Control",
    ],
    result:
      "Enforced least-privilege security policies across departmental database operations.",
    architecture:
      "Oracle Forms 6i Client Interface → PL/SQL Stored Packages → Oracle Relational Security Tables.",
    implementationHighlights: [
      "Structured transactional commit triggers to maintain referential integrity during privilege changes.",
      "Audited administrative activities through database triggers writing to tamper-evident logs.",
    ],
    featured: false,
  },
  {
    id: "inventory-sales-manager",
    slug: "inventory-sales-manager",
    title: "Inventory & Sales Operations Manager",
    tagline:
      "Web application managing stock movements and sales for consumer electronics.",
    category: "Full-Stack & Web",
    badge: "Operations Tool",
    period: "2024",
    problem:
      "Retailers faced inventory shrinkage and pricing errors across consumer tech hardware (Laptops, Mobile Phones, Gaming Consoles).",
    role: "Web Developer",
    solution:
      "Built a responsive CRUD inventory application with real-time stock-level warnings, serial-number indexing, and customer sales order generation.",
    technologies: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Relational Database",
      "CRUD",
    ],
    result:
      "Eliminated double-booking of stock and provided instant visibility into top-selling inventory categories.",
    architecture:
      "Client Web UI → API Service Layer → Transactional Database Ledger.",
    implementationHighlights: [
      "Calculated dynamic inventory thresholds alerting managers when critical stock dropped below reorder levels.",
      "Rendered searchable transaction histories filterable by product category or timestamp.",
    ],
    featured: false,
  },
  {
    id: "text-summarizer",
    slug: "text-summarizer",
    title: "Extractive Text Summarizer",
    tagline:
      "Desktop tool for extractive document summarization with configurable compression ratios.",
    category: "Computer Vision & AI",
    badge: "NLP Tool",
    period: "2024",
    problem:
      "Reviewing lengthy academic and technical reports consumed excessive time during literature reviews.",
    role: "Python Developer",
    solution:
      "Developed a Python application parsing text documents, scoring sentence significance using frequency matrices, and generating concise extractive summaries.",
    technologies: ["Python", "NLP", "Text Processing", "Algorithms"],
    result:
      "Reduced document review time while preserving essential core arguments and factual assertions.",
    architecture:
      "Raw Text Ingestion → Sentence Tokenization → Stop-word Filtering → Frequency Weight Matrix → Top Ranked Sentences.",
    implementationHighlights: [
      "Supported flexible summary ratio thresholds adjusted dynamically by the user.",
      "Processed multiple plain text document encodings without data loss.",
    ],
    githubUrl: "https://github.com/a2sn2",
    featured: false,
  },
  {
    id: "ai-tic-tac-toe",
    slug: "ai-tic-tac-toe",
    title: "AI Tic-Tac-Toe with Minimax",
    tagline:
      "Unbeatable game agent implementing Minimax decision tree search.",
    category: "Computer Vision & AI",
    badge: "Algorithm Study",
    period: "2023",
    problem:
      "Demonstrating deterministic algorithmic decision making and game tree evaluation in interactive environments.",
    role: "Algorithm Developer",
    solution:
      "Implemented the Minimax recursive search algorithm with terminal state evaluation in Python, paired with an interactive Pygame graphical board.",
    technologies: [
      "Python",
      "Pygame",
      "Minimax Algorithm",
      "Game Theory",
      "Data Structures",
    ],
    result:
      "Achieved mathematically unbeatable gameplay performance with instantaneous move evaluation.",
    architecture:
      "Game State Array → Recursive Minimax Tree Exploration → Value Maximization/Minimization → Best Move Execution.",
    implementationHighlights: [
      "Exhaustive branch evaluation ensuring optimal counter-moves across all possible board configurations.",
      "Clean Pygame rendering with event loop listeners for smooth mouse click interactions.",
    ],
    githubUrl: "https://github.com/a2sn2",
    featured: false,
  },
  {
    id: "pacman-pygame",
    slug: "pacman-pygame",
    title: "Pac-Man Arcade Engine",
    tagline:
      "2D arcade game recreation featuring ghost pathfinding AI and collision physics.",
    category: "Systems & Robotics",
    badge: "Game Engine",
    period: "2023",
    problem:
      "Understanding frame-rate-independent game loops, sprite state transitions, and real-time tile collision detection.",
    role: "Game Engine Developer",
    solution:
      "Built a complete 2D arcade loop in Python using Pygame, incorporating BFS maze pathfinding for ghost entities, audio triggers, and score tracking.",
    technologies: [
      "Python",
      "Pygame",
      "Pathfinding Algorithms",
      "State Machines",
      "Game Physics",
    ],
    result:
      "Faithful arcade simulation with smooth 60fps rendering and dynamic ghost AI difficulty curves.",
    architecture:
      "Main Pygame Loop (Tick Rate Control) → Input Parser → Tile Collision Engine → Ghost AI Pathfinding → Blit Renderer.",
    implementationHighlights: [
      "Mapped grid collision matrices to prevent entity wall pass-through.",
      "Implemented state changes between chase, scatter, and frightened ghost behaviors.",
    ],
    githubUrl: "https://github.com/a2sn2",
    featured: false,
  },
  {
    id: "omnifood-landing-page",
    slug: "omnifood-landing-page",
    title: "Omnifood Restaurant Platform",
    tagline:
      "Responsive marketing landing page with structured anchor navigation and dynamic hero.",
    category: "Full-Stack & Web",
    badge: "Frontend Experience",
    period: "2022",
    problem:
      "Need for an accessible, performance-oriented marketing interface with crisp visual hierarchy and responsive mobile layouts.",
    role: "Frontend Developer",
    solution:
      "Coded a semantic, accessible web interface adhering to modern responsive layout techniques, flexbox/grid compositions, and zero external framework overhead.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "Web Accessibility",
    ],
    result:
      "Fast loading times, responsive fluid scaling across mobile and desktop devices, and clean semantic markup.",
    architecture:
      "Semantic HTML5 DOM → Pure CSS Responsive Grid/Flexbox Layout → Accessible Interactive Event Handlers.",
    implementationHighlights: [
      "Engineered mobile responsive drawer navigation without heavy external UI dependencies.",
      "Optimized hero asset delivery and typographic scales for diverse viewport densities.",
    ],
    githubUrl: "https://github.com/a2sn2",
    featured: false,
  },
  {
    id: "urbanmindos",
    slug: "urbanmindos",
    title: "URBANMINDOS Smart City Concept",
    tagline:
      "Autonomous urban mobility coordination interface and system architecture concept.",
    category: "Systems & Robotics",
    badge: "Concept & Architecture",
    period: "2024",
    problem:
      "Coordinating autonomous urban transport nodes requires unified geospatial telemetry and real-time scheduling concepts.",
    role: "Systems Architect & Concept Designer",
    solution:
      "Formulated the architectural blueprint and interactive control UI prototype for an urban mobility operating system tracking autonomous air and ground nodes.",
    technologies: [
      "Systems Architecture",
      "Concept UI",
      "Telemetry Design",
      "Urban Systems",
    ],
    result:
      "Conceptualized modular distributed fleet dispatch protocols and intuitive airspace sector visualization.",
    architecture:
      "Geospatial Telemetry Mesh → Airspace Routing Engine → Central Dispatch Controller → Interactive Visualization Surface.",
    implementationHighlights: [
      "Structured multi-altitude flight corridor concepts for urban drone deliveries.",
      "Prototyped high-contrast operator UI panels displaying active sector densities.",
    ],
    featured: false,
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
  kicker: "Selected Work & Engineering Systems",
  title: "Engineering Projects & Technical Case Studies",
  description:
    "An exploration of software systems, computer vision pipelines, automation workflows, and full-stack applications built and deployed across academic and professional initiatives.",
  categories: projectCategories,
  items: projectItems,
};

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projectItems.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectItem[] {
  return projectItems.filter((p) => p.featured);
}

export function getAllProjectSlugs(): string[] {
  return projectItems.map((p) => p.slug);
}
