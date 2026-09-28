import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { Badge } from "@/components/ui/Badge";
import {
  identityContentAr,
  projectItemsAr,
  experienceContentAr,
  skillsContentAr,
  credentialsContentAr,
  proofContentAr,
} from "@/content/ar";
import { jaibExperienceJourney } from "@/content";
import { ProofSection } from "@/components/sections/ProofSection";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";
import styles from "../home.module.css";

export default function ArabicHomePage() {
  const featuredProjects = projectItemsAr.filter(
    (p) => p.presentationTier === "featured"
  );
  const asaasRole = experienceContentAr.items.find((i) => i.id === "asaas-ai-qa");
  const foundationRole = experienceContentAr.items.find(
    (i) => i.id === "water-sanitation-control-trainee"
  );

  return (
    <div className={styles.homeWrapper}>
      {/* 1. Hero with Verified Identity & Positioning */}
      <HeroSection content={identityContentAr} />

      {/* 2. Featured Projects Preview */}
      <section className={styles.previewSection} aria-labelledby="heading-featured-work">
        <Container>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTextGroup}>
              <span className={styles.kicker}>أعمال هندسية مختارة</span>
              <h2 id="heading-featured-work" className={styles.heading}>
                مشاريع تقنية وأنظمة منتقاة
              </h2>
            </div>
            <Link href="/ar/projects" className={styles.viewAllLink}>
              <span>{`عرض جميع المشاريع (${projectItemsAr.length} مشروعاً)`}</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>

          <div className={styles.projectsGrid}>
            {featuredProjects.map((project, index) => (
              <Reveal
                as="article"
                key={project.id}
                delay={index * 50}
                className={styles.projectCard}
              >
                <div className={styles.cardHeader}>
                  <Badge variant="category">{project.category}</Badge>
                  {project.badge && (
                    <Badge variant="tech">{project.badge}</Badge>
                  )}
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectTagline}>{project.tagline}</p>

                {project.result && (
                  <div className={styles.projectSnippet}>
                    <strong>النتيجة:</strong> {project.result}
                  </div>
                )}

                <div className={styles.techPills}>
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      <bdi>{tech}</bdi>
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={styles.techPill}>
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  <Link
                    href={`/ar/projects/${project.slug}`}
                    className={styles.caseStudyLink}
                    aria-label={`اقرأ تفاصيل مشروع ${project.title}`}
                  >
                    <span>استكشف دراسة الحالة</span>
                    <span aria-hidden="true">←</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Experience & Operational Journey Snapshot */}
      <section className={styles.previewSectionAlternate} aria-labelledby="heading-experience-snapshot">
        <Container>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTextGroup}>
              <span className={styles.kicker}>المسار والخبرات العملية</span>
              <h2 id="heading-experience-snapshot" className={styles.heading}>
                أبرز المحطات التشغيلية والقيادية
              </h2>
            </div>
            <Link href="/ar/experience" className={styles.viewAllLink}>
              <span>استكشف المسار الزمني التفاعلي</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>

          <div className={styles.experienceCards}>
            {/* A. Current QA / company leadership context */}
            {asaasRole && (
              <Reveal delay={0} className={styles.experienceCard}>
                <div className={styles.roleHeader}>
                  <span className={styles.roleCompany}>{asaasRole.company}</span>
                  <span className={styles.rolePeriod}>
                    <bdi>{asaasRole.period}</bdi>
                  </span>
                </div>
                <h3 className={styles.roleTitle}>{asaasRole.role}</h3>
                <p className={styles.roleDesc}>{asaasRole.description}</p>
                <div className={styles.techPills}>
                  {asaasRole.technologies.map((t) => (
                    <span key={t} className={styles.techPill}>
                      <bdi>{t}</bdi>
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            {/* B. Jaib Wallet Career Progression Editorial Feature */}
            <Reveal
              delay={50}
              className={cn(styles.experienceCard, styles.progressionHighlightCard)}
            >
              <div className={styles.roleHeader}>
                <span className={styles.roleCompany}>
                  {jaibExperienceJourney.organization.ar}
                </span>
                <span className={styles.progressionBadge}>
                  {jaibExperienceJourney.label.ar}
                </span>
              </div>

              <div className={styles.progressionTimelineBar}>
                <span className={styles.progressionDateStart}>
                  <bdi>سبتمبر 2025</bdi>
                </span>
                <div className={styles.progressionBarLine} aria-hidden="true">
                  <span className={styles.progressionBarDot} />
                  <span className={styles.progressionBarTrack} />
                  <span
                    className={cn(
                      styles.progressionBarDot,
                      styles.progressionBarDotCurrent
                    )}
                  />
                </div>
                <span className={styles.progressionDateEnd}>
                  <bdi>الآن</bdi>
                </span>
              </div>

              <div className={styles.homeStagesList}>
                {jaibExperienceJourney.stages.map((stage) => {
                  const roleItem = experienceContentAr.items.find(
                    (i) => i.id === stage.roleId
                  );
                  return (
                    <div
                      key={stage.roleId}
                      className={cn(
                        styles.homeStageItem,
                        stage.isCurrent && styles.homeStageItemCurrent
                      )}
                    >
                      <span
                        className={cn(
                          styles.homeStageDot,
                          stage.isCurrent && styles.homeStageDotCurrent
                        )}
                        aria-hidden="true"
                      />
                      <span className={styles.homeStageNum}>
                        {stage.stageNumber}
                      </span>
                      <span className={styles.homeStageTitle}>
                        {roleItem ? roleItem.role : stage.shortTitle.ar}
                      </span>
                      {stage.isCurrent && (
                        <span className={styles.homeStageCurrentTag}>
                          {jaibExperienceJourney.currentBadge.ar}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className={styles.progressionSummary}>
                {jaibExperienceJourney.summary.ar}
              </p>

              <div className={styles.progressionCtaWrap}>
                <Link
                  href="/ar/experience#ahd-financial-deputy"
                  className={styles.progressionCtaLink}
                >
                  <span>{jaibExperienceJourney.cta.ar}</span>
                  <span aria-hidden="true">←</span>
                </Link>
              </div>
            </Reveal>

            {/* C. Earlier Engineering Foundation */}
            {foundationRole && (
              <Reveal delay={100} className={styles.experienceCard}>
                <div className={styles.roleHeader}>
                  <span className={styles.roleCompany}>
                    {foundationRole.company}
                  </span>
                  <span className={styles.rolePeriod}>
                    <bdi>{foundationRole.period}</bdi>
                  </span>
                </div>
                <h3 className={styles.roleTitle}>{foundationRole.role}</h3>
                <p className={styles.roleDesc}>{foundationRole.description}</p>
                <div className={styles.techPills}>
                  {foundationRole.technologies.map((t) => (
                    <span key={t} className={styles.techPill}>
                      <bdi>{t}</bdi>
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* 4. Capabilities & Credentials Overview */}
      <section className={styles.previewSection} aria-labelledby="heading-capabilities-preview">
        <Container>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTextGroup}>
              <span className={styles.kicker}>المهارات والإثباتات المعتمدة</span>
              <h2 id="heading-capabilities-preview" className={styles.heading}>
                القدرات التقنية والشهادات المهنية
              </h2>
            </div>
            <Link href="/ar/capabilities" className={styles.viewAllLink}>
              <span>المصفوفة الكاملة للقدرات</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>

          <div className={styles.capabilitiesPreviewGrid}>
            <Reveal delay={0} className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>المجالات الأساسية</h3>
              <p className={styles.capText}>
                {skillsContentAr.groups.map((g) => g.category).join(" · ")}
              </p>
            </Reveal>

            <Reveal delay={50} className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>
                {credentialsContentAr.certifications.length} شهادة ودورة
              </h3>
              <p className={styles.capText}>
                {credentialsContentAr.overviewText}
              </p>
            </Reveal>

            <Reveal delay={100} className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>المشاركات والعضويات المهنية</h3>
              <p className={styles.capText}>
                {credentialsContentAr.memberships.map((m) => m.organization).join(" · ")}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 5. Proof & Verification Section */}
      <ProofSection content={proofContentAr} locale="ar" />

      {/* Chapter 1 of 5 sequential navigation */}
      <ChapterNav currentChapterIndex={1} />
    </div>
  );
}
