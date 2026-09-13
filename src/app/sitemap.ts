import type { MetadataRoute } from "next";
import { siteMetadata } from "@/content/siteMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMetadata.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
