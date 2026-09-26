"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ProjectExplorer.module.css";
import { ProjectItem, ProjectCategory } from "@/contracts/projects";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import { formatProjectCategory } from "@/utils/categories";

interface ProjectExplorerProps {
  items: ProjectItem[];
  categories: ProjectCategory[];
}

export function ProjectExplorer({ items, categories }: ProjectExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const pathname = usePathname();
  const isGerman = pathname === "/de" || pathname.startsWith("/de/");
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const currentLocale = isGerman ? "de" : isArabic ? "ar" : "en";

  const getCategoryLabel = (cat: ProjectCategory) => {
    return formatProjectCategory(cat, currentLocale);
  };

  const getProjectHref = (slug: string) => {
    if (isGerman) return `/de/projects/${slug}`;
    if (isArabic) return `/ar/projects/${slug}`;
    return `/projects/${slug}`;
  };

  const getSourceLabel = (source: "standalone" | "portfolio-archive" | undefined) => {
    if (source === "standalone") {
      if (isGerman) return "QUELLCODE · GitHub";
      if (isArabic) return "المصدر · GitHub";
      return "SOURCE · GitHub";
    }
    if (isGerman) return "ARCHIV · Nachweis";
    if (isArabic) return "الأرشيف · التوثيق";
    return "ARCHIVE · Evidence";
  };

  const getSourceAriaLabel = (
    projectTitle: string,
    source: "standalone" | "portfolio-archive" | undefined
  ) => {
    if (source === "standalone") {
      if (isGerman) return `${projectTitle} — Quellcode auf GitHub`;
      if (isArabic) return `${projectTitle} — الكود المصدري على GitHub`;
      return `${projectTitle} — Source code on GitHub`;
    }
    if (isGerman) return `${projectTitle} — Quellarchiv im Portfolio Evidence Hub`;
    if (isArabic) return `${projectTitle} — أرشيف المصدر في مركز التوثيق`;
    return `${projectTitle} — Source archive in Portfolio Evidence Hub`;
  };

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
        aria-label={
          isGerman
            ? "Projekte nach Fachbereich filtern"
            : isArabic
            ? "تصفية المشاريع بحسب المجال التقني"
            : "Filter projects by engineering category"
        }
      >
        {categories.map((cat) => {
          const isAll = cat === "All";
          const isActive = cat === selectedCategory;

          const count = isAll
            ? items.length
            : items.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              className={cn(styles.filterBtn, isActive && styles.filterBtnActive)}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={isActive}
            >
              {getCategoryLabel(cat)} ({count})
            </button>
          );
        })}
      </div>

      {/* TIER A: SELECTED WORK */}
      {selectedProjects.length > 0 && (
        <section className={styles.tierSection} aria-labelledby="tier-selected-heading">
          <div className={styles.tierHeader}>
            <div className={styles.tierHeaderLeft}>
              <span className={styles.tierKicker}>
                {isGerman
                  ? "[ 01 — AUSGEWÄHLTE ARBEITEN ]"
                  : isArabic
                  ? "[ 01 — أعمال مختارة ]"
                  : "[ 01 — SELECTED WORK ]"}
              </span>
              <h2 id="tier-selected-heading" className={styles.tierTitle}>
                {isGerman
                  ? "Ausgewählte Systeme & technische Projekte"
                  : isArabic
                  ? "مشاريع تقنية وأنظمة منتقاة"
                  : "Selected Systems & Technical Projects"}
              </h2>
            </div>
            <span className={styles.tierCount}>
              {selectedProjects.length}{" "}
              {isGerman
                ? selectedProjects.length === 1
                  ? "Projekt"
                  : "Projekte"
                : isArabic
                ? "مشاريع"
                : selectedProjects.length === 1
                ? "Project"
                : "Projects"}
            </span>
          </div>

          <div className={styles.selectedGrid}>
            {selectedProjects.map((project, idx) => (
              <article
                key={project.id}
                className={cn(styles.projectCard, styles.selectedCard)}
              >
                {/* Technical profile plate derived solely from verified technologies */}
                <div className={styles.techPlate} aria-hidden="true">
                  <div className={styles.techPlateHeader}>
                    <span className={styles.techPlateIndex}>
                      {isGerman
                        ? `PROJEKTPROFIL // 0${idx + 1}`
                        : isArabic
                        ? `ملف المشروع // 0${idx + 1}`
                        : `PROJECT PROFILE // 0${idx + 1}`}
                    </span>
                    <span className={styles.techPlateCategory}>{getCategoryLabel(project.category)}</span>
                  </div>
                  <div className={styles.techPlateBody}>
                    <div className={styles.techMatrix}>
                      {project.technologies.map((tech, i) => (
                        <div key={tech} className={styles.techMatrixCell}>
                          <span className={styles.techMatrixIndex}>0{i + 1}</span>
                          <span className={styles.techMatrixName}>
                            <bdi>{tech}</bdi>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.techPlateFooter}>
                    <span className={styles.techPlateStatus}>
                      {isGerman
                        ? "TECHNOLOGIE-STACK"
                        : isArabic
                        ? "الحزمة التقنية"
                        : "TECHNICAL STACK"}
                    </span>
                    <span className={styles.techPlateTicks}>+ +</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className={styles.selectedContent}>
                  <div className={styles.cardMetaRow}>
                    <Badge variant="category">{getCategoryLabel(project.category)}</Badge>
                    {project.badge && <Badge variant="tech">{project.badge}</Badge>}
                  </div>

                  <div className={styles.selectedTitleGroup}>
                    <h3 className={styles.selectedTitle}>{project.title}</h3>
                    <p className={styles.selectedTagline}>{project.tagline}</p>
                  </div>

                  {project.result && (
                    <div className={styles.verifiedOutcome}>
                      <span className={styles.outcomeLabel}>
                        {isGerman
                          ? "Projektergebnis:"
                          : isArabic
                          ? "مخرجات المشروع:"
                          : "Project Outcome:"}
                      </span>
                      <p className={styles.outcomeText}>{project.result}</p>
                    </div>
                  )}

                  <div className={styles.techPills}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techPill}>
                        <bdi>{tech}</bdi>
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardActions}>
                    <Link
                      href={getProjectHref(project.slug)}
                      className={styles.primaryLink}
                      aria-label={
                        isGerman
                          ? `Fallstudie für ${project.title} erkunden`
                          : isArabic
                          ? `استكشف دراسة الحالة لمشروع ${project.title}`
                          : `Explore Case Study for ${project.title}`
                      }
                    >
                      <span>
                        {isGerman
                          ? "Fallstudie erkunden"
                          : isArabic
                          ? "استكشف دراسة الحالة"
                          : "Explore Case Study"}
                      </span>
                      <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                    </Link>

                    {project.repository?.url && (
                      <a
                        href={project.repository.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.sourceSignalLink}
                        aria-label={getSourceAriaLabel(project.title, project.repository.source)}
                      >
                        <span className={styles.sourceSignalText}>
                          {getSourceLabel(project.repository.source)}
                        </span>
                        <span className={styles.sourceSignalArrow} aria-hidden="true">
                          ↗
                        </span>
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
              <span className={styles.tierKicker}>
                {isGerman
                  ? "[ 02 — KERNENTWICKLUNG ]"
                  : isArabic
                  ? "[ 02 — هندسة أساسية ]"
                  : "[ 02 — CORE ENGINEERING ]"}
              </span>
              <h2 id="tier-core-heading" className={styles.tierTitle}>
                {isGerman
                  ? "Zentrale Ingenieurprojekte"
                  : isArabic
                  ? "مشاريع هندسية أساسية"
                  : "Core Engineering Projects"}
              </h2>
            </div>
            <span className={styles.tierCount}>
              {coreProjects.length}{" "}
              {isGerman
                ? coreProjects.length === 1
                  ? "Projekt"
                  : "Projekte"
                : isArabic
                ? "مشاريع"
                : coreProjects.length === 1
                ? "Project"
                : "Projects"}
            </span>
          </div>

          <div className={styles.coreGrid}>
            {coreProjects.map((project) => (
              <article
                key={project.id}
                className={cn(styles.projectCard, styles.coreCard)}
              >
                <div className={styles.cardMetaRow}>
                  <Badge variant="category">{getCategoryLabel(project.category)}</Badge>
                  {project.badge && <Badge variant="tech">{project.badge}</Badge>}
                </div>

                <div className={styles.coreTitleGroup}>
                  <h3 className={styles.coreTitle}>{project.title}</h3>
                  <p className={styles.coreTagline}>{project.tagline}</p>
                </div>

                <div className={styles.techPills}>
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      <bdi>{tech}</bdi>
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className={styles.techPill}>+{project.technologies.length - 4}</span>
                  )}
                </div>

                <div className={styles.cardActions}>
                  <Link
                    href={getProjectHref(project.slug)}
                    className={styles.secondaryLink}
                    aria-label={
                      isGerman
                        ? `Fallstudie für ${project.title} erkunden`
                        : isArabic
                        ? `استكشف دراسة الحالة لمشروع ${project.title}`
                        : `Explore Case Study for ${project.title}`
                    }
                  >
                    <span>
                      {isGerman
                        ? "Fallstudie erkunden"
                        : isArabic
                        ? "استكشف دراسة الحالة"
                        : "Explore Case Study"}
                    </span>
                    <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                  </Link>

                  {project.repository?.url && (
                    <a
                      href={project.repository.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceSignalLink}
                      aria-label={getSourceAriaLabel(project.title, project.repository.source)}
                    >
                      <span className={styles.sourceSignalText}>
                        {getSourceLabel(project.repository.source)}
                      </span>
                      <span className={styles.sourceSignalArrow} aria-hidden="true">
                        ↗
                      </span>
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
              <span className={styles.tierKicker}>
                {isGerman
                  ? "[ 03 — INGENIEURARCHIV ]"
                  : isArabic
                  ? "[ 03 — الأرشيف الهندسي ]"
                  : "[ 03 — ENGINEERING ARCHIVE ]"}
              </span>
              <h2 id="tier-archive-heading" className={styles.tierTitle}>
                {isGerman
                  ? "Ingenieurarchiv & akademische Arbeiten"
                  : isArabic
                  ? "الأرشيف الهندسي والأعمال الأكاديمية"
                  : "Engineering Archive & Academic Work"}
              </h2>
            </div>
            <span className={styles.tierCount}>
              {archiveProjects.length}{" "}
              {isGerman
                ? archiveProjects.length === 1
                  ? "Projekt"
                  : "Projekte"
                : isArabic
                ? "مشاريع"
                : archiveProjects.length === 1
                ? "Project"
                : "Projects"}
            </span>
          </div>

          <div className={styles.archiveTableContainer}>
            {/* Desktop Table Header */}
            <div className={styles.archiveTableHeader} aria-hidden="true">
              <span className={styles.colProject}>
                {isGerman ? "Projekt" : isArabic ? "المشروع" : "Project"}
              </span>
              <span className={styles.colDomain}>
                {isGerman ? "Bereich" : isArabic ? "المجال" : "Domain"}
              </span>
              <span className={styles.colTech}>
                {isGerman ? "Technologien" : isArabic ? "التقنيات" : "Technologies"}
              </span>
              <span className={styles.colAction}>
                {isGerman ? "Aktion" : isArabic ? "الإجراء" : "Action"}
              </span>
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
                    <span className={styles.archiveDomainBadge}>{getCategoryLabel(project.category)}</span>
                  </div>

                  <div className={styles.archiveTechCell}>
                    <div className={styles.techPills}>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className={styles.techPill}>
                          <bdi>{tech}</bdi>
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={styles.techPill}>+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.archiveActionCell}>
                    <Link
                      href={getProjectHref(project.slug)}
                      className={styles.archiveLink}
                      aria-label={
                        isGerman
                          ? `Fallstudie für ${project.title} erkunden`
                          : isArabic
                          ? `استكشف دراسة الحالة لمشروع ${project.title}`
                          : `Explore Case Study for ${project.title}`
                      }
                    >
                      <span>{isGerman ? "Details" : isArabic ? "التفاصيل" : "Details"}</span>
                      <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                    </Link>
                    {project.repository?.url && (
                      <a
                        href={project.repository.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.sourceSignalLink}
                        aria-label={getSourceAriaLabel(project.title, project.repository.source)}
                      >
                        <span className={styles.sourceSignalText}>
                          {getSourceLabel(project.repository.source)}
                        </span>
                        <span className={styles.sourceSignalArrow} aria-hidden="true">
                          ↗
                        </span>
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
