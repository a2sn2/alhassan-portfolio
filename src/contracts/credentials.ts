export type CredentialCategory =
  | "AI & Data"
  | "Engineering & Hardware"
  | "Systems & Networks"
  | "Professional & Management"
  | "Foundation";

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: CredentialCategory;
  status?: "Completed" | "In Progress" | "Ongoing";
}

export interface MembershipItem {
  id: string;
  organization: string;
  role: string;
  description: string;
}

export interface CredentialsContent {
  kicker: string;
  title: string;
  description: string;
  overviewText?: string;
  certificationsRepoUrl: string;
  certifications: CredentialItem[];
  memberships: MembershipItem[];
}
