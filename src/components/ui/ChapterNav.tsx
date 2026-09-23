"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ChapterNav.module.css";
import { Container } from "@/components/ui/Container";
import { navigationContent } from "@/content/navigation";
import { navigationContentAr } from "@/content/ar/navigation";
import { navigationContentDe } from "@/content/de/navigation";

interface ChapterNavProps {
  currentChapterIndex: number;
  locale?: "en" | "ar" | "de";
}

export function ChapterNav({ currentChapterIndex, locale }: ChapterNavProps) {
  const pathname = usePathname();
  const isGerman = locale ? locale === "de" : (pathname === "/de" || pathname.startsWith("/de/"));
  const isArabic = locale ? locale === "ar" : (pathname === "/ar" || pathname.startsWith("/ar/"));
  const items = isGerman
    ? navigationContentDe.navItems
    : isArabic
    ? navigationContentAr.navItems
    : navigationContent.navItems;

  const currentItem = items.find((item) => item.chapterIndex === currentChapterIndex);
  const prevItem = items.find((item) => item.chapterIndex === currentChapterIndex - 1);
  const nextItem = items.find((item) => item.chapterIndex === currentChapterIndex + 1);

  if (!currentItem) return null;

  return (
    <section
      className={styles.chapterNav}
      aria-label={
        isGerman
          ? "Sequenzielle Kapitelnavigation"
          : isArabic
          ? "التنقل التسلسلي بين الفصول"
          : "Sequential Chapter Navigation"
      }
    >
      <Container>
        <div className={styles.inner}>
          {prevItem ? (
            <Link
              href={prevItem.href}
              className={styles.navLink}
              aria-label={
                isGerman
                  ? `Vorheriges Kapitel: ${prevItem.label}`
                  : isArabic
                  ? `الفصل السابق: ${prevItem.label}`
                  : `Previous Chapter: ${prevItem.label}`
              }
            >
              <span className={styles.navArrow} aria-hidden="true">
                {isArabic ? "→" : "←"}
              </span>
              <div className={styles.navLinkText}>
                <span className={styles.navLinkKicker}>
                  {isGerman
                    ? "Vorheriges Kapitel"
                    : isArabic
                    ? "الفصل السابق"
                    : "Previous Chapter"}
                </span>
                <span className={styles.navLinkTitle}>{prevItem.label}</span>
              </div>
            </Link>
          ) : (
            <div className={styles.placeholderSpace} aria-hidden="true" />
          )}

          <div className={styles.centerMeta}>
            <span className={styles.chapterBadge}>
              {isGerman
                ? `KAPITEL 0${currentChapterIndex} / 0${items.length}`
                : isArabic
                ? `الفصل 0${currentChapterIndex} / 0${items.length}`
                : `CHAPTER 0${currentChapterIndex} / 0${items.length}`}
            </span>
            <span className={styles.chapterTitle}>{currentItem.label}</span>
          </div>

          {nextItem ? (
            <Link
              href={nextItem.href}
              className={styles.navLink}
              aria-label={
                isGerman
                  ? `Nächstes Kapitel: ${nextItem.label}`
                  : isArabic
                  ? `الفصل التالي: ${nextItem.label}`
                  : `Next Chapter: ${nextItem.label}`
              }
            >
              <div
                className={styles.navLinkText}
                style={{ textAlign: isArabic ? "left" : "right", marginInlineStart: "auto" }}
              >
                <span className={styles.navLinkKicker}>
                  {isGerman
                    ? "Nächstes Kapitel"
                    : isArabic
                    ? "الفصل التالي"
                    : "Next Chapter"}
                </span>
                <span className={styles.navLinkTitle}>{nextItem.label}</span>
              </div>
              <span className={styles.navArrow} aria-hidden="true">
                {isArabic ? "←" : "→"}
              </span>
            </Link>
          ) : (
            <div className={styles.placeholderSpace} aria-hidden="true" />
          )}
        </div>
      </Container>
    </section>
  );
}
