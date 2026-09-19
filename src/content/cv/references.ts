/**
 * Canonical English Standard CV References
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf (Page 2)
 *
 * PORTFOLIO DISPLAY & DATA PARITY POLICY:
 * This dataset contains complete reference records from the official CV for source parity
 * and content-integrity verification. These contact records are not rendered in the
 * normal portfolio interface.
 * The public portfolio presents the verified availability note:
 * "Academic and professional references from faculty leadership, engineering supervisors, and executive directors are available upon request."
 */
export interface CanonicalReferenceItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  isPublic: false;
}

export const canonicalReferences: CanonicalReferenceItem[] = [
  {
    id: "ref-al-hazmi",
    name: "Eng. Mohammed Al-Hazmi",
    phone: "+967 774 760 761",
    isPublic: false,
  },
  {
    id: "ref-al-sanea",
    name: "Mohammed Al Sanea",
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
    name: "Eng. Mohammed Al Aghbari",
    phone: "+967 771 170 176",
    isPublic: false,
  },
  {
    id: "ref-m-al-ashwal",
    name: "Eng. Mohammed Al Ashwal",
    phone: "+967 777 196 979",
    email: "moahmmed_alashwal@asas-realestate.com",
    isPublic: false,
  },
  {
    id: "ref-r-al-ashwal",
    name: "Ms. Rabab Al Ashwal",
    phone: "+967 770 013 304",
    email: "ahrab1981@gmail.com",
    isPublic: false,
  },
];

export const publicReferencesPolicyNote =
  "Academic and professional references from faculty leadership, engineering supervisors, and executive directors are available upon request.";
