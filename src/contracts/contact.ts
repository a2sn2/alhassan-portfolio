export interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  isPrimary?: boolean;
  isExternal?: boolean;
}

export interface CvDocument {
  label: string;
  language: "English" | "German" | "Arabic";
  format: "Standard" | "ATS";
  href: string;
  filename: string;
  filesize?: string;
}

export interface ContactContent {
  kicker: string;
  title: string;
  description: string;
  directEmail: string;
  directPhone: string;
  location: string;
  methods: ContactMethod[];
  cvDocuments: CvDocument[];
  referencesNote: string;
}
