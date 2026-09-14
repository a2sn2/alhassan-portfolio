export interface Identity {
  fullName: string;
  shortName: string;
  role: string;
  headline: string;
  bioBrief: string;
  location?: string;
  statusBadge: {
    label: string;
    showDot: boolean;
  };
}
