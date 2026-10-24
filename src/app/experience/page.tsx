import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ExperienceExplorer } from "@/components/experience/ExperienceExplorer";
import { experienceContent, siteMetadata } from "@/content";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/utils/metadata";
import styles from "./experience.module.css";

export const metadata: Metadata = {
  title: "Professional Experience & Career Journey",
  description: experienceContent.description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/experience`,
    languages: {
      en: `${siteMetadata.siteUrl}/experience`,
      ar: `${siteMetadata.siteUrl}/ar/experience`,
      de: `${siteMetadata.siteUrl}/de/experience`,
      "x-default": `${siteMetadata.siteUrl}/experience`,
    },
  },
  openGraph: {
    title: `Professional Experience | ${siteMetadata.author.name}`,
    description: experienceContent.description,
    url: `${siteMetadata.siteUrl}/experience`,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Professional Experience | ${siteMetadata.author.name}`,
    description: experienceContent.description,
    images: [DEFAULT_TWITTER_IMAGE],
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

    </div>
  );
}
