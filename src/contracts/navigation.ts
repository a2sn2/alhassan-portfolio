export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  chapterIndex?: number;
  description?: string;
}

export interface NavigationContent {
  brandLabel: string;
  navItems: NavItem[];
}
