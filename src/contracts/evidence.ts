export type EvidenceStatus =
  | "verified"
  | "partial"
  | "missing"
  | "ongoing"
  | "private"
  | "conflict";

export type EvidenceKind =
  | "repository"
  | "source-archive"
  | "certificate"
  | "document"
  | "media";

export interface EvidenceReference {
  status: EvidenceStatus;
  kind: EvidenceKind;
  url?: string;
  label?: string;
}

export interface ProjectRepository {
  url: string;
  repositoryName: string;
  source: "standalone" | "portfolio-archive";
}

export interface ProjectEvidenceMeta {
  slug: string;
  status: EvidenceStatus;
  sourceKind: "repository" | "source-archive" | "none";
  repository?: ProjectRepository;
  secondaryRepoUrl?: string;
  archivePath?: string;
  evidenceUrl?: string;
  technologiesConfirmed: string[];
  notes: string;
}

export interface CredentialEvidenceMeta {
  id: string;
  status: EvidenceStatus;
  evidenceKind: EvidenceKind | "none";
  documentUrl?: string;
  notes: string;
}
