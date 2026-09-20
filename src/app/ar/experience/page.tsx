import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { ExperienceExplorer } from "@/components/experience/ExperienceExplorer";
import { experienceContentAr } from "@/content/ar/experience";
import styles from "../../experience/experience.module.css";

export const metadata: Metadata = {
  title: "الخبرات المهنية والمسار التشغيلي",
  description: experienceContentAr.description,
  alternates: {
    canonical: "/ar/experience",
    languages: {
      en: "/experience",
      ar: "/ar/experience",
    },
  },
  openGraph: {
    title: "الخبرات المهنية والمسار التشغيلي | الحسن بليغ الشامي",
    description: experienceContentAr.description,
    url: "/ar/experience",
  },
};

export default function ArabicExperiencePage() {
  return (
    <div className={styles.experiencePage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{experienceContentAr.kicker}</span>
          <h1 className={styles.title}>{experienceContentAr.title}</h1>
          <p className={styles.description}>{experienceContentAr.description}</p>
        </header>

        {/* Interactive Experience Journey Explorer */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <ExperienceExplorer items={experienceContentAr.items} />
        </div>
      </Container>

      {/* Chapter 3 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={3} />
    </div>
  );
}
