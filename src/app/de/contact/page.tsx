import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { contactContentDe, siteMetadataDe } from "@/content/de";
import { cn } from "@/utils/cn";
import styles from "../../contact/contact.module.css";

export const metadata: Metadata = {
  title: "Kontakt & Offizielle Lebenslauf-Downloads",
  description: contactContentDe.description,
  alternates: {
    canonical: `${siteMetadataDe.siteUrl}/de/contact`,
    languages: {
      de: `${siteMetadataDe.siteUrl}/de/contact`,
      en: `${siteMetadataDe.siteUrl}/contact`,
      ar: `${siteMetadataDe.siteUrl}/ar/contact`,
      "x-default": `${siteMetadataDe.siteUrl}/contact`,
    },
  },
  openGraph: {
    title: `Kontakt & Offizielle Lebenslauf-Downloads | ${siteMetadataDe.author.name}`,
    description: contactContentDe.description,
    url: `${siteMetadataDe.siteUrl}/de/contact`,
    locale: siteMetadataDe.locale,
  },
};

export default function GermanContactPage() {
  return (
    <div className={styles.contactPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{contactContentDe.kicker}</span>
          <h1 className={styles.title}>{contactContentDe.title}</h1>
          <p className={styles.description}>{contactContentDe.description}</p>
        </header>

        {/* Channels & CV Packages Layout */}
        <div className={styles.layout} style={{ marginTop: "var(--space-10)" }}>
          {/* Direct Channels Column */}
          <div className={styles.channelsColumn}>
            <h2 className={styles.sectionTitle}>Direkte Kommunikationskanäle</h2>
            <div className={styles.channelCards}>
              {contactContentDe.methods.map((method) => (
                <div key={method.id} className={styles.channelItem}>
                  <a
                    href={method.href}
                    target={method.isExternal ? "_blank" : undefined}
                    rel={method.isExternal ? "noopener noreferrer" : undefined}
                    className={cn(
                      styles.channelCard,
                      method.isPrimary && styles.channelCardPrimary
                    )}
                  >
                    <div className={styles.channelText}>
                      <span className={styles.channelLabel}>{method.label}</span>
                      <span className={styles.channelValue}>{method.value}</span>
                    </div>
                    <span className={styles.channelArrow} aria-hidden="true">
                      {method.isExternal ? "↗" : "→"}
                    </span>
                  </a>
                  {method.id === "email" && (
                    <div className={styles.copyEmailAffordance}>
                      <CopyEmailButton
                        email={method.value}
                        variant="compact"
                        locale="de"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.noticeCard}>
              <span className={styles.noticeTitle}>Standort</span>
              <p className={styles.noticeText}>
                Standort: {contactContentDe.location}.
              </p>
            </div>
          </div>

          {/* Official CV Downloads Column */}
          <div className={styles.cvColumn}>
            <h2 className={styles.sectionTitle}>Offizielle mehrsprachige Lebenslauf-Pakete</h2>
            <div className={styles.cvGrid}>
              {contactContentDe.cvDocuments.map((doc) => (
                <a
                  key={doc.filename}
                  href={doc.href}
                  download={doc.filename}
                  className={styles.cvCard}
                >
                  <div className={styles.cvInfo}>
                    <div className={styles.cvHeaderRow}>
                      <span className={styles.cvLanguage}>{doc.language}</span>
                      <span className={styles.cvFormatBadge}>{doc.format}</span>
                    </div>
                    <span className={styles.cvFilename}>
                      {doc.filename} {doc.filesize && `(${doc.filesize})`}
                    </span>
                  </div>
                  <div className={styles.cvDownloadAction}>
                    <span>Herunterladen</span>
                    <span aria-hidden="true">↓</span>
                  </div>
                </a>
              ))}
            </div>

            <div className={styles.noticeCard}>
              <span className={styles.noticeTitle}>Referenzen</span>
              <p className={styles.noticeText}>{contactContentDe.referencesNote}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Chapter 6 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={6} locale="de" />
    </div>
  );
}
