import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";

export function ProjectsSection() {
  return (
    <section id="projects" className={styles.section} aria-label="Selected Projects">
      <Container>
        <SectionHeader
          kicker="03 / Case Studies"
          title="Featured Projects"
          description="In-depth analysis of engineering challenges, architectural solutions, and measured outcomes."
        />

        <div className={styles.projectsGrid}>
          {/* Structural Schema Demonstration Card */}
          <article className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <div>
                <h3 className={styles.projectTitle}>
                  Case Study Structural Schema
                </h3>
                <Badge variant="subtle">Schema Blueprint</Badge>
              </div>
            </div>

            <div className={styles.projectDetails}>
              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Problem</span>
                <p className={styles.detailValue}>
                  The core real-world technical constraint, bottleneck, or opportunity being addressed.
                </p>
              </div>

              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Role</span>
                <p className={styles.detailValue}>
                  Individual engineering responsibility, architectural leadership, and scope.
                </p>
              </div>

              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Solution</span>
                <p className={styles.detailValue}>
                  Specific system design, algorithms, protocols, or UI architecture implemented.
                </p>
              </div>

              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Result</span>
                <p className={styles.detailValue}>
                  Empirical metrics, verified performance impact, stability improvements, or user outcomes.
                </p>
              </div>
            </div>

            <div className={styles.detailGroup}>
              <span className={styles.detailLabel}>Technologies</span>
              <div className={styles.techList}>
                <span className={styles.techTag}>TypeScript</span>
                <span className={styles.techTag}>Next.js</span>
                <span className={styles.techTag}>CSS Architecture</span>
                <span className={styles.techTag}>Systems Design</span>
              </div>
            </div>
          </article>

          <div className={styles.placeholderBox}>
            <span className={styles.placeholderNotice}>
              [Section Architecture: Awaiting Verified Project Data]
            </span>
            <p className={styles.placeholderText}>
              Production case study cards will be populated using verified project data, repository links, and live demos without inventing facts.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
