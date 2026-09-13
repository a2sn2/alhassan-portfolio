import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

export function ContactSection() {
  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <Container>
        <SectionHeader
          kicker="06 / Direct Connect"
          title="Get In Touch"
          description="Open for software engineering opportunities, architecture consultations, and technical collaborations."
        />

        <div className={styles.placeholderBox}>
          <p className={styles.placeholderText}>
            Connect directly via verified public channels:
          </p>

          <div className={styles.heroActions}>
            <Button
              href={siteConfig.githubUrl}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub (@{siteConfig.githubUsername})
            </Button>
          </div>

          <span className={styles.placeholderNotice}>
            [Awaiting verified professional email & LinkedIn link]
          </span>
        </div>
      </Container>
    </section>
  );
}
