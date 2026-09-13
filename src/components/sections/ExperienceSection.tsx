import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ExperienceSection() {
  return (
    <section id="experience" className={styles.section} aria-label="Experience">
      <Container>
        <SectionHeader
          kicker="02 / Trajectory"
          title="Professional Experience"
          description="Career chronology, engineering leadership, and shipped software impact."
        />

        <div className={styles.placeholderBox}>
          <span className={styles.placeholderNotice}>
            [Section Architecture: Awaiting Verified Career History]
          </span>
          <p className={styles.placeholderText}>
            Structured chronological timeline component ready to receive verified roles, dates, company details, responsibilities, and technical deliverables from official CV records.
          </p>
        </div>
      </Container>
    </section>
  );
}
