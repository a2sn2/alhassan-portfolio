import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { contactContent, siteMetadata } from "@/content";
import { cn } from "@/utils/cn";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact & Official CV Downloads",
  description: contactContent.description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/contact`,
    languages: {
      en: `${siteMetadata.siteUrl}/contact`,
      ar: `${siteMetadata.siteUrl}/ar/contact`,
      de: `${siteMetadata.siteUrl}/de/contact`,
      "x-default": `${siteMetadata.siteUrl}/contact`,
    },
  },
  openGraph: {
    title: `Contact & Official CV Downloads | ${siteMetadata.author.name}`,
    description: contactContent.description,
    url: `${siteMetadata.siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{contactContent.kicker}</span>
          <h1 className={styles.title}>{contactContent.title}</h1>
          <p className={styles.description}>{contactContent.description}</p>
        </header>

        {/* Channels & CV Packages Layout */}
        <div className={styles.layout} style={{ marginTop: "var(--space-10)" }}>
          {/* Direct Channels Column */}
          <div className={styles.channelsColumn}>
            <h2 className={styles.sectionTitle}>Direct Communication Channels</h2>
            <div className={styles.channelCards}>
              {contactContent.methods.map((method) => (
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
                      <CopyEmailButton email={method.value} variant="compact" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.noticeCard}>
              <span className={styles.noticeTitle}>Location & Time Zone</span>
              <p className={styles.noticeText}>
                Based in Sana&apos;a, Yemen (UTC+3). Available for full-time engineering
                roles, remote collaborations, and technical partnerships.
              </p>
            </div>
          </div>

          {/* Official CV Downloads Column */}
          <div className={styles.cvColumn}>
            <h2 className={styles.sectionTitle}>Official Multi-Language CV Packages</h2>
            <div className={styles.cvGrid}>
              {contactContent.cvDocuments.map((doc) => (
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
                    <span>Download</span>
                    <span aria-hidden="true">↓</span>
                  </div>
                </a>
              ))}
            </div>

            <div className={styles.noticeCard}>
              <span className={styles.noticeTitle}>References Policy</span>
              <p className={styles.noticeText}>{contactContent.referencesNote}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Chapter 6 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={6} />
    </div>
  );
}
