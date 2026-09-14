import React from "react";
import Link from "next/link";
import styles from "./ProjectCaseStudy.module.css";
import { ProjectItem } from "@/contracts/projects";

interface ProjectCaseStudyProps {
  project: ProjectItem;
}

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <article className={styles.caseStudy}>
      <div className={styles.backLinkRow}>
        <Link href="/projects" className={styles.backLink}>
          <span aria-hidden="true">←</span>
          <span>Back to All Projects</span>
        </Link>
      </div>

      <header className={styles.header}>
        <div className={styles.metaRow}>
          <span className={styles.categoryBadge}>{project.category}</span>
          {project.period && <span className={styles.periodBadge}>{project.period}</span>}
          {project.badge && <span className={styles.periodBadge}>· {project.badge}</span>}
        </div>

        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.tagline}>{project.tagline}</p>
      </header>

      <div className={styles.contentLayout}>
        {/* Sticky Anchor Rail on Desktop */}
        <aside className={styles.stickyRail} aria-label="Case Study Sections">
          <span className={styles.railHeading}>Chapters</span>
          <a href="#context-problem" className={styles.railLink}>
            01. Problem & Context
          </a>
          <a href="#role-scope" className={styles.railLink}>
            02. Role & Scope
          </a>
          {project.architecture && (
            <a href="#architecture" className={styles.railLink}>
              03. Architecture
            </a>
          )}
          <a href="#solution" className={styles.railLink}>
            04. Solution
          </a>
          {project.implementationHighlights && (
            <a href="#implementation" className={styles.railLink}>
              05. Implementation
            </a>
          )}
          <a href="#technologies" className={styles.railLink}>
            06. Technologies
          </a>
          <a href="#outcomes" className={styles.railLink}>
            07. Verified Outcomes
          </a>
        </aside>

        {/* Storytelling Body */}
        <div className={styles.bodyContent}>
          <section id="context-problem" className={styles.storySection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>01.</span>
              <span>The Problem & Engineering Context</span>
            </h2>
            <p className={styles.sectionText}>{project.problem}</p>
          </section>

          <section id="role-scope" className={styles.storySection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>02.</span>
              <span>Engineering Role & Responsibility</span>
            </h2>
            <p className={styles.sectionText}>
              Served as <strong>{project.role}</strong>, owning the technical delivery,
              system design, and implementation from requirements through verification.
            </p>
          </section>

          {project.architecture && (
            <section id="architecture" className={styles.storySection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>03.</span>
                <span>System Architecture & Data Flow</span>
              </h2>
              <div className={styles.architectureBlock}>{project.architecture}</div>
            </section>
          )}

          <section id="solution" className={styles.storySection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>04.</span>
              <span>Engineered Solution</span>
            </h2>
            <p className={styles.sectionText}>{project.solution}</p>
          </section>

          {project.implementationHighlights && project.implementationHighlights.length > 0 && (
            <section id="implementation" className={styles.storySection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>05.</span>
                <span>Implementation Highlights & Rigor</span>
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

          <section id="technologies" className={styles.storySection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>06.</span>
              <span>Verified Technologies</span>
            </h2>
            <div className={styles.techList}>
              {project.technologies.map((tech) => (
                <span key={tech} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section id="outcomes" className={styles.storySection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>07.</span>
              <span>Verified Results & Measurable Impact</span>
            </h2>
            <div className={styles.resultCallout}>
              <span className={styles.resultTitle}>Operational Outcome</span>
              <p className={styles.resultText}>{project.result}</p>
            </div>
          </section>

          <div className={styles.actionsRow}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <span>View Source on GitHub</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <Link href="/projects" className={styles.backLink}>
              <span>← Explore more engineering projects</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
