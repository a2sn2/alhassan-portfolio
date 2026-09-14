import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ProjectsContent } from "@/contracts/projects";

interface ProjectsSectionProps {
  content: ProjectsContent;
}

export function ProjectsSection({ content }: ProjectsSectionProps) {
  return (
    <section id="projects" className={styles.section} aria-label="Selected Projects">
      <Container>
        <SectionHeader
          kicker={content.kicker}
          title={content.title}
          description={content.description}
        />

        <div className={styles.projectsGrid}>
          {content.items.map((project) => (
            <article key={project.id} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  {project.badge && <Badge variant="subtle">{project.badge}</Badge>}
                </div>
              </div>

              <div className={styles.projectDetails}>
                <div className={styles.detailGroup}>
                  <span className={styles.detailLabel}>Problem</span>
                  <p className={styles.detailValue}>{project.problem}</p>
                </div>

                <div className={styles.detailGroup}>
                  <span className={styles.detailLabel}>Role</span>
                  <p className={styles.detailValue}>{project.role}</p>
                </div>

                <div className={styles.detailGroup}>
                  <span className={styles.detailLabel}>Solution</span>
                  <p className={styles.detailValue}>{project.solution}</p>
                </div>

                <div className={styles.detailGroup}>
                  <span className={styles.detailLabel}>Result</span>
                  <p className={styles.detailValue}>{project.result}</p>
                </div>
              </div>

              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Technologies</span>
                <div className={styles.techList}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {content.placeholderNotice && (
            <div className={styles.placeholderBox}>
              <span className={styles.placeholderNotice}>
                {content.placeholderNotice}
              </span>
              {content.placeholderText && (
                <p className={styles.placeholderText}>{content.placeholderText}</p>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
