import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { aboutContent, siteMetadata } from "@/content";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About & Engineering Profile",
  description: aboutContent.description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/about`,
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
        <header className={styles.header}>
          <span className={styles.kicker}>{aboutContent.kicker}</span>
          <h1 className={styles.title}>{aboutContent.title}</h1>
          <p className={styles.description}>{aboutContent.description}</p>
        </header>

        <div className={styles.narrativeLayout} style={{ marginTop: "var(--space-10)" }}>
          <div className={styles.storyColumn}>
            {aboutContent.paragraphs.map((para, index) => (
              <p key={index} className={styles.storyParagraph}>
                {para}
              </p>
            ))}
          </div>

          <div className={styles.sidebarColumn}>
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
                <span className={styles.thesisLabel}>Graduation Project: </span>
                <span>{aboutContent.education.thesisTitle}</span>
                <p style={{ marginTop: "var(--space-2)", margin: 0 }}>
                  {aboutContent.education.thesisDescription}
                </p>
              </div>
            </div>

            <div className={styles.languagesCard}>
              <span className={styles.cardKicker}>Language Skills</span>
              <div className={styles.langList}>
                {aboutContent.languages.map((lang) => (
                  <div key={lang.language} className={lang.language ? styles.langItem : ""}>
                    <div className={styles.langHeader}>
                      <span className={styles.langName}>{lang.language}</span>
                      <span className={styles.langLevel}>{lang.level}</span>
                    </div>
                    {lang.proficiency && <p className={styles.langDesc}>{lang.proficiency}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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

        <div className={styles.referencesBanner} style={{ marginTop: "var(--space-10)" }}>
          <p className={styles.refText}>{aboutContent.referencesNote}</p>
          <Link href="/official-cv" className={styles.contactCta}>
            <span>Open Official CV Record</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>

      <ChapterNav currentChapterIndex={2} />
    </div>
  );
}
