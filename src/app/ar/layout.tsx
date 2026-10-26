import type { Metadata } from "next";
import { siteMetadataAr } from "@/content/ar/siteMetadata";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/utils/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadataAr.siteUrl),
  title: {
    default: siteMetadataAr.defaultTitle,
    template: siteMetadataAr.titleTemplate,
  },
  description: siteMetadataAr.defaultDescription,
  authors: [{ name: siteMetadataAr.author.name, url: siteMetadataAr.author.url }],
  creator: siteMetadataAr.author.name,
  keywords: siteMetadataAr.keywords,
  alternates: {
    canonical: "/ar",
    languages: {
      en: "/",
      ar: "/ar",
      de: "/de",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: siteMetadataAr.locale,
    url: "/ar",
    title: siteMetadataAr.defaultTitle,
    description: siteMetadataAr.defaultDescription,
    siteName: `${siteMetadataAr.author.name} — معرض الأعمال`,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadataAr.defaultTitle,
    description: siteMetadataAr.defaultDescription,
    creator: "@a2sn4",
    images: [DEFAULT_TWITTER_IMAGE],
  },
};

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" lang="ar" className="arabic-route-root" style={{ width: "100%" }}>
      {children}
    </div>
  );
}
