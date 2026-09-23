/**
 * Canonical German Standard CV Certifications & Courses (Zertifikate & Kurse)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf (Page 3)
 */
export interface CanonicalCertificationItemDe {
  id: string;
  year: number;
  issuer: string;
  title: string;
  status?: string;
}

export const canonicalCertificationsDe: CanonicalCertificationItemDe[] = [
  {
    id: "cert-cyberai-automation-agents",
    year: 2026,
    issuer: "CYBERAI Club",
    title: "Automatisierung & KI-Agenten",
  },
  {
    id: "cert-yemen-elite-research-dev",
    year: 2025,
    issuer: "Yemen Elite Bloc",
    title: "Forschungsentwicklung",
  },
  {
    id: "cert-yemeni-trainee-work-ethics",
    year: 2025,
    issuer: "Yemen Intern Platform",
    title: "Arbeitsethik, Berufsumfeld & Teamarbeit",
  },
  {
    id: "cert-yemen-elite-ai-program",
    year: 2025,
    issuer: "Yemen Elite Bloc (Technologie- & IT-Sektor)",
    title: "KI-Programm (laufend)",
    status: "laufend",
  },
  {
    id: "cert-yemen-elite-frontend-bootcamp",
    year: 2025,
    issuer: "Yemen Elite Bloc (Technologie- & IT-Sektor)",
    title: "Frontend-Bootcamp (laufend)",
    status: "laufend",
  },
  {
    id: "cert-new-horizons-graphic-design",
    year: 2025,
    issuer: "New Horizons Institute",
    title: "Diplom Grafikdesign (laufend)",
    status: "laufend",
  },
  {
    id: "cert-su-deep-learning-cv",
    year: 2025,
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Deep Learning & Computer Vision",
  },
  {
    id: "cert-su-robotics",
    year: 2025,
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Robotik",
  },
  {
    id: "cert-su-embedded-systems",
    year: 2025,
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Eingebettete Systeme",
  },
  {
    id: "cert-su-matlab",
    year: 2025,
    issuer: "Sana'a University – Faculty of Engineering",
    title: "MATLAB",
  },
  {
    id: "cert-su-network-admin",
    year: 2025,
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Netzwerkadministration",
  },
  {
    id: "cert-su-ai-raspberry-pi",
    year: 2025,
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Künstliche Intelligenz & Raspberry Pi",
  },
  {
    id: "cert-new-horizons-comptia-a",
    year: 2025,
    issuer: "New Horizons Institute",
    title: "CompTIA A+",
  },
  {
    id: "cert-ai-approach-data-ml",
    year: 2025,
    issuer: "AI APPROACH CLUB",
    title: "Datenanalyse & Maschinelles Lernen",
  },
  {
    id: "cert-al-hamdi-medical-program",
    year: 2024,
    issuer: "Al-Hamdi Foundation",
    title: "Medizinisches Programm (Erste Hilfe, Injektionsarten, Vitalzeichen)",
  },
  {
    id: "cert-new-horizons-mikrotik",
    year: 2024,
    issuer: "New Horizons Institute",
    title: "MikroTik-Grundlagen",
  },
  {
    id: "cert-su-networks",
    year: 2024,
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Netzwerke",
  },
  {
    id: "cert-su-plc",
    year: 2024,
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Speicherprogrammierbare Steuerungen (PLC)",
  },
  {
    id: "cert-su-arduino",
    year: 2024,
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Arduino",
  },
  {
    id: "cert-su-solar-energy",
    year: 2024,
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Solarenergie",
  },
  {
    id: "cert-al-hamdi-digital-marketing",
    year: 2024,
    issuer: "Al-Hamdi Foundation",
    title: "Fortgeschrittenes Digitalmarketing",
  },
  {
    id: "cert-al-hamdi-small-project-mgmt",
    year: 2024,
    issuer: "Al-Hamdi Foundation",
    title: "Kleinprojektmanagement",
  },
  {
    id: "cert-al-hamdi-admin-program",
    year: 2024,
    issuer: "Al-Hamdi Foundation",
    title: "Verwaltungsprogramm (BWL, Personalwesen, Kundenservice)",
  },
  {
    id: "cert-al-hamdi-sphere-standards",
    year: 2023,
    issuer: "Al-Hamdi Foundation",
    title: "Humanitäre Nothilfe — SPHERE Standards",
  },
  {
    id: "cert-new-horizons-icdl",
    year: 2020,
    issuer: "New Horizons Institute",
    title: "ICDL (International Computer Driving Licence)",
  },
  {
    id: "cert-cst-phone-maintenance",
    year: 2019,
    issuer: "Science & Technology Center",
    title: "Diplom Mobiltelefon-Reparatur",
  },
];

export const canonicalCertificatesRepositoryNoticeDe = {
  text: "Öffnen → < Zertifikatsdokumente > ←, um sie im Repository anzusehen",
  repoUrl: "https://github.com/a2sn2/certificates.git",
  marker: "Zertifikatsdokumente",
};
