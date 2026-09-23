/**
 * Unified Canonical German Standard CV Content Exports
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf
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

export const canonicalCvMetaDe = {
  sourcePdfPath:
    "docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf",
  sourcePdfSha256:
    "7001ecceab794a1fc92b2b2a0abe614f491e2a2ccdb6835dec583a1aa05ce6c3",
  version: "German Standard CV (2026 Baseline)",
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

