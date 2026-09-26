"use client";

import React, { useState } from "react";
import styles from "./CapabilitiesMatrix.module.css";
import { SkillGroup } from "@/contracts/skills";
import { CredentialItem, CredentialCategory, MembershipItem } from "@/contracts/credentials";
import { cn } from "@/utils/cn";
import { PORTFOLIO_TREE_BASE } from "@/content/evidence";

interface CapabilitiesMatrixProps {
  skillGroups: SkillGroup[];
  certifications: CredentialItem[];
  memberships: MembershipItem[];
  certRepoUrl: string;
  locale?: "en" | "ar" | "de";
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

const certCatLabelDe: Record<"All" | CredentialCategory, string> = {
  All: "Alle",
  "AI & Data": "KI & Daten",
  "Engineering & Hardware": "Ingenieurwesen & Hardware",
  "Systems & Networks": "Systeme & Netzwerke",
  "Professional & Management": "Management & Berufskompetenzen",
  Foundation: "Grundlagen",
};

const certStatusMap: Record<"en" | "ar" | "de", Record<string, string>> = {
  en: { Ongoing: "Ongoing", "In Progress": "In Progress", Completed: "Completed" },
  ar: { Ongoing: "قيد المتابعة", "In Progress": "قيد الإنجاز", Completed: "مكتمل" },
  de: { Ongoing: "laufend", "In Progress": "laufend", Completed: "Abgeschlossen" },
};

export function CapabilitiesMatrix({
  skillGroups,
  certifications,
  memberships,
  certRepoUrl,
  locale = "en",
}: CapabilitiesMatrixProps) {
  const isAr = locale === "ar";
  const isDe = locale === "de";
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
            {isAr
              ? "التخصصات والكفاءات الهندسية"
              : isDe
              ? "Ingenieurdisziplinen & Kompetenzen"
              : "Engineering Disciplines & Competencies"}
          </h2>
          <p className={styles.sectionLead}>
            {isAr
              ? "القدرات التقنية وبيئات البرمجيات المصنفة والمحققة في البيئات الإنتاجية والأكاديمية."
              : isDe
              ? "Technische Fähigkeiten, Werkzeuge und Softwareumgebungen aus Softwareentwicklung, Netzwerktechnik und industrieller Steuerung."
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
              : isDe
              ? `Zertifikate & Fachweiterbildungen (${certifications.length})`
              : `Certifications & Specialized Training (${certifications.length})`}
          </h2>
          <p className={styles.sectionLead}>
            {isAr
              ? "برامج تدريبية وتأهيلية معتمدة من كليات جامعية ومعاهد تقنية وتكتلات هندسية."
              : isDe
              ? "Zertifikate, Kurse und Programme aus Universitätsfakultäten, technischen Instituten und Fachorganisationen."
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
            const label = isAr ? certCatLabelAr[cat] : isDe ? certCatLabelDe[cat] : cat;
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

        {/* Credential Ledger */}
        <div className={styles.certLedger}>
          {filteredCerts.map((cert) => {
            const isVerifiedWithDoc = cert.evidence?.status === "verified" && cert.evidence.url;
            const isOngoingOrProgress = cert.status === "Ongoing" || cert.status === "In Progress";
            const localizedStatus = cert.status ? certStatusMap[locale]?.[cert.status] || cert.status : null;
            const actionText = isDe ? "Zertifikat ansehen" : isAr ? "عرض الشهادة" : "View Certificate";

            return (
              <article key={cert.id} className={styles.ledgerRow}>
                <div className={styles.ledgerYearCell}>
                  <span className={styles.ledgerYear}>
                    <bdi>{cert.year}</bdi>
                  </span>
                </div>

                <div className={styles.ledgerMainCell}>
                  <h3 className={styles.ledgerTitle}>{cert.title}</h3>
                  <div className={styles.ledgerMeta}>
                    <span className={styles.ledgerIssuer}>{cert.issuer}</span>
                    <span className={styles.ledgerDivider} aria-hidden="true">·</span>
                    <span className={styles.ledgerCategory}>
                      {isAr ? certCatLabelAr[cert.category] : isDe ? certCatLabelDe[cert.category] : cert.category}
                    </span>
                  </div>
                </div>

                <div className={styles.ledgerActionCell}>
                  {isVerifiedWithDoc ? (
                    <a
                      href={cert.evidence!.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.certActionLink}
                      aria-label={`${cert.title} — ${actionText}`}
                    >
                      <span>{actionText}</span>
                      <span className={styles.certActionArrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ) : isOngoingOrProgress ? (
                    <span className={styles.certStatusBadge}>
                      {localizedStatus}
                    </span>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. Community Engagement & Memberships */}
      <section aria-labelledby="heading-memberships">
        <div className={styles.sectionHeaderGroup}>
          <h2 id="heading-memberships" className={styles.sectionHeading}>
            {isAr
              ? "المجتمع المهني والعضويات"
              : isDe
              ? "Fachgesellschaften & Mitgliedschaften"
              : "Professional Community & Memberships"}
          </h2>
          <p className={styles.sectionLead}>
            {isAr
              ? "مشاركات فاعلة في الأندية الهندسية والجمعيات العلمية والمبادرات الشبابية والتنموية."
              : isDe
              ? "Aktive Mitarbeit in technischen Clubs, Ingenieurvereinigungen und Jugendförderungsinitiativen."
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

      {/* 4. Portfolio Evidence Hub Callout */}
      <div className={styles.repoCallout}>
        <div className={styles.repoInfo}>
          <div className={styles.repoHeaderGroup}>
            <span className={styles.repoKicker}>
              {isAr ? "[ مركز التوثيق الأساسي ]" : isDe ? "[ PRIMÄRER NACHWEISINDEX ]" : "[ PRIMARY EVIDENCE INDEX ]"}
            </span>
            <h3 className={styles.repoTitle}>
              {isAr
                ? "مركز توثيق المشاريع والشهادات"
                : isDe
                ? "Portfolio Evidence Hub & Nachweise"
                : "Portfolio Evidence Hub & Documentation"}
            </h3>
          </div>
          <p className={styles.repoDesc}>
            {isAr
              ? "أرشيفات المصادر البرمجية ووثائق الشهادات المعتمدة وملفات التوثيق الهندسي مفهرسة ومتاحة ضمن docs/evidence."
              : isDe
              ? "Zentralisierte Quellarchive, verifizierte Zertifikats-PDFs und deterministische Ingenieurnachweise katalogisiert unter docs/evidence."
              : "Centralized source archives, verified certification PDFs, and deterministic engineering evidence indexed under docs/evidence."}
          </p>
          <div className={styles.legacyCalloutRow}>
            <span className={styles.legacyLabel}>
              {isAr ? "مستودع الشهادات المجمعة:" : isDe ? "Offizielles Zertifikats-Repository (Archiv):" : "Legacy Grouped Repository:"}
            </span>{" "}
            <a
              href={certRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.legacyLink}
            >
              <span>a2sn2 / certificates</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className={styles.repoActions}>
          <a
            href={PORTFOLIO_TREE_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoBtn}
          >
            <span>
              {isAr
                ? "استكشاف مركز التوثيق"
                : isDe
                ? "Evidence Hub erkunden"
                : "Explore Evidence Hub"}
            </span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
