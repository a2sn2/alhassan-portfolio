import { SkillsContent } from "@/contracts";

export const skillsContent: SkillsContent = {
  kicker: "Core Competencies",
  title: "Technical Capabilities & Engineering Matrix",
  description:
    "Verified technical disciplines, tools, languages, and systems practiced across software development, network engineering, and industrial automation.",
  groups: [
    {
      category: "Programming & Frameworks",
      description: "Official CV wording retained, with portfolio context around the same capability set.",
      skills: [
        "Dart/Flutter, Android Studio",
        "Python, HTML/CSS/JS",
        "C/C++, Java",
      ],
    },
    {
      category: "Data & Computer Science",
      description: "Official CV wording retained for data and computer-science foundations.",
      skills: [
        "Databases",
        "OOP / Data Structures / Algorithms",
        "Data Mining: Weka/Orange",
      ],
    },
    {
      category: "Systems & Networking",
      description: "Official CV wording retained for infrastructure and operating-system skills.",
      skills: [
        "Routing/Switching & Structured Cabling",
        "Linux & Operating Systems",
        "Hardware & Troubleshooting",
      ],
    },
    {
      category: "Industrial Automation & IoT",
      description: "Portfolio extension grounded in verified experience and training.",
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
      category: "Engineering & Quality Assurance",
      description: "Portfolio extension grounded in verified professional responsibilities.",
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
