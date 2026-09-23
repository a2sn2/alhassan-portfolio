import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import {
  getProjectBySlugDe,
  getAllProjectSlugsDe,
  siteMetadataDe,
} from "@/content/de";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugsDe();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlugDe(slug);

  if (!project) {
    return {
      title: "Projekt nicht gefunden",
      description: "Die angeforderte Projektfallstudie konnte nicht gefunden werden.",
    };
  }

  return {
    title: `${project.title} — Fallstudie`,
    description: `${project.tagline} Verifizierter technischer Umfang, Architektur und Ergebnisse.`,
    alternates: {
      canonical: `${siteMetadataDe.siteUrl}/de/projects/${project.slug}`,
      languages: {
        de: `${siteMetadataDe.siteUrl}/de/projects/${project.slug}`,
        en: `${siteMetadataDe.siteUrl}/projects/${project.slug}`,
        ar: `${siteMetadataDe.siteUrl}/ar/projects/${project.slug}`,
        "x-default": `${siteMetadataDe.siteUrl}/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: `${project.title} — Fallstudie | ${siteMetadataDe.author.name}`,
      description: project.tagline,
      url: `${siteMetadataDe.siteUrl}/de/projects/${project.slug}`,
      locale: siteMetadataDe.locale,
    },
  };
}

export default async function GermanProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlugDe(slug);

  if (!project) {
    notFound();
  }

  return (
    <div style={{ padding: "var(--space-8) 0" }}>
      <Container>
        <ProjectCaseStudy project={project} locale="de" />
      </Container>
    </div>
  );
}
