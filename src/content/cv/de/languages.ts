/**
 * Canonical German Standard CV Languages (Sprachkenntnisse)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf (Page 2)
 */
export interface CanonicalLanguageItemDe {
  id: string;
  language: string;
  proficiency: string;
  raw: string;
}

export const canonicalLanguagesDe: CanonicalLanguageItemDe[] = [
  {
    id: "arabic",
    language: "Arabisch",
    proficiency: "Muttersprache",
    raw: "Arabisch — Muttersprache |",
  },
  {
    id: "english",
    language: "Englisch",
    proficiency: "B2",
    raw: "Englisch — B2 |",
  },
  {
    id: "german",
    language: "Deutsch",
    proficiency: "B1",
    raw: "Deutsch — B1 |",
  },
];
