export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavigationContent {
  brandLabel: string;
  navItems: NavItem[];
}
