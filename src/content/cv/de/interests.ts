/**
 * Canonical German Standard CV Interests (Interessen)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf (Page 2)
 */
export interface CanonicalInterestItemDe {
  id: string;
  category: string;
  items: string;
  rawText: string;
}

export const canonicalInterestsDe: CanonicalInterestItemDe[] = [
  {
    id: "interest-community",
    category: "Gemeinschaft",
    items: "Open Source, Hackathons, Tech-Club-Veranstaltungen, Mentoring.",
    rawText: "Gemeinschaft: Open Source, Hackathons, Tech-Club-Veranstaltungen, Mentoring.",
  },
  {
    id: "interest-personal",
    category: "Persönlich",
    items: "Technische Lektüre, Sport, wissenschaftliche Recherche, Sprachen.",
    rawText: "Persönlich: Technische Lektüre, Sport, wissenschaftliche Recherche, Sprachen.",
  },
  {
    id: "interest-technical",
    category: "Technisch",
    items: "Web/Mobile, Modellierung & Simulation, Cloud Computing, Elektrotechnik & Steuerung.",
    rawText: "Technisch: Web/Mobile, Modellierung & Simulation, Cloud Computing, Elektrotechnik & Steuerung.",
  },
];
