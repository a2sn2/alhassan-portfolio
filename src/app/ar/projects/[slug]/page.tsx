import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import {
  getProjectBySlugAr,
  getAllProjectSlugsAr,
  siteMetadataAr,
} from "@/content/ar";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugsAr();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlugAr(slug);

  if (!project) {
    return {
      title: "المشروع غير موجود",
      description: "تعذر العثور على دراسة حالة المشروع المطلوب.",
    };
  }

  return {
    title: `${project.title} — دراسة حالة`,
    description: project.tagline,
    alternates: {
      canonical: `${siteMetadataAr.siteUrl}/ar/projects/${project.slug}`,
      languages: {
        ar: `${siteMetadataAr.siteUrl}/ar/projects/${project.slug}`,
        en: `${siteMetadataAr.siteUrl}/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: `${project.title} — دراسة حالة | ${siteMetadataAr.author.name}`,
      description: project.tagline,
      url: `${siteMetadataAr.siteUrl}/ar/projects/${project.slug}`,
      locale: siteMetadataAr.locale,
    },
  };
}

export default async function ArabicProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlugAr(slug);

  if (!project) {
    notFound();
  }

  return (
    <div style={{ padding: "var(--space-8) 0" }}>
      <Container>
        <ProjectCaseStudy project={project} locale="ar" />
      </Container>
    </div>
  );
}
