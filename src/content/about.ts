import { AboutContent } from "@/contracts";

export const aboutContent: AboutContent = {
  kicker: "Profile & Engineering Journey",
  title: "Engineering from Academic Foundations to Production Systems",
  description:
    "Software engineer based in Sana'a, Yemen, specializing in software systems, full-stack application development, and practical engineering solutions.",
  paragraphs: [
    "Software engineer combining academic knowledge with hands-on practice to turn theoretical ideas into tangible outcomes in engineering environments. Strong believer in teamwork, time management, and practical, effective delivery, with a continuous drive for self-development and contribution in dynamic workplaces.",
    "My hands-on experience extends across fintech development, quality leadership, and network systems. At AHD for Financial Services – Jaib Wallet, I advanced through developer and operational roles, building internal accounting systems and managing institutional integrations. At Asaas AI, as Co-Founder & Director of Quality Assurance, I established review standards and evaluated system readiness for AI-powered solutions.",
    "My engineering ethos is rooted in end-to-end curiosity: from industrial PLC control loops and network routing (MikroTik RouterOS) to desktop architectures, full-stack web platforms, and real-time computer vision pipelines.",
  ],
  specializations: [
    {
      domain: "Fintech & Enterprise Systems",
      roleOrContext: "Deputy Director of the Development Department · AHD / Jaib Wallet",
      description:
        "Built internal accounting solutions, managed core operational workflows, and directed institutional integrations with partner entities.",
    },
    {
      domain: "Software Quality & Review Architecture",
      roleOrContext: "Co-Founder & Director of QA · Asaas AI",
      description:
        "Established structured test strategies, institutional code review standards, and comprehensive readiness evaluation for production platforms.",
    },
    {
      domain: "Systems, Networks & Automation",
      roleOrContext: "Systems & Infrastructure Engineering",
      description:
        "Hands-on routing and switching (MikroTik RouterOS), Linux environment management, and industrial PLC control loop automation.",
    },
    {
      domain: "Full-Stack Development & Computer Vision",
      roleOrContext: "Software Engineering & Applied Research",
      description:
        "Modern responsive web applications, robust desktop architectures, and real-time object tracking pipelines using Python and OpenCV.",
    },
  ],
  education: {
    institution: "International University of Technology Twintech",
    degree: "B.Sc. in Computer Science",
    period: "2021 – 2025",
    location: "Sana'a, Yemen",
    thesisTitle: "Object-Tracking Algorithm on Linux Using Python and OpenCV",
    thesisDescription:
      "Implemented on Linux using live camera feed processing with real-time visualization of tracking coordinates.",
    repositoryNote:
      "See the repository for the final report, transcript, specialization plan, and recommendation letters.",
  },
  languages: [
    {
      language: "Arabic",
      level: "Native",
      proficiency: "Native speaker (لغة أم).",
    },
    {
      language: "English",
      level: "B2",
      proficiency: "Professional working proficiency (CEFR B2).",
    },
    {
      language: "German",
      level: "B1",
      proficiency: "Independent user (CEFR B1).",
    },
  ],
  interests: [
    {
      id: "interest-community",
      category: "Community",
      summary: "Open source contributions, hackathons, tech club events, and student mentoring.",
      items: ["Open source", "Hackathons", "Tech club events", "Mentoring"],
    },
    {
      id: "interest-personal",
      category: "Personal",
      summary: "Technical reading, sports, scientific research, and foreign languages.",
      items: ["Technical reading", "Sports", "Scientific research", "Languages"],
    },
    {
      id: "interest-technical",
      category: "Technical",
      summary:
        "Web and mobile platforms, mathematical modeling, simulation, cloud computing, and electrical control systems.",
      items: [
        "Web/mobile",
        "Modeling & simulation",
        "Cloud computing",
        "Electrical systems & control",
      ],
    },
  ],
  principles: [
    {
      title: "Pragmatic Implementation",
      description:
        "Focus on delivering clear, maintainable, and reliable software that solves tangible operational problems rather than accumulating speculative complexity.",
    },
    {
      title: "End-to-End System Visibility",
      description:
        "Comfort navigating the entire technology stack, from hardware controllers and networking layers to APIs, database schemas, and modern responsive interfaces.",
    },
    {
      title: "Quality & Review Rigor",
      description:
        "Quality is not an afterthought. Consistent validation, structured automated testing, and comprehensive code review standards are essential for dependable software.",
    },
  ],
  referencesNote:
    "Academic and professional references from faculty leadership, engineering supervisors, and executive directors are available upon request.",
};
