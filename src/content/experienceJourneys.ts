export interface ExperienceJourneyStage {
  roleId: string;
  stageNumber: string;
  shortTitle: {
    en: string;
    ar: string;
    de: string;
  };
  isCurrent?: boolean;
}

export interface ExperienceJourney {
  id: string;
  organization: {
    en: string;
    ar: string;
    de: string;
  };
  label: {
    en: string;
    ar: string;
    de: string;
  };
  sublabel: {
    en: string;
    ar: string;
    de: string;
  };
  period: {
    en: string;
    ar: string;
    de: string;
  };
  start: string;
  current: boolean;
  summary: {
    en: string;
    ar: string;
    de: string;
  };
  cta: {
    en: string;
    ar: string;
    de: string;
  };
  currentBadge: {
    en: string;
    ar: string;
    de: string;
  };
  stageContextPrefix: {
    en: string;
    ar: string;
    de: string;
  };
  roleIds: string[];
  stages: ExperienceJourneyStage[];
  currentRoleId: string;
}

export const JAIB_JOURNEY_ID = "ahd-jaib";

export const jaibExperienceJourney: ExperienceJourney = {
  id: JAIB_JOURNEY_ID,
  organization: {
    en: "AHD for Financial Services – Jaib Wallet",
    ar: "عهد للخدمات المالية - محفظة جيب",
    de: "AHD Financial Services – Jaib Wallet",
  },
  label: {
    en: "Career Progression",
    ar: "مسار التطور المهني",
    de: "Berufliche Entwicklung",
  },
  sublabel: {
    en: "4 Connected Roles",
    ar: "4 أدوار مترابطة",
    de: "4 aufeinanderfolgende Rollen",
  },
  period: {
    en: "Sep 2025 — Present",
    ar: "سبتمبر 2025 — الآن",
    de: "Sept. 2025 — heute",
  },
  start: "2025-09",
  current: true,
  summary: {
    en: "Four connected roles within the same organization, tracing a continuous path from customer-facing operations into software development and development-management responsibilities.",
    ar: "أربع محطات مهنية مترابطة داخل الجهة نفسها، بدأت من خدمة العملاء وفهم العمليات، ثم انتقلت إلى التدريب والتطوير البرمجي، وصولًا إلى مسؤوليات إدارة التطوير.",
    de: "Vier aufeinanderfolgende Rollen innerhalb derselben Organisation – vom kunden- und betriebsnahen Einstieg über die Softwareentwicklung bis zur Verantwortung im Entwicklungsmanagement.",
  },
  cta: {
    en: "Explore progression",
    ar: "استكشف المسار",
    de: "Entwicklung ansehen",
  },
  currentBadge: {
    en: "Current Role",
    ar: "الدور الحالي",
    de: "Aktuelle Position",
  },
  stageContextPrefix: {
    en: "CAREER PROGRESSION",
    ar: "المسار المهني",
    de: "BERUFLICHE ENTWICKLUNG",
  },
  roleIds: [
    "ahd-financial-cs-trainee",
    "ahd-financial-dev-trainee",
    "ahd-financial-developer",
    "ahd-financial-deputy",
  ],
  stages: [
    {
      roleId: "ahd-financial-cs-trainee",
      stageNumber: "01",
      shortTitle: {
        en: "Customer Service Trainee",
        ar: "خدمة العملاء",
        de: "Kundenservice-Trainee",
      },
      isCurrent: false,
    },
    {
      roleId: "ahd-financial-dev-trainee",
      stageNumber: "02",
      shortTitle: {
        en: "Development Trainee",
        ar: "متدرب تطوير",
        de: "Entwicklungs-Trainee",
      },
      isCurrent: false,
    },
    {
      roleId: "ahd-financial-developer",
      stageNumber: "03",
      shortTitle: {
        en: "Developer",
        ar: "مطور برمجيات",
        de: "Entwickler",
      },
      isCurrent: false,
    },
    {
      roleId: "ahd-financial-deputy",
      stageNumber: "04",
      shortTitle: {
        en: "Deputy Development Manager",
        ar: "نائب مدير التطوير",
        de: "Stellv. Entwicklungsleiter",
      },
      isCurrent: true,
    },
  ],
  currentRoleId: "ahd-financial-deputy",
};

export const experienceJourneys: ExperienceJourney[] = [jaibExperienceJourney];

export const EXPERIENCE_HASH_ALIASES: Record<string, string> = {
  "ahd-financial-support-trainee": "ahd-financial-cs-trainee",
};

export function normalizeExperienceHash(hash: string): string {
  const clean = hash.replace(/^#/, "");
  return EXPERIENCE_HASH_ALIASES[clean] || clean;
}

export function getJourneyForRole(roleId: string): ExperienceJourney | undefined {
  const normalizedId = normalizeExperienceHash(roleId);
  return experienceJourneys.find((journey) => journey.roleIds.includes(normalizedId));
}

export function isJourneyRole(roleId: string): boolean {
  return getJourneyForRole(roleId) !== undefined;
}
