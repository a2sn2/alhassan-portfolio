import { siteMetadata } from "@/content/siteMetadata";
import { identityContent } from "@/content/identity";

export const DEFAULT_OG_IMAGE = {
  url: `${siteMetadata.siteUrl}/images/og-preview.png`,
  width: 1200,
  height: 630,
  alt: `${identityContent.fullName} — Software Engineer Portfolio`,
  type: "image/png",
};

export const DEFAULT_TWITTER_IMAGE = `${siteMetadata.siteUrl}/images/og-preview.png`;
