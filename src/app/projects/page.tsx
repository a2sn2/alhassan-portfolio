import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { projectsContent, siteMetadata } from "@/content";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Engineering Projects & Systems",
  description: projectsContent.description,
  alternates: {
    canonical: `${siteMetadata.siteUrl}/projects`,
    languages: {
      en: `${siteMetadata.siteUrl}/projects`,
      ar: `${siteMetadata.siteUrl}/ar/projects`,
    },
  },
  openGraph: {
    title: `Engineering Projects | ${siteMetadata.author.name}`,
    description: projectsContent.description,
    url: `${siteMetadata.siteUrl}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className={styles.projectsPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{projectsContent.kicker}</span>
          <h1 className={styles.title}>{projectsContent.title}</h1>
          <p className={styles.description}>{projectsContent.description}</p>
        </header>

        {/* Project Explorer with Category Filters */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <ProjectExplorer
            items={projectsContent.items}
            categories={projectsContent.categories}
          />
        </div>
      </Container>

      {/* Chapter 4 of 6 sequential navigation */}
      <ChapterNav currentChapterIndex={4} />
    </div>
  );
}
