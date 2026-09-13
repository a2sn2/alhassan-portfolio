export interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  isPrimary?: boolean;
  isExternal?: boolean;
}

export interface ContactContent {
  kicker: string;
  title: string;
  description: string;
  methods: ContactMethod[];
  status: "verified" | "placeholder";
  placeholderNotice?: string;
  placeholderText?: string;
}
