import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { Badge } from "@/components/ui/Badge";
import {
  identityContentDe,
  projectItemsDe,
  experienceContentDe,
  skillsContentDe,
  credentialsContentDe,
  proofContentDe,
} from "@/content/de";
import { ProofSection } from "@/components/sections/ProofSection";
import { formatProjectCategory } from "@/utils/categories";
import styles from "../home.module.css";

export default function GermanHomePage() {
  const featuredProjects = projectItemsDe.filter(
    (p) => p.presentationTier === "featured"
  );
  const recentRoles = experienceContentDe.items.slice(0, 3);

  return (
    <div className={styles.homeWrapper}>
      {/* 1. Hero with Verified Identity & Positioning */}
      <HeroSection content={identityContentDe} />

      {/* 2. Featured Projects Preview */}
      <section className={styles.previewSection} aria-labelledby="heading-featured-work">
        <Container>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTextGroup}>
              <span className={styles.kicker}>Ausgewählte Ingenieurarbeiten</span>
              <h2 id="heading-featured-work" className={styles.heading}>
                Ausgewählte technische Projekte & Systeme
              </h2>
            </div>
            <Link href="/de/projects" className={styles.viewAllLink}>
              <span>Alle 16 Projekte ansehen</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.projectsGrid}>
            {featuredProjects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.cardHeader}>
                  <Badge variant="category">{formatProjectCategory(project.category, "de")}</Badge>
                  {project.badge && (
                    <Badge variant="tech">{project.badge}</Badge>
                  )}
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectTagline}>{project.tagline}</p>

                {project.result && (
                  <div className={styles.projectSnippet}>
                    <strong>Ergebnis:</strong> {project.result}
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
                    href={`/de/projects/${project.slug}`}
                    className={styles.caseStudyLink}
                    aria-label={`Fallstudie für ${project.title} lesen`}
                  >
                    <span>Fallstudie erkunden</span>
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
              <span className={styles.kicker}>Werdegang & Praxis</span>
              <h2 id="heading-experience-snapshot" className={styles.heading}>
                Operative & leitende Meilensteine
              </h2>
            </div>
            <Link href="/de/experience" className={styles.viewAllLink}>
              <span>Interaktiven Werdegang erkunden</span>
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
              <span className={styles.kicker}>Fähigkeiten & Nachweise</span>
              <h2 id="heading-capabilities-preview" className={styles.heading}>
                Technische Kompetenzen & Zertifizierungen
              </h2>
            </div>
            <Link href="/de/capabilities" className={styles.viewAllLink}>
              <span>Komplette Kompetenzmatrix</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.capabilitiesPreviewGrid}>
            <div className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>Kernbereiche</h3>
              <p className={styles.capText}>
                {skillsContentDe.groups.map((g) => g.category).join(" · ")}
              </p>
            </div>

            <div className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>
                {credentialsContentDe.certifications.length} Zertifikate & Kurse
              </h3>
              <p className={styles.capText}>
                {credentialsContentDe.overviewText}
              </p>
            </div>

            <div className={styles.capHighlightCard}>
              <h3 className={styles.capTitle}>Berufliche Mitgliedschaften</h3>
              <p className={styles.capText}>
                {credentialsContentDe.memberships.map((m) => m.organization).join(" · ")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Proof & Verification Section */}
      <ProofSection content={proofContentDe} locale="de" />

      {/* Chapter 1 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={1} locale="de" />
    </div>
  );
}
