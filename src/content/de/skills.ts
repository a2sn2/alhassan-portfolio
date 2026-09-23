import { SkillsContent } from "@/contracts";

export const skillsContentDe: SkillsContent = {
  kicker: "Kernkompetenzen",
  title: "Technische Kenntnisse & Kompetenzmatrix",
  description:
    "Technische Disziplinen, Werkzeuge, Programmiersprachen und Systeme aus Softwareentwicklung, Netzwerktechnik und industrieller Steuerung.",
  groups: [
    {
      category: "Programmierung & Frameworks",
      description: "Moderne Programmiersprachen, SDKs und Anwendungsframeworks.",
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
      category: "Datenbanken & Informatik",
      description: "Datenbankarchitekturen, Datenstrukturen, Algorithmen und Analytik.",
      skills: [
        "Relationale SQL-Datenbanken",
        "Oracle PL/SQL",
        "MySQL",
        "Datenbankdesign",
        "Datenstrukturen & Algorithmen",
        "Objektorientierte Programmierung (OOP)",
        "Data Mining (Weka, Orange)",
      ],
    },
    {
      category: "Systeme & Netzwerke",
      description: "Betriebssysteme, Routing-Infrastruktur und Netzwerkprotokolle.",
      skills: [
        "Linux-Umgebungen",
        "MikroTik RouterOS",
        "Routing & Switching",
        "PPPoE & RADIUS",
        "Strukturierte Verkabelung",
        "Hardware-Fehlerdiagnose",
      ],
    },
    {
      category: "Industrielle Automatisierung & IoT",
      description: "Eingebettete Systeme, Sensorüberwachung und speicherprogrammierbare Steuerungen.",
      skills: [
        "Speicherprogrammierbare Steuerungen (PLC)",
        "Arduino-Mikrocontroller",
        "Sensor- & Signalüberwachung",
        "Eingebettete Systeme",
        "Regelkreise & Verdrahtung",
        "Solarenergiesysteme",
      ],
    },
    {
      category: "Engineering & Qualitätssicherung",
      description: "Testmethoden, Qualitätssicherungs-Workflows und Review-Standards.",
      skills: [
        "Softwaretests & Qualitätssicherung",
        "Review-Standards & Richtlinien",
        "Machbarkeitsstudien",
        "Systemintegrationen",
        "Fintech-Workflows",
        "Technische Dokumentation",
      ],
    },
  ],
};
