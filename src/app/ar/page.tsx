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
} from "@/content/ar";
import styles from "../home.module.css";

export default function ArabicHomePage() {
  const featuredProjects = projectItemsAr.filter(
    (p) => p.presentationTier === "featured"
  );
  const recentRoles = experienceContentAr.items.slice(0, 3);

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
              <span>عرض جميع المشاريع (16 مشروعاً)</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>

          <div className={styles.projectsGrid}>
            {featuredProjects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
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
              </article>
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
            {recentRoles.map((role) => (
              <div key={role.id} className={styles.experienceCard}>
                <div className={styles.roleHeader}>
                  <span className={styles.roleCompany}>{role.company}</span>
                  <span className={styles.rolePeriod}>
                    <bdi>{role.period}</bdi>
                  </span>
                </div>
                <h3 className={styles.roleTitle}>{role.role}</h3>
                <p className={styles.roleDesc}>{role.description}</p>
                <div className={styles.techPills}>
                  {role.technologies.map((t) => (
                    <span key={t} className={styles.techPill}>
                      <bdi>{t}</bdi>
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
            <div className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>المجالات الأساسية</h3>
              <p className={styles.capText}>
                {skillsContentAr.groups.map((g) => g.category).join(" · ")}
              </p>
            </div>

            <div className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>
                {credentialsContentAr.certifications.length} شهادة تخصصية معتمدة
              </h3>
              <p className={styles.capText}>
                {credentialsContentAr.overviewText}
              </p>
            </div>

            <div className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>المشاركات والعضويات المهنية</h3>
              <p className={styles.capText}>
                {credentialsContentAr.memberships.map((m) => m.organization).join(" · ")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Chapter 1 of 5 sequential navigation */}
      <ChapterNav currentChapterIndex={1} />
    </div>
  );
}
