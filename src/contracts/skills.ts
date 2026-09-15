export interface SkillGroup {
  category: string;
  description?: string;
  skills: string[];
}

export interface SkillsContent {
  kicker: string;
  title: string;
  description: string;
  groups: SkillGroup[];
}
