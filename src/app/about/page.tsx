import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { aboutContent, siteMetadata } from "@/content";
import { ProfilePortrait } from "@/components/media/ProfilePortrait";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About & Engineering Profile",
  description: aboutContent.description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/about`,
    languages: {
      en: `${siteMetadata.siteUrl}/about`,
      ar: `${siteMetadata.siteUrl}/ar/about`,
      de: `${siteMetadata.siteUrl}/de/about`,
      "x-default": `${siteMetadata.siteUrl}/about`,
    },
  },
  openGraph: {
    title: `About & Engineering Profile | ${siteMetadata.author.name}`,
    description: aboutContent.description,
    url: `${siteMetadata.siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.kicker}>{aboutContent.kicker}</span>
            <h1 className={styles.title}>{aboutContent.title}</h1>
            <p className={styles.description}>{aboutContent.description}</p>
          </div>
          <div className={styles.headerPortrait}>
            <ProfilePortrait
              variant="formal"
              locale="en"
              priority
              sizes="(max-width: 640px) 240px, (max-width: 860px) 260px, 300px"
            />
          </div>
        </header>

        {/* Narrative & Credentials Layout */}
        <div className={styles.narrativeLayout} style={{ marginTop: "var(--space-10)" }}>
          {/* Main Editorial Story */}
          <div className={styles.storyColumn}>
            {aboutContent.paragraphs.map((para, index) => (
              <p key={index} className={styles.storyParagraph}>
                {para}
              </p>
            ))}
          </div>

          {/* Education & Language Sidebar */}
          <div className={styles.sidebarColumn}>
            {/* Education Feature */}
            <div className={styles.educationCard}>
              <span className={styles.cardKicker}>Academic Foundation</span>
              <h2 className={styles.degreeTitle}>{aboutContent.education.degree}</h2>
              <div className={styles.institutionMeta}>
                <strong>{aboutContent.education.institution}</strong>
                <div>
                  {aboutContent.education.period} · {aboutContent.education.location}
                </div>
              </div>

              <div className={styles.thesisBlock}>
                <span className={styles.thesisLabel}>Graduation Research Thesis: </span>
                <span>{aboutContent.education.thesisTitle}</span>
                <p style={{ marginTop: "var(--space-2)", margin: 0 }}>
                  {aboutContent.education.thesisDescription}
                </p>
                {aboutContent.education.repositoryNote && (
                  <p
                    style={{
                      marginTop: "var(--space-2)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-secondary)",
                      fontStyle: "italic",
                    }}
                  >
                    {aboutContent.education.repositoryNote}
                  </p>
                )}
              </div>
            </div>

            {/* Verified Languages */}
            <div className={styles.languagesCard}>
              <span className={styles.cardKicker}>Languages & Communication</span>
              <div className={styles.langList}>
                {aboutContent.languages.map((lang) => (
                  <div key={lang.language} className={lang.language ? styles.langItem : ""}>
                    <div className={styles.langHeader}>
                      <span className={styles.langName}>{lang.language}</span>
                      <span className={styles.langLevel}>{lang.level}</span>
                    </div>
                    <p className={styles.langDesc}>{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Philosophy & Principles */}
        <section className={styles.principlesSection} aria-labelledby="heading-principles">
          <h2 id="heading-principles" className={styles.sectionTitle}>
            Engineering Principles & Working Philosophy
          </h2>
          <div className={styles.principlesGrid}>
            {aboutContent.principles.map((principle) => (
              <div key={principle.title} className={styles.principleCard}>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleDesc}>{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Interests & Broader Pursuits */}
        {aboutContent.interests && aboutContent.interests.length > 0 && (
          <section className={styles.interestsSection} aria-labelledby="heading-interests">
            <h2 id="heading-interests" className={styles.sectionTitle}>
              Engineering Interests & Broader Pursuits
            </h2>
            <div className={styles.interestsGrid}>
              {aboutContent.interests.map((interest) => (
                <div key={interest.id} className={styles.interestCard}>
                  <div className={styles.interestHeader}>
                    <span className={styles.interestCategory}>{interest.category} Focus</span>
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
          <p className={styles.refText}>{aboutContent.referencesNote}</p>
          <Link href="/contact" className={styles.contactCta}>
            <span>Request References & Details</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>

      {/* Chapter 2 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={2} />
    </div>
  );
}
