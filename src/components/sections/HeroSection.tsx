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
          {/* Main Identity & Positioning Column */}
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

            {/* Compact Focus Rail for Mobile: fits cleanly within first screen rhythm */}
            {content.focusPillars && content.focusPillars.length > 0 && (
              <div className={styles.heroMobileFocusRail} aria-label="Core Engineering Domains">
                <span className={styles.focusRailKicker}>Core Focus Domains</span>
                <div className={styles.focusRailGrid}>
                  {content.focusPillars.map((pillar) => {
                    const mobileLabels: Record<string, string> = {
                      systems: "Software Systems",
                      fullstack: "Full-Stack Engineering",
                      "ai-vision": "Applied AI",
                      quality: "Quality Engineering",
                    };
                    const label = mobileLabels[pillar.id] || pillar.title;
                    const indexStr = pillar.index.split(" / ")[0];
                    return (
                      <div key={pillar.id} className={styles.focusRailItem}>
                        <span className={styles.focusRailIndex}>{indexStr}</span>
                        <span className={styles.focusRailName}>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Editorial Engineering Field Map */}
          {content.focusPillars && content.focusPillars.length > 0 && (
            <aside className={styles.heroFieldMap} aria-label="Engineering Focus Architecture">
              <div className={styles.fieldMapFrame} aria-hidden="true">
                <span className={styles.cornerTickTL}>+</span>
                <span className={styles.cornerTickTR}>+</span>
                <span className={styles.cornerTickBL}>+</span>
                <span className={styles.cornerTickBR}>+</span>
              </div>

              <div className={styles.fieldMapHeader}>
                <div className={styles.fieldMapKickerGroup}>
                  <span className={styles.fieldMapIndex}>[ 01 — 04 ]</span>
                  <span className={styles.fieldMapTitle}>
                    {content.focusHeading || "Core Focus"}
                  </span>
                </div>
                <span className={styles.fieldMapStatus}>
                  {content.focusSubheading || "Active Practice"}
                </span>
              </div>

              <div className={styles.fieldMapGrid}>
                {content.focusPillars.map((pillar) => (
                  <div key={pillar.id} className={styles.fieldMapNode}>
                    <div className={styles.nodeIndicatorRow}>
                      <span className={styles.nodeIndexMarker}>{pillar.index}</span>
                      <span className={styles.nodeRule} aria-hidden="true" />
                    </div>
                    <span className={styles.nodeTitle}>{pillar.title}</span>
                    <span className={styles.nodeDesc}>{pillar.description}</span>
                  </div>
                ))}
              </div>

              <div className={styles.fieldMapFooter}>
                <span className={styles.fieldMapFooterMeta}>Disciplinary Scope · Verified Practice</span>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </section>
  );
}
