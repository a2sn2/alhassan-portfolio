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
    atomicSkills: ["Python", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "compiled-languages",
    officialLine: "C/C++, Java",
    atomicSkills: ["C", "C++", "Java"],
  },
  {
    id: "databases",
    officialLine: "Databases",
    atomicSkills: ["Databases"],
  },
  {
    id: "algorithms-oop",
    officialLine: "OOP / Data Structures / Algorithms",
    atomicSkills: ["OOP", "Data Structures", "Algorithms"],
  },
  {
    id: "data-mining",
    officialLine: "Data Mining: Weka/Orange",
    atomicSkills: ["Data Mining", "Weka", "Orange"],
  },
  {
    id: "networking",
    officialLine: "Routing/Switching & Structured Cabling",
    atomicSkills: ["Routing/Switching", "Structured Cabling"],
  },
  {
    id: "operating-systems",
    officialLine: "Linux & Operating Systems",
    atomicSkills: ["Linux", "Operating Systems"],
  },
  {
    id: "hardware",
    officialLine: "Hardware & Troubleshooting",
    atomicSkills: ["Hardware", "Troubleshooting"],
  },
];

export const canonicalTechnicalSkillsOfficialLines = canonicalTechnicalSkillLines.map(
  (g) => g.officialLine
);
