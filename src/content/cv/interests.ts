/**
 * Canonical English Standard CV Interests
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf (Page 2)
 */
export interface CanonicalInterestGroup {
  id: string;
  category: "Community" | "Personal" | "Technical";
  rawText: string;
  items: string[];
}

export const canonicalInterests: CanonicalInterestGroup[] = [
  {
    id: "interest-community",
    category: "Community",
    rawText: "Open source, hackathons, tech-club events, mentoring.",
    items: ["Open source", "Hackathons", "Tech-club events", "Mentoring"],
  },
  {
    id: "interest-personal",
    category: "Personal",
    rawText: "Technical reading, sports, scientific research, languages.",
    items: ["Technical reading", "Sports", "Scientific research", "Languages"],
  },
  {
    id: "interest-technical",
    category: "Technical",
    rawText: "Web/mobile, modeling & simulation, cloud computing, electrical systems & control.",
    items: [
      "Web/mobile",
      "Modeling & simulation",
      "Cloud computing",
      "Electrical systems & control",
    ],
  },
];
