/**
 * Canonical German Standard CV Projects & Work (Projekte & Arbeiten)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf (Page 4)
 */
export interface CanonicalProjectItemDe {
  index: number;
  slug: string;
  officialTitle: string;
  officialDescription: string;
}

export const canonicalProjectsDe: CanonicalProjectItemDe[] = [
  {
    index: 1,
    slug: "pump-station-analytics",
    officialTitle: "Pumpstation-Analytik",
    officialDescription: "Vorausschauende Wartung für Abwasserpumpen.",
  },
  {
    index: 2,
    slug: "real-time-image-classification-api",
    officialTitle: "Echtzeit-Bildklassifizierungs-API",
    officialDescription:
      "Leichter Flask-Dienst, der ein Bild entgegennimmt und die drei wahrscheinlichsten Klassen zurückgibt.",
  },
  {
    index: 3,
    slug: "real-time-object-detection",
    officialTitle: "Echtzeit-Objekterkennung",
    officialDescription: "Live-Pipeline mit Python/PyTorch und OpenCV.",
  },
  {
    index: 4,
    slug: "omnifood-landing-page",
    officialTitle: "OMNIFOOD — Responsive Landingpage",
    officialDescription:
      "Einseitiges Layout mit Hero-Bereich und Ankernavigation.",
  },
  {
    index: 5,
    slug: "urbanmindos",
    officialTitle: "URBANMINDOS — Smart-City-Betriebssystem",
    officialDescription: "Präsentiert autonome urbane Luftmobilität.",
  },
  {
    index: 6,
    slug: "obstacle-avoidance",
    officialTitle: "Hindernisvermeidung",
    officialDescription:
      "Echtzeit-Monokulartiefenschätzung mit TensorFlow zur Erkennung und Ausweichsteuerung.",
  },
  {
    index: 7,
    slug: "ai-tic-tac-toe",
    officialTitle: "KI-Tic-Tac-Toe",
    officialDescription:
      "Unschlagbare Minimax-KI mit interaktiver Pygame-Oberfläche.",
  },
  {
    index: 8,
    slug: "pacman-pygame",
    officialTitle: "Pac-Man mit PYGAME",
    officialDescription:
      "Version mit Animationen, Kollisionserkennung, Geist-KI und Power-ups.",
  },
  {
    index: 9,
    slug: "text-summarizer",
    officialTitle: "Textzusammenfasser",
    officialDescription:
      "Desktop-Anwendung zur extraktiven Zusammenfassung mit einstellbarer Ausgabelänge.",
  },
  {
    index: 10,
    slug: "inventory-sales-manager",
    officialTitle: "Inventar- & Vertriebsmanager",
    officialDescription:
      "CRUD-Webanwendung für Elektronik (Laptops/Smartphones/PS5).",
  },
  {
    index: 11,
    slug: "user-role-manager",
    officialTitle: "Benutzer- & Rollenverwaltung",
    officialDescription:
      "Benutzer erstellen/aktualisieren, Passwörter zurücksetzen und Berechtigungen vergeben (Oracle Forms 6i + PL/SQL).",
  },
  {
    index: 12,
    slug: "robocam-controller",
    officialTitle: "ROBOCAM CONTROLLER (FLUTTER + DART)",
    officialDescription:
      "Android-App zur Steuerung eines kameragestützten Roboters über einen Bildschirm-Joystick.",
  },
  {
    index: 13,
    slug: "student-evaluation-system",
    officialTitle: "Schülerbewertungssystem",
    officialDescription:
      "Anwesenheits- und Notensystem mit rollenbasiertem Zugriff (Admin/Lehrkraft/Schüler) — C# Desktop + PHP Web.",
  },
  {
    index: 14,
    slug: "cafe-pos-system",
    officialTitle: "Café-POS-System",
    officialDescription:
      "Login, CRUD für Artikel, Verkäufe und Berichte (Java Swing + JDBC).",
  },
  {
    index: 15,
    slug: "mikrotik-hotspot-portal",
    officialTitle: "MIKROTIK-Hotspot-Portal",
    officialDescription:
      "Dual-WAN-RouterOS-Setup mit PPPoE-Leitungen, Hotspot-Portal und RADIUS.",
  },
  {
    index: 16,
    slug: "arduino-traffic-light",
    officialTitle: "ARDUINO-Ampelsteuerung",
    officialDescription:
      "Zweirichtungs-Kreuzung mit Sicherheitslogik und Fußgänger-Taster.",
  },
];

export const canonicalProjectsFooterNoticeDe = {
  text: "Weitere zukünftige Projekte aus Programmierung, Engineering und Grafikdesign auf → GITHUB ←",
  url: "https://github.com/a2sn2",
};
