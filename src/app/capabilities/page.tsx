import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { CapabilitiesMatrix } from "@/components/capabilities/CapabilitiesMatrix";
import {
  skillsContent,
  credentialsContent,
  siteMetadata,
} from "@/content";
import styles from "./capabilities.module.css";

export const metadata: Metadata = {
  title: "Capabilities, Credentials & Professional Proof",
  description: skillsContent.description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/capabilities`,
    languages: {
      en: `${siteMetadata.siteUrl}/capabilities`,
      ar: `${siteMetadata.siteUrl}/ar/capabilities`,
      "x-default": `${siteMetadata.siteUrl}/capabilities`,
    },
  },
  openGraph: {
    title: `Capabilities & Credentials | ${siteMetadata.author.name}`,
    description: skillsContent.description,
    url: `${siteMetadata.siteUrl}/capabilities`,
  },
};

export default function CapabilitiesPage() {
  return (
    <div className={styles.capabilitiesPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{skillsContent.kicker}</span>
          <h1 className={styles.title}>{skillsContent.title}</h1>
          <p className={styles.description}>{skillsContent.description}</p>
        </header>

        {/* Interactive Capability Matrix */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <CapabilitiesMatrix
            skillGroups={skillsContent.groups}
            certifications={credentialsContent.certifications}
            memberships={credentialsContent.memberships}
            certRepoUrl={credentialsContent.certificationsRepoUrl}
          />
        </div>
      </Container>

      {/* Chapter 5 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={5} />
    </div>
  );
}
