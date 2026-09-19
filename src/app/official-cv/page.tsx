import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { officialCvCanonicalText, officialCvSource, siteMetadata } from "@/content";
import styles from "./official-cv.module.css";

export const metadata: Metadata = {
  title: "Official English CV Record",
  description:
    "Verbatim web record of the official English Standard CV, preserved for exact portfolio content parity.",
  alternates: {
    canonical: `${siteMetadata.siteUrl}/official-cv`,
  },
  openGraph: {
    title: `Official English CV Record | ${siteMetadata.author.name}`,
    description:
      "Verbatim web record of the official English Standard CV, preserved for exact portfolio content parity.",
    url: `${siteMetadata.siteUrl}/official-cv`,
  },
};

const sectionHeadings = new Set([
  "Profile",
  "Education",
  "Professional Experience",
  "Memberships",
  "Language Skills",
  "Technical Skills",
  "Interests",
  "References",
  "Certifications & Courses",
  "Projects & Work",
]);

const sourceLinks: Record<string, string> = {
  "hassan1alshami6@gmail.com": "mailto:hassan1alshami6@gmail.com",
  "+967 772 765 120": "https://wa.me/967772765120",
  "linkedin.com/in/a2sn4": "https://www.linkedin.com/in/a2sn4",
  "@a2s.n4": "https://www.instagram.com/a2s.n4",
  "International University of Technology Twintech | B.Sc. in Computer Science": "https://iutt.edu.ye/",
  "Asaas AI | Co-Founder & Director of Quality Assurance": "https://ai-asaas.com/",
  "AHD for Financial Services – Jaib Wallet | Multiple Roles": "https://www.ahdfinancial.com/",
  "Water & Sanitation Local Corporation | Control Engineer Trainee": "https://moee.gov.ye/en/sitepages/53",
  "Al-Rahma Foundation | Network Engineer Trainee": "https://www.rahma-ye.org/en",
  "Glory of Civilization Schools | Administrative Assistant Trainee": "https://www.facebook.com/majdalhadaraschools",
  "1 CYBERAI CLUB": "https://yemenacademic.net/archives/101610",
  "2 SOCIETY OF PETROLEUM ENGINEERS (SPE)": "https://www.spe.org/en/",
  "3 Al-Hamdi Foundation for Human Development": "https://alhamdifoundation.org/",
  "5 Yemen Elite Bloc": "https://www.facebook.com/profile.php?id=61572728274907",
};

function splitIntoSourcePages(text: string) {
  const pages: string[][] = [];
  let current: string[] = [];

  for (const line of text.trimEnd().split("\n")) {
    current.push(line);
    if (/^[1-4] — 4$/.test(line)) {
      pages.push(current);
      current = [];
    }
  }

  if (current.length > 0) pages.push(current);
  return pages;
}

function renderLine(line: string, index: number) {
  if (sectionHeadings.has(line)) {
    return (
      <h2 key={`${line}-${index}`} className={styles.sectionTitle}>
        {line}
      </h2>
    );
  }

  if (/^[1-4] — 4$/.test(line)) {
    return (
      <p key={`${line}-${index}`} className={styles.pageMarker}>
        {line}
      </p>
    );
  }

  const linked = sourceLinks[line];
  const className =
    index < 2
      ? index === 0
        ? styles.name
        : styles.role
      : /^\d+\)/.test(line) || /^\d\s/.test(line) || line.includes(" | ")
        ? styles.strongLine
        : /^20\d\d \|/.test(line)
          ? styles.certLine
          : styles.bodyLine;

  if (linked) {
    return (
      <a
        key={`${line}-${index}`}
        href={linked}
        target={linked.startsWith("http") ? "_blank" : undefined}
        rel={linked.startsWith("http") ? "noopener noreferrer" : undefined}
        className={className}
      >
        {line}
      </a>
    );
  }

  if (line === "Open --< Certificate Documents >-- to view them in the repository.") {
    return (
      <p key={`${line}-${index}`} className={styles.bodyLine}>
        Open --&lt;{" "}
        <a href="https://github.com/a2sn2/certificates.git" target="_blank" rel="noopener noreferrer">
          Certificate Documents
        </a>
        {" "}&gt;-- to view them in the repository.
      </p>
    );
  }

  if (line === "Explore my future projects in programming, engineering, and graphic design on --< GITHUB >--") {
    return (
      <p key={`${line}-${index}`} className={styles.bodyLine}>
        Explore my future projects in programming, engineering, and graphic design on --&lt;{" "}
        <a href="https://github.com/a2sn2" target="_blank" rel="noopener noreferrer">
          GITHUB
        </a>
        {" "}&gt;--
      </p>
    );
  }

  return (
    <p key={`${line}-${index}`} className={className}>
      {line}
    </p>
  );
}

export default function OfficialCvPage() {
  const pages = splitIntoSourcePages(officialCvCanonicalText);

  return (
    <div className={styles.page}>
      <Container>
        <header className={styles.header}>
          <span className={styles.kicker}>Canonical Professional Record</span>
          <h1 className={styles.title}>Official English CV Content</h1>
          <p className={styles.description}>
            This page preserves the wording and information of the official English Standard CV verbatim.
            Portfolio-specific editorial framing and visual creativity stay outside the verified record.
          </p>
          <div className={styles.sourceMeta}>
            <span>Source: {officialCvSource.path}</span>
            <span>PDF SHA-256: {officialCvSource.pdfSha256}</span>
          </div>
          <div className={styles.actions}>
            <a
              href="/cv/ALHassan_Baligh_ALShami_CV_English_Standard.pdf"
              className={styles.primaryAction}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Source PDF
            </a>
            <Link href="/contact" className={styles.secondaryAction}>
              CV Downloads & Contact
            </Link>
          </div>
        </header>

        <div className={styles.record} data-cv-verbatim>
          {pages.map((pageLines, pageIndex) => (
            <section
              key={pageIndex}
              className={styles.sourcePage}
              aria-label={`Official CV source page ${pageIndex + 1}`}
            >
              {pageLines.map((line, lineIndex) =>
                renderLine(line, pageIndex * 1000 + lineIndex)
              )}
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
