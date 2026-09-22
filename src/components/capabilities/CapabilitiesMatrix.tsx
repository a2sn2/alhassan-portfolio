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
  locale?: "en" | "ar";
}

const certCategoriesEn: ("All" | CredentialCategory)[] = [
  "All",
  "AI & Data",
  "Engineering & Hardware",
  "Systems & Networks",
  "Professional & Management",
  "Foundation",
];

const certCatLabelAr: Record<"All" | CredentialCategory, string> = {
  All: "الكل",
  "AI & Data": "الذكاء الاصطناعي والبيانات",
  "Engineering & Hardware": "الهندسة والعتاد",
  "Systems & Networks": "الأنظمة والشبكات",
  "Professional & Management": "الإدارة والمهارات المهنية",
  Foundation: "المهارات الأساسية",
};

export function CapabilitiesMatrix({
  skillGroups,
  certifications,
  memberships,
  certRepoUrl,
  locale = "en",
}: CapabilitiesMatrixProps) {
  const isAr = locale === "ar";
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
            {isAr ? "التخصصات والكفاءات الهندسية" : "Engineering Disciplines & Competencies"}
          </h2>
          <p className={styles.sectionLead}>
            {isAr
              ? "القدرات التقنية وبيئات البرمجيات المصنفة والمحققة في البيئات الإنتاجية والأكاديمية."
              : "Categorized technical capabilities and software environments verified in production and academic environments."}
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
                  <bdi key={skill} className={styles.skillPill}>
                    {skill}
                  </bdi>
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
            {isAr
              ? `الشهادات والدورات التخصصية (${certifications.length})`
              : `Certifications & Specialized Training (${certifications.length})`}
          </h2>
          <p className={styles.sectionLead}>
            {isAr
              ? "برامج تدريبية وتأهيلية معتمدة من كليات جامعية ومعاهد تقنية وتكتلات هندسية."
              : "Structured certifications and academic programs completed across university faculties, technical institutes, and engineering blocs."}
          </p>
        </div>

        <div className={styles.filterBar} style={{ marginTop: "var(--space-6)" }}>
          {certCategoriesEn.map((cat) => {
            const count =
              cat === "All"
                ? certifications.length
                : certifications.filter((c) => c.category === cat).length;
            const isActive = cat === activeCertCat;
            const label = isAr ? certCatLabelAr[cat] : cat;
            return (
              <button
                key={cat}
                type="button"
                className={cn(styles.filterBtn, isActive && styles.filterBtnActive)}
                onClick={() => setActiveCertCat(cat)}
                aria-pressed={isActive}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        <div className={styles.certGrid}>
          {filteredCerts.map((cert) => (
            <div key={cert.id} className={styles.certCard}>
              <div className={styles.certTop}>
                <span className={styles.certYear}>
                  <bdi>{cert.year}</bdi>
                </span>
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
            {isAr ? "المجتمع المهني والعضويات" : "Professional Community & Memberships"}
          </h2>
          <p className={styles.sectionLead}>
            {isAr
              ? "مشاركات فاعلة في الأندية الهندسية والجمعيات العلمية والمبادرات الشبابية والتنموية."
              : "Active participation in technical clubs, engineering associations, and youth development initiatives."}
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
          <h3 className={styles.repoTitle}>
            {isAr ? "المستودع الرقمي للشهادات" : "Official Certificates Repository"}
          </h3>
          <p className={styles.repoDesc}>
            {isAr
              ? "جميع وثائق الشهادات والمشاركات الأكاديمية موثقة ومتاحة في مستودع رقمي عام ومفتوح."
              : "All certificate documents, official completions, and academic credentials are cataloged in an open public repository."}
          </p>
        </div>
        <a
          href={certRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.repoBtn}
        >
          <span>{isAr ? "عرض مستودع الشهادات" : "View Certificates Repository"}</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
