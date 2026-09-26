import {
  ProjectEvidenceMeta,
  CredentialEvidenceMeta,
  ProjectRepository,
  EvidenceReference,
} from "@/contracts";

export const PORTFOLIO_REPO_BASE = "https://github.com/a2sn2/alhassan-portfolio";
export const PORTFOLIO_TREE_BASE = `${PORTFOLIO_REPO_BASE}/tree/main/docs/evidence`;
export const PORTFOLIO_BLOB_BASE = `${PORTFOLIO_REPO_BASE}/blob/main/docs/evidence`;

/**
 * Shared, canonical evidence metadata for all 16 projects.
 * Consumed identically across English, Arabic, and German content layers
 * to guarantee zero translation drift on technical facts and repository links.
 */
export const projectEvidenceMap: Record<string, ProjectEvidenceMeta> = {
  "real-time-object-detection": {
    slug: "real-time-object-detection",
    status: "verified",
    sourceKind: "repository",
    repository: {
      url: "https://github.com/a2sn2/yolo-object-detection",
      repositoryName: "a2sn2 / yolo-object-detection",
      source: "standalone",
    },
    secondaryRepoUrl: "https://github.com/a2sn2/GraduationProject",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/real-time-object-detection`,
    technologiesConfirmed: ["Python", "PyTorch", "OpenCV", "YOLO", "Jupyter Notebook"],
    notes: "Primary source code in dedicated GitHub repository. Supporting academic defense archive in GraduationProject.",
  },
  "robocam-controller": {
    slug: "robocam-controller",
    status: "verified",
    sourceKind: "source-archive",
    repository: {
      url: `${PORTFOLIO_TREE_BASE}/projects/robocam-controller`,
      repositoryName: "alhassan-portfolio / docs / evidence / robocam-controller",
      source: "portfolio-archive",
    },
    archivePath: "docs/evidence/projects/robocam-controller/source",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/robocam-controller`,
    technologiesConfirmed: ["Flutter", "Dart", "Android"],
    notes: "Clean Flutter/Dart mobile client archive featuring joystick rover navigation, RTSP/HTTP camera stream, and gallery.",
  },
  "pump-station-analytics": {
    slug: "pump-station-analytics",
    status: "verified",
    sourceKind: "repository",
    repository: {
      url: "https://github.com/a2sn2/pump_DA_Batch2",
      repositoryName: "a2sn2 / pump_DA_Batch2",
      source: "standalone",
    },
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/pump-station-analytics`,
    technologiesConfirmed: ["Python", "Pandas", "Scikit-Learn", "Jupyter Notebook", "Predictive Maintenance"],
    notes: "Dedicated GitHub repository containing wastewater pump station telemetry dataset and predictive maintenance notebook.",
  },
  "real-time-image-classification-api": {
    slug: "real-time-image-classification-api",
    status: "verified",
    sourceKind: "repository",
    repository: {
      url: "https://github.com/a2sn2/ImageClassify_ML_Batch1",
      repositoryName: "a2sn2 / ImageClassify_ML_Batch1",
      source: "standalone",
    },
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/real-time-image-classification-api`,
    technologiesConfirmed: ["Python", "Flask", "EfficientNetB0", "ImageNet", "REST API"],
    notes: "Dedicated GitHub repository implementing Flask microservice for real-time top-3 ImageNet classification.",
  },
  "urbanmindos": {
    slug: "urbanmindos",
    status: "verified",
    sourceKind: "repository",
    repository: {
      url: "https://github.com/a2sn2/UrbanMindOS",
      repositoryName: "a2sn2 / UrbanMindOS",
      source: "standalone",
    },
    archivePath: "docs/evidence/projects/urbanmindos/source",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/urbanmindos`,
    technologiesConfirmed: ["HTML5", "CSS3", "JavaScript", "Concept Design"],
    notes: "Dedicated GitHub repository and verified local snapshot of smart-city urban air mobility operating system concept.",
  },
  "mikrotik-hotspot-portal": {
    slug: "mikrotik-hotspot-portal",
    status: "missing",
    sourceKind: "none",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/mikrotik-hotspot-portal`,
    technologiesConfirmed: [],
    notes: "Network engineering deployment (RouterOS, Dual-WAN, RADIUS). No software source code preserved in local archive.",
  },
  "arduino-traffic-light": {
    slug: "arduino-traffic-light",
    status: "missing",
    sourceKind: "none",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/arduino-traffic-light`,
    technologiesConfirmed: [],
    notes: "Hardware prototype. Firmware sketch and breadboard documentation not present in local archive.",
  },
  "obstacle-avoidance": {
    slug: "obstacle-avoidance",
    status: "verified",
    sourceKind: "source-archive",
    repository: {
      url: `${PORTFOLIO_TREE_BASE}/projects/obstacle-avoidance`,
      repositoryName: "alhassan-portfolio / docs / evidence / obstacle-avoidance",
      source: "portfolio-archive",
    },
    archivePath: "docs/evidence/projects/obstacle-avoidance/source",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/obstacle-avoidance`,
    technologiesConfirmed: ["Python", "TensorFlow", "Depth Estimation", "Jupyter Notebook"],
    notes: "Local source archive includes od.ipynb monocular depth estimation pipeline. 4 model weight files (>15MB) excluded.",
  },
  "ai-tic-tac-toe": {
    slug: "ai-tic-tac-toe",
    status: "verified",
    sourceKind: "source-archive",
    repository: {
      url: `${PORTFOLIO_TREE_BASE}/projects/ai-tic-tac-toe`,
      repositoryName: "alhassan-portfolio / docs / evidence / ai-tic-tac-toe",
      source: "portfolio-archive",
    },
    archivePath: "docs/evidence/projects/ai-tic-tac-toe/source",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/ai-tic-tac-toe`,
    technologiesConfirmed: ["Python", "Pygame", "Minimax AI"],
    notes: "Standalone Python/Pygame game application implementing recursive Minimax decision algorithm with interactive UI.",
  },
  "pacman-pygame": {
    slug: "pacman-pygame",
    status: "verified",
    sourceKind: "source-archive",
    repository: {
      url: `${PORTFOLIO_TREE_BASE}/projects/pacman-pygame`,
      repositoryName: "alhassan-portfolio / docs / evidence / pacman-pygame",
      source: "portfolio-archive",
    },
    archivePath: "docs/evidence/projects/pacman-pygame/source",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/pacman-pygame`,
    technologiesConfirmed: ["Python", "Pygame", "Collision Detection", "Sprite Animation"],
    notes: "Python/Pygame arcade game recreation featuring game loop, enemy ghost AI, wall collision detection, and score tracking.",
  },
  "text-summarizer": {
    slug: "text-summarizer",
    status: "verified",
    sourceKind: "source-archive",
    repository: {
      url: `${PORTFOLIO_TREE_BASE}/projects/text-summarizer`,
      repositoryName: "alhassan-portfolio / docs / evidence / text-summarizer",
      source: "portfolio-archive",
    },
    archivePath: "docs/evidence/projects/text-summarizer/source",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/text-summarizer`,
    technologiesConfirmed: ["Python", "Tkinter", "NLTK", "Extractive Summarization"],
    notes: "Python desktop GUI application utilizing Tkinter and NLTK for extractive text summarization. 96MB binary excluded.",
  },
  "user-role-manager": {
    slug: "user-role-manager",
    status: "partial",
    sourceKind: "source-archive",
    repository: {
      url: `${PORTFOLIO_TREE_BASE}/projects/user-role-manager`,
      repositoryName: "alhassan-portfolio / docs / evidence / user-role-manager",
      source: "portfolio-archive",
    },
    archivePath: "docs/evidence/projects/user-role-manager/source",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/user-role-manager`,
    technologiesConfirmed: ["Oracle Forms 6i", "PL/SQL"],
    notes: "Partial evidence: Isolated Login Form and Update Users Form from mixed DBMS directory. Marked partial.",
  },
  "inventory-sales-manager": {
    slug: "inventory-sales-manager",
    status: "verified",
    sourceKind: "source-archive",
    repository: {
      url: `${PORTFOLIO_TREE_BASE}/projects/inventory-sales-manager`,
      repositoryName: "alhassan-portfolio / docs / evidence / inventory-sales-manager",
      source: "portfolio-archive",
    },
    archivePath: "docs/evidence/projects/inventory-sales-manager/source",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/inventory-sales-manager`,
    technologiesConfirmed: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    notes: "Full-stack PHP/MySQL retail inventory management system supporting CRUD operations, purchase history, and stock tracking.",
  },
  "student-evaluation-system": {
    slug: "student-evaluation-system",
    status: "conflict",
    sourceKind: "source-archive",
    repository: {
      url: `${PORTFOLIO_TREE_BASE}/projects/student-evaluation-system`,
      repositoryName: "alhassan-portfolio / docs / evidence / student-evaluation-system",
      source: "portfolio-archive",
    },
    archivePath: "docs/evidence/projects/student-evaluation-system/source",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/student-evaluation-system`,
    technologiesConfirmed: ["Flutter", "Dart", "PHP", "MySQL"],
    notes: "SOURCE CONFLICT — OWNER REVIEW REQUIRED: Canonical CV specifies C# Desktop + PHP Web. Local evidence consists of Flutter/Dart mobile client + PHP REST API + MySQL database. Canonical CV retained unchanged.",
  },
  "cafe-pos-system": {
    slug: "cafe-pos-system",
    status: "verified",
    sourceKind: "source-archive",
    repository: {
      url: `${PORTFOLIO_TREE_BASE}/projects/cafe-pos-system`,
      repositoryName: "alhassan-portfolio / docs / evidence / cafe-pos-system",
      source: "portfolio-archive",
    },
    archivePath: "docs/evidence/projects/cafe-pos-system/source",
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/cafe-pos-system`,
    technologiesConfirmed: ["Java", "Java Swing", "JDBC", "Apache Derby SQL"],
    notes: "Java desktop Point of Sale application using Java Swing GUI and JDBC connection to Apache Derby database.",
  },
  "omnifood-landing-page": {
    slug: "omnifood-landing-page",
    status: "verified",
    sourceKind: "repository",
    repository: {
      url: "https://github.com/a2sn2/OmnifoodHTML-CSS",
      repositoryName: "a2sn2 / OmnifoodHTML-CSS",
      source: "standalone",
    },
    evidenceUrl: `${PORTFOLIO_TREE_BASE}/projects/omnifood-landing-page`,
    technologiesConfirmed: ["HTML5", "CSS3", "Responsive Design"],
    notes: "Dedicated GitHub repository for responsive food delivery landing page with hero layout, meal showcase, and navigation.",
  },
};

/**
 * Shared, canonical evidence metadata for all 26 credentials.
 */
export const credentialEvidenceMap: Record<string, CredentialEvidenceMeta> = {
  "cert-cyberai-2026": {
    id: "cert-cyberai-2026",
    status: "missing",
    evidenceKind: "none",
    notes: "No official certificate issued or recorded in local archive. Membership active.",
  },
  "cert-yeb-research-2025": {
    id: "cert-yeb-research-2025",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-yeb-research-2025/certificate.pdf`,
    notes: "Official certificate issued by Yemen Elite Bloc for scientific research development training.",
  },
  "cert-yemen-intern-2025": {
    id: "cert-yemen-intern-2025",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-yemen-intern-2025/certificate.pdf`,
    notes: "Official completion certificate from Yemen Intern Platform covering professional work ethics.",
  },
  "cert-yeb-ai-2025": {
    id: "cert-yeb-ai-2025",
    status: "ongoing",
    evidenceKind: "none",
    notes: "Ongoing comprehensive training program in Artificial Intelligence. No final completion certificate expected until program conclusion.",
  },
  "cert-yeb-frontend-2025": {
    id: "cert-yeb-frontend-2025",
    status: "ongoing",
    evidenceKind: "none",
    notes: "Ongoing technical bootcamp covering modern front-end web engineering. Completion pending.",
  },
  "cert-nh-design-2025": {
    id: "cert-nh-design-2025",
    status: "ongoing",
    evidenceKind: "none",
    notes: "In-progress design diploma program at New Horizons Institute. Final credential pending completion.",
  },
  "cert-su-dl-cv-2025": {
    id: "cert-su-dl-cv-2025",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-su-dl-cv-2025/certificate.pdf`,
    notes: "Academic engineering certificate awarded by Sana'a University Faculty of Engineering in Deep Learning & Computer Vision.",
  },
  "cert-su-robotics-2025": {
    id: "cert-su-robotics-2025",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-su-robotics-2025/certificate.pdf`,
    notes: "Academic engineering certificate in Robotics from Faculty of Engineering, Sana'a University.",
  },
  "cert-su-embedded-2025": {
    id: "cert-su-embedded-2025",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-su-embedded-2025/certificate.pdf`,
    notes: "Academic engineering certificate in Embedded Systems design and programming from Sana'a University.",
  },
  "cert-su-matlab-2025": {
    id: "cert-su-matlab-2025",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-su-matlab-2025/certificate.pdf`,
    notes: "Academic engineering certificate in MATLAB engineering computation and simulation.",
  },
  "cert-su-netadmin-2025": {
    id: "cert-su-netadmin-2025",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-su-netadmin-2025/certificate.pdf`,
    notes: "Academic certificate in Network Administration, routing, and systems management from Sana'a University.",
  },
  "cert-su-ai-rpi-2025": {
    id: "cert-su-ai-rpi-2025",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-su-ai-rpi-2025/certificate.pdf`,
    notes: "Engineering training certificate covering AI edge deployment on Raspberry Pi single-board computers.",
  },
  "cert-nh-aplus-2025": {
    id: "cert-nh-aplus-2025",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-nh-aplus-2025/certificate.pdf`,
    notes: "Industry-standard hardware, OS, and troubleshooting certification course delivered by New Horizons Institute.",
  },
  "cert-ai-approach-2025": {
    id: "cert-ai-approach-2025",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-ai-approach-2025/certificate.pdf`,
    notes: "Certificate of completion for intensive practical training in Data Analysis and Machine Learning.",
  },
  "cert-alhamdi-med-2024": {
    id: "cert-alhamdi-med-2024",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-alhamdi-med-2024/certificate.pdf`,
    notes: "Emergency medical foundation program covering first aid, vital sign monitoring, and medical procedures.",
  },
  "cert-nh-mikrotik-2024": {
    id: "cert-nh-mikrotik-2024",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-nh-mikrotik-2024/certificate.pdf`,
    notes: "Technical network certification in MikroTik RouterOS configuration, routing, and hotspot services.",
  },
  "cert-su-networks-2024": {
    id: "cert-su-networks-2024",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-su-networks-2024/certificate.pdf`,
    notes: "Undergraduate academic engineering certificate in Computer Networks fundamentals, protocols, and topology.",
  },
  "cert-su-plc-2024": {
    id: "cert-su-plc-2024",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-su-plc-2024/certificate.pdf`,
    notes: "Industrial automation certificate covering PLC ladder logic programming and industrial hardware control.",
  },
  "cert-su-arduino-2024": {
    id: "cert-su-arduino-2024",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-su-arduino-2024/certificate.pdf`,
    notes: "Hands-on microcontroller programming, sensor interfacing, and hardware prototyping certificate.",
  },
  "cert-su-solar-2024": {
    id: "cert-su-solar-2024",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-su-solar-2024/certificate.pdf`,
    notes: "Photovoltaic engineering design, inverter sizing, and renewable solar power systems certificate.",
  },
  "cert-alhamdi-marketing-2024": {
    id: "cert-alhamdi-marketing-2024",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-alhamdi-marketing-2024/certificate.pdf`,
    notes: "Professional development certificate in electronic marketing, audience segmentation, and campaigns.",
  },
  "cert-alhamdi-projmgmt-2024": {
    id: "cert-alhamdi-projmgmt-2024",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-alhamdi-projmgmt-2024/certificate.pdf`,
    notes: "Professional certification covering small enterprise management, scoping, budgeting, and project execution.",
  },
  "cert-alhamdi-admin-2024": {
    id: "cert-alhamdi-admin-2024",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-alhamdi-admin-2024/certificate.pdf`,
    notes: "Comprehensive administration diploma covering office management, human resources, and business communication.",
  },
  "cert-sphere-2023": {
    id: "cert-sphere-2023",
    status: "missing",
    evidenceKind: "none",
    notes: "SPHERE Standards training completed in 2023; physical certificate record not present in local archive.",
  },
  "cert-nh-icdl-2020": {
    id: "cert-nh-icdl-2020",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-nh-icdl-2020/certificate.pdf`,
    notes: "International Computer Driving Licence certification covering office productivity suites and operating systems.",
  },
  "cert-phone-maint-2019": {
    id: "cert-phone-maint-2019",
    status: "verified",
    evidenceKind: "certificate",
    documentUrl: `${PORTFOLIO_BLOB_BASE}/certifications/cert-phone-maint-2019/certificate.pdf`,
    notes: "Diploma in mobile electronics hardware repair, micro-soldering, fault diagnosis, and firmware maintenance.",
  },
};

/**
 * Attaches shared evidence and repository metadata to a project item.
 */
export function attachProjectEvidence<T extends { slug: string; githubUrl?: string; repository?: ProjectRepository; evidence?: EvidenceReference[] }>(
  project: T
): T {
  const meta = projectEvidenceMap[project.slug];
  if (!meta) return project;

  const result = { ...project };

  if (meta.repository) {
    result.repository = meta.repository;
    result.githubUrl = meta.repository.url;
  } else {
    // If no dedicated repo or archive, omit generic profile link
    delete result.githubUrl;
  }

  const evidenceList: EvidenceReference[] = [];
  if (meta.repository) {
    evidenceList.push({
      status: meta.status,
      kind: meta.sourceKind === "repository" ? "repository" : "source-archive",
      url: meta.repository.url,
      label: meta.repository.repositoryName,
    });
  }

  if (meta.evidenceUrl) {
    evidenceList.push({
      status: meta.status,
      kind: "document",
      url: meta.evidenceUrl,
      label: "Portfolio Evidence Record",
    });
  }

  if (meta.secondaryRepoUrl) {
    evidenceList.push({
      status: "verified",
      kind: "repository",
      url: meta.secondaryRepoUrl,
      label: "Supporting Academic Archive",
    });
  }

  result.evidence = evidenceList;
  return result;
}

/**
 * Attaches shared evidence metadata to a credential item.
 */
export function attachCredentialEvidence<T extends { id: string; evidence?: EvidenceReference }>(
  credential: T
): T {
  const meta = credentialEvidenceMap[credential.id];
  if (!meta) return credential;

  if (meta.documentUrl && meta.status === "verified") {
    return {
      ...credential,
      evidence: {
        status: meta.status,
        kind: "certificate",
        url: meta.documentUrl,
        label: "Official Certificate PDF",
      },
    };
  }

  return {
    ...credential,
    evidence: {
      status: meta.status,
      kind: "none",
    },
  };
}
