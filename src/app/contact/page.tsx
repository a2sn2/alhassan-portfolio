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
        <header className={styles.header}>
          <span className={styles.kicker}>{contactContent.kicker}</span>
          <h1 className={styles.title}>{contactContent.title}</h1>
          <p className={styles.description}>{contactContent.description}</p>
        </header>

        <div className={styles.layout} style={{ marginTop: "var(--space-10)" }}>
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
              <span className={styles.noticeTitle}>Official CV Location</span>
              <p className={styles.noticeText}>{contactContent.location}</p>
            </div>
          </div>

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
              <span className={styles.noticeTitle}>References</span>
              <p className={styles.noticeText}>{contactContent.referencesNote}</p>
            </div>
          </div>
        </div>
      </Container>

      <ChapterNav currentChapterIndex={6} />
    </div>
  );
}
