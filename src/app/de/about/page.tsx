import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { aboutContentDe } from "@/content/de/about";
import { siteMetadataDe } from "@/content/de/siteMetadata";
import styles from "../../about/about.module.css";

export const metadata: Metadata = {
  title: "Über mich — Werdegang & Profil",
  description: aboutContentDe.description,
  alternates: {
    canonical: "/de/about",
    languages: {
      en: "/about",
      ar: "/ar/about",
      de: "/de/about",
      "x-default": "/about",
    },
  },
  openGraph: {
    title: "Über mich — Werdegang & Profil | ALHassan Baligh ALShami",
    description: aboutContentDe.description,
    url: "/de/about",
    locale: siteMetadataDe.locale,
  },
};

export default function GermanAboutPage() {
  return (
    <div className={styles.aboutPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{aboutContentDe.kicker}</span>
          <h1 className={styles.title}>{aboutContentDe.title}</h1>
          <p className={styles.description}>{aboutContentDe.description}</p>
        </header>

        {/* Narrative & Credentials Layout */}
        <div className={styles.narrativeLayout} style={{ marginTop: "var(--space-10)" }}>
          {/* Main Editorial Story */}
          <div className={styles.storyColumn}>
            {aboutContentDe.paragraphs.map((para, index) => (
              <p key={index} className={styles.storyParagraph}>
                {para}
              </p>
            ))}
          </div>

          {/* Education & Language Sidebar */}
          <div className={styles.sidebarColumn}>
            {/* Education Feature */}
            <div className={styles.educationCard}>
              <span className={styles.cardKicker}>Akademische Grundlagen</span>
              <h2 className={styles.degreeTitle}>{aboutContentDe.education.degree}</h2>
              <div className={styles.institutionMeta}>
                <strong>{aboutContentDe.education.institution}</strong>
                <div>
                  {aboutContentDe.education.period} · {aboutContentDe.education.location}
                </div>
              </div>

              <div className={styles.thesisBlock}>
                <span className={styles.thesisLabel}>Abschlussarbeit & Forschung: </span>
                <span>{aboutContentDe.education.thesisTitle}</span>
                <p style={{ marginTop: "var(--space-2)", margin: 0 }}>
                  {aboutContentDe.education.thesisDescription}
                </p>
                {aboutContentDe.education.repositoryNote && (
                  <p
                    style={{
                      marginTop: "var(--space-2)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-secondary)",
                      fontStyle: "italic",
                    }}
                  >
                    {aboutContentDe.education.repositoryNote}
                  </p>
                )}
              </div>
            </div>

            {/* Verified Languages */}
            <div className={styles.languagesCard}>
              <span className={styles.cardKicker}>Sprachen & Kommunikation</span>
              <div className={styles.langList}>
                {aboutContentDe.languages.map((lang) => (
                  <div key={lang.language} className={styles.langItem}>
                    <div className={styles.langHeader}>
                      <span className={styles.langName}>{lang.language}</span>
                      <span className={styles.langLevel}>{lang.level}</span>
                    </div>
                    {lang.proficiency && lang.proficiency !== lang.level && (
                      <p className={styles.langDesc}>{lang.proficiency}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Philosophy & Principles */}
        <section className={styles.principlesSection} aria-labelledby="heading-principles">
          <h2 id="heading-principles" className={styles.sectionTitle}>
            Ingenieurphilosophie & Arbeitsprinzipien
          </h2>
          <div className={styles.principlesGrid}>
            {aboutContentDe.principles.map((principle) => (
              <div key={principle.title} className={styles.principleCard}>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleDesc}>{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Interests & Broader Pursuits */}
        {aboutContentDe.interests && aboutContentDe.interests.length > 0 && (
          <section className={styles.interestsSection} aria-labelledby="heading-interests">
            <h2 id="heading-interests" className={styles.sectionTitle}>
              Ingenieurinteressen & Arbeitsfelder
            </h2>
            <div className={styles.interestsGrid}>
              {aboutContentDe.interests.map((interest) => (
                <div key={interest.id} className={styles.interestCard}>
                  <div className={styles.interestHeader}>
                    <span className={styles.interestCategory}>Schwerpunkt {interest.category}</span>
                  </div>
                  <p className={styles.interestSummary}>{interest.summary}</p>
                  <div className={styles.interestChips}>
                    {interest.items.map((item) => (
                      <span key={item} className={styles.interestChip}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References Policy */}
        <div className={styles.referencesBanner} style={{ marginTop: "var(--space-10)" }}>
          <p className={styles.refText}>{aboutContentDe.referencesNote}</p>
          <Link href="/de/contact" className={styles.contactCta}>
            <span>Offizielle Referenzen anfordern</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>

      {/* Chapter 2 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={2} locale="de" />
    </div>
  );
}
