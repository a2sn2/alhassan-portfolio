"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./ProjectExplorer.module.css";
import { ProjectItem, ProjectCategory } from "@/contracts/projects";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

interface ProjectExplorerProps {
  items: ProjectItem[];
  categories: ProjectCategory[];
}

export function ProjectExplorer({ items, categories }: ProjectExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((p) => p.category === selectedCategory);

  const selectedProjects = filteredItems.filter(
    (p) => p.presentationTier === "featured"
  );
  const coreProjects = filteredItems.filter(
    (p) => p.presentationTier === "core"
  );
  const archiveProjects = filteredItems.filter(
    (p) => p.presentationTier === "archive"
  );

  return (
    <div className={styles.projectExplorer}>
      {/* Category Filter Pills */}
      <div
        className={styles.filterBar}
        role="group"
        aria-label="Filter projects by engineering category"
      >
        {categories.map((cat) => {
          const isActive = cat === selectedCategory;
          const count =
            cat === "All" ? items.length : items.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              className={cn(styles.filterBtn, isActive && styles.filterBtnActive)}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={isActive}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* TIER A: SELECTED WORK */}
      {selectedProjects.length > 0 && (
        <section className={styles.tierSection} aria-labelledby="tier-selected-heading">
          <div className={styles.tierHeader}>
            <div className={styles.tierHeaderLeft}>
              <span className={styles.tierKicker}>[ 01 — SELECTED WORK ]</span>
              <h2 id="tier-selected-heading" className={styles.tierTitle}>
                Flagship Systems & Applied Implementations
              </h2>
            </div>
            <span className={styles.tierCount}>
              {selectedProjects.length} {selectedProjects.length === 1 ? "Project" : "Projects"}
            </span>
          </div>

          <div className={styles.selectedGrid}>
            {selectedProjects.map((project, idx) => (
              <article
                key={project.id}
                className={cn(styles.projectCard, styles.selectedCard)}
              >
                {/* Technical schematic plate derived solely from verified technologies */}
                <div className={styles.techPlate} aria-hidden="true">
                  <div className={styles.techPlateHeader}>
                    <span className={styles.techPlateIndex}>SYS.REF // 0{idx + 1}</span>
                    <span className={styles.techPlateCategory}>{project.category}</span>
                  </div>
                  <div className={styles.techPlateBody}>
                    <div className={styles.schematicNodes}>
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span className={styles.schematicNode}>{tech}</span>
                          {i < Math.min(project.technologies.length, 3) - 1 && (
                            <span className={styles.schematicConnector}>→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className={styles.techPlateFooter}>
                    <span className={styles.techPlateStatus}>
                      {project.evidenceDepth === "rich" ? "VERIFIED PIPELINE" : "SPECIFICATION ACTIVE"}
                    </span>
                    <span className={styles.techPlateTicks}>+ +</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className={styles.selectedContent}>
                  <div className={styles.cardMetaRow}>
                    <Badge variant="category">{project.category}</Badge>
                    {project.badge && <Badge variant="tech">{project.badge}</Badge>}
                  </div>

                  <div className={styles.selectedTitleGroup}>
                    <h3 className={styles.selectedTitle}>{project.title}</h3>
                    <p className={styles.selectedTagline}>{project.tagline}</p>
                  </div>

                  {project.result && (
                    <div className={styles.verifiedOutcome}>
                      <span className={styles.outcomeLabel}>Verified Result:</span>
                      <p className={styles.outcomeText}>{project.result}</p>
                    </div>
                  )}

                  <div className={styles.techPills}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techPill}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardActions}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className={styles.primaryLink}
                      aria-label={`Explore Case Study for ${project.title}`}
                    >
                      <span>Explore Case Study</span>
                      <span aria-hidden="true">→</span>
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.externalLink}
                        aria-label={`${project.title} on GitHub`}
                      >
                        <span>Repository</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* TIER B: CORE ENGINEERING */}
      {coreProjects.length > 0 && (
        <section className={styles.tierSection} aria-labelledby="tier-core-heading">
          <div className={styles.tierHeader}>
            <div className={styles.tierHeaderLeft}>
              <span className={styles.tierKicker}>[ 02 — CORE ENGINEERING ]</span>
              <h2 id="tier-core-heading" className={styles.tierTitle}>
                Specialized Systems & Microservices
              </h2>
            </div>
            <span className={styles.tierCount}>
              {coreProjects.length} {coreProjects.length === 1 ? "Project" : "Projects"}
            </span>
          </div>

          <div className={styles.coreGrid}>
            {coreProjects.map((project) => (
              <article
                key={project.id}
                className={cn(styles.projectCard, styles.coreCard)}
              >
                <div className={styles.cardMetaRow}>
                  <Badge variant="category">{project.category}</Badge>
                  {project.badge && <Badge variant="tech">{project.badge}</Badge>}
                </div>

                <div className={styles.coreTitleGroup}>
                  <h3 className={styles.coreTitle}>{project.title}</h3>
                  <p className={styles.coreTagline}>{project.tagline}</p>
                </div>

                <div className={styles.techPills}>
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className={styles.techPill}>+{project.technologies.length - 4}</span>
                  )}
                </div>

                <div className={styles.cardActions}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.secondaryLink}
                    aria-label={`Explore Case Study for ${project.title}`}
                  >
                    <span>Explore Case Study</span>
                    <span aria-hidden="true">→</span>
                  </Link>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.externalLink}
                      aria-label={`${project.title} on GitHub`}
                    >
                      <span>Code</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* TIER C: ENGINEERING ARCHIVE */}
      {archiveProjects.length > 0 && (
        <section className={styles.tierSection} aria-labelledby="tier-archive-heading">
          <div className={styles.tierHeader}>
            <div className={styles.tierHeaderLeft}>
              <span className={styles.tierKicker}>[ 03 — ENGINEERING ARCHIVE ]</span>
              <h2 id="tier-archive-heading" className={styles.tierTitle}>
                Technical Catalogue & Foundation Work
              </h2>
            </div>
            <span className={styles.tierCount}>
              {archiveProjects.length} {archiveProjects.length === 1 ? "Project" : "Projects"}
            </span>
          </div>

          <div className={styles.archiveTableContainer}>
            {/* Desktop Table Header */}
            <div className={styles.archiveTableHeader} aria-hidden="true">
              <span className={styles.colProject}>Project</span>
              <span className={styles.colDomain}>Domain</span>
              <span className={styles.colTech}>Technologies</span>
              <span className={styles.colAction}>Action</span>
            </div>

            {/* Archive Rows */}
            <div className={styles.archiveRows}>
              {archiveProjects.map((project) => (
                <article
                  key={project.id}
                  className={cn(styles.projectCard, styles.archiveRow)}
                >
                  <div className={styles.archiveProjectCell}>
                    <h3 className={styles.archiveTitle}>{project.title}</h3>
                    <p className={styles.archiveTagline}>{project.tagline}</p>
                  </div>

                  <div className={styles.archiveDomainCell}>
                    <span className={styles.archiveDomainBadge}>{project.category}</span>
                  </div>

                  <div className={styles.archiveTechCell}>
                    <div className={styles.techPills}>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className={styles.techPill}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={styles.techPill}>+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.archiveActionCell}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className={styles.archiveLink}
                      aria-label={`Explore Case Study for ${project.title}`}
                    >
                      <span>Details</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.externalLink}
                        aria-label={`${project.title} on GitHub`}
                      >
                        <span>Code</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
