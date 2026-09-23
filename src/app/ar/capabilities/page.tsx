import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { CapabilitiesMatrix } from "@/components/capabilities/CapabilitiesMatrix";
import {
  skillsContentAr,
  credentialsContentAr,
  siteMetadataAr,
} from "@/content/ar";
import styles from "../../capabilities/capabilities.module.css";

export const metadata: Metadata = {
  title: "القدرات التقنية والشهادات التخصصية والأدلة المهنية",
  description: skillsContentAr.description,
  alternates: {
    canonical: `${siteMetadataAr.siteUrl}/ar/capabilities`,
    languages: {
      ar: `${siteMetadataAr.siteUrl}/ar/capabilities`,
      en: `${siteMetadataAr.siteUrl}/capabilities`,
      de: `${siteMetadataAr.siteUrl}/de/capabilities`,
      "x-default": `${siteMetadataAr.siteUrl}/capabilities`,
    },
  },
  openGraph: {
    title: `القدرات والشهادات | ${siteMetadataAr.author.name}`,
    description: skillsContentAr.description,
    url: `${siteMetadataAr.siteUrl}/ar/capabilities`,
    locale: siteMetadataAr.locale,
  },
};

export default function ArabicCapabilitiesPage() {
  return (
    <div className={styles.capabilitiesPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{skillsContentAr.kicker}</span>
          <h1 className={styles.title}>{skillsContentAr.title}</h1>
          <p className={styles.description}>{skillsContentAr.description}</p>
        </header>

        {/* Interactive Capability Matrix */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <CapabilitiesMatrix
            skillGroups={skillsContentAr.groups}
            certifications={credentialsContentAr.certifications}
            memberships={credentialsContentAr.memberships}
            certRepoUrl={credentialsContentAr.certificationsRepoUrl}
            locale="ar"
          />
        </div>
      </Container>

      {/* Chapter 5 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={5} locale="ar" />
    </div>
  );
}
