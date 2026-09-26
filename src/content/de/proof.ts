import { ProofContent } from "@/contracts/proof";

export const proofContentDe: ProofContent = {
  kicker: "05 / Verifikation & Nachweise",
  title: "Ingenieurnachweise & Verifikation",
  description:
    "Direkte Quellcode-Repositories, lokale Code-Archive, verifizierte Zertifikatsnachweise und governance-konforme Qualifikationen.",
  status: "verified",
  items: [
    {
      id: "proof-project-sources",
      title: "Projekt-Repositories & Quellcode-Archive",
      quote:
        "14 von 16 Ingenieursystemen sind durch verifizierten Quellcode in dedizierten GitHub-Repositories und lokalen Quellarchiven belegt.",
      metric: "14 / 16 quellcode-belegt",
      url: "/de/projects",
      type: "metric",
    },
    {
      id: "proof-credentials",
      title: "Zertifikats- und Nachweisindex",
      quote:
        "21 verifizierte Zertifikate mit Original-PDFs sowie strukturierte Nachverfolgung für laufende Fachprogramme.",
      metric: "21 verifizierte Zertifikate",
      url: "/de/capabilities",
      type: "certification",
    },
    {
      id: "proof-cv-package",
      title: "Offizielles Lebenslauf-Paket",
      quote:
        "Standardisierte dreisprachige Lebenslauf-Pakete auf Deutsch, Englisch und Arabisch in Standard- und ATS-Versionen.",
      metric: "Dreisprachig (DE/EN/AR)",
      url: "/de/about",
      type: "publication",
    },
    {
      id: "proof-references",
      title: "Berufliche Referenzen",
      quote:
        "Akademische und berufliche Empfehlungsschreiben sind auf Anfrage gemäß Datenschutzrichtlinien verfügbar.",
      metric: "Auf Anfrage verfügbar",
      url: "/de/contact",
      type: "recommendation",
    },
  ],
};
