import { identityContent } from "@/content/identity";
import { navigationContent } from "@/content/navigation";
import { socialLinks } from "@/content/social";
import { SiteConfig } from "./types";

const github = socialLinks.find((s) => s.platform === "GitHub");

export const siteConfig: SiteConfig = {
  name: identityContent.fullName,
  title: `${identityContent.fullName} — ${identityContent.role}`,
  role: identityContent.role,
  bioBrief: identityContent.bioBrief,
  githubUsername: github?.username ?? "a2sn2",
  githubUrl: github?.url ?? "https://github.com/a2sn2",
  navItems: navigationContent.navItems,
};
