/**
 * Canonical German Standard CV References (Referenzen)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf (Page 2)
 *
 * PORTFOLIO DISPLAY & DATA PARITY POLICY:
 * This dataset contains complete reference records from the official CV for source parity
 * and content-integrity verification. These contact records are not rendered in the
 * normal public portfolio interface.
 * The public portfolio presents the verified availability note:
 * "Akademische und berufliche Referenzen sind auf Anfrage verfügbar."
 */
export interface CanonicalReferenceItemDe {
  id: string;
  name: string;
  phone: string;
  email?: string;
  isPublic: false;
}

export const canonicalReferencesDe: CanonicalReferenceItemDe[] = [
  {
    id: "ref-al-hazmi",
    name: "Ing. Mohammed Al-Hazmi",
    phone: "+967 774 760 761",
    isPublic: false,
  },
  {
    id: "ref-al-sanea",
    name: "Mohammed Al-Sanea",
    phone: "+967 775 148 168",
    isPublic: false,
  },
  {
    id: "ref-baalawi",
    name: "Prof. Dr. Fadl Baalawi",
    phone: "+967 777 877 766",
    email: "dr.fadlbaalwi@gmail.com",
    isPublic: false,
  },
  {
    id: "ref-al-aghbari",
    name: "Ing. Mohammed Al-Aghbari",
    phone: "+967 771 170 176",
    isPublic: false,
  },
  {
    id: "ref-m-al-ashwal",
    name: "Ing. Mohammed Al-Ashwal",
    phone: "+967 777 196 979",
    email: "moahmmed_alashwal@asas-realestate.com",
    isPublic: false,
  },
  {
    id: "ref-r-al-ashwal",
    name: "Rabab Al-Ashwal",
    phone: "+967 770 013 304",
    email: "ahrab1981@gmail.com",
    isPublic: false,
  },
];

export const canonicalReferencePublicPolicyStatementDe =
  "Akademische und berufliche Referenzen sind auf Anfrage verfügbar.";
