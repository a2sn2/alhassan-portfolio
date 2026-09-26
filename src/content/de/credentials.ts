import { CredentialsContent, CredentialItem } from "@/contracts";
import { attachCredentialEvidence } from "../evidence";

const rawCertifications: CredentialItem[] = [
  {
      id: "cert-cyberai-2026",
      title: "Automatisierung & KI-Agenten",
      issuer: "CYBERAI Club",
      year: "2026",
      category: "AI & Data",
    },
    {
      id: "cert-yeb-research-2025",
      title: "Forschungsentwicklung",
      issuer: "Yemen Elite Bloc",
      year: "2025",
      category: "Professional & Management",
    },
    {
      id: "cert-yemen-intern-2025",
      title: "Arbeitsethik, Berufsumfeld & Teamarbeit",
      issuer: "Yemen Intern Platform",
      year: "2025",
      category: "Professional & Management",
    },
    {
      id: "cert-yeb-ai-2025",
      title: "KI-Programm",
      issuer: "Yemen Elite Bloc (Technologie- & IT-Sektor)",
      year: "2025",
      category: "AI & Data",
      status: "Ongoing",
    },
    {
      id: "cert-yeb-frontend-2025",
      title: "Frontend-Bootcamp",
      issuer: "Yemen Elite Bloc (Technologie- & IT-Sektor)",
      year: "2025",
      category: "AI & Data",
      status: "Ongoing",
    },
    {
      id: "cert-nh-design-2025",
      title: "Diplom Grafikdesign",
      issuer: "New Horizons Institute",
      year: "2025",
      category: "Foundation",
      status: "In Progress",
    },
    {
      id: "cert-su-dl-cv-2025",
      title: "Deep Learning & Computer Vision",
      issuer: "Sana'a University – Faculty of Engineering",
      year: "2025",
      category: "AI & Data",
    },
    {
      id: "cert-su-robotics-2025",
      title: "Robotik",
      issuer: "Sana'a University – Faculty of Engineering",
      year: "2025",
      category: "Engineering & Hardware",
    },
    {
      id: "cert-su-embedded-2025",
      title: "Eingebettete Systeme",
      issuer: "Sana'a University – Faculty of Engineering",
      year: "2025",
      category: "Engineering & Hardware",
    },
    {
      id: "cert-su-matlab-2025",
      title: "MATLAB",
      issuer: "Sana'a University – Faculty of Engineering",
      year: "2025",
      category: "Engineering & Hardware",
    },
    {
      id: "cert-su-netadmin-2025",
      title: "Netzwerkadministration",
      issuer: "Sana'a University – Faculty of Engineering",
      year: "2025",
      category: "Systems & Networks",
    },
    {
      id: "cert-su-ai-rpi-2025",
      title: "Künstliche Intelligenz & Raspberry Pi",
      issuer: "Sana'a University – Faculty of Engineering",
      year: "2025",
      category: "AI & Data",
    },
    {
      id: "cert-nh-aplus-2025",
      title: "CompTIA A+",
      issuer: "New Horizons Institute",
      year: "2025",
      category: "Systems & Networks",
    },
    {
      id: "cert-ai-approach-2025",
      title: "Datenanalyse & Maschinelles Lernen",
      issuer: "AI APPROACH CLUB",
      year: "2025",
      category: "AI & Data",
    },
    {
      id: "cert-alhamdi-med-2024",
      title: "Medizinisches Programm (Erste Hilfe, Injektionsarten, Vitalzeichen)",
      issuer: "Al-Hamdi Foundation",
      year: "2024",
      category: "Foundation",
    },
    {
      id: "cert-nh-mikrotik-2024",
      title: "MikroTik-Grundlagen",
      issuer: "New Horizons Institute",
      year: "2024",
      category: "Systems & Networks",
    },
    {
      id: "cert-su-networks-2024",
      title: "Netzwerke",
      issuer: "Sana'a University – Faculty of Engineering",
      year: "2024",
      category: "Systems & Networks",
    },
    {
      id: "cert-su-plc-2024",
      title: "Speicherprogrammierbare Steuerungen (PLC)",
      issuer: "Sana'a University – Faculty of Engineering",
      year: "2024",
      category: "Engineering & Hardware",
    },
    {
      id: "cert-su-arduino-2024",
      title: "Arduino",
      issuer: "Sana'a University – Faculty of Engineering",
      year: "2024",
      category: "Engineering & Hardware",
    },
    {
      id: "cert-su-solar-2024",
      title: "Solarenergie",
      issuer: "Sana'a University – Faculty of Engineering",
      year: "2024",
      category: "Engineering & Hardware",
    },
    {
      id: "cert-alhamdi-marketing-2024",
      title: "Fortgeschrittenes Digitalmarketing",
      issuer: "Al-Hamdi Foundation",
      year: "2024",
      category: "Professional & Management",
    },
    {
      id: "cert-alhamdi-projmgmt-2024",
      title: "Kleinprojektmanagement",
      issuer: "Al-Hamdi Foundation",
      year: "2024",
      category: "Professional & Management",
    },
    {
      id: "cert-alhamdi-admin-2024",
      title: "Verwaltungsprogramm (BWL, Personalwesen, Kundenservice)",
      issuer: "Al-Hamdi Foundation",
      year: "2024",
      category: "Professional & Management",
    },
    {
      id: "cert-sphere-2023",
      title: "Humanitäre Nothilfe — SPHERE Standards",
      issuer: "Al-Hamdi Foundation",
      year: "2023",
      category: "Foundation",
    },
    {
      id: "cert-nh-icdl-2020",
      title: "ICDL (International Computer Driving Licence)",
      issuer: "New Horizons Institute",
      year: "2020",
      category: "Foundation",
    },
    {
      id: "cert-phone-maint-2019",
      title: "Diplom Mobiltelefon-Reparatur",
      issuer: "Science & Technology Center",
      year: "2019",
      category: "Engineering & Hardware",
    }
];

