export interface FocusPillar {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface Identity {
  fullName: string;
  shortName: string;
  role: string;
  headline: string;
  bioBrief: string;
  location: string;
  email: string;
  phone: string;
  statusBadge: {
    label: string;
    showDot: boolean;
  };
  educationHighlight: string;
  focusHeading?: string;
  focusSubheading?: string;
  focusPillars?: FocusPillar[];
}

