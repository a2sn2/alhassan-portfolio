export interface PrincipleItem {
  title: string;
  description: string;
}

export interface AboutContent {
  kicker: string;
  title: string;
  description: string;
  paragraphs: string[];
  principles?: PrincipleItem[];
  status: "verified" | "placeholder";
  placeholderNotice?: string;
  placeholderText?: string;
}
