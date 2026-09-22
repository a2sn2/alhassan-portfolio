import type { Metadata } from "next";
import { siteMetadataAr } from "@/content/ar/siteMetadata";

export const metadata: Metadata = {
  metadataBase: new URL("https://alhassan-portfolio-phi.vercel.app"),
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadataAr.defaultTitle,
    description: siteMetadataAr.defaultDescription,
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
