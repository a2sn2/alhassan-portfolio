/**
 * Canonical English Standard CV Certifications & Courses
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf (Page 3)
 */
export interface CanonicalCertificationItem {
  id: string;
  year: string;
  issuer: string;
  title: string;
  explicitStatus?: "Ongoing" | "In Progress";
  certificateRepoNotice?: boolean;
}

export const canonicalCertifications: CanonicalCertificationItem[] = [
  {
    id: "cert-cyberai-automation-2026",
    year: "2026",
    issuer: "CYBERAI Club",
    title: "Automation & AI Agents",
  },
  {
    id: "cert-yeb-research-2025",
    year: "2025",
    issuer: "Yemen Elite Bloc",
    title: "Research Development",
  },
  {
    id: "cert-yemen-intern-2025",
    year: "2025",
    issuer: "Yemen Intern Platform",
    title: "Work Ethics, Professional Environment & Teamwork",
  },
  {
    id: "cert-yeb-ai-ongoing-2025",
    year: "2025",
    issuer: "Yemen Elite Bloc (Technology & IT Sector)",
    title: "Artificial Intelligence Program",
    explicitStatus: "Ongoing",
  },
  {
    id: "cert-yeb-frontend-bootcamp-2025",
    year: "2025",
    issuer: "Yemen Elite Bloc (Technology & IT Sector)",
    title: "Front-End Development Bootcamp",
    explicitStatus: "Ongoing",
  },
  {
    id: "cert-nh-graphic-design-2025",
    year: "2025",
    issuer: "New Horizons Institutes",
    title: "Graphic Design Diploma",
    explicitStatus: "In Progress",
  },
  {
    id: "cert-su-deep-learning-2025",
    year: "2025",
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Deep Learning & Computer Vision",
  },
  {
    id: "cert-su-robotics-2025",
    year: "2025",
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Robotics",
  },
  {
    id: "cert-su-embedded-2025",
    year: "2025",
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Embedded Systems",
  },
  {
    id: "cert-su-matlab-2025",
    year: "2025",
    issuer: "Sana'a University – Faculty of Engineering",
    title: "MATLAB",
  },
  {
    id: "cert-su-network-admin-2025",
    year: "2025",
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Network Administration",
  },
  {
    id: "cert-su-ai-rpi-2025",
    year: "2025",
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Artificial Intelligence & Raspberry Pi",
  },
  {
    id: "cert-nh-aplus-2025",
    year: "2025",
    issuer: "New Horizons Institutes",
    title: "CompTIA A+",
  },
  {
    id: "cert-ai-approach-2025",
    year: "2025",
    issuer: "AI APPROACH CLUB",
    title: "Data Analysis & Machine Learning",
  },
  {
    id: "cert-alhamdi-med-2024",
    year: "2024",
    issuer: "Al-Hamdi Foundation",
    title: "Medical Program (First Aid, Injection Types, Vital Signs)",
  },
  {
    id: "cert-nh-mikrotik-2024",
    year: "2024",
    issuer: "New Horizons Institutes",
    title: "MikroTik Fundamentals",
  },
  {
    id: "cert-su-networks-2024",
    year: "2024",
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Networks",
  },
  {
    id: "cert-su-plc-2024",
    year: "2024",
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Programmable Logic Controllers (PLC)",
  },
  {
    id: "cert-su-arduino-2024",
    year: "2024",
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Arduino",
  },
  {
    id: "cert-su-solar-2024",
    year: "2024",
    issuer: "Sana'a University – Faculty of Engineering",
    title: "Solar Energy",
  },
  {
    id: "cert-alhamdi-marketing-2024",
    year: "2024",
    issuer: "Al-Hamdi Foundation",
    title: "Advanced Digital Marketing",
  },
  {
    id: "cert-alhamdi-projmgmt-2024",
    year: "2024",
    issuer: "Al-Hamdi Foundation",
    title: "Small Project Management",
  },
  {
    id: "cert-alhamdi-admin-2024",
    year: "2024",
    issuer: "Al-Hamdi Foundation",
    title: "Administrative Program (Business, Human Resources, Customer Service)",
  },
  {
    id: "cert-alhamdi-sphere-2023",
    year: "2023",
    issuer: "Al-Hamdi Foundation",
    title: "Emergency Humanitarian Response — SPHERE Standards",
  },
  {
    id: "cert-nh-icdl-2020",
    year: "2020",
    issuer: "New Horizons Institutes",
    title: "ICDL (International Computer Driving Licence)",
  },
  {
    id: "cert-phone-maint-2019",
    year: "2019",
    issuer: "Science & Technology Center",
    title: "Mobile Phone Maintenance Diploma",
  },
];

export const canonicalCertificatesRepositoryNotice = {
  text: "Open --< Certificate Documents >-- to view them in the repository.",
  repoUrl: "https://github.com/a2sn2/certificates.git",
};
