"use client";

import React, { useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ProjectExplorer.module.css";
import { ProjectItem, ProjectCategory } from "@/contracts/projects";
import { Badge } from "@/components/ui/Badge";
import { BidiText } from "@/components/ui/BidiText";
import { cn } from "@/utils/cn";
import { formatProjectCategory } from "@/utils/categories";
import { projectEvidenceMap } from "@/content/evidence";

interface ProjectExplorerProps {
  items: ProjectItem[];
  categories: ProjectCategory[];
}

function subscribeCategoryUrl(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("project-category-change", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("project-category-change", callback);
  };
}

function getServerCategory(): ProjectCategory {
  return "All";
}

export function ProjectExplorer({ items, categories }: ProjectExplorerProps) {
  const getClientCategory = useCallback((): ProjectCategory => {
    const params = new URLSearchParams(window.location.search);
    const urlCat = params.get("category") as ProjectCategory | null;
    if (urlCat && categories.includes(urlCat)) {
      return urlCat;
    }
    return "All";
  }, [categories]);

  const selectedCategory = useSyncExternalStore(
    subscribeCategoryUrl,
    getClientCategory,
    getServerCategory
  );

  const pathname = usePathname();
  const isGerman = pathname === "/de" || pathname.startsWith("/de/");
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const currentLocale = isGerman ? "de" : isArabic ? "ar" : "en";

  const handleSelectCategory = (cat: ProjectCategory) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat === "All") {
        url.searchParams.delete("category");
        try {
          sessionStorage.removeItem("portfolio:lastProjectCategory");
        } catch {
          // Ignore storage restrictions
        }
      } else {
        url.searchParams.set("category", cat);
        try {
          sessionStorage.setItem("portfolio:lastProjectCategory", cat);
        } catch {
          // Ignore storage restrictions
        }
      }
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      window.dispatchEvent(new Event("project-category-change"));
    }
  };

  const getCategoryLabel = (cat: ProjectCategory) => {
    return formatProjectCategory(cat, currentLocale);
  };

  const getProjectHref = (slug: string) => {
    if (isGerman) return `/de/projects/${slug}`;
    if (isArabic) return `/ar/projects/${slug}`;
    return `/projects/${slug}`;
  };

  const getSourceLabel = (
    source: "standalone" | "portfolio-archive" | undefined,
    status?: string
  ) => {
    if (status === "partial") {
      if (isGerman) return "Ausgewähltes Quellarchiv";
      if (isArabic) return "أرشيف مصدري جزئي";
      return "Selected Source Archive";
    }
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
    source: "standalone" | "portfolio-archive" | undefined,
    status?: string
  ) => {
    if (status === "partial") {
      if (isGerman) return `${projectTitle} — Ausgewähltes Quellarchiv`;
      if (isArabic) return `${projectTitle} — أرشيف مصدري جزئي`;
      return `${projectTitle} — Selected Source Archive`;
    }
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
              onClick={() => handleSelectCategory(cat)}
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
            {selectedProjects.map((project, idx) => {
              const evidenceRecord = projectEvidenceMap[project.slug];
              const evidenceStatusLabel =
                evidenceRecord?.status === "verified"
                  ? isGerman
                    ? "Verifiziert · Quellcode-belegt"
                    : isArabic
                    ? "موثّق · مدعوم بالمصدر"
                    : "Verified · Source-backed"
                  : evidenceRecord?.status === "partial"
                  ? isGerman
                    ? "Ausgewähltes Quellarchiv"
                    : isArabic
                    ? "أرشيف مصدري جزئي"
                    : "Selected Source Archive"
                  : isGerman
                  ? "Dokumentiertes Profil"
                  : isArabic
                  ? "ملف هندسي موثّق"
                  : "Documented Profile";

              const archStages = project.architecture
                ? project.architecture.split("→").map((s) => s.trim()).slice(0, 4)
                : [];

              const plateSignals: Array<{ index: string; label: string; value: string; ltr?: boolean }> = [
                {
                  index: "01",
                  label: isGerman ? "Nachweis" : isArabic ? "التوثيق" : "Evidence",
                  value: evidenceStatusLabel,
                },
                {
                  index: "02",
                  label:
                    archStages.length > 0
                      ? isGerman
                        ? "Architekturfluss"
                        : isArabic
                        ? "تدفق البنية"
                        : "Architecture Flow"
                      : isGerman
                      ? "Fokus"
                      : isArabic
                      ? "النطاق"
                      : "System Scope",
                  value:
                    archStages.length > 0
                      ? archStages.join(" → ")
                      : project.badge || getCategoryLabel(project.category),
                  ltr: archStages.length > 0,
                },
                {
                  index: "03",
                  label: isGerman ? "Quellreferenz" : isArabic ? "المرجع المصدري" : "Source Record",
                  value:
                    project.repository?.repositoryName ||
                    `docs/evidence/projects/${project.slug}`,
                  ltr: true,
                },
              ];

              return (
              <article
                key={project.id}
                className={cn(styles.projectCard, styles.selectedCard)}
              >
                {/* Technical profile plate showing non-duplicated evidence & architecture signals */}
                <div className={styles.techPlate} aria-hidden="true">
                  <div className={styles.techPlateHeader}>
                    <span className={styles.techPlateIndex}>
                      {isGerman
                        ? `ARCHITEKTURPROFIL // 0${idx + 1}`
                        : isArabic
                        ? `ملف البنية // 0${idx + 1}`
                        : `SYSTEM SPEC // 0${idx + 1}`}
                    </span>
                    <span className={styles.techPlateCategory}>{getCategoryLabel(project.category)}</span>
                  </div>
                  <div className={styles.techPlateBody}>
                    <div className={styles.techMatrix}>
                      {plateSignals.map((signal) => (
                        <div key={signal.index} className={styles.techMatrixCell}>
                          <span className={styles.techMatrixIndex}>{signal.index}</span>
                          <div className={styles.techMatrixTextGroup}>
                            <span className={styles.techMatrixLabel}>{signal.label}</span>
                            <span className={styles.techMatrixName}>
                              {signal.ltr ? (
                                <bdi dir="ltr">{signal.value}</bdi>
                              ) : (
                                <BidiText text={signal.value} locale={currentLocale} />
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.techPlateFooter}>
                    <span className={styles.techPlateStatus}>
                      {project.evidenceDepth === "rich"
                        ? isGerman
                          ? "VOLLSTÄNDIGE FALLSTUDIE"
                          : isArabic
                          ? "دراسة حالة مفصّلة"
                          : "FULL CASE STUDY"
                        : isGerman
                        ? "KOMPAKTES PROJEKTPROFIL"
                        : isArabic
                        ? "ملف مشروع موجز"
                        : "CONCISE SYSTEM PROFILE"}
                    </span>
                    <span className={styles.techPlateTicks}>
                      <bdi dir="ltr">{project.period || "VERIFIED"}</bdi>
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className={styles.selectedContent}>
                  <div className={styles.cardMetaRow}>
                    <Badge variant="category">{getCategoryLabel(project.category)}</Badge>
                    {project.badge && <Badge variant="tech">{project.badge}</Badge>}
                  </div>

                  <div className={styles.selectedTitleGroup}>
                    <h3 className={styles.selectedTitle}>
                      <BidiText text={project.title} locale={currentLocale} />
                    </h3>
                    <p className={styles.selectedTagline}>
                      <BidiText text={project.tagline} locale={currentLocale} />
                    </p>
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
                      <p className={styles.outcomeText}>
                        <BidiText text={project.result} locale={currentLocale} />
                      </p>
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

                    {(() => {
                      const status = projectEvidenceMap[project.slug]?.status;
                      const hasSourceSignal =
                        (status === "verified" || status === "partial") &&
                        Boolean(project.repository?.url);
                      if (!hasSourceSignal || !project.repository?.url) return null;
                      return (
                        <a
                          href={project.repository.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.sourceSignalLink}
                          aria-label={getSourceAriaLabel(
                            project.title,
                            project.repository.source,
                            status
                          )}
                        >
                          <span className={styles.sourceSignalText}>
                            {getSourceLabel(project.repository.source, status)}
                          </span>
                          <span className={styles.sourceSignalArrow} aria-hidden="true">
                            ↗
                          </span>
                        </a>
                      );
                    })()}
                  </div>
                </div>
              </article>
              );
            })}
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
                  <h3 className={styles.coreTitle}>
                    <BidiText text={project.title} locale={currentLocale} />
                  </h3>
                  <p className={styles.coreTagline}>
                    <BidiText text={project.tagline} locale={currentLocale} />
                  </p>
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

                  {(() => {
                    const status = projectEvidenceMap[project.slug]?.status;
                    const hasSourceSignal =
                      (status === "verified" || status === "partial") &&
                      Boolean(project.repository?.url);
                    if (!hasSourceSignal || !project.repository?.url) return null;
                    return (
                      <a
                        href={project.repository.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.sourceSignalLink}
                        aria-label={getSourceAriaLabel(
                          project.title,
                          project.repository.source,
                          status
                        )}
                      >
                        <span className={styles.sourceSignalText}>
                          {getSourceLabel(project.repository.source, status)}
                        </span>
                        <span className={styles.sourceSignalArrow} aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    );
                  })()}
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
                    <h3 className={styles.archiveTitle}>
                      <BidiText text={project.title} locale={currentLocale} />
                    </h3>
                    <p className={styles.archiveTagline}>
                      <BidiText text={project.tagline} locale={currentLocale} />
                    </p>
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
                    {(() => {
                      const status = projectEvidenceMap[project.slug]?.status;
                      const hasSourceSignal =
                        (status === "verified" || status === "partial") &&
                        Boolean(project.repository?.url);
                      if (!hasSourceSignal || !project.repository?.url) return null;
                      return (
                        <a
                          href={project.repository.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.sourceSignalLink}
                          aria-label={getSourceAriaLabel(
                            project.title,
                            project.repository.source,
                            status
                          )}
                        >
                          <span className={styles.sourceSignalText}>
                            {getSourceLabel(project.repository.source, status)}
                          </span>
                          <span className={styles.sourceSignalArrow} aria-hidden="true">
                            ↗
                          </span>
                        </a>
                      );
                    })()}
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
