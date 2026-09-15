export interface PrincipleItem {
  title: string;
  description: string;
}

export interface EducationInfo {
  institution: string;
  degree: string;
  period: string;
  location: string;
  thesisTitle: string;
  thesisDescription: string;
}

export interface LanguageProficiency {
  language: string;
  level: string;
  proficiency: string;
}

export interface AboutContent {
  kicker: string;
  title: string;
  description: string;
  paragraphs: string[];
  education: EducationInfo;
  languages: LanguageProficiency[];
  principles: PrincipleItem[];
  referencesNote: string;
}
