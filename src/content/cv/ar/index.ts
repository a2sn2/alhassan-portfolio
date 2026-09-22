/**
 * Canonical Arabic Standard CV Content Architecture
 *
 * This directory defines the authoritative, source-traceable content model
 * representing all factual information from:
 * docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf
 */

export * from "./identity";
export * from "./profile";
export * from "./education";
export * from "./experience";
export * from "./memberships";
export * from "./languages";
export * from "./technicalSkills";
export * from "./interests";
export * from "./references";
export * from "./certifications";
export * from "./projects";

export const canonicalCvMetaAr = {
  sourcePdfPath:
    "docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf",
  sourcePdfSha256:
    "7d459d21a3fa738aef0c9f4de42e43b7b5b8b5a807b70c7bd2dfd11174c3da0c",
  version: "Arabic Standard CV (2026 Baseline)",
  sectionCounts: {
    organizations: 6,
    experienceRoles: 9,
    memberships: 5,
    languages: 3,
    technicalSkillLines: 9,
    interestGroups: 3,
    references: 6,
    certifications: 26,
    projects: 16,
  },
} as const;
