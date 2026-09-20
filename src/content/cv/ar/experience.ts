/**
 * Canonical Arabic Standard CV Professional Experience
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf (Page 1)
 */
export interface CanonicalRoleItemAr {
  id: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  company?: string;
  organizationId?: string;
}

export interface CanonicalOrganizationItemAr {
  id: string;
  company: string;
  period: string;
  location: string;
  headline?: string;
  roles: CanonicalRoleItemAr[];
}

export const canonicalExperienceOrganizationsAr: CanonicalOrganizationItemAr[] = [
  {
    id: "asaas-ai",
    company: "شركة أساس الذكاء الاصطناعي",
    period: "2026(01 - الآن)",
    location: "صنعاء",
    roles: [
      {
        id: "asaas-ai-qa-director",
        role: "شريك مؤسس و مدير إدارة ضمان الجودة",
        period: "2026(01 - الآن)",
        location: "صنعاء",
        summary:
          "وضع معايير وسياسات الاختبار والمراجعة، وتقييم جودة الأنظمة البرمجية وحلول الذكاء الاصطناعي، ومراجعة الخطط ودراسات الجدوى وجاهزية المنتجات قبل الاعتماد والإطلاق.",
      },
    ],
  },
  {
    id: "ahd-financial-services",
    company: "عهد للخدمات المالية - محفظة جيب",
    period: "2025(09 - الآن)",
    location: "صنعاء",
    headline: "متعدد الوظائف",
    roles: [
      {
        id: "ahd-deputy-dev-manager",
        role: "نائب إدارة التطوير",
        period: "2026/07 - الآن",
        location: "صنعاء",
        summary:
          "تنظيم وإدارة المشاريع و تحليل متطلبات التطوير الداخلي و تنفيذ تكامل الأنظمة مع المؤسسات الأخرى.",
      },
      {
        id: "ahd-developer",
        role: "مُطوِّر في قسم التطوير",
        period: "2026/01 - 2026/07",
        location: "صنعاء",
        summary:
          "بناء منتج حقيقي لإدارة العمليات والمحاسبة، متكامل مع مسارات عمل محفظة جيب، وتطوير البرمجيات.",
      },
      {
        id: "ahd-dev-trainee",
        role: "متدرب في قسم التطوير",
        period: "2025/12 - 2026/01",
        location: "صنعاء",
        summary:
          "خبرة منطق الخلفية المعتمد على .NET، وقواعد بيانات SQL، وميزات تطبيقات الويب، والاختبار، ومعالجة المشكلات.",
      },
      {
        id: "ahd-cs-trainee",
        role: "متدرب في خدمة العملاء",
        period: "2025/09 - 12",
        location: "صنعاء",
        summary:
          "معالجة المكالمات في نظام التذاكر، وتطبيق سياسات الامتثال.",
      },
    ],
  },
  {
    id: "water-sanitation-corp",
    company: "المؤسسة المحلية للمياه والصرف الصحي",
    period: "2024(08-12)",
    location: "الحديده",
    roles: [
      {
        id: "water-control-trainee",
        role: "متدرب مهندس تحكّم",
        period: "2024(08-12)",
        location: "الحديده",
        summary:
          "مراقبة لوحات الـPLC والإشارات الحقلية (المضخات، المناسيب، الإنذارات). المساهمة في الصيانة الوقائية، التمديدات، واستكشاف أعطال حلقات التحكم. التنسيق مع الفنيين وتوثيق الأعطال وضمان إعادة التشغيل الآمن.",
      },
    ],
  },
  {
    id: "al-rahma-foundation",
    company: "مؤسسة الرحمة",
    period: "2023(01-12)",
    location: "صنعاء",
    roles: [
      {
        id: "al-rahma-network-trainee",
        role: "متدرب مهندس شبكات",
        period: "2023(01-12)",
        location: "صنعاء",
        summary:
          "تشغيل وصيانة شبكات LAN/Wi-Fi داخلية وإعدادات أساسية للموجّهات والمبدّلات. دعم تنظيم التوصيل، والمتابعة الدورية والسجلات، توثيق الحوادث واقتراح تحسينات الاستقرار.",
      },
    ],
  },
  {
    id: "private-project-healthcare-apparel",
    company: "مشروع خاص (قطاع الصحة والملابس)",
    period: "2020 - 2022",
    location: "صنعاء",
    roles: [
      {
        id: "private-project-sales",
        role: "مبيعات",
        period: "2020 - 2022",
        location: "صنعاء",
        summary:
          "إدارة علاقات العملاء والطلبات والفواتير، تنظيم بيانات المخزون وإعداد تقارير مبيعات بسيطة، متابعة المشتريات والتواصل مع المورّدين.",
      },
    ],
  },
  {
    id: "glory-civilization-schools",
    company: "مدارس مجد الحضارة",
    period: "2019(01-12)",
    location: "صنعاء",
    roles: [
      {
        id: "glory-schools-admin-trainee",
        role: "متدرب مساعد إداري",
        period: "2019(01-12)",
        location: "صنعاء",
        summary:
          "دعم عمليات اليوم الدراسي والفعاليات المدرسية، تنسيق الجداول والاتصال بين الأقسام.",
      },
    ],
  },
];

export const canonicalExperienceRolesAr: CanonicalRoleItemAr[] =
  canonicalExperienceOrganizationsAr.flatMap((org) =>
    org.roles.map((role) => ({
      ...role,
      company: org.company,
      organizationId: org.id,
    }))
  );
