/**
 * Canonical English Standard CV Languages
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf (Page 2)
 */
export interface CanonicalLanguage {
  language: string;
  level: string;
  ratingStars: number;
  maxStars: 5;
  officialLine: string;
}

export const canonicalLanguages: CanonicalLanguage[] = [
  {
    language: "Arabic",
    level: "Native",
    ratingStars: 5,
    maxStars: 5,
    officialLine: "Arabic — Native",
  },
  {
    language: "English",
    level: "B2",
    ratingStars: 4,
    maxStars: 5,
    officialLine: "English — B2",
  },
  {
    language: "German",
    level: "B1",
    ratingStars: 3,
    maxStars: 5,
    officialLine: "German — B1",
  },
];
