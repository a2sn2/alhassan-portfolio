/**
 * Canonical English Standard CV Memberships
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf (Page 2)
 */
export interface CanonicalMembership {
  id: string;
  index: number;
  organization: string;
  description: string;
}

export const canonicalMemberships: CanonicalMembership[] = [
  {
    id: "membership-cyberai",
    index: 1,
    organization: "CYBERAI CLUB",
    description: "Member of the Artificial Intelligence and Projects Committees.",
  },
  {
    id: "membership-spe",
    index: 2,
    organization: "SOCIETY OF PETROLEUM ENGINEERS (SPE)",
    description:
      "Used SPE technical programs to broaden understanding of petroleum engineering and operations.",
  },
  {
    id: "membership-alhamdi",
    index: 3,
    organization: "Al-Hamdi Foundation for Human Development",
    description: "Program participant and volunteer; supported events and peer learning.",
  },
  {
    id: "membership-nastatee",
    index: 4,
    organization: "Nastatee Charity Association",
    description:
      "Community volunteer supporting youth technology initiatives and event logistics.",
  },
  {
    id: "membership-yeb",
    index: 5,
    organization: "Yemen Elite Bloc",
    description:
      "Active in AI/robotics and programming units; peer mentoring and event logistics support.",
  },
];
