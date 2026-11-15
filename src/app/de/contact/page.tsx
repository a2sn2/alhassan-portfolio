import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { contactContentDe, siteMetadataDe } from "@/content/de";
import { ProfileIdentityMark } from "@/components/media/ProfileIdentityMark";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/utils/metadata";
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
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Kontakt & Offizielle Lebenslauf-Downloads | ${siteMetadataDe.author.name}`,
    description: contactContentDe.description,
    images: [DEFAULT_TWITTER_IMAGE],
  },
};

export default function GermanContactPage() {
  return (
    <div className={styles.contactPage}>
      <Container>
        {/* Page Header */}
        <Reveal>
          <header className={styles.header}>
            <div className={styles.introMarkRow}>
              <ProfileIdentityMark locale="de" />
              <div className={styles.introMeta}>
                <span className={styles.kicker}>{contactContentDe.kicker}</span>
                <span className={styles.signatureName}>ALHassan Baligh ALShami</span>
              </div>
            </div>
            <h1 className={styles.title}>{contactContentDe.title}</h1>
            <p className={styles.description}>{contactContentDe.description}</p>
          </header>
        </Reveal>

        {/* Channels & CV Packages Layout */}
        <div className={styles.layout} style={{ marginTop: "var(--space-10)" }}>
          {/* Direct Channels Column */}
          <Reveal delay={60} className={styles.channelsColumn}>
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
          </Reveal>

          {/* Official CV Downloads Column */}
          <Reveal delay={100} className={styles.cvColumn}>
            <h2 className={styles.sectionTitle}>Offizielle mehrsprachige Lebenslauf-Pakete</h2>

            <div className={styles.cvGroupContainer}>
              {/* 1. German CV Group */}
              <div className={styles.cvGroupCard}>
                <div className={styles.cvGroupHeader}>
                  <span className={styles.cvGroupTitle}>
                    <span aria-hidden="true">🇩🇪</span>
                    <span>Deutscher Lebenslauf</span>
                  </span>
                  <span className={styles.cvGroupBadge}>2 Versionen verfügbar</span>
                </div>
                <div className={styles.cvVariantsList}>
                  {contactContentDe.cvDocuments
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
                          aria-label={`Deutschen ${doc.format}-Lebenslauf herunterladen (${doc.filesize} PDF)`}
                        >
                          <div className={styles.cvVariantInfo}>
                            <span className={styles.cvVariantTitle}>{title}</span>
                            <div className={styles.cvVariantMeta}>
                              <span className={styles.cvFormatBadge}>{doc.format} PDF</span>
                              <span className={styles.cvVariantSize}>
                                <bdi>{doc.filesize}</bdi>
                              </span>
                            </div>
                          </div>
                          <div className={styles.cvDownloadAction}>
                            <span>PDF herunterladen</span>
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
                    <span>English Curriculum Vitae</span>
                  </span>
                  <span className={styles.cvGroupBadge}>2 Ausgaben</span>
                </div>
                <div className={styles.cvVariantsList}>
                  {contactContentDe.cvDocuments
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
                              <span className={styles.cvFormatBadge}>{doc.format} PDF</span>
                              <span className={styles.cvVariantSize}>
                                <bdi>{doc.filesize}</bdi>
                              </span>
                            </div>
                          </div>
                          <div className={styles.cvDownloadAction}>
                            <span>PDF herunterladen</span>
                            <span aria-hidden="true">↓</span>
                          </div>
                        </a>
                      );
                    })}
                </div>
              </div>

              {/* 3. Arabic CV Group */}
              <div className={styles.cvGroupCard}>
                <div className={styles.cvGroupHeader}>
                  <span className={styles.cvGroupTitle}>
                    <span aria-hidden="true">🇾🇪</span>
                    <span>السيرة الذاتية باللغة العربية (Arabisch)</span>
                  </span>
                  <span className={styles.cvGroupBadge}>2 Versionen</span>
                </div>
                <div className={styles.cvVariantsList}>
                  {contactContentDe.cvDocuments
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
                          aria-label={`Download Arabic ${doc.format} CV (${doc.filesize} PDF)`}
                        >
                          <div className={styles.cvVariantInfo}>
                            <span className={styles.cvVariantTitle}>{title}</span>
                            <div className={styles.cvVariantMeta}>
                              <span className={styles.cvFormatBadge}>{doc.format} PDF</span>
                              <span className={styles.cvVariantSize}>
                                <bdi>{doc.filesize}</bdi>
                              </span>
                            </div>
                          </div>
                          <div className={styles.cvDownloadAction}>
                            <span>PDF herunterladen</span>
                            <span aria-hidden="true">↓</span>
                          </div>
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className={styles.noticeCard}>
              <span className={styles.noticeTitle}>Referenzen</span>
              <p className={styles.noticeText}>{contactContentDe.referencesNote}</p>
            </div>
          </Reveal>
        </div>
      </Container>

    </div>
  );
}
