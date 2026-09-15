"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./ProjectExplorer.module.css";
import { ProjectItem, ProjectCategory } from "@/contracts/projects";
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

      {/* Projects Grid */}
      <div className={styles.projectGrid}>
        {filteredItems.map((project) => (
          <article key={project.id} className={styles.projectCard}>
            <div className={styles.cardTop}>
              <span className={styles.categoryBadge}>{project.category}</span>
              {project.badge && <span className={styles.featuredBadge}>{project.badge}</span>}
            </div>

            <div className={styles.cardTitleGroup}>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <p className={styles.cardTagline}>{project.tagline}</p>
            </div>

            {(project.problem || project.solution) && (
              <div className={styles.narrativeSnippet}>
                {project.problem && (
                  <div>
                    <span className={styles.narrativeLabel}>Problem: </span>
                    {project.problem}
                  </div>
                )}
                {project.solution && (
                  <div>
                    <span className={styles.narrativeLabel}>Solution: </span>
                    {project.solution}
                  </div>
                )}
              </div>
            )}

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
                className={styles.caseStudyLink}
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
    </div>
  );
}
