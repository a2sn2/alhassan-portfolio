import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { projectsContentDe } from "@/content/de/projects";
import { siteMetadataDe } from "@/content/de/siteMetadata";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/utils/metadata";
import styles from "../../projects/projects.module.css";

export const metadata: Metadata = {
  title: "Ingenieurprojekte & Technische Systeme",
  description: projectsContentDe.description,
  alternates: {
    canonical: "/de/projects",
    languages: {
      en: "/projects",
      ar: "/ar/projects",
      de: "/de/projects",
      "x-default": "/projects",
    },
  },
  openGraph: {
    title: "Ingenieurprojekte & Technische Systeme | ALHassan Baligh ALShami",
    description: projectsContentDe.description,
    url: "/de/projects",
    locale: siteMetadataDe.locale,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingenieurprojekte & Technische Systeme | ALHassan Baligh ALShami",
    description: projectsContentDe.description,
    images: [DEFAULT_TWITTER_IMAGE],
  },
};

export default function GermanProjectsPage() {
  return (
    <div className={styles.projectsPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{projectsContentDe.kicker}</span>
          <h1 className={styles.title}>{projectsContentDe.title}</h1>
          <p className={styles.description}>{projectsContentDe.description}</p>
        </header>

        {/* Project Explorer with Category Filters */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <ProjectExplorer
            items={projectsContentDe.items}
            categories={projectsContentDe.categories}
          />
        </div>
      </Container>

    </div>
  );
}
