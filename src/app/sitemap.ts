import type { MetadataRoute } from "next";
import { siteMetadata } from "@/content/siteMetadata";
import { getAllProjectSlugs } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.siteUrl;
  const projectSlugs = getAllProjectSlugs();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          ar: `${baseUrl}/ar`,
          "x-default": `${baseUrl}/`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
          ar: `${baseUrl}/ar/about`,
          "x-default": `${baseUrl}/about`,
        },
      },
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/experience`,
          ar: `${baseUrl}/ar/experience`,
          "x-default": `${baseUrl}/experience`,
        },
      },
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/projects`,
          ar: `${baseUrl}/ar/projects`,
          "x-default": `${baseUrl}/projects`,
        },
      },
    },
    {
      url: `${baseUrl}/capabilities`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/capabilities`,
          ar: `${baseUrl}/ar/capabilities`,
          "x-default": `${baseUrl}/capabilities`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/contact`,
          ar: `${baseUrl}/ar/contact`,
          "x-default": `${baseUrl}/contact`,
        },
      },
    },
    // Arabic Core Routes
    {
      url: `${baseUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          ar: `${baseUrl}/ar`,
          "x-default": `${baseUrl}/`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
          ar: `${baseUrl}/ar/about`,
          "x-default": `${baseUrl}/about`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/experience`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/experience`,
          ar: `${baseUrl}/ar/experience`,
          "x-default": `${baseUrl}/experience`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/projects`,
          ar: `${baseUrl}/ar/projects`,
          "x-default": `${baseUrl}/projects`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/capabilities`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/capabilities`,
          ar: `${baseUrl}/ar/capabilities`,
          "x-default": `${baseUrl}/capabilities`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/contact`,
          ar: `${baseUrl}/ar/contact`,
          "x-default": `${baseUrl}/contact`,
        },
      },
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/projects/${slug}`,
          ar: `${baseUrl}/ar/projects/${slug}`,
          "x-default": `${baseUrl}/projects/${slug}`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/projects/${slug}`,
          ar: `${baseUrl}/ar/projects/${slug}`,
          "x-default": `${baseUrl}/projects/${slug}`,
        },
      },
    },
  ]);

  return [...coreRoutes, ...projectRoutes];
}
