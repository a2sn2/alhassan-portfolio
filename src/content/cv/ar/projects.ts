/**
 * Canonical Arabic Standard CV Projects (المشاريع و الأعمال)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf (Page 4)
 */
export interface CanonicalProjectItemAr {
  id: string;
  slug: string;
  index: number;
  title: string;
  oneLineDescription: string;
}

export const canonicalProjectsAr: CanonicalProjectItemAr[] = [
  {
    id: "proj-1",
    slug: "pump-station-analytics",
    index: 1,
    title: "تحليلات محطة الضخ",
    oneLineDescription: "صيانة تنبؤية لمضخات مياه الصرف الصحي.",
  },
  {
    id: "proj-2",
    slug: "real-time-image-classification-api",
    index: 2,
    title: "واجهة تصنيف صور لحظي (API)",
    oneLineDescription: "خدمة خفيفة بـ Flask تستقبل صورة وتعيد أعلى ثلاث ثقات.",
  },
  {
    id: "proj-3",
    slug: "real-time-object-detection",
    index: 3,
    title: "كشف الأجسام بالزمن الحقيقي",
    oneLineDescription: "خط أنابيب حي بـ Python/PyTorch و OpenCV.",
  },
  {
    id: "proj-4",
    slug: "omnifood-landing-page",
    index: 4,
    title: "OMNIFOOD — صفحة متجاوبة",
    oneLineDescription: "صفحة واحدة مع قسم بطولي وتنقل مرسى.",
  },
  {
    id: "proj-5",
    slug: "urbanmindos",
    index: 5,
    title: "URBANMINDOS — نظام تشغيل المدينة الذكية",
    oneLineDescription: "إبراز التنقل الجوي الذاتي.",
  },
  {
    id: "proj-6",
    slug: "obstacle-avoidance",
    index: 6,
    title: "تجنّب العوائق",
    oneLineDescription: "تقدير عمق أحادي الكاميرا آنياً بـ TensorFlow للكشف والتفادي.",
  },
  {
    id: "proj-7",
    slug: "ai-tic-tac-toe",
    index: 7,
    title: "XO بالذكاء الاصطناعي",
    oneLineDescription: "عميل Minimax لا يُقهر بواجهة Pygame تفاعلية.",
  },
  {
    id: "proj-8",
    slug: "pacman-pygame",
    index: 8,
    title: "باك-مان بـ PYGAME",
    oneLineDescription: "نسخة مع رسومات متحركة واصطدام وذكاء للأشباح وعناصر تعزيز.",
  },
  {
    id: "proj-9",
    slug: "text-summarizer",
    index: 9,
    title: "ملخّص نصوص",
    oneLineDescription: "تطبيق سطح مكتب للتلخيص الاستخراجي بطول قابل للضبط.",
  },
  {
    id: "proj-10",
    slug: "inventory-sales-manager",
    index: 10,
    title: "مدير المخزون والمبيعات",
    oneLineDescription: "CRUD — ويب للإلكترونيات (لابتوبات/هواتف/PS5).",
  },
  {
    id: "proj-11",
    slug: "user-role-manager",
    index: 11,
    title: "مدير المستخدمين والأدوار",
    oneLineDescription: "إنشاء/تحديث المستخدمين، إعادة كلمات المرور، تعيين الصلاحيات — (Oracle Forms 6i + PL/SQL).",
  },
  {
    id: "proj-12",
    slug: "robocam-controller",
    index: 12,
    title: "ROBOCAM CONTROLLER (FLUTTER + DART)",
    oneLineDescription: "تطبيق أندرويد للتحكم بروبوت مزوّد بكاميرا عبر عصا تحكّم على الشاشة.",
  },
  {
    id: "proj-13",
    slug: "student-evaluation-system",
    index: 13,
    title: "نظام تقييم الطالب",
    oneLineDescription: "حضور/درجات شامل مع دخول بحسب الدور (مدير/معلّم/طالب) — (C# Desktop + PHP Web).",
  },
  {
    id: "proj-14",
    slug: "cafe-pos-system",
    index: 14,
    title: "نظام نقاط بيع لمقهى",
    oneLineDescription: "دخول، العناصر (CRUD)، والمبيعات/التقارير. (Java Swing + JDBC)",
  },
  {
    id: "proj-15",
    slug: "mikrotik-hotspot-portal",
    index: 15,
    title: "بوابة هوتسبوت MIKROTIK",
    oneLineDescription: "إعداد RouterOS مع رابطي PPPoE وبوابة Hotspot مع RADIUS. (ثنائية الوصلات Dual-WAN)",
  },
  {
    id: "proj-16",
    slug: "arduino-traffic-light",
    index: 16,
    title: "متحكّم إشارة مرور بـ ARDUINO",
    oneLineDescription: "تقاطع باتجاهين مع حمايات آمنة وزر عبور للمشاة.",
  },
];

export const canonicalProjectsGithubNoticeAr =
  "استكشف مشاريعي المستقبلية في البرمجة والهندسة والتصميم الجرافيكي على --< GITHUB >--";
