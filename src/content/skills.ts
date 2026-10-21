import { SkillsContent } from "@/contracts";

export const skillsContent: SkillsContent = {
  kicker: "Core Competencies",
  title: "Technical Capabilities & Engineering Matrix",
  description:
    "Verified technical disciplines, tools, languages, and systems practiced across software development, network engineering, and industrial automation.",
  groups: [
    {
      id: "skills-programming",
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
      id: "skills-data",
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
      id: "skills-systems",
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
      id: "skills-automation",
      category: "Industrial Automation & IoT",
      description: "Embedded microcontrollers, sensor telemetry, and industrial controllers.",
      skills: [
        "Programmable Logic Controllers (PLC)",
        "Arduino Microcontrollers",
        "Sensor Monitoring",
        "Embedded Systems",
        "Control Loops & Wiring",
        "Solar Energy Systems",
      ],
    },
    {
      id: "skills-qa",
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
