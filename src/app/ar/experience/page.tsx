import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ExperienceExplorer } from "@/components/experience/ExperienceExplorer";
import { experienceContentAr } from "@/content/ar/experience";
import { siteMetadataAr } from "@/content/ar/siteMetadata";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/utils/metadata";
import styles from "../../experience/experience.module.css";

export const metadata: Metadata = {
  title: "الخبرات المهنية والمسار التشغيلي",
  description: experienceContentAr.description,
  alternates: {
    canonical: "/ar/experience",
    languages: {
      en: "/experience",
      ar: "/ar/experience",
      de: "/de/experience",
      "x-default": "/experience",
    },
  },
  openGraph: {
    title: "الخبرات المهنية والمسار التشغيلي | الحسن بليغ الشامي",
    description: experienceContentAr.description,
    url: "/ar/experience",
    locale: siteMetadataAr.locale,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "الخبرات المهنية والمسار التشغيلي | الحسن بليغ الشامي",
    description: experienceContentAr.description,
    images: [DEFAULT_TWITTER_IMAGE],
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

    </div>
  );
}
