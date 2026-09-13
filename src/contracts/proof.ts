export interface ProofItem {
  id: string;
  title: string;
  author?: string;
  role?: string;
  quote?: string;
  metric?: string;
  url?: string;
  type: "recommendation" | "metric" | "publication" | "certification";
}

export interface ProofContent {
  kicker: string;
  title: string;
  description: string;
  items: ProofItem[];
  status: "verified" | "placeholder";
  placeholderNotice?: string;
  placeholderText?: string;
}
