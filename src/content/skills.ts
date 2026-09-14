import { SkillsContent } from "@/contracts";

export const skillsContent: SkillsContent = {
  kicker: "Core Competencies",
  title: "Technical Capabilities & Engineering Matrix",
  description:
    "Verified technical disciplines, tools, languages, and systems practiced across software development, network engineering, and industrial automation.",
  groups: [
    {
      category: "Programming & Frameworks",
      description: "Modern languages, client SDKs, and application frameworks.",
      skills: [
        "Python",
        "Dart / Flutter",
        "Android Studio",
        "JavaScript",
        "HTML5 / CSS3",
        "C# / .NET",
        "Java",
        "C / C++",
      ],
    },
    {
      category: "Data & Computer Science",
      description: "Database architectures, data structures, and analytics.",
      skills: [
        "Relational SQL",
        "Oracle PL/SQL",
        "MySQL",
        "Database Design",
        "Data Structures & Algorithms",
        "Object-Oriented Design (OOP)",
        "Data Mining (Weka, Orange)",
      ],
    },
    {
      category: "Systems & Networking",
      description: "Operating systems, routing infrastructure, and security protocols.",
      skills: [
        "Linux Environments",
        "MikroTik RouterOS",
        "Routing & Switching",
        "PPPoE & RADIUS",
        "Structured Cabling",
        "Hardware Diagnostics",
      ],
    },
    {
      category: "Industrial Automation & IoT",
      description: "Embedded microcontrollers, sensor telemetry, and industrial controllers.",
      skills: [
        "Programmable Logic Controllers (PLC)",
        "Arduino Microcontrollers",
        "Sensor Telemetry & Monitoring",
        "Embedded C/C++",
        "Control Loops & Interlocks",
        "Solar Energy Systems",
      ],
    },
    {
      category: "Engineering & Quality Assurance",
      description: "Testing methodologies, operational workflows, and review rigor.",
      skills: [
        "Software Testing & QA",
        "Code Review Standards",
        "Feasibility Studies",
        "System Integrations",
        "Fintech Workflows",
        "Documentation & SOPs",
      ],
    },
  ],
};
