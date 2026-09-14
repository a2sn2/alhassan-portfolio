export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface SkillsContent {
  kicker: string;
  title: string;
  description: string;
  groups: SkillGroup[];
  status: "verified" | "placeholder";
  placeholderNotice?: string;
  placeholderText?: string;
}
