import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { contactContentAr, siteMetadataAr } from "@/content/ar";
import { ProfileIdentityMark } from "@/components/media/ProfileIdentityMark";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/utils/metadata";
import styles from "../../contact/contact.module.css";

export const metadata: Metadata = {
  title: "التواصل وتحميل نسخ السيرة الذاتية الرسمية",
  description: contactContentAr.description,
  alternates: {
    canonical: `${siteMetadataAr.siteUrl}/ar/contact`,
    languages: {
      ar: `${siteMetadataAr.siteUrl}/ar/contact`,
      en: `${siteMetadataAr.siteUrl}/contact`,
      de: `${siteMetadataAr.siteUrl}/de/contact`,
      "x-default": `${siteMetadataAr.siteUrl}/contact`,
    },
  },
  openGraph: {
    title: `التواصل وتحميل السيرة الذاتية | ${siteMetadataAr.author.name}`,
    description: contactContentAr.description,
    url: `${siteMetadataAr.siteUrl}/ar/contact`,
    locale: siteMetadataAr.locale,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `التواصل وتحميل السيرة الذاتية | ${siteMetadataAr.author.name}`,
    description: contactContentAr.description,
    images: [DEFAULT_TWITTER_IMAGE],
  },
};

export default function ArabicContactPage() {
  return (
    <div className={styles.contactPage}>
      <Container>
        {/* Page Header */}
        <Reveal>
          <header className={styles.header}>
            <div className={styles.introMarkRow}>
              <ProfileIdentityMark locale="ar" />
              <div className={styles.introMeta}>
                <span className={styles.kicker}>{contactContentAr.kicker}</span>
                <span className={styles.signatureName}>الحسن بليغ الشامي</span>
              </div>
            </div>
            <h1 className={styles.title}>{contactContentAr.title}</h1>
            <p className={styles.description}>{contactContentAr.description}</p>
          </header>
        </Reveal>

        {/* Channels & CV Packages Layout */}
        <div className={styles.layout} style={{ marginTop: "var(--space-10)" }}>
          {/* Direct Channels Column */}
          <Reveal delay={60} className={styles.channelsColumn}>
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
          </Reveal>

          {/* Official CV Downloads Column */}
          <Reveal delay={100} className={styles.cvColumn}>
            <h2 className={styles.sectionTitle}>حزم السيرة الذاتية الرسمية متعددة اللغات</h2>

            <div className={styles.cvGroupContainer}>
              {/* 1. Arabic CV Group */}
              <div className={styles.cvGroupCard}>
                <div className={styles.cvGroupHeader}>
                  <span className={styles.cvGroupTitle}>
                    <span aria-hidden="true">🇾🇪</span>
                    <span>السيرة الذاتية باللغة العربية</span>
                  </span>
                  <span className={styles.cvGroupBadge}>نسختان متاحتان</span>
                </div>
                <div className={styles.cvVariantsList}>
                  {contactContentAr.cvDocuments
                    .filter((d) => d.language === "Arabic")
                    .map((doc) => {
                      const isStandard = doc.format === "Standard";
                      const title = isStandard
                        ? "السيرة الذاتية القياسية (PDF)"
                        : "سيرة ذاتية متوافقة مع ATS (PDF)";
                      return (
                        <a
                          key={doc.filename}
                          href={doc.href}
                          download={doc.filename}
                          className={styles.cvVariantItem}
                          aria-label={`تحميل السيرة الذاتية باللغة العربية ${doc.format} (${doc.filesize} PDF)`}
                        >
                          <div className={styles.cvVariantInfo}>
                            <span className={styles.cvVariantTitle}>{title}</span>
                            <div className={styles.cvVariantMeta}>
                              <span className={styles.cvFormatBadge}>
                                <bdi>{doc.format} PDF</bdi>
                              </span>
                              <span className={styles.cvVariantSize}>
                                <bdi>{doc.filesize}</bdi>
                              </span>
                            </div>
                          </div>
                          <div className={styles.cvDownloadAction}>
                            <span>تحميل PDF</span>
                            <span aria-hidden="true">↓</span>
                          </div>
                        </a>
                      );
                    })}
                </div>
              </div>

              {/* 2. English CV Group */}
              <div className={styles.cvGroupCard}>
                <div className={styles.cvGroupHeader}>
                  <span className={styles.cvGroupTitle}>
                    <span aria-hidden="true">🇬🇧</span>
                    <span>السيرة الذاتية بالإنجليزية (English)</span>
                  </span>
                  <span className={styles.cvGroupBadge}>نسختان متاحتان</span>
                </div>
                <div className={styles.cvVariantsList}>
                  {contactContentAr.cvDocuments
                    .filter((d) => d.language === "English")
                    .map((doc) => {
                      const isStandard = doc.format === "Standard";
                      const title = isStandard
                        ? "Standard Curriculum Vitae (PDF)"
                        : "ATS-Optimized Curriculum Vitae (PDF)";
                      return (
                        <a
                          key={doc.filename}
                          href={doc.href}
                          download={doc.filename}
                          className={styles.cvVariantItem}
                          aria-label={`Download English ${doc.format} CV (${doc.filesize} PDF)`}
                        >
                          <div className={styles.cvVariantInfo}>
                            <span className={styles.cvVariantTitle}>{title}</span>
                            <div className={styles.cvVariantMeta}>
                              <span className={styles.cvFormatBadge}>
                                <bdi>{doc.format} PDF</bdi>
                              </span>
                              <span className={styles.cvVariantSize}>
                                <bdi>{doc.filesize}</bdi>
                              </span>
                            </div>
                          </div>
                          <div className={styles.cvDownloadAction}>
                            <span>تحميل PDF</span>
                            <span aria-hidden="true">↓</span>
                          </div>
                        </a>
                      );
                    })}
                </div>
              </div>

              {/* 3. German CV Group */}
              <div className={styles.cvGroupCard}>
                <div className={styles.cvGroupHeader}>
                  <span className={styles.cvGroupTitle}>
                    <span aria-hidden="true">🇩🇪</span>
                    <span>السيرة الذاتية بالألمانية (Deutsch)</span>
                  </span>
                  <span className={styles.cvGroupBadge}>نسختان متاحتان</span>
                </div>
                <div className={styles.cvVariantsList}>
                  {contactContentAr.cvDocuments
                    .filter((d) => d.language === "German")
                    .map((doc) => {
                      const isStandard = doc.format === "Standard";
                      const title = isStandard
                        ? "Standard-Lebenslauf (PDF)"
                        : "ATS-optimierter Lebenslauf (PDF)";
                      return (
                        <a
                          key={doc.filename}
                          href={doc.href}
                          download={doc.filename}
                          className={styles.cvVariantItem}
                          aria-label={`Download German ${doc.format} CV (${doc.filesize} PDF)`}
                        >
                          <div className={styles.cvVariantInfo}>
                            <span className={styles.cvVariantTitle}>{title}</span>
                            <div className={styles.cvVariantMeta}>
                              <span className={styles.cvFormatBadge}>
                                <bdi>{doc.format} PDF</bdi>
                              </span>
                              <span className={styles.cvVariantSize}>
                                <bdi>{doc.filesize}</bdi>
                              </span>
                            </div>
                          </div>
                          <div className={styles.cvDownloadAction}>
                            <span>تحميل PDF</span>
                            <span aria-hidden="true">↓</span>
                          </div>
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className={styles.noticeCard}>
              <span className={styles.noticeTitle}>سياسة المعرفين المهنيين</span>
              <p className={styles.noticeText}>{contactContentAr.referencesNote}</p>
            </div>
          </Reveal>
        </div>
      </Container>

    </div>
  );
}
