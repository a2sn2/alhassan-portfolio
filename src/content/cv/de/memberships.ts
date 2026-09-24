/**
 * Canonical German Standard CV Memberships (Mitgliedschaften)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf (Page 2)
 */
export interface CanonicalMembershipItemDe {
  id: string;
  index: number;
  organization: string;
  summary: string;
}

export const canonicalMembershipsDe: CanonicalMembershipItemDe[] = [
  {
    id: "membership-1",
    index: 1,
    organization: "CYBERAI CLUB",
    summary: "Mitglied der Ausschüsse für Künstliche Intelligenz und Projekte.",
  },
  {
    id: "membership-2",
    index: 2,
    organization: "SOCIETY OF PETROLEUM ENGINEERS (SPE)",
    summary:
      "Nutzung technischer SPE-Programme zur Vertiefung des Verständnisses für Erdöltechnik und betriebliche Abläufe.",
  },
  {
    id: "membership-3",
    index: 3,
    organization: "Al-Hamdi Foundation for Human Development",
    summary:
      "Programmteilnehmer und Freiwilliger; Unterstützung von Veranstaltungen und Peer-Learning.",
  },
  {
    id: "membership-4",
    index: 4,
    organization: "Nastatee Charity Association",
    summary:
      "Ehrenamtliche Unterstützung von Technologieinitiativen für Jugendliche und Veranstaltungslogistik.",
  },
  {
    id: "membership-5",
    index: 5,
    organization: "Yemen Elite Bloc",
    summary:
      "Aktiv in KI-/Robotik- und Programmierbereichen; Peer-Mentoring und Unterstützung der Veranstaltungslogistik.",
  },
];
