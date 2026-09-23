/**
 * Canonical German Standard CV Experience (Berufserfahrung)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf (Page 1)
 */
export interface CanonicalRoleItemDe {
  id: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  company?: string;
  organizationId?: string;
}

export interface CanonicalOrganizationItemDe {
  id: string;
  company: string;
  period: string;
  location: string;
  headline?: string;
  roles: CanonicalRoleItemDe[];
}

export const canonicalExperienceOrganizationsDe: CanonicalOrganizationItemDe[] = [
  {
    id: "asas-ai",
    company: "Asas AI",
    period: "Jan. 2026 – heute",
    location: "Sanaa",
    roles: [
      {
        id: "asas-ai-qa-director",
        role: "Mitgründer & Leiter der Qualitätssicherung",
        period: "Jan. 2026 – heute",
        location: "Sanaa",
        summary:
          "Einführung von Test- und Review-Standards und -Richtlinien; Bewertung der Qualität von Softwaresystemen und KI-Lösungen; Prüfung von Plänen, Machbarkeitsstudien und Produktreife vor Freigabe und Markteinführung.",
      },
    ],
  },
  {
    id: "ahd-financial-services",
    company: "AHD Financial Services – Jaib Wallet",
    period: "Sept. 2025 – heute",
    location: "Sanaa",
    headline: "Verschiedene Funktionen",
    roles: [
      {
        id: "ahd-deputy-dev-manager",
        role: "Stellv. Entwicklungsleiter",
        period: "Juli 2026 – heute",
        location: "Sanaa",
        summary:
          "Organisation und Steuerung von Projekten, Analyse interner Entwicklungsanforderungen und Umsetzung von Systemintegrationen mit externen Institutionen.",
      },
      {
        id: "ahd-developer",
        role: "Entwickler, Entwicklungsabteilung",
        period: "Jan. 2026 – Juli 2026",
        location: "Sanaa",
        summary:
          "Aufbau eines produktiven Systems für Betrieb und Abrechnung, integriert in die Workflows von Jaib Wallet.",
      },
      {
        id: "ahd-dev-trainee",
        role: "Trainee, Entwicklungsabteilung",
        period: "Dez. 2025 – Jan. 2026",
        location: "Sanaa",
        summary:
          "Arbeit mit .NET-Backend-Logik, SQL-Datenbanken, Webfunktionen, Tests und Fehlerbehebung.",
      },
      {
        id: "ahd-cs-trainee",
        role: "Trainee im Kundenservice",
        period: "Sept. – Dez. 2025",
        location: "Sanaa",
        summary:
          "Bearbeitung von Tickets im System und Anwendung von Compliance-Richtlinien.",
      },
    ],
  },
  {
    id: "water-sanitation-corp",
    company: "Water & Sanitation Local Corporation",
    period: "Aug. – Dez. 2024",
    location: "Al Hudaydah",
    roles: [
      {
        id: "water-control-trainee",
        role: "Praktikant als Steuerungsingenieur",
        period: "Aug. – Dez. 2024",
        location: "Al Hudaydah",
        summary:
          "Überwachung von SPS/PLC-Panels und Feldsignalen (Pumpen, Füllstände, Alarme); Unterstützung bei vorbeugender Wartung, Verdrahtung und Fehleranalyse in Regelkreisen; Abstimmung mit Technikern, Dokumentation von Störungen und Sicherstellung eines sicheren Wiederanlaufs.",
      },
    ],
  },
  {
    id: "al-rahma-foundation",
    company: "Al-Rahma Foundation",
    period: "Jan. – Dez. 2023",
    location: "Sanaa",
    roles: [
      {
        id: "al-rahma-network-trainee",
        role: "Praktikant als Netzwerkingenieur",
        period: "Jan. – Dez. 2023",
        location: "Sanaa",
        summary:
          "Betrieb und Wartung interner LAN/Wi-Fi-Netze sowie Durchführung grundlegender Router-/Switch-Konfigurationen; Unterstützung bei Verkabelung, laufender Betreuung und Protokollierung; Dokumentation von Vorfällen und Vorschläge zur Stabilitätsverbesserung.",
      },
    ],
  },
  {
    id: "private-project-healthcare-apparel",
    company: "Privates Projekt (Gesundheitswesen & Bekleidung)",
    period: "2020 – 2022",
    location: "Sanaa",
    roles: [
      {
        id: "private-project-sales",
        role: "Vertrieb",
        period: "2020 – 2022",
        location: "Sanaa",
        summary:
          "Betreuung von Kundenbeziehungen, Bestellungen und Rechnungen; Organisation von Bestandsdaten und Erstellung einfacher Verkaufsberichte; Nachverfolgung von Einkäufen und Kommunikation mit Lieferanten.",
      },
    ],
  },
  {
    id: "glory-civilization-schools",
    company: "Glory of Civilization Schools",
    period: "Jan. – Dez. 2019",
    location: "Sanaa",
    roles: [
      {
        id: "glory-admin-trainee",
        role: "Praktikant als Verwaltungsassistent",
        period: "Jan. – Dez. 2019",
        location: "Sanaa",
        summary:
          "Unterstützung des Schulbetriebs, von Veranstaltungen, Zeitplänen und der abteilungsübergreifenden Kommunikation.",
      },
    ],
  },
];

export const canonicalExperienceRolesDe: CanonicalRoleItemDe[] =
  canonicalExperienceOrganizationsDe.flatMap((org) =>
    org.roles.map((r) => ({
      ...r,
      company: org.company,
      organizationId: org.id,
    }))
  );
