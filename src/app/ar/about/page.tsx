import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { aboutContentAr } from "@/content/ar/about";
import { siteMetadataAr } from "@/content/ar/siteMetadata";
import { ProfileIdentityMark } from "@/components/media/ProfileIdentityMark";
import { Reveal } from "@/components/ui/Reveal";
import styles from "../../about/about.module.css";

export const metadata: Metadata = {
  title: "نبذة عن المسيرة الهندسية والملف الشخصي",
  description: aboutContentAr.description,
  alternates: {
    canonical: "/ar/about",
    languages: {
      en: "/about",
      ar: "/ar/about",
      de: "/de/about",
      "x-default": "/about",
    },
  },
  openGraph: {
    title: "نبذة عن المسيرة الهندسية والملف الشخصي | الحسن بليغ الشامي",
    description: aboutContentAr.description,
    url: "/ar/about",
    locale: siteMetadataAr.locale,
  },
};

export default function ArabicAboutPage() {
  return (
    <div className={styles.aboutPage}>
      <Container>
        {/* Page Header */}
        <Reveal>
          <header className={styles.header}>
            <div className={styles.introMarkRow}>
              <ProfileIdentityMark locale="ar" priority />
              <div className={styles.introMeta}>
                <span className={styles.kicker}>{aboutContentAr.kicker}</span>
                <span className={styles.signatureName}>الحسن بليغ الشامي</span>
              </div>
            </div>
            <h1 className={styles.title}>{aboutContentAr.title}</h1>
            <p className={styles.description}>{aboutContentAr.description}</p>
          </header>
        </Reveal>

        {/* Narrative & Credentials Layout */}
        <div className={styles.narrativeLayout} style={{ marginTop: "var(--space-10)" }}>
          {/* Main Editorial Story */}
          <Reveal delay={60} className={styles.storyColumn}>
            {aboutContentAr.paragraphs.map((para, index) => (
              <p key={index} className={styles.storyParagraph}>
                {para}
              </p>
            ))}
          </Reveal>

          {/* Education & Language Sidebar */}
          <Reveal delay={100} className={styles.sidebarColumn}>
            {/* Education Feature */}
            <div className={styles.educationCard}>
              <span className={styles.cardKicker}>الأسس الأكاديمية</span>
              <h2 className={styles.degreeTitle}>{aboutContentAr.education.degree}</h2>
              <div className={styles.institutionMeta}>
                <strong>{aboutContentAr.education.institution}</strong>
                <div>
                  <bdi>{aboutContentAr.education.period}</bdi> · {aboutContentAr.education.location}
                </div>
              </div>

              <div className={styles.thesisBlock}>
                <span className={styles.thesisLabel}>مشروع وبحث التخرج: </span>
                <span>{aboutContentAr.education.thesisTitle}</span>
                <p style={{ marginTop: "var(--space-2)", margin: 0 }}>
                  {aboutContentAr.education.thesisDescription}
                </p>
                {aboutContentAr.education.repositoryNote && (
                  <p
                    style={{
                      marginTop: "var(--space-2)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-secondary)",
                      fontStyle: "italic",
                    }}
                  >
                    {aboutContentAr.education.repositoryNote}
                  </p>
                )}
              </div>
            </div>

            {/* Verified Languages */}
            <div className={styles.languagesCard}>
              <span className={styles.cardKicker}>اللغات والتواصل</span>
              <div className={styles.langList}>
                {aboutContentAr.languages.map((lang) => (
                  <div key={lang.language} className={lang.language ? styles.langItem : ""}>
                    <div className={styles.langHeader}>
                      <span className={styles.langName}>{lang.language}</span>
                      <span className={styles.langLevel}>
                        <bdi>{lang.level}</bdi>
                      </span>
                    </div>
                    <p className={styles.langDesc}>{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Engineering Philosophy & Principles */}
        <Reveal delay={80}>
          <section className={styles.principlesSection} aria-labelledby="heading-principles">
            <h2 id="heading-principles" className={styles.sectionTitle}>
              المبادئ الهندسية وفلسفة العمل
            </h2>
            <div className={styles.principlesGrid}>
              {aboutContentAr.principles.map((principle) => (
                <div key={principle.title} className={styles.principleCard}>
                  <h3 className={styles.principleTitle}>{principle.title}</h3>
                  <p className={styles.principleDesc}>{principle.description}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Engineering Interests & Broader Pursuits */}
        {aboutContentAr.interests && aboutContentAr.interests.length > 0 && (
          <Reveal delay={120}>
            <section className={styles.interestsSection} aria-labelledby="heading-interests">
              <h2 id="heading-interests" className={styles.sectionTitle}>
                الاهتمامات الهندسية والمجالات العامة
              </h2>
              <div className={styles.interestsGrid}>
                {aboutContentAr.interests.map((interest) => (
                  <div key={interest.id} className={styles.interestCard}>
                    <div className={styles.interestHeader}>
                      <span className={styles.interestCategory}>محور {interest.category}</span>
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

        {/* References Policy */}
        <Reveal delay={160}>
          <div className={styles.referencesBanner} style={{ marginTop: "var(--space-10)" }}>
            <p className={styles.refText}>{aboutContentAr.referencesNote}</p>
            <Link href="/ar/contact" className={styles.contactCta}>
              <span>طلب المراجع وبيانات التواصل الرسمية</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </Reveal>
      </Container>

      {/* Chapter 2 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={2} />
    </div>
  );
}
