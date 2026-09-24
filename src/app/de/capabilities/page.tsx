import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { CapabilitiesMatrix } from "@/components/capabilities/CapabilitiesMatrix";
import {
  skillsContentDe,
  credentialsContentDe,
  siteMetadataDe,
} from "@/content/de";
import styles from "../../capabilities/capabilities.module.css";

export const metadata: Metadata = {
  title: "Fähigkeiten, Zertifikate & Qualifikationsnachweise",
  description: skillsContentDe.description,
  alternates: {
    canonical: `${siteMetadataDe.siteUrl}/de/capabilities`,
    languages: {
      de: `${siteMetadataDe.siteUrl}/de/capabilities`,
      en: `${siteMetadataDe.siteUrl}/capabilities`,
      ar: `${siteMetadataDe.siteUrl}/ar/capabilities`,
      "x-default": `${siteMetadataDe.siteUrl}/capabilities`,
    },
  },
  openGraph: {
    title: `Fähigkeiten & Qualifikationen | ${siteMetadataDe.author.name}`,
    description: skillsContentDe.description,
    url: `${siteMetadataDe.siteUrl}/de/capabilities`,
    locale: siteMetadataDe.locale,
  },
};

export default function GermanCapabilitiesPage() {
  return (
    <div className={styles.capabilitiesPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{skillsContentDe.kicker}</span>
          <h1 className={styles.title}>{skillsContentDe.title}</h1>
          <p className={styles.description}>{skillsContentDe.description}</p>
        </header>

        {/* Interactive Capability Matrix */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <CapabilitiesMatrix
            skillGroups={skillsContentDe.groups}
            certifications={credentialsContentDe.certifications}
            memberships={credentialsContentDe.memberships}
            certRepoUrl={credentialsContentDe.certificationsRepoUrl}
            locale="de"
          />
        </div>
      </Container>

      {/* Chapter 5 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={5} locale="de" />
    </div>
  );
}
