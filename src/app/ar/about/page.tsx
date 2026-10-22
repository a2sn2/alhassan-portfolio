import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
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
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <div className={styles.identityKickerGroup}>
                  <span className={styles.kicker}>{aboutContentAr.kicker}</span>
                  <span className={styles.signatureName}>الحسن بليغ الشامي</span>
                </div>
                <h1 className={styles.title}>{aboutContentAr.title}</h1>
                <p className={styles.description}>{aboutContentAr.description}</p>
              </div>
              <div className={styles.heroPortraitWrap}>
                <ProfileIdentityMark locale="ar" variant="editorial" priority />
              </div>
            </div>
          </header>
        </Reveal>

        {/* 1. Professional Story & Practice Focus */}
        <div className={styles.narrativeLayout} style={{ marginTop: "var(--space-10)" }}>
          {/* Main Editorial Story */}
          <Reveal delay={60} className={styles.storyColumn}>
            {aboutContentAr.paragraphs.map((para, index) => (
              <p key={index} className={styles.storyParagraph}>
                {para}
              </p>
            ))}
          </Reveal>

          {/* Core Specializations & Practice Focus Sidebar */}
          <Reveal delay={100} className={styles.sidebarColumn}>
            <div className={styles.specializationsCard}>
              <div className={styles.specializationsHeader}>
                <span className={styles.cardKicker}>الممارسة المهنية</span>
                <h2 className={styles.specializationsTitle}>التركيز الهندسي الأساسي</h2>
              </div>
              <div className={styles.specList}>
                {aboutContentAr.specializations?.map((spec) => (
                  <div key={spec.domain} className={styles.specItem}>
                    <span className={styles.specDomain}>{spec.domain}</span>
                    <span className={styles.specContext}>{spec.roleOrContext}</span>
                    <p className={styles.specDesc}>{spec.description}</p>
                  </div>
                ))}
              </div>
              <Link href="/ar/experience" className={styles.experienceLink}>
                <span>استعراض المسيرة المهنية الكاملة</span>
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* 2. Engineering Practice & Methods — كيف أعمل */}
        <Reveal delay={80}>
          <section className={styles.principlesSection} aria-labelledby="heading-principles">
            <div className={styles.sectionHeader}>
              <span className={styles.cardKicker}>منهجية العمل والممارسة الهندسية</span>
              <h2 id="heading-principles" className={styles.sectionTitle}>
                كيف أعمل
              </h2>
            </div>
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

        {/* 3. Areas of Interest & Broader Pursuits — مجالات اهتمامي */}
        {aboutContentAr.interests && aboutContentAr.interests.length > 0 && (
          <Reveal delay={100}>
            <section className={styles.interestsSection} aria-labelledby="heading-interests">
              <div className={styles.sectionHeader}>
                <span className={styles.cardKicker}>المجالات العامة والمشاركات</span>
                <h2 id="heading-interests" className={styles.sectionTitle}>
                  مجالات اهتمامي
                </h2>
              </div>
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

        {/* 4. Academic Foundation & Communication */}
        <Reveal delay={120}>
          <section className={styles.foundationSection} aria-labelledby="heading-foundation">
            <div className={styles.sectionHeader}>
              <span className={styles.cardKicker}>التعليم واللغات المعتمدة</span>
              <h2 id="heading-foundation" className={styles.sectionTitle}>
                الأسس الأكاديمية والتواصل
              </h2>
            </div>
            <div className={styles.foundationGrid}>
              {/* Education Card */}
              <div className={styles.educationCard}>
                <span className={styles.cardKicker}>الأسس الأكاديمية</span>
                <h3 className={styles.degreeTitle}>{aboutContentAr.education.degree}</h3>
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
            </div>
          </section>
        </Reveal>

        {/* 5. References Policy */}
        <Reveal delay={140}>
          <div className={styles.referencesBanner} style={{ marginTop: "var(--space-10)" }}>
            <p className={styles.refText}>{aboutContentAr.referencesNote}</p>
            <Link href="/ar/contact" className={styles.contactCta}>
              <span>طلب المراجع وبيانات التواصل الرسمية</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