export const credentialsContentDe: CredentialsContent = {
  kicker: "Zertifikate & Nachweise",
  title: "Fachzertifikate & Engagement in Fachgesellschaften",
  description:
    "Verifizierte Zertifikate, akademische Fachprogramme und Mitgliedschaften in Fachorganisationen in den Bereichen KI, Netzwerke, Embedded Systems und Projektmanagement.",
  overviewText:
    "Deep Learning, Computer Vision, Robotik, Embedded Systems, Netzwerk-Routing und Projektmanagement.",
  certificationsRepoUrl: "https://github.com/a2sn2/certificates",
  certifications: rawCertifications.map(attachCredentialEvidence),
  memberships: [
    {
      id: "membership-cyberai",
      organization: "CYBERAI CLUB",
      role: "Mitglied der Ausschüsse für Künstliche Intelligenz und Projekte",
      description: "Mitglied der Ausschüsse für Künstliche Intelligenz und Projekte.",
    },
    {
      id: "membership-spe",
      organization: "SOCIETY OF PETROLEUM ENGINEERS (SPE)",
      role: "Teilnehmer technischer Fachprogramme",
      description:
        "Nutzung technischer SPE-Programme zur Vertiefung des Verständnisses für Erdöltechnik und betriebliche Abläufe.",
    },
    {
      id: "membership-alhamdi",
      organization: "Al-Hamdi Foundation for Human Development",
      role: "Programmteilnehmer & Freiwilliger",
      description:
        "Programmteilnehmer und Freiwilliger; Unterstützung von Veranstaltungen und Peer-Learning.",
    },
    {
      id: "membership-nastatee",
      organization: "Nastatee Charity Association",
      role: "Ehrenamtlicher Unterstützer",
      description:
        "Ehrenamtliche Unterstützung von Technologieinitiativen für Jugendliche und Veranstaltungslogistik.",
    },
    {
      id: "membership-yeb",
      organization: "Yemen Elite Bloc",
      role: "Aktives Mitglied",
      description:
        "Aktiv in KI-/Robotik- und Programmierbereichen; Peer-Mentoring und Unterstützung der Veranstaltungslogistik.",
    },
  
  ],
};
