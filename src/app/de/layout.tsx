import type { Metadata } from "next";
import { siteMetadataDe } from "@/content/de/siteMetadata";

export const metadata: Metadata = {
  metadataBase: new URL("https://alhassan-portfolio-phi.vercel.app"),
  title: {
    default: siteMetadataDe.defaultTitle,
    template: siteMetadataDe.titleTemplate,
  },
  description: siteMetadataDe.defaultDescription,
  authors: [{ name: siteMetadataDe.author.name, url: siteMetadataDe.author.url }],
  creator: siteMetadataDe.author.name,
  keywords: siteMetadataDe.keywords,
  alternates: {
    canonical: "/de",
    languages: {
      en: "/",
      ar: "/ar",
      de: "/de",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: siteMetadataDe.locale,
    url: "/de",
    title: siteMetadataDe.defaultTitle,
    description: siteMetadataDe.defaultDescription,
    siteName: `${siteMetadataDe.author.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadataDe.defaultTitle,
    description: siteMetadataDe.defaultDescription,
  },
};

export default function GermanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="ltr" lang="de" className="german-route-root" style={{ width: "100%" }}>
      {children}
    </div>
  );
}
