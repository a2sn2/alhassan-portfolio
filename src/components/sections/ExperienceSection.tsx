import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExperienceContent } from "@/contracts/experience";

interface ExperienceSectionProps {
  content: ExperienceContent;
}

export function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <section id="experience" className={styles.section} aria-label="Experience">
      <Container>
        <SectionHeader
          kicker={content.kicker}
          title={content.title}
          description={content.description}
        />

        {content.status === "placeholder" || content.items.length === 0 ? (
          <div className={styles.placeholderBox}>
            {content.placeholderNotice && (
              <span className={styles.placeholderNotice}>
                {content.placeholderNotice}
              </span>
            )}
            {content.placeholderText && (
              <p className={styles.placeholderText}>{content.placeholderText}</p>
            )}
          </div>
        ) : (
          <div className={styles.experienceTimeline}>
            {content.items.map((item) => (
              <article key={item.id} className={styles.experienceItem}>
                <div className={styles.experienceMeta}>
                  <span className={styles.experiencePeriod}>{item.period}</span>
                  {item.location && (
                    <span className={styles.experienceLocation}>{item.location}</span>
                  )}
                </div>
                <div className={styles.experienceMain}>
                  <h3 className={styles.experienceRole}>{item.role}</h3>
                  <h4 className={styles.experienceCompany}>{item.company}</h4>
                  <p className={styles.experienceDescription}>{item.description}</p>
                  {item.technologies.length > 0 && (
                    <div className={styles.techList}>
                      {item.technologies.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
