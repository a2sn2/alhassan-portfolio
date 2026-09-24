"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Identity } from "@/contracts/identity";
import { ProfilePortrait } from "@/components/media/ProfilePortrait";
import { SupportedLocale } from "@/content/profileMedia";

interface HeroSectionProps {
  content: Identity;
}

export function HeroSection({ content }: HeroSectionProps) {
  const pathname = usePathname();
  const isGerman = pathname === "/de" || pathname?.startsWith("/de/");
  const isArabic = pathname === "/ar" || pathname?.startsWith("/ar/");
  const currentLocale: SupportedLocale = isGerman ? "de" : isArabic ? "ar" : "en";

  const sectionAriaLabel = isGerman ? "Einleitung" : isArabic ? "مقدمة" : "Introduction";
  const primaryHref = isGerman ? "/de/projects" : isArabic ? "/ar/projects" : "/projects";
  const primaryLabel = isGerman
    ? "Ausgewählte Arbeiten erkunden"
    : isArabic
    ? "استكشف الأعمال المختارة"
    : "Explore Selected Work";
  const secondaryHref = isGerman ? "/de/about" : isArabic ? "/ar/about" : "/about";
  const secondaryLabel = isGerman
    ? "Profil & Prinzipien lesen"
    : isArabic
    ? "اقرأ النبذة والمبادئ"
    : "Read Profile & Principles";

  const connector = isGerman ? "oder" : isArabic ? "أو" : "or";
  const commandHintText = isGerman
    ? "öffnet den Portfolio-Navigator von überall"
    : isArabic
    ? "يفتح لوحة التنقل من أي مكان في الموقع"
    : "opens the Portfolio Navigator from anywhere";

  const focusRailAriaLabel = isGerman
    ? "Schwerpunkte der Ingenieurpraxis"
    : isArabic
    ? "مجالات التركيز الهندسية"
    : "Core Engineering Domains";
  const focusRailKicker = isGerman
    ? "Schwerpunkte der Ingenieurpraxis"
    : isArabic
    ? "مجالات التركيز الهندسية"
    : "Core Focus Domains";

  const fieldMapAriaLabel = isGerman
    ? "Architektur der technischen Schwerpunkte"
    : isArabic
    ? "هيكل التركيز الهندسي"
    : "Engineering Focus Architecture";
  const fieldMapTitle = content.focusHeading || (isGerman ? "Schwerpunkte" : isArabic ? "محاور التركيز" : "Core Focus");
  const fieldMapStatus = content.focusSubheading || (isGerman ? "Aktive Praxis" : isArabic ? "الممارسة النشطة" : "Active Practice");
  const fieldMapFooterMeta = isGerman
    ? "Ingenieurbereich · Kerndisziplinen"
    : isArabic
    ? "النطاق الهندسي · التخصصات الأساسية"
    : "Engineering Scope · Core Disciplines";

  return (
    <section id="top" className={styles.heroSection} aria-label={sectionAriaLabel}>
      <Container>
        <div className={styles.heroGrid}>
          {/* Primary Row: Identity & Positioning + Studio Portrait */}
          <div className={styles.heroPrimaryRow}>
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
                {isArabic || content.fullName === "الحسن بليغ الشامي" ? (
                  <>
                    <span>الحسن</span>{" "}
                    <span className={styles.heroNameAccent}>بليغ الشامي</span>
                  </>
                ) : (
                  <>
                    <span>ALHassan</span>{" "}
                    <span className={styles.heroNameAccent}>Baligh ALShami</span>
                  </>
                )}
              </h1>

              <p className={styles.heroLead}>{content.headline}</p>

              <p className={styles.heroBioBrief}>{content.bioBrief}</p>

              <div className={styles.heroActions}>
                <Link href={primaryHref} className={styles.btnPrimary}>
                  <span>{primaryLabel}</span>
                  <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                </Link>
                <Link href={secondaryHref} className={styles.btnSecondary}>
                  <span>{secondaryLabel}</span>
                </Link>
              </div>

              <div className={styles.commandHint}>
                <span className={styles.kbdHint}>⌘K</span>
                <span>{connector}</span>
                <span className={styles.kbdHint}>Ctrl+K</span>
                <span>{commandHintText}</span>
              </div>

              {/* Compact Focus Rail for Mobile: fits cleanly within first screen rhythm */}
              {content.focusPillars && content.focusPillars.length > 0 && (
                <div className={styles.heroMobileFocusRail} aria-label={focusRailAriaLabel}>
                  <span className={styles.focusRailKicker}>
                    {focusRailKicker}
                  </span>
                  <div className={styles.focusRailGrid}>
                    {content.focusPillars.map((pillar) => {
                      const mobileLabelsEn: Record<string, string> = {
                        systems: "Software Systems",
                        fullstack: "Full-Stack Engineering",
                        "ai-vision": "Applied AI",
                        quality: "Quality Engineering",
                      };
                      const label = isGerman || isArabic ? pillar.title : (mobileLabelsEn[pillar.id] || pillar.title);
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

            {/* Studio Portrait Column */}
            <div className={styles.heroPortraitContainer}>
              <ProfilePortrait
                variant="studio"
                locale={currentLocale}
                priority
                sizes="(max-width: 480px) 240px, (max-width: 860px) 280px, (max-width: 1200px) 380px, 420px"
              />
            </div>
          </div>

          {/* Desktop Editorial Engineering Field Map */}
          {content.focusPillars && content.focusPillars.length > 0 && (
            <aside className={styles.heroFieldMap} aria-label={fieldMapAriaLabel}>
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
                    {fieldMapTitle}
                  </span>
                </div>
                <span className={styles.fieldMapStatus}>
                  {fieldMapStatus}
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
                <span className={styles.fieldMapFooterMeta}>
                  {fieldMapFooterMeta}
                </span>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </section>
  );
}
