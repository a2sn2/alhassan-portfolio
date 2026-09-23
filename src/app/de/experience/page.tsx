import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { ExperienceExplorer } from "@/components/experience/ExperienceExplorer";
import { experienceContentDe } from "@/content/de/experience";
import { siteMetadataDe } from "@/content/de/siteMetadata";
import styles from "../../experience/experience.module.css";

export const metadata: Metadata = {
  title: "Berufserfahrung & Praktischer Werdegang",
  description: experienceContentDe.description,
  alternates: {
    canonical: "/de/experience",
    languages: {
      en: "/experience",
      ar: "/ar/experience",
      de: "/de/experience",
      "x-default": "/experience",
    },
  },
  openGraph: {
    title: "Berufserfahrung & Praktischer Werdegang | ALHassan Baligh ALShami",
    description: experienceContentDe.description,
    url: "/de/experience",
    locale: siteMetadataDe.locale,
  },
};

export default function GermanExperiencePage() {
  return (
    <div className={styles.experiencePage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{experienceContentDe.kicker}</span>
          <h1 className={styles.title}>{experienceContentDe.title}</h1>
          <p className={styles.description}>{experienceContentDe.description}</p>
        </header>

        {/* Interactive Experience Journey Explorer */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <ExperienceExplorer items={experienceContentDe.items} />
        </div>
      </Container>

      {/* Chapter 3 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={3} locale="de" />
    </div>
  );
}
