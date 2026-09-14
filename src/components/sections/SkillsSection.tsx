import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillsContent } from "@/contracts/skills";

interface SkillsSectionProps {
  content: SkillsContent;
}

export function SkillsSection({ content }: SkillsSectionProps) {
  return (
    <section id="skills" className={`${styles.section} ${styles.sectionAlternate}`} aria-label="Technical Skills">
      <Container>
        <SectionHeader
          kicker={content.kicker}
          title={content.title}
          description={content.description}
        />

        {content.status === "placeholder" || content.groups.length === 0 ? (
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
          <div className={styles.skillsGrid}>
            {content.groups.map((group) => (
              <div key={group.category} className={styles.skillGroup}>
                <h3 className={styles.skillCategory}>{group.category}</h3>
                <div className={styles.techList}>
                  {group.skills.map((skill) => (
                    <span key={skill} className={styles.techTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
