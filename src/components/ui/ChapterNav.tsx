import React from "react";
import Link from "next/link";
import styles from "./ChapterNav.module.css";
import { Container } from "@/components/ui/Container";
import { navigationContent } from "@/content/navigation";

interface ChapterNavProps {
  currentChapterIndex: number;
}

export function ChapterNav({ currentChapterIndex }: ChapterNavProps) {
  const items = navigationContent.navItems;
  const currentItem = items.find((item) => item.chapterIndex === currentChapterIndex);
  const prevItem = items.find((item) => item.chapterIndex === currentChapterIndex - 1);
  const nextItem = items.find((item) => item.chapterIndex === currentChapterIndex + 1);

  if (!currentItem) return null;

  return (
    <section className={styles.chapterNav} aria-label="Sequential Chapter Navigation">
      <Container>
        <div className={styles.inner}>
          {prevItem ? (
            <Link
              href={prevItem.href}
              className={styles.navLink}
              aria-label={`Previous Chapter: ${prevItem.label}`}
            >
              <span className={styles.navArrow} aria-hidden="true">
                ←
              </span>
              <div className={styles.navLinkText}>
                <span className={styles.navLinkKicker}>Previous Chapter</span>
                <span className={styles.navLinkTitle}>{prevItem.label}</span>
              </div>
            </Link>
          ) : (
            <div className={styles.placeholderSpace} aria-hidden="true" />
          )}

          <div className={styles.centerMeta}>
            <span className={styles.chapterBadge}>
              CHAPTER 0{currentChapterIndex} / 0{items.length}
            </span>
            <span className={styles.chapterTitle}>{currentItem.label}</span>
          </div>

          {nextItem ? (
            <Link
              href={nextItem.href}
              className={styles.navLink}
              aria-label={`Next Chapter: ${nextItem.label}`}
            >
              <div className={styles.navLinkText} style={{ textAlign: "right", marginLeft: "auto" }}>
                <span className={styles.navLinkKicker}>Next Chapter</span>
                <span className={styles.navLinkTitle}>{nextItem.label}</span>
              </div>
              <span className={styles.navArrow} aria-hidden="true">
                →
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
