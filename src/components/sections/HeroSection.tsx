import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Identity } from "@/contracts/identity";

interface HeroSectionProps {
  content: Identity;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function HeroSection({
  content,
  primaryAction = { label: "View Work", href: "#projects" },
  secondaryAction = { label: "Get in Touch", href: "#contact" },
}: HeroSectionProps) {
  return (
    <section id="top" className={styles.heroSection} aria-label="Introduction">
      <Container>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <div className={styles.heroMeta}>
              <Badge variant="accent" showDot={content.statusBadge.showDot}>
                {content.statusBadge.label}
              </Badge>

              {content.location && (
                <span className={styles.locationBadge}>
                  <svg
                    className={styles.locationIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{content.location}</span>
                </span>
              )}
            </div>

            <h1 className={styles.heroHeading}>
              <span>ALHassan</span>{" "}
              <span className={styles.heroNameAccent}>Baligh ALShami</span>
            </h1>

            <p className={styles.heroLead}>{content.headline}</p>

            <div className={styles.heroActions}>
              <Button href={primaryAction.href} variant="primary">
                {primaryAction.label}
              </Button>
              <Button href={secondaryAction.href} variant="secondary">
                {secondaryAction.label}
              </Button>
            </div>
          </div>

          {/* Desktop Architectural Showcase Panel */}
          <aside className={styles.heroShowcase} aria-label="Engineering Focus">
            <div className={styles.showcaseGlow} aria-hidden="true" />
            <div className={styles.showcaseHeader}>
              <span className={styles.showcaseTitle}>Core Focus</span>
              <span className={styles.showcaseStatus}>Active Practice</span>
            </div>

            <div className={styles.showcasePillars}>
              <div className={styles.pillarCard}>
                <span className={styles.pillarIndex}>01 / ARCHITECTURE</span>
                <span className={styles.pillarTitle}>Distributed & System Design</span>
                <span className={styles.pillarDesc}>
                  Designing resilient, scalable backends and robust data contracts.
                </span>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarIndex}>02 / USER INTERFACE</span>
                <span className={styles.pillarTitle}>Design Systems & Precision</span>
                <span className={styles.pillarDesc}>
                  Engineered front-ends, zero-layout-shift performance, and accessible UI.
                </span>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarIndex}>03 / QUALITY</span>
                <span className={styles.pillarTitle}>Rigor & Automated QA</span>
                <span className={styles.pillarDesc}>
                  End-to-end verification, strict typing, and regression-free delivery.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
