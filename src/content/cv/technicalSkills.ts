/**
 * Canonical English Standard CV Technical Skills
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf (Page 2)
 */
export interface CanonicalSkillGroupLine {
  id: string;
  officialLine: string;
  atomicSkills: string[];
}

export const canonicalTechnicalSkillLines: CanonicalSkillGroupLine[] = [
  {
    id: "flutter-android",
    officialLine: "Dart/Flutter, Android Studio",
    atomicSkills: ["Dart", "Flutter", "Android Studio"],
  },
  {
    id: "python-web",
    officialLine: "Python, HTML/CSS/JS",
    atomicSkills: ["Python", "HTML5", "CSS3", "JavaScript"],
  },
  {
    id: "compiled-languages",
    officialLine: "C/C++, Java",
    atomicSkills: ["C", "C++", "Java"],
  },
  {
    id: "databases",
    officialLine: "Databases",
    atomicSkills: ["Relational SQL", "Oracle PL/SQL", "MySQL", "Database Design"],
  },
  {
    id: "algorithms-oop",
    officialLine: "OOP / Data Structures / Algorithms",
    atomicSkills: ["Object-Oriented Design (OOP)", "Data Structures", "Algorithms"],
  },
  {
    id: "data-mining",
    officialLine: "Data Mining: Weka/Orange",
    atomicSkills: ["Data Mining", "Weka", "Orange"],
  },
  {
    id: "networking",
    officialLine: "Routing/Switching & Structured Cabling",
    atomicSkills: ["Routing & Switching", "Structured Cabling", "MikroTik RouterOS", "PPPoE & RADIUS"],
  },
  {
    id: "operating-systems",
    officialLine: "Linux & Operating Systems",
    atomicSkills: ["Linux", "Operating Systems Architecture"],
  },
  {
    id: "hardware",
    officialLine: "Hardware & Troubleshooting",
    atomicSkills: ["Hardware Diagnostics", "System Troubleshooting"],
  },
];

export const canonicalTechnicalSkillsOfficialLines = canonicalTechnicalSkillLines.map(
  (g) => g.officialLine
);
