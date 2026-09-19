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
  repositoryNote?: string;
}

export interface LanguageProficiency {
  language: string;
  level: string;
  proficiency: string;
}

export interface InterestGroup {
  id: string;
  category: string;
  summary: string;
  items: string[];
}

export interface AboutContent {
  kicker: string;
  title: string;
  description: string;
  paragraphs: string[];
  education: EducationInfo;
  languages: LanguageProficiency[];
  interests?: InterestGroup[];
  principles: PrincipleItem[];
  referencesNote: string;
}

