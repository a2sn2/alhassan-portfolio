import { ProofContent } from "@/contracts/proof";

export const proofContentAr: ProofContent = {
  kicker: "05 / الإثبات والموثوقية",
  title: "الإثبات والتحقق الهندسي",
  description:
    "مستودعات برمجية مباشرة، وأرشيفات كود محلية، وسجلات شهادات موثقة، واعتمادات خاضعة للحوكمة.",
  status: "verified",
  items: [
    {
      id: "proof-project-sources",
      title: "مستودعات وأرشيفات الأكواد المصدرية",
      quote:
        "14 من أصل 16 مشروعاً مدعومة بأكواد مصدرية محققة عبر مستودعات GitHub مخصصة وأرشيفات برمجية محلية.",
      metric: "14 / 16 مدعومة بمصدر",
      url: "/ar/projects",
      type: "metric",
    },
    {
      id: "proof-credentials",
      title: "فهرس إثباتات الشهادات والاعتمادات",
      quote:
        "21 شهادة معتمدة موثقة بملفات PDF الأصلية، إلى جانب متابعة دقيقة وموثقة للبرامج التقنية قيد الإنجاز.",
      metric: "21 شهادة معتمدة",
      url: "/ar/capabilities",
      type: "certification",
    },
    {
      id: "proof-cv-package",
      title: "حزمة السيرة الذاتية الرسمية",
      quote:
        "حزم سيرة ذاتية موحدة ثلاثية اللغات بالإنجليزية والعربية والألمانية بنسختين عادية ومتوافقة مع أنظمة ATS.",
      metric: "ثلاثية اللغات (AR/EN/DE)",
      url: "/ar/about",
      type: "publication",
    },
    {
      id: "proof-references",
      title: "المراجع والتوصيات المهنية",
      quote:
        "خطابات التوصية الأكاديمية والمهنية متاحة عند الطلب التزاماً بسياسات الخصوصية وحماية بيانات الأطراف الثالثة.",
      metric: "متاحة عند الطلب",
      url: "/ar/contact",
      type: "recommendation",
    },
  ],
};
