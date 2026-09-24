/**
 * Canonical German Standard CV Technical Skills (Technische Kenntnisse)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf (Page 2)
 */
export interface CanonicalSkillGroupLineDe {
  id: string;
  officialLine: string;
  atomicSkills: string[];
}

export const canonicalTechnicalSkillLinesDe: CanonicalSkillGroupLineDe[] = [
  {
    id: "flutter-android",
    officialLine: "Dart/Flutter, Android Studio",
    atomicSkills: ["Dart", "Flutter", "Android Studio"],
  },
  {
    id: "python-web",
    officialLine: "Python, HTML/CSS/JS",
    atomicSkills: ["Python", "HTML", "CSS", "JS"],
  },
  {
    id: "compiled-languages",
    officialLine: "C/C++, Java",
    atomicSkills: ["C", "C++", "Java"],
  },
  {
    id: "databases",
    officialLine: "Datenbanken",
    atomicSkills: ["Datenbanken"],
  },
  {
    id: "algorithms-oop",
    officialLine: "OOP / Datenstrukturen / Algorithmen",
    atomicSkills: ["OOP", "Datenstrukturen", "Algorithmen"],
  },
  {
    id: "data-mining",
    officialLine: "Data Mining: Weka/Orange",
    atomicSkills: ["Data Mining", "Weka", "Orange"],
  },
  {
    id: "networking",
    officialLine: "Routing/Switching & strukturierte Verkabelung",
    atomicSkills: ["Routing/Switching", "Strukturierte Verkabelung"],
  },
  {
    id: "operating-systems",
    officialLine: "Linux & Betriebssysteme",
    atomicSkills: ["Linux", "Betriebssysteme"],
  },
  {
    id: "hardware",
    officialLine: "Hardware & Fehlerdiagnose",
    atomicSkills: ["Hardware", "Fehlerdiagnose"],
  },
];

export const canonicalTechnicalSkillsOfficialLinesDe =
  canonicalTechnicalSkillLinesDe.map((line) => line.officialLine);
