import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProofSection() {
  return (
    <section id="proof" className={styles.section} aria-label="Proof and Verification">
      <Container>
        <SectionHeader
          kicker="05 / Validation"
          title="Proof & Endorsements"
          description="Verified recommendations, published writing, and peer evaluations."
        />

        <div className={styles.placeholderBox}>
          <span className={styles.placeholderNotice}>
            [Section Architecture: Awaiting Verified Endorsements & Proof]
          </span>
          <p className={styles.placeholderText}>
            This section reserves layout for verified testimonials, public speaking, certifications, or peer endorsements. No mock quotes or fabricated recommendations are created.
          </p>
        </div>
      </Container>
    </section>
  );
}
