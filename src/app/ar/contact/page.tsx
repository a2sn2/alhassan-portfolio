import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { contactContentAr, siteMetadataAr } from "@/content/ar";
import { cn } from "@/utils/cn";
import styles from "../../contact/contact.module.css";

export const metadata: Metadata = {
  title: "التواصل وتحميل نسخ السيرة الذاتية الرسمية",
  description: contactContentAr.description,
  alternates: {
    canonical: `${siteMetadataAr.siteUrl}/ar/contact`,
    languages: {
      ar: `${siteMetadataAr.siteUrl}/ar/contact`,
      en: `${siteMetadataAr.siteUrl}/contact`,
      "x-default": `${siteMetadataAr.siteUrl}/contact`,
    },
  },
  openGraph: {
    title: `التواصل وتحميل السيرة الذاتية | ${siteMetadataAr.author.name}`,
    description: contactContentAr.description,
    url: `${siteMetadataAr.siteUrl}/ar/contact`,
    locale: siteMetadataAr.locale,
  },
};

export default function ArabicContactPage() {
  return (
    <div className={styles.contactPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{contactContentAr.kicker}</span>
          <h1 className={styles.title}>{contactContentAr.title}</h1>
          <p className={styles.description}>{contactContentAr.description}</p>
        </header>

        {/* Channels & CV Packages Layout */}
        <div className={styles.layout} style={{ marginTop: "var(--space-10)" }}>
          {/* Direct Channels Column */}
          <div className={styles.channelsColumn}>
            <h2 className={styles.sectionTitle}>قنوات التواصل المباشرة</h2>
            <div className={styles.channelCards}>
              {contactContentAr.methods.map((method) => (
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
                      <span className={styles.channelValue}>
                        <bdi dir="ltr">{method.value}</bdi>
                      </span>
                    </div>
                    <span className={styles.channelArrow} aria-hidden="true">
                      {method.isExternal ? "↗" : "←"}
                    </span>
                  </a>
                  {method.id === "email" && (
                    <div className={styles.copyEmailAffordance}>
                      <CopyEmailButton
                        email={method.value}
                        variant="compact"
                        locale="ar"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.noticeCard}>
              <span className={styles.noticeTitle}>الموقع الجغرافي</span>
              <p className={styles.noticeText}>
                المقر: صنعاء، اليمن.
              </p>
            </div>
          </div>

          {/* Official CV Downloads Column */}
          <div className={styles.cvColumn}>
            <h2 className={styles.sectionTitle}>حزم السيرة الذاتية الرسمية متعددة اللغات</h2>
            <div className={styles.cvGrid}>
              {contactContentAr.cvDocuments.map((doc) => (
                <a
                  key={doc.filename}
                  href={doc.href}
                  download={doc.filename}
                  className={styles.cvCard}
                >
                  <div className={styles.cvInfo}>
                    <div className={styles.cvHeaderRow}>
                      <span className={styles.cvLanguage}>{doc.language}</span>
                      <span className={styles.cvFormatBadge}>
                        <bdi>{doc.format}</bdi>
                      </span>
                    </div>
                    <span className={styles.cvFilename}>
                      <bdi>{doc.filename}</bdi>{" "}
                      {doc.filesize && (
                        <bdi>({doc.filesize})</bdi>
                      )}
                    </span>
                  </div>
                  <div className={styles.cvDownloadAction}>
                    <span>تحميل</span>
                    <span aria-hidden="true">↓</span>
                  </div>
                </a>
              ))}
            </div>

            <div className={styles.noticeCard}>
              <span className={styles.noticeTitle}>سياسة المعرفين المهنيين</span>
              <p className={styles.noticeText}>{contactContentAr.referencesNote}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Chapter 6 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={6} locale="ar" />
    </div>
  );
}
