import React from "react";
import Link from "next/link";
import styles from "./ProjectCaseStudy.module.css";
import { ProjectItem } from "@/contracts/projects";
import { formatProjectCategory } from "@/utils/categories";

interface ProjectCaseStudyProps {
  project: ProjectItem;
  locale?: "en" | "ar" | "de";
}

interface Chapter {
  id: string;
  label: string;
}

export function ProjectCaseStudy({ project, locale = "en" }: ProjectCaseStudyProps) {
  const isDe = locale === "de";
  const isAr = locale === "ar";

  // Dynamically assemble chapters based purely on verified available content
  const chapters: Chapter[] = [];
  if (project.problem) {
    chapters.push({
      id: "problem",
      label: isDe
        ? "Problem & Kontext"
        : isAr
        ? "المشكلة وسياق الهندسة"
        : "Problem & Context",
    });
  }
  if (project.role) {
    chapters.push({
      id: "role",
      label: isDe
        ? "Rolle & Verantwortung"
        : isAr
        ? "الدور والمسؤولية الهندسية"
        : "Role & Responsibility",
    });
  }
  if (project.architecture) {
    chapters.push({
      id: "architecture",
      label: isDe
        ? "Systemarchitektur & Datenfluss"
        : isAr
        ? "بنية النظام وتدفق البيانات"
        : "System Architecture",
    });
  }
  if (project.solution) {
    chapters.push({
      id: "solution",
      label: isDe
        ? "Entwickelte Lösung"
        : isAr
        ? "الحل الهندسي المنفّذ"
        : "Engineered Solution",
    });
  }
  if (project.implementationHighlights && project.implementationHighlights.length > 0) {
    chapters.push({
      id: "implementation",
      label: isDe
        ? "Implementierungs-Highlights"
        : isAr
        ? "أبرز نقاط التنفيذ"
        : "Implementation",
    });
  }
  if (project.technologies && project.technologies.length > 0) {
    chapters.push({
      id: "technologies",
      label: isDe
        ? "Eingesetzte Technologien"
        : isAr
        ? "التقنيات المعتمدة"
        : "Verified Technologies",
    });
  }
  if (project.result) {
    chapters.push({
      id: "outcomes",
      label: isDe
        ? "Ergebnisse & Umfang"
        : isAr
        ? "النتائج المعتمدة ونطاق التسليم"
        : "Verified Outcomes",
    });
  }

  const isRichCaseStudy = chapters.length >= 3;
  const backHref = isDe ? "/de/projects" : isAr ? "/ar/projects" : "/projects";

  return (
    <article className={styles.caseStudy}>
      <div className={styles.backLinkRow}>
        <Link href={backHref} className={styles.backLink}>
          <span aria-hidden="true">{isAr ? "→" : "←"}</span>
          <span>
            {isDe
              ? "Zurück zu allen Projekten"
              : isAr
              ? "العودة إلى كافة المشاريع"
              : "Back to All Projects"}
          </span>
        </Link>
      </div>

      <header className={styles.header}>
        <div className={styles.metaRow}>
          <span className={styles.categoryBadge}>{formatProjectCategory(project.category, locale)}</span>
          {project.period && (
            <span className={styles.periodBadge}>
              <bdi>{project.period}</bdi>
            </span>
          )}
          {project.badge && <span className={styles.periodBadge}>· {project.badge}</span>}
        </div>

        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.tagline}>{project.tagline}</p>
      </header>

      {isRichCaseStudy ? (
        <div className={styles.contentLayout}>
          {/* Sticky Anchor Rail on Desktop */}
          <aside
            className={styles.stickyRail}
            aria-label={
              isDe
                ? "Abschnitte der Fallstudie"
                : isAr
                ? "أقسام دراسة الحالة"
                : "Case Study Sections"
            }
          >
            <span className={styles.railHeading}>
              {isDe ? "Kapitel" : isAr ? "الفصول" : "Chapters"}
            </span>
            {chapters.map((ch, idx) => (
              <a key={ch.id} href={`#${ch.id}`} className={styles.railLink}>
                {String(idx + 1).padStart(2, "0")}. {ch.label}
              </a>
            ))}
          </aside>

          {/* Storytelling Body */}
          <div className={styles.bodyContent}>
            {project.problem && (
              <section id="problem" className={styles.storySection}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionNumber}>01.</span>
                  <span>
                    {isDe
                      ? "Problem & Kontext"
                      : isAr
                      ? "المشكلة وسياق الهندسة"
                      : "The Problem & Engineering Context"}
                  </span>
                </h2>
                <p className={styles.sectionText}>{project.problem}</p>
              </section>
            )}

            {project.role && (
              <section id="role" className={styles.storySection}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionNumber}>
                    {String(chapters.findIndex((c) => c.id === "role") + 1).padStart(2, "0")}.
                  </span>
                  <span>
                    {isDe
                      ? "Rolle & Verantwortung"
                      : isAr
                      ? "الدور والمسؤولية الهندسية"
                      : "Engineering Role & Responsibility"}
                  </span>
                </h2>
                <p className={styles.sectionText}>
                  {isDe ? (
                    <>
                      Tätig als <strong>{project.role}</strong> mit Fokus auf Entwicklung, Tests und verifizierte Implementierung.
                    </>
                  ) : isAr ? (
                    <>
                      عمل كـ <strong>{project.role}</strong>، مع التركيز على التطوير والاختبار والتنفيذ المعتمد.
                    </>
                  ) : (
                    <>
                      Served as <strong>{project.role}</strong>, focusing on development, testing, and verified implementation.
                    </>
                  )}
                </p>
              </section>
            )}

            {project.architecture && (
              <section id="architecture" className={styles.storySection}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionNumber}>
                    {String(chapters.findIndex((c) => c.id === "architecture") + 1).padStart(2, "0")}.
                  </span>
                  <span>
                    {isDe
                      ? "Systemarchitektur & Datenfluss"
                      : isAr
                      ? "بنية النظام وتدفق البيانات"
                      : "System Architecture & Data Flow"}
                  </span>
                </h2>
                <div className={styles.architectureBlock} dir="ltr">
                  {project.architecture}
                </div>
              </section>
            )}

            {project.solution && (
              <section id="solution" className={styles.storySection}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionNumber}>
                    {String(chapters.findIndex((c) => c.id === "solution") + 1).padStart(2, "0")}.
                  </span>
                  <span>
                    {isDe
                      ? "Entwickelte Lösung"
                      : isAr
                      ? "الحل الهندسي المنفّذ"
                      : "Engineered Solution"}
                  </span>
                </h2>
                <p className={styles.sectionText}>{project.solution}</p>
              </section>
            )}

            {project.implementationHighlights && project.implementationHighlights.length > 0 && (
              <section id="implementation" className={styles.storySection}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionNumber}>
                    {String(chapters.findIndex((c) => c.id === "implementation") + 1).padStart(2, "0")}.
                  </span>
                  <span>
                    {isDe
                      ? "Implementierungs-Highlights"
                      : isAr
                      ? "أبرز نقاط التنفيذ"
                      : "Implementation Highlights"}
                  </span>
                </h2>
                <ul className={styles.highlightsList}>
                  {project.implementationHighlights.map((highlight, idx) => (
                    <li key={idx} className={styles.highlightItem}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <section id="technologies" className={styles.storySection}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionNumber}>
                    {String(chapters.findIndex((c) => c.id === "technologies") + 1).padStart(2, "0")}.
                  </span>
                  <span>
                    {isDe
                      ? "Eingesetzte Technologien"
                      : isAr
                      ? "التقنيات المعتمدة"
                      : "Verified Technologies"}
                  </span>
                </h2>
                <div className={styles.techList}>
                  {project.technologies.map((tech) => (
                    <bdi key={tech} className={styles.techBadge}>
                      {tech}
                    </bdi>
                  ))}
                </div>
              </section>
            )}

            {project.result && (
              <section id="outcomes" className={styles.storySection}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionNumber}>
                    {String(chapters.findIndex((c) => c.id === "outcomes") + 1).padStart(2, "0")}.
                  </span>
                  <span>
                    {isDe
                      ? "Ergebnisse & Umfang"
                      : isAr
                      ? "النتائج المعتمدة ونطاق التسليم"
                      : "Verified Results & Scope"}
                  </span>
                </h2>
                <div className={styles.resultCallout}>
                  <span className={styles.resultTitle}>
                    {isDe
                      ? "Ergebnis"
                      : isAr
                      ? "المُخرَج المعتمد"
                      : "Verified Deliverable"}
                  </span>
                  <p className={styles.resultText}>{project.result}</p>
                </div>
              </section>
            )}

            <div className={styles.actionsRow}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  <span>
                    {isDe
                      ? "Auf GitHub ansehen"
                      : isAr
                      ? "عرض في GitHub"
                      : "View on GitHub"}
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              <Link href={backHref} className={styles.backLink}>
                <span>
                  {isDe
                    ? "← Weitere Ingenieurprojekte erkunden"
                    : isAr
                    ? "← استكشاف المزيد من المشاريع الهندسية"
                    : "← Explore more engineering projects"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Concise Project Profile for Basic Evidence Tier */
        <div className={styles.contentLayoutSingle}>
          <section className={styles.storySection}>
            <h2 className={styles.sectionTitle}>
              <span>
                {isDe
                  ? "Projektumfang & Zusammenfassung"
                  : isAr
                  ? "نطاق المشروع وملخصه"
                  : "Project Scope & Summary"}
              </span>
            </h2>
            <div className={styles.overviewCard}>
              <p className={styles.sectionText}>{project.tagline}</p>
            </div>
          </section>

          {project.technologies && project.technologies.length > 0 && (
            <section className={styles.storySection}>
              <h2 className={styles.sectionTitle}>
                <span>
                  {isDe
                    ? "Eingesetzte Technologien"
                    : isAr
                    ? "التقنيات المعتمدة"
                    : "Verified Technologies"}
                </span>
              </h2>
              <div className={styles.techList}>
                {project.technologies.map((tech) => (
                  <bdi key={tech} className={styles.techBadge}>
                    {tech}
                  </bdi>
                ))}
              </div>
            </section>
          )}

          <div className={styles.actionsRow}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <span>
                  {isDe
                    ? "Auf GitHub ansehen"
                    : isAr
                    ? "عرض في GitHub"
                    : "View on GitHub"}
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <Link href={backHref} className={styles.backLink}>
              <span>
                {isDe
                  ? "← Weitere Ingenieurprojekte erkunden"
                  : isAr
                  ? "← استكشاف المزيد من المشاريع الهندسية"
                  : "← Explore more engineering projects"}
              </span>
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
