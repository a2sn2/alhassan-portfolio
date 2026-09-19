/**
 * Canonical English Standard CV Content Architecture
 *
 * This directory defines the authoritative, source-traceable content model
 * representing all factual information from:
 * docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf
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

export const canonicalCvMeta = {
  sourcePdfPath:
    "docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf",
  sourcePdfSha256:
    "e49a9ce438d04e537f5aef8c478c74d947e6a5a4df7bb360b915f7861b7eb63c",
  version: "English Standard CV (2026 Baseline)",
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
