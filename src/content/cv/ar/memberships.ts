/**
 * Canonical Arabic Standard CV Memberships
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf (Page 2)
 */
export interface CanonicalMembershipItemAr {
  id: string;
  index: number;
  organization: string;
  summary: string;
}

export const canonicalMembershipsAr: CanonicalMembershipItemAr[] = [
  {
    id: "membership-1",
    index: 1,
    organization: "CYBERAI CLUB",
    summary: "عضو في لجنتي الذكاء الاصطناعي والمشاريع.",
  },
  {
    id: "membership-2",
    index: 2,
    organization: "SOCIETY OF PETROLEUM ENGINEERS (SPE)",
    summary: "الاستفادة من برامج SPE التقنية لتوسيع الفهم بالهندسة النفطية والعمليات.",
  },
  {
    id: "membership-3",
    index: 3,
    organization: "مؤسسة الحمدي للتنمية الإنسانية",
    summary: "مشارك ومتطوّع في البرامج؛ دعم الفعاليات والتعلّم النظري.",
  },
  {
    id: "membership-4",
    index: 4,
    organization: "جمعية نستطيع الخيرية",
    summary: "متطوع مجتمعي يدعم مبادرات التقنية للشباب ولوجستيات الفعاليات.",
  },
  {
    id: "membership-5",
    index: 5,
    organization: "تكتل نخبة اليمن",
    summary: "نشاط في وحدات الذكاء الاصطناعي/الروبوت والبرمجة، إرشاد الأقران ودعم لوجستيات الفعاليات.",
  },
];
