/**
 * Canonical Arabic Standard CV Interests (الاهتمامات)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf (Page 2)
 */
export interface CanonicalInterestCategoryAr {
  id: string;
  category: "مجتمعي" | "شخصي" | "تقني";
  items: string[];
  rawText: string;
}

export const canonicalInterestsAr: CanonicalInterestCategoryAr[] = [
  {
    id: "interest-community",
    category: "مجتمعي",
    items: [
      "المصادر المفتوحة",
      "الهاكاثونات",
      "فعاليات أندية التقنية",
      "الإرشاد",
    ],
    rawText: "المصادر المفتوحة، الهاكاثونات، فعاليات أندية التقنية، الإرشاد.",
  },
  {
    id: "interest-personal",
    category: "شخصي",
    items: [
      "القراءة التقنية",
      "الرياضة",
      "البحث العلمي",
      "اللغات",
    ],
    rawText: "القراءة التقنية، الرياضة، البحث العلمي، اللغات.",
  },
  {
    id: "interest-technical",
    category: "تقني",
    items: [
      "الويب/الموبايل",
      "النمذجة والمحاكاة",
      "الحوسبة السحابية",
      "الكهربية والتحكم",
    ],
    rawText: "الويب/الموبايل، النمذجة والمحاكاة، الحوسبة السحابية، الكهربية والتحكم.",
  },
];
