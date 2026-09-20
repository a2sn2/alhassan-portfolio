/**
 * Canonical Arabic Standard CV Languages
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf (Page 2)
 */
export interface CanonicalLanguageItemAr {
  id: string;
  language: string;
  proficiency: string;
  raw: string;
}

export const canonicalLanguagesAr: CanonicalLanguageItemAr[] = [
  {
    id: "arabic",
    language: "العربية",
    proficiency: "لغة أم",
    raw: "العربية — لغة أم |",
  },
  {
    id: "english",
    language: "الإنجليزية",
    proficiency: "B2",
    raw: "الإنجليزية — B2 |",
  },
  {
    id: "german",
    language: "الألمانية",
    proficiency: "B1",
    raw: "الألمانية — B1 |",
  },
];
