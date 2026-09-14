import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { ChapterNav } from "@/components/ui/ChapterNav";
import {
  identityContent,
  getFeaturedProjects,
  experienceContent,
  skillsContent,
  credentialsContent,
} from "@/content";
import styles from "./home.module.css";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const recentRoles = experienceContent.items.slice(0, 3);

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
              <span>View All 16 Projects</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.projectsGrid}>
            {featuredProjects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.categoryBadge}>{project.category}</span>
                  {project.badge && (
                    <span className={styles.featuredBadge}>{project.badge}</span>
                  )}
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectTagline}>{project.tagline}</p>

                <div className={styles.projectSnippet}>
                  <strong>Outcome:</strong> {project.result}
                </div>

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
            {recentRoles.map((role) => (
              <div key={role.id} className={styles.experienceCard}>
                <div className={styles.roleHeader}>
                  <span className={styles.roleCompany}>{role.company}</span>
                  <span className={styles.rolePeriod}>{role.period}</span>
                </div>
                <h3 className={styles.roleTitle}>{role.role}</h3>
                <p className={styles.roleDesc}>{role.description}</p>
                <div className={styles.techPills}>
                  {role.technologies.map((t) => (
                    <span key={t} className={styles.techPill}>
                      {t}
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
            <div className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>Core Disciplines</h3>
              <p className={styles.capText}>
                {skillsContent.groups.map((g) => g.category).join(" · ")}
              </p>
            </div>

            <div className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>
                {credentialsContent.certifications.length} Specialized Credentials
              </h3>
              <p className={styles.capText}>
                Deep learning, computer vision, robotics, embedded systems, network routing, and project management.
              </p>
            </div>

            <div className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>Community Engagement</h3>
              <p className={styles.capText}>
                {credentialsContent.memberships.map((m) => m.organization).join(" · ")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Chapter 1 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={1} />
    </div>
  );
}
