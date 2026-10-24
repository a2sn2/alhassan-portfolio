import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  siteMetadata,
} from "@/content";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE } from "@/utils/metadata";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project case study could not be located.",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: `${project.tagline} Verified technical scope, architecture, and outcomes.`,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/projects/${project.slug}`,
      languages: {
        en: `${siteMetadata.siteUrl}/projects/${project.slug}`,
        ar: `${siteMetadata.siteUrl}/ar/projects/${project.slug}`,
        de: `${siteMetadata.siteUrl}/de/projects/${project.slug}`,
        "x-default": `${siteMetadata.siteUrl}/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: `${project.title} — Case Study | ${siteMetadata.author.name}`,
      description: project.tagline,
      url: `${siteMetadata.siteUrl}/projects/${project.slug}`,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | ${siteMetadata.author.name}`,
      description: project.tagline,
      images: [DEFAULT_TWITTER_IMAGE],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div style={{ padding: "var(--space-8) 0" }}>
      <Container>
        <ProjectCaseStudy project={project} />
      </Container>
    </div>
  );
}
