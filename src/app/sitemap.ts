import type { MetadataRoute } from "next";
import { siteMetadata } from "@/content/siteMetadata";
import { getAllProjectSlugs } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.siteUrl;
  const projectSlugs = getAllProjectSlugs();

  const corePaths = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/experience", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/capabilities", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const now = new Date();

  const coreRoutes: MetadataRoute.Sitemap = corePaths.flatMap(({ path, priority, changeFrequency }) => {
    const enUrl = `${baseUrl}${path}`;
    const arUrl = `${baseUrl}/ar${path}`;
    const deUrl = `${baseUrl}/de${path}`;

    const languages = {
      en: enUrl,
      ar: arUrl,
      de: deUrl,
      "x-default": enUrl,
    };

    return [
      {
        url: enUrl,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: arUrl,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: deUrl,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];
  });

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.flatMap((slug) => {
    const enUrl = `${baseUrl}/projects/${slug}`;
    const arUrl = `${baseUrl}/ar/projects/${slug}`;
    const deUrl = `${baseUrl}/de/projects/${slug}`;

    const languages = {
      en: enUrl,
      ar: arUrl,
      de: deUrl,
      "x-default": enUrl,
    };

    return [
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages },
      },
      {
        url: arUrl,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages },
      },
      {
        url: deUrl,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages },
      },
    ];
  });

  return [...coreRoutes, ...projectRoutes];
}
