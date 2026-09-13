import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/ui/SkipLink";
import { siteMetadata } from "@/content/siteMetadata";
import { identityContent } from "@/content/identity";
import { socialLinks } from "@/content/social";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: siteMetadata.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.defaultTitle,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.defaultDescription,
  authors: [{ name: siteMetadata.author.name, url: siteMetadata.author.url }],
  creator: siteMetadata.author.name,
  keywords: siteMetadata.keywords,
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    url: siteMetadata.siteUrl,
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    siteName: `${siteMetadata.author.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteMetadata.siteUrl}/#person`,
        name: identityContent.fullName,
        alternateName: identityContent.shortName,
        jobTitle: identityContent.role,
        description: identityContent.bioBrief,
        url: siteMetadata.siteUrl,
        sameAs: socialLinks.map((link) => link.url),
      },
      {
        "@type": "WebSite",
        "@id": `${siteMetadata.siteUrl}/#website`,
        url: siteMetadata.siteUrl,
        name: `${identityContent.fullName} — Portfolio`,
        description: siteMetadata.defaultDescription,
        publisher: {
          "@id": `${siteMetadata.siteUrl}/#person`,
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="app-shell">
        <SkipLink targetId="main-content" />
        <Header />
        <main id="main-content" className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
