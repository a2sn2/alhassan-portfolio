import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { Badge } from "@/components/ui/Badge";
import {
  identityContent,
  projectItems,
  getFeaturedProjects,
  experienceContent,
  skillsContent,
  credentialsContent,
  proofContent,
  jaibExperienceJourney,
} from "@/content";
import { ProofSection } from "@/components/sections/ProofSection";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";
import styles from "./home.module.css";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const asaasRole = experienceContent.items.find((i) => i.id === "asaas-ai-qa");
  const foundationRole = experienceContent.items.find(
    (i) => i.id === "water-sanitation-corp"
  );

  return (
    <div className={styles.homeWrapper}>
      {/* 1. Hero with Verified Identity & Positioning */}
      <HeroSection content={identityContent} />

      {/* 2. Featured Projects Preview */}
      <section className={styles.previewSection} aria-labelledby="heading-featured-work">
        <Container>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTextGroup}>
              <span className={styles.kicker}>Featured Engineering Work</span>
              <h2 id="heading-featured-work" className={styles.heading}>
                Selected Technical Projects & Systems
              </h2>
            </div>
            <Link href="/projects" className={styles.viewAllLink}>
              <span>{`View All ${projectItems.length} Projects`}</span>
              <span aria-hidden="true">→</span>
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
                    <strong>Outcome:</strong> {project.result}
                  </div>
                )}

                <div className={styles.techPills}>
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
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
                    href={`/projects/${project.slug}`}
                    className={styles.caseStudyLink}
                    aria-label={`Read case study for ${project.title}`}
                  >
                    <span>Explore Case Study</span>
                    <span aria-hidden="true">→</span>
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
              <span className={styles.kicker}>Career & Experience</span>
              <h2 id="heading-experience-snapshot" className={styles.heading}>
                Operational & Leadership Highlights
              </h2>
            </div>
            <Link href="/experience" className={styles.viewAllLink}>
              <span>Explore Interactive Timeline</span>
              <span aria-hidden="true">→</span>
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
                      {t}
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
                  {jaibExperienceJourney.organization.en}
                </span>
                <span className={styles.progressionBadge}>
                  {jaibExperienceJourney.label.en}
                </span>
              </div>

              <div className={styles.progressionTimelineBar}>
                <span className={styles.progressionDateStart}>
                  <bdi>Sep 2025</bdi>
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
                  <bdi>Present</bdi>
                </span>
              </div>

              <div className={styles.homeStagesList}>
                {jaibExperienceJourney.stages.map((stage) => {
                  const roleItem = experienceContent.items.find(
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
                        {roleItem ? roleItem.role : stage.shortTitle.en}
                      </span>
                      {stage.isCurrent && (
                        <span className={styles.homeStageCurrentTag}>
                          {jaibExperienceJourney.currentBadge.en}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className={styles.progressionSummary}>
                {jaibExperienceJourney.summary.en}
              </p>

              <div className={styles.progressionCtaWrap}>
                <Link
                  href="/experience#ahd-financial-deputy"
                  className={styles.progressionCtaLink}
                >
                  <span>{jaibExperienceJourney.cta.en}</span>
                  <span aria-hidden="true">→</span>
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
                      {t}
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
              <span className={styles.kicker}>Skills & Verified Proof</span>
              <h2 id="heading-capabilities-preview" className={styles.heading}>
                Technical Competencies & Credentials
              </h2>
            </div>
            <Link href="/capabilities" className={styles.viewAllLink}>
              <span>Full Capabilities Matrix</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.capabilitiesPreviewGrid}>
            <Reveal delay={0} className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>Core Disciplines</h3>
              <p className={styles.capText}>
                {skillsContent.groups.map((g) => g.category).join(" · ")}
              </p>
            </Reveal>

            <Reveal delay={50} className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>
                {credentialsContent.certifications.length} Specialized Credentials
              </h3>
              <p className={styles.capText}>
                {credentialsContent.overviewText}
              </p>
            </Reveal>

            <Reveal delay={100} className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>Community Engagement</h3>
              <p className={styles.capText}>
                {credentialsContent.memberships.map((m) => m.organization).join(" · ")}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 5. Proof & Verification Section */}
      <ProofSection content={proofContent} locale="en" />

      {/* Chapter 1 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={1} />
    </div>
  );
}
