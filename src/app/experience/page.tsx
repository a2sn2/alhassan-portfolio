import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { ExperienceExplorer } from "@/components/experience/ExperienceExplorer";
import { experienceContent, siteMetadata } from "@/content";
import styles from "./experience.module.css";

export const metadata: Metadata = {
  title: "Professional Experience & Career Journey",
  description: experienceContent.description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/experience`,
  },
  openGraph: {
    title: `Professional Experience | ${siteMetadata.author.name}`,
    description: experienceContent.description,
    url: `${siteMetadata.siteUrl}/experience`,
  },
};

export default function ExperiencePage() {
  return (
    <div className={styles.experiencePage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{experienceContent.kicker}</span>
          <h1 className={styles.title}>{experienceContent.title}</h1>
          <p className={styles.description}>{experienceContent.description}</p>
        </header>

        {/* Interactive Experience Journey Explorer */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <ExperienceExplorer items={experienceContent.items} />
        </div>
      </Container>

      {/* Chapter 3 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={3} />
    </div>
  );
}
