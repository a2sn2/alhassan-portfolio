/**
 * Canonical Arabic Standard CV Certifications & Courses (الشهادات والدورات)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf (Page 3)
 */
export interface CanonicalCertificationItemAr {
  id: string;
  year: number;
  issuer: string;
  title: string;
  status?: string;
}

export const canonicalCertificationsAr: CanonicalCertificationItemAr[] = [
  {
    id: "cert-cyberai-automation-agents",
    year: 2026,
    issuer: "نادي CYBERAI",
    title: "الأتمتة ووكلاء الذكاء الاصطناعي",
  },
  {
    id: "cert-yemen-elite-research-dev",
    year: 2025,
    issuer: "تكتل نخبة اليمن",
    title: "التطوير البحثي",
  },
  {
    id: "cert-yemeni-trainee-work-ethics",
    year: 2025,
    issuer: "منصة المتدرب اليمني",
    title: "أخلاقيات العمل والبيئة المهنية والعمل الجماعي",
  },
  {
    id: "cert-yemen-elite-ai-program",
    year: 2025,
    issuer: "تكتل نخبة اليمن (قطاع التقنية وتقنية المعلومات)",
    title: "برنامج الذكاء الاصطناعي",
    status: "(مستمر)",
  },
  {
    id: "cert-yemen-elite-frontend-bootcamp",
    year: 2025,
    issuer: "تكتل نخبة اليمن (قطاع التقنية وتقنية المعلومات)",
    title: "معسكر تطوير الواجهات الأمامية",
    status: "(مستمر)",
  },
  {
    id: "cert-new-horizons-graphic-design",
    year: 2025,
    issuer: "معاهد نيوهورايزن",
    title: "دبلوم التصميم الجرافيكي",
    status: "(قيد الإنجاز)",
  },
  {
    id: "cert-su-deep-learning-cv",
    year: 2025,
    issuer: "جامعة صنعاء – كلية الهندسة",
    title: "التعلّم العميق ورؤية الحاسوب",
  },
  {
    id: "cert-su-robotics",
    year: 2025,
    issuer: "جامعة صنعاء – كلية الهندسة",
    title: "الروبوتات",
  },
  {
    id: "cert-su-embedded-systems",
    year: 2025,
    issuer: "جامعة صنعاء – كلية الهندسة",
    title: "الأنظمة المضمّنة",
  },
  {
    id: "cert-su-matlab",
    year: 2025,
    issuer: "جامعة صنعاء – كلية الهندسة",
    title: "MATLAB",
  },
  {
    id: "cert-su-network-admin",
    year: 2025,
    issuer: "جامعة صنعاء – كلية الهندسة",
    title: "إدارة الشبكات",
  },
  {
    id: "cert-su-ai-raspberry-pi",
    year: 2025,
    issuer: "جامعة صنعاء – كلية الهندسة",
    title: "الذكاء الاصطناعي و RASPBERRY PI",
  },
  {
    id: "cert-new-horizons-comptia-a",
    year: 2025,
    issuer: "معاهد نيوهورايزن",
    title: "COMPTIA A+",
  },
  {
    id: "cert-ai-approach-data-analysis-ml",
    year: 2025,
    issuer: "AI APPROACH CLUB",
    title: "تحليل البيانات وتعلّم الآلة",
  },
  {
    id: "cert-al-hamdi-medical-program",
    year: 2024,
    issuer: "مؤسسة الحمدي",
    title: "برنامج طبي (الإسعافات الأولية، أنواع الحقن، العلامات الحيوية)",
  },
  {
    id: "cert-new-horizons-mikrotik-basics",
    year: 2024,
    issuer: "معاهد نيوهورايزن",
    title: "أساسيات MIKROTIK",
  },
  {
    id: "cert-su-networking",
    year: 2024,
    issuer: "جامعة صنعاء – كلية الهندسة",
    title: "الشبكات",
  },
  {
    id: "cert-su-plc",
    year: 2024,
    issuer: "جامعة صنعاء – كلية الهندسة",
    title: "المتحكمات المنطقية المبرمجة (PLC)",
  },
  {
    id: "cert-su-arduino",
    year: 2024,
    issuer: "جامعة صنعاء – كلية الهندسة",
    title: "ARDUINO",
  },
  {
    id: "cert-su-solar-energy",
    year: 2024,
    issuer: "جامعة صنعاء – كلية الهندسة",
    title: "الطاقة الشمسية",
  },
  {
    id: "cert-al-hamdi-digital-marketing",
    year: 2024,
    issuer: "مؤسسة الحمدي",
    title: "التسويق الإلكتروني المتقدّم",
  },
  {
    id: "cert-al-hamdi-small-projects-mgmt",
    year: 2024,
    issuer: "مؤسسة الحمدي",
    title: "إدارة المشاريع الصغيرة",
  },
  {
    id: "cert-al-hamdi-admin-program",
    year: 2024,
    issuer: "مؤسسة الحمدي",
    title: "البرنامج الإداري (الأعمال، الموارد البشرية، خدمة العملاء)",
  },
  {
    id: "cert-al-hamdi-sphere-standards",
    year: 2023,
    issuer: "مؤسسة الحمدي",
    title: "الاستجابة الإنسانية الطارئة — SPHERE STANDARDS",
  },
  {
    id: "cert-new-horizons-icdl",
    year: 2020,
    issuer: "معاهد نيوهورايزن",
    title: "الرخصة الدولية لقيادة الحاسوب ICDL",
  },
  {
    id: "cert-cst-phone-maintenance",
    year: 2019,
    issuer: "مركز العلوم والتكنولوجيا",
    title: "دبلوم صيانة الهواتف",
  },
];

export const canonicalCertificationsRepositoryNoticeAr =
  "اضغط --< مستندات الشهائد >-- لفتح مكان وجودهم داخل المستودع";
