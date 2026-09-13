import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SkillsSection() {
  return (
    <section id="skills" className={styles.section} aria-label="Technical Skills">
      <Container>
        <SectionHeader
          kicker="04 / Capabilities"
          title="Technical Competencies"
          description="Languages, frameworks, tooling, and architectural practices."
        />

        <div className={styles.placeholderBox}>
          <span className={styles.placeholderNotice}>
            [Section Architecture: Awaiting Verified Technical Inventory]
          </span>
          <p className={styles.placeholderText}>
            Structured capability domains (e.g. Core Languages, Frontend Architecture, Backend & Distributed Systems, DevOps & Tooling) awaiting verified proficiencies from CV data.
          </p>
        </div>
      </Container>
    </section>
  );
}
