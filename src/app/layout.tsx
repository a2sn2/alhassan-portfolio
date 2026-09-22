import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/ui/SkipLink";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { DocumentLocaleSync } from "@/components/layout/DocumentLocaleSync";
import { siteMetadata } from "@/content/siteMetadata";
import { identityContent } from "@/content/identity";
import { socialLinks } from "@/content/social";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F2F7" },
    { media: "(prefers-color-scheme: dark)", color: "#121316" },
  ],
  colorScheme: "light dark",
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
    languages: {
      en: siteMetadata.siteUrl,
      ar: `${siteMetadata.siteUrl}/ar`,
      "x-default": siteMetadata.siteUrl,
    },
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geistMono.variable} ${notoSansArabic.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}else if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.setAttribute("data-theme","dark")}else{document.documentElement.setAttribute("data-theme","light")}}catch(e){}})();(function(){try{var p=window.location.pathname;var isAr=p==="/ar"||p.indexOf("/ar/")===0;if(isAr){document.documentElement.setAttribute("dir","rtl");document.documentElement.setAttribute("lang","ar")}else{document.documentElement.setAttribute("dir","ltr");document.documentElement.setAttribute("lang","en")}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="app-shell">
        <DocumentLocaleSync />
        <SkipLink targetId="main-content" />
        <CommandPalette />
        <Header />
        <main id="main-content" className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
