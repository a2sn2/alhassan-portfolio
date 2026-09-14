"use client";

import React, { useState } from "react";
import styles from "./CapabilitiesMatrix.module.css";
import { SkillGroup } from "@/contracts/skills";
import { CredentialItem, CredentialCategory, MembershipItem } from "@/contracts/credentials";
import { cn } from "@/utils/cn";

interface CapabilitiesMatrixProps {
  skillGroups: SkillGroup[];
  certifications: CredentialItem[];
  memberships: MembershipItem[];
  certRepoUrl: string;
}

const certCategories: ("All" | CredentialCategory)[] = [
  "All",
  "AI & Data",
  "Engineering & Hardware",
  "Systems & Networks",
  "Professional & Management",
  "Foundation",
];

export function CapabilitiesMatrix({
  skillGroups,
  certifications,
  memberships,
  certRepoUrl,
}: CapabilitiesMatrixProps) {
  const [activeCertCat, setActiveCertCat] = useState<"All" | CredentialCategory>("All");

  const filteredCerts =
    activeCertCat === "All"
      ? certifications
      : certifications.filter((c) => c.category === activeCertCat);

  return (
    <div className={styles.matrixContainer}>
      {/* 1. Core Technical Disciplines & Skills */}
      <section aria-labelledby="heading-skills">
        <div className={styles.sectionHeaderGroup}>
          <h2 id="heading-skills" className={styles.sectionHeading}>
            Engineering Disciplines & Competencies
          </h2>
          <p className={styles.sectionLead}>
            Categorized technical capabilities and software environments verified in production and academic environments.
          </p>
        </div>

        <div className={styles.skillsGrid} style={{ marginTop: "var(--space-6)" }}>
          {skillGroups.map((group) => (
            <div key={group.category} className={styles.skillGroupCard}>
              <div className={styles.groupHeader}>
                <h3 className={styles.groupCategory}>{group.category}</h3>
                {group.description && <p className={styles.groupDesc}>{group.description}</p>}
              </div>
              <div className={styles.pillWrap}>
                {group.skills.map((skill) => (
                  <span key={skill} className={styles.skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Official Certifications & Courses (26 Records) */}
      <section aria-labelledby="heading-certs">
        <div className={styles.sectionHeaderGroup}>
          <h2 id="heading-certs" className={styles.sectionHeading}>
            Certifications & Specialized Training ({certifications.length})
          </h2>
          <p className={styles.sectionLead}>
            Structured certifications and academic programs completed across university faculties, technical institutes, and engineering blocs.
          </p>
        </div>

        <div className={styles.filterBar} style={{ marginTop: "var(--space-6)" }}>
          {certCategories.map((cat) => {
            const count =
              cat === "All"
                ? certifications.length
                : certifications.filter((c) => c.category === cat).length;
            const isActive = cat === activeCertCat;
            return (
              <button
                key={cat}
                type="button"
                className={cn(styles.filterBtn, isActive && styles.filterBtnActive)}
                onClick={() => setActiveCertCat(cat)}
                aria-pressed={isActive}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className={styles.certGrid}>
          {filteredCerts.map((cert) => (
            <div key={cert.id} className={styles.certCard}>
              <div className={styles.certTop}>
                <span className={styles.certYear}>{cert.year}</span>
                {cert.status && <span className={styles.certStatus}>{cert.status}</span>}
              </div>
              <h3 className={styles.certTitle}>{cert.title}</h3>
              <span className={styles.certIssuer}>{cert.issuer}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Community Engagement & Memberships */}
      <section aria-labelledby="heading-memberships">
        <div className={styles.sectionHeaderGroup}>
          <h2 id="heading-memberships" className={styles.sectionHeading}>
            Professional Community & Memberships
          </h2>
          <p className={styles.sectionLead}>
            Active participation in technical clubs, engineering associations, and youth development initiatives.
          </p>
        </div>

        <div className={styles.membershipGrid} style={{ marginTop: "var(--space-6)" }}>
          {memberships.map((m) => (
            <div key={m.id} className={styles.membershipCard}>
              <h3 className={styles.membershipOrg}>{m.organization}</h3>
              <span className={styles.membershipRole}>{m.role}</span>
              <p className={styles.membershipDesc}>{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Verified Proof Repository Callout */}
      <div className={styles.repoCallout}>
        <div className={styles.repoInfo}>
          <h3 className={styles.repoTitle}>Official Certificates Repository</h3>
          <p className={styles.repoDesc}>
            All certificate documents, official completions, and academic credentials are cataloged in an open public repository.
          </p>
        </div>
        <a
          href={certRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.repoBtn}
        >
          <span>View Certificates Repository</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
