/**
 * Canonical Arabic Standard CV References (المراجع)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf (Page 2)
 *
 * PORTFOLIO DISPLAY & DATA PARITY POLICY:
 * This dataset contains complete reference records from the official CV for source parity
 * and content-integrity verification. These contact records are not rendered in the
 * normal public portfolio interface.
 * The public portfolio presents the verified availability note:
 * "المراجع الأكاديمية والمهنية متاحة عند الطلب."
 */
export interface CanonicalReferenceItemAr {
  id: string;
  name: string;
  phone: string;
  email?: string;
  isPublic: false;
}

export const canonicalReferencesAr: CanonicalReferenceItemAr[] = [
  {
    id: "ref-al-hazmi",
    name: "م. محمد الحزمي",
    phone: "967774760761",
    isPublic: false,
  },
  {
    id: "ref-al-sanea",
    name: "محمد الصانع",
    phone: "967775148168",
    isPublic: false,
  },
  {
    id: "ref-baalawi",
    name: "أ.د. فضل باعلوي",
    phone: "967777877766",
    email: "dr.fadlbaalwi@gmail.com",
    isPublic: false,
  },
  {
    id: "ref-al-aghbari",
    name: "م. محمد الأغبري",
    phone: "967771170176",
    isPublic: false,
  },
  {
    id: "ref-m-al-ashwal",
    name: "م. محمد الأشول",
    phone: "967777196979",
    email: "moahmmed_alashwal@asas-realestate.com",
    isPublic: false,
  },
  {
    id: "ref-r-al-ashwal",
    name: "أ. رباب الأشول",
    phone: "967770013304",
    email: "ahrab1981@gmail.com",
    isPublic: false,
  },
];

export const publicReferencesPolicyNoteAr =
  "المراجع الأكاديمية والمهنية متاحة عند الطلب.";
