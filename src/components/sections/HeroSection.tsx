import React from "react";
import Link from "next/link";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Identity } from "@/contracts/identity";

interface HeroSectionProps {
  content: Identity;
}

export function HeroSection({ content }: HeroSectionProps) {
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

            <p className={styles.heroBioBrief}>{content.bioBrief}</p>

            <div className={styles.heroActions}>
              <Link href="/projects" className={styles.btnPrimary}>
                <span>Explore Selected Work</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/about" className={styles.btnSecondary}>
                <span>Read Profile & Principles</span>
              </Link>
            </div>

            <div className={styles.commandHint}>
              <span className={styles.kbdHint}>⌘K</span>
              <span>or</span>
              <span className={styles.kbdHint}>Ctrl+K</span>
              <span>opens the Portfolio Navigator from anywhere</span>
            </div>
          </div>

          {/* Desktop Architectural Showcase Panel with Verified Pillars */}
          <aside className={styles.heroShowcase} aria-label="Engineering Focus">
            <div className={styles.showcaseGlow} aria-hidden="true" />
            <div className={styles.showcaseHeader}>
              <span className={styles.showcaseTitle}>Verified Focus</span>
              <span className={styles.showcaseStatus}>Active Practice</span>
            </div>

            <div className={styles.showcasePillars}>
              <div className={styles.pillarCard}>
                <span className={styles.pillarIndex}>01 / SYSTEMS</span>
                <span className={styles.pillarTitle}>Software Systems & Integration</span>
                <span className={styles.pillarDesc}>
                  Fintech accounting systems, operational workflows, and institutional integrations.
                </span>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarIndex}>02 / FULL-STACK</span>
                <span className={styles.pillarTitle}>Application Engineering</span>
                <span className={styles.pillarDesc}>
                  Responsive web interfaces, Flutter mobile clients, and backend REST microservices.
                </span>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarIndex}>03 / AI & VISION</span>
                <span className={styles.pillarTitle}>Applied AI & Computer Vision</span>
                <span className={styles.pillarDesc}>
                  Live camera stream object detection and tracking algorithms on Linux with OpenCV.
                </span>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarIndex}>04 / QUALITY</span>
                <span className={styles.pillarTitle}>Quality Assurance & Review Rigor</span>
                <span className={styles.pillarDesc}>
                  Testing protocols, feasibility reviews, and quality benchmarks for production releases.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
