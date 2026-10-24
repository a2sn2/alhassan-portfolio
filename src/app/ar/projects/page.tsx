import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { projectsContentAr } from "@/content/ar/projects";
import { siteMetadataAr } from "@/content/ar/siteMetadata";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/utils/metadata";
import styles from "../../projects/projects.module.css";

export const metadata: Metadata = {
  title: "المشاريع البرمجية والأنظمة التقنية",
  description: projectsContentAr.description,
  alternates: {
    canonical: "/ar/projects",
    languages: {
      en: "/projects",
      ar: "/ar/projects",
      de: "/de/projects",
      "x-default": "/projects",
    },
  },
  openGraph: {
    title: "المشاريع البرمجية والأنظمة التقنية | الحسن بليغ الشامي",
    description: projectsContentAr.description,
    url: "/ar/projects",
    locale: siteMetadataAr.locale,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "المشاريع البرمجية والأنظمة التقنية | الحسن بليغ الشامي",
    description: projectsContentAr.description,
    images: [DEFAULT_TWITTER_IMAGE],
  },
};

export default function ArabicProjectsPage() {
  return (
    <div className={styles.projectsPage}>
      <Container>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.kicker}>{projectsContentAr.kicker}</span>
          <h1 className={styles.title}>{projectsContentAr.title}</h1>
          <p className={styles.description}>{projectsContentAr.description}</p>
        </header>

        {/* Project Explorer with Category Filters */}
        <div style={{ marginTop: "var(--space-10)" }}>
          <ProjectExplorer
            items={projectsContentAr.items}
            categories={projectsContentAr.categories}
          />
        </div>
      </Container>

    </div>
  );
}
