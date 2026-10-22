import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { aboutContent, siteMetadata } from "@/content";
import { ProfileIdentityMark } from "@/components/media/ProfileIdentityMark";
import { Reveal } from "@/components/ui/Reveal";
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
        <Reveal>
          <header className={styles.header}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <div className={styles.identityKickerGroup}>
                  <span className={styles.kicker}>{aboutContent.kicker}</span>
                  <span className={styles.signatureName}>ALHassan Baligh ALShami</span>
                </div>
                <h1 className={styles.title}>{aboutContent.title}</h1>
                <p className={styles.description}>{aboutContent.description}</p>
              </div>
              <div className={styles.heroPortraitWrap}>
                <ProfileIdentityMark locale="en" variant="editorial" priority />
              </div>
            </div>
          </header>
        </Reveal>

        {/* 1. Professional Story & Practice Focus */}
        <div className={styles.narrativeLayout} style={{ marginTop: "var(--space-10)" }}>
          {/* Main Editorial Story */}
          <Reveal delay={60} className={styles.storyColumn}>
            {aboutContent.paragraphs.map((para, index) => (
              <p key={index} className={styles.storyParagraph}>
                {para}
              </p>
            ))}
          </Reveal>

          {/* Core Specializations & Practice Focus Sidebar */}
          <Reveal delay={100} className={styles.sidebarColumn}>
            <div className={styles.specializationsCard}>
              <div className={styles.specializationsHeader}>
                <span className={styles.cardKicker}>Professional Practice</span>
                <h2 className={styles.specializationsTitle}>Core Engineering Focus</h2>
              </div>
              <div className={styles.specList}>
                {aboutContent.specializations?.map((spec) => (
                  <div key={spec.domain} className={styles.specItem}>
                    <span className={styles.specDomain}>{spec.domain}</span>
                    <span className={styles.specContext}>{spec.roleOrContext}</span>
                    <p className={styles.specDesc}>{spec.description}</p>
                  </div>
                ))}
              </div>
              <Link href="/experience" className={styles.experienceLink}>
                <span>View Professional Experience</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* 2. Engineering Practice & Methods — How I Work */}
        <Reveal delay={80}>
          <section className={styles.principlesSection} aria-labelledby="heading-principles">
            <div className={styles.sectionHeader}>
              <span className={styles.cardKicker}>Engineering Practice & Methods</span>
              <h2 id="heading-principles" className={styles.sectionTitle}>
                How I Work
              </h2>
            </div>
            <div className={styles.principlesGrid}>
              {aboutContent.principles.map((principle) => (
                <div key={principle.title} className={styles.principleCard}>
                  <h3 className={styles.principleTitle}>{principle.title}</h3>
                  <p className={styles.principleDesc}>{principle.description}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* 3. Areas of Interest & Broader Pursuits */}
        {aboutContent.interests && aboutContent.interests.length > 0 && (
          <Reveal delay={100}>
            <section className={styles.interestsSection} aria-labelledby="heading-interests">
              <div className={styles.sectionHeader}>
                <span className={styles.cardKicker}>Broader Pursuits & Community</span>
                <h2 id="heading-interests" className={styles.sectionTitle}>
                  Areas of Interest
                </h2>
              </div>
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
          </Reveal>
        )}

        {/* 4. Academic Foundation & Communication */}
        <Reveal delay={120}>
          <section className={styles.foundationSection} aria-labelledby="heading-foundation">
            <div className={styles.sectionHeader}>
              <span className={styles.cardKicker}>Education & Verified Languages</span>
              <h2 id="heading-foundation" className={styles.sectionTitle}>
                Academic Foundation & Communication
              </h2>
            </div>
            <div className={styles.foundationGrid}>
              {/* Education Card */}
              <div className={styles.educationCard}>
                <span className={styles.cardKicker}>Academic Foundation</span>
                <h3 className={styles.degreeTitle}>{aboutContent.education.degree}</h3>
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
          </section>
        </Reveal>

        {/* 5. References Policy */}
        <Reveal delay={140}>
          <div className={styles.referencesBanner} style={{ marginTop: "var(--space-10)" }}>
            <p className={styles.refText}>{aboutContent.referencesNote}</p>
            <Link href="/contact" className={styles.contactCta}>
              <span>Request References & Details</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
