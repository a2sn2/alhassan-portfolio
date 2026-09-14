import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AboutContent } from "@/contracts/about";

interface AboutSectionProps {
  content: AboutContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className={styles.section} aria-label="About">
      <Container>
        <SectionHeader
          kicker={content.kicker}
          title={content.title}
          description={content.description}
        />

        {content.status === "placeholder" ? (
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
          <div className={styles.aboutContent}>
            {content.paragraphs.map((p, idx) => (
              <p key={idx} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
