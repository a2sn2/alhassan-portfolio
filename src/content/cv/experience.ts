/**
 * Canonical English Standard CV Professional Experience
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf (Page 1)
 */
export interface CanonicalRoleItem {
  id: string;
  role: string;
  period: string;
  location: string;
  summary: string;
}

export interface CanonicalOrganizationItem {
  id: string;
  company: string;
  period: string;
  location: string;
  headline?: string;
  roles: CanonicalRoleItem[];
}

export const canonicalExperienceOrganizations: CanonicalOrganizationItem[] = [
  {
    id: "asaas-ai",
    company: "Asaas AI",
    period: "Jan 2026 – Present",
    location: "Sana'a",
    roles: [
      {
        id: "asaas-ai-qa-director",
        role: "Co-Founder & Director of Quality Assurance",
        period: "Jan 2026 – Present",
        location: "Sana'a",
        summary:
          "Established testing and review standards and policies; evaluated software-system and AI-solution quality; and reviewed plans, feasibility studies, and product readiness before approval and launch.",
      },
    ],
  },
  {
    id: "ahd-financial-services",
    company: "AHD for Financial Services Jaib Wallet",
    period: "Sep 2025 – Present",
    location: "Sana'a",
    headline: "Multiple Roles",
    roles: [
      {
        id: "ahd-deputy-dev-manager",
        role: "Deputy Development Manager",
        period: "Jul 2026 – Present",
        location: "Sana'a",
        summary:
          "Managed projects, analyzed internal development requirements, and delivered external system integrations.",
      },
      {
        id: "ahd-developer",
        role: "Developer, Development Dept.",
        period: "Jan – Jul 2026",
        location: "Sana'a",
        summary:
          "Built a production operations/accounting system integrated with Jaib Wallet workflows.",
      },
      {
        id: "ahd-dev-trainee",
        role: "Development Trainee",
        period: "Dec 2025 – Jan 2026",
        location: "Sana'a",
        summary:
          "Worked with .NET backend logic, SQL databases, web features, testing, and troubleshooting.",
      },
      {
        id: "ahd-cs-trainee",
        role: "Customer Service Trainee",
        period: "Sep – Dec 2025",
        location: "Sana'a",
        summary:
          "Handled ticketing-system calls and applied compliance policies.",
      },
    ],
  },
  {
    id: "water-sanitation-corp",
    company: "Water & Sanitation Local Corporation",
    period: "Aug – Dec 2024",
    location: "Al Hudaydah",
    roles: [
      {
        id: "water-control-trainee",
        role: "Control Engineer Trainee",
        period: "Aug – Dec 2024",
        location: "Al Hudaydah",
        summary:
          "Monitored PLC panels and field signals (pumps, levels, alarms); supported preventive maintenance, wiring, and control-loop troubleshooting; coordinated with technicians, documented faults, and ensured safe restart procedures.",
      },
    ],
  },
  {
    id: "al-rahma-foundation",
    company: "Al-Rahma Foundation",
    period: "Jan – Dec 2023",
    location: "Sana'a",
    roles: [
      {
        id: "al-rahma-network-trainee",
        role: "Network Engineer Trainee",
        period: "Jan – Dec 2023",
        location: "Sana'a",
        summary:
          "Operated and maintained internal LAN/Wi-Fi networks and basic router/switch configurations; supported cabling, routine follow-up and logs; documented incidents and suggested stability improvements.",
      },
    ],
  },
  {
    id: "private-healthcare-apparel",
    company: "Private Project (Healthcare & Apparel)",
    period: "2020 – 2022",
    location: "Sana'a",
    roles: [
      {
        id: "private-sales",
        role: "Sales",
        period: "2020 – 2022",
        location: "Sana'a",
        summary:
          "Managed customer relationships, orders and invoices; organized inventory data and prepared simple sales reports; followed up on purchasing and supplier communication.",
      },
    ],
  },
  {
    id: "glory-civilization-schools",
    company: "Glory of Civilization Schools",
    period: "Jan – Dec 2019",
    location: "Sana'a",
    roles: [
      {
        id: "glory-admin-trainee",
        role: "Administrative Assistant Trainee",
        period: "Jan – Dec 2019",
        location: "Sana'a",
        summary:
          "Supported daily school operations, events, schedules, and interdepartmental coordination.",
      },
    ],
  },
];

/**
 * All 9 canonical experience role entries flattened for direct access.
 */
export const canonicalExperienceRoles: Array<
  CanonicalRoleItem & { company: string; organizationId: string }
> = canonicalExperienceOrganizations.flatMap((org) =>
  org.roles.map((r) => ({
    ...r,
    company: org.company,
    organizationId: org.id,
  }))
);
