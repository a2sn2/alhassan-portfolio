import { SkillGroup } from "@/contracts/skills";

export const SKILL_GROUP_ANCHOR_MAP: Record<string, string> = {
  // Programming & Frameworks
  "Programming & Frameworks": "skills-programming",
  "البرمجة وأطر العمل": "skills-programming",
  "Programmierung & Frameworks": "skills-programming",

  // Data & Computer Science
  "Data & Computer Science": "skills-data",
  "البيانات وعلوم الحاسوب": "skills-data",
  "Datenbanken & Informatik": "skills-data",

  // Systems & Networking
  "Systems & Networking": "skills-systems",
  "الأنظمة والشبكات": "skills-systems",
  "Systeme & Netzwerke": "skills-systems",

  // Industrial Automation & IoT
  "Industrial Automation & IoT": "skills-automation",
  "الأتمتة الصناعية والأنظمة المضمّنة": "skills-automation",
  "Industrielle Automatisierung & IoT": "skills-automation",

  // Engineering & Quality Assurance
  "Engineering & Quality Assurance": "skills-qa",
  "الهندسة وضمان الجودة": "skills-qa",
  "Engineering & Qualitätssicherung": "skills-qa",
};

export function getSkillGroupAnchor(group: SkillGroup, index = 0): string {
  return group.id || SKILL_GROUP_ANCHOR_MAP[group.category] || `skills-${index}`;
}
