import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { Badge } from "@/components/ui/Badge";
import {
  identityContentDe,
  projectItemsDe,
  experienceContentDe,
  skillsContentDe,
  credentialsContentDe,
  proofContentDe,
} from "@/content/de";
import { jaibExperienceJourney } from "@/content";
import { ProofSection } from "@/components/sections/ProofSection";
import { FlagshipBlueprint } from "@/components/projects/FlagshipBlueprint";
import { getSkillGroupAnchor } from "@/utils/skills";
import { formatProjectCategory } from "@/utils/categories";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";
import styles from "../home.module.css";

const domainEvidenceMapDe: Record<
  string,
  { label: string; links: Array<{ title: string; href: string }> }
> = {
  "skills-programming": {
    label: "Belegter Nachweis:",
    links: [
      { title: "FoundationKit (.NET 10)", href: "/de/projects/foundationkit-dotnet" },
      { title: "ROBOCAM Controller", href: "/de/projects/robocam-controller" },
    ],
  },
  "skills-data": {
    label: "Belegter Nachweis:",
    links: [
      { title: "Echtzeit-Objekterkennung", href: "/de/projects/real-time-object-detection" },
      { title: "FoundationKit (EF Core / SQL)", href: "/de/projects/foundationkit-dotnet" },
    ],
  },
  "skills-systems": {
    label: "Belegter Nachweis:",
    links: [
      { title: "MikroTik-Hotspot-Portal (RouterOS & RADIUS)", href: "/de/projects/mikrotik-hotspot-portal" },
    ],
  },
  "skills-automation": {
    label: "Belegter Nachweis:",
    links: [
      { title: "Pumpstation-Analytik & SPS-Telemetrie", href: "/de/projects/pump-station-analytics" },
    ],
  },
  "skills-qa": {
    label: "Belegter Nachweis:",
    links: [
      { title: "Asaas AI QA-Leitung", href: "/de/experience#asaas-ai-qa" },
      { title: "Jaib-Finanzplattform", href: "/de/experience#ahd-financial-deputy" },
    ],
  },
};

export default function GermanHomePage() {
  const featuredProjects = projectItemsDe.filter(
    (p) => p.presentationTier === "featured"
  );
  const flagshipProject =
    featuredProjects.find((p) => p.id === "foundationkit-dotnet") ||
    featuredProjects[0];
  const supportingProjects = featuredProjects.filter(
    (p) => p.id !== flagshipProject?.id
  );
  const asaasRole = experienceContentDe.items.find((i) => i.id === "asaas-ai-qa");
  const foundationRole = experienceContentDe.items.find(
    (i) => i.id === "water-sanitation-trainee"
  );

  return (
    <div className={styles.homeWrapper}>
      {/* 1. Hero with Verified Identity & Positioning */}
      <HeroSection content={identityContentDe} />

      {/* 2. Featured Projects Preview */}
      <section className={styles.previewSection} aria-labelledby="heading-featured-work">
        <Container>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTextGroup}>
              <span className={styles.kicker}>Ausgewählte Ingenieurarbeiten</span>
              <h2 id="heading-featured-work" className={styles.heading}>
                Ausgewählte technische Projekte & Systeme
              </h2>
            </div>
            <Link href="/de/projects" className={styles.viewAllLink}>
              <span>{`Alle ${projectItemsDe.length} Projekte ansehen`}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.featuredShowcaseWrap}>
            {/* Flagship Engineering Showcase */}
            {flagshipProject && (
              <Reveal as="article" delay={0} className={styles.flagshipShowcase}>
                <div className={styles.flagshipContent}>
                  <div className={styles.cardHeader}>
                    <Badge variant="category">{formatProjectCategory(flagshipProject.category, "de")}</Badge>
                    <Badge variant="tech">Pre-Production · .NET 10</Badge>
                  </div>

                  <h3 className={styles.flagshipTitle}>{flagshipProject.title}</h3>
                  <p className={styles.flagshipTagline}>{flagshipProject.tagline}</p>

                  {flagshipProject.result && (
                    <div className={styles.projectSnippet}>
                      <strong>Verifiziertes Ergebnis:</strong> {flagshipProject.result}
                    </div>
                  )}

                  {flagshipProject.implementationHighlights && (
                    <ul className={styles.flagshipHighlights}>
                      {flagshipProject.implementationHighlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className={styles.flagshipHighlightItem}>
                          <span className={styles.flagshipHighlightBullet} aria-hidden="true">▸</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className={styles.techPills}>
                    {flagshipProject.technologies.map((tech) => (
                      <span key={tech} className={styles.techPill}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={styles.flagshipFooter}>
                    <Link
                      href={`/de/projects/${flagshipProject.slug}`}
                      className={styles.flagshipCta}
                      aria-label={`Architektur & Fallstudie für ${flagshipProject.title} erkunden`}
                    >
                      <span>Architektur & Fallstudie erkunden</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                <div className={styles.flagshipVisual}>
                  <FlagshipBlueprint
                    locale="de"
                    variant="preview"
                    caseStudyHref={`/de/projects/${flagshipProject.slug}`}
                  />
                </div>
              </Reveal>
            )}

            {/* Supporting Engineering Work */}
            <div className={styles.supportingSection}>
              <div className={styles.supportingHeader}>
                <span className={styles.supportingKicker}>Ergänzende Ingenieurarbeiten</span>
                <span className={styles.supportingSub}>[ 02 — 04 ]</span>
              </div>

              <div className={styles.supportingProjectsGrid}>
                {supportingProjects.map((project, index) => (
                  <Reveal
                    as="article"
                    key={project.id}
                    delay={(index + 1) * 60}
                    className={styles.projectCard}
                  >
                    <div className={styles.cardHeader}>
                      <Badge variant="category">{formatProjectCategory(project.category, "de")}</Badge>
                      {project.badge && (
                        <Badge variant="tech">{project.badge}</Badge>
                      )}
                    </div>

                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectTagline}>{project.tagline}</p>

                    {project.result && (
                      <div className={styles.projectSnippet}>
                        <strong>Ergebnis:</strong> {project.result}
                      </div>
                    )}

                    <div className={styles.techPills}>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className={styles.techPill}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={styles.techPill}>
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className={styles.cardFooter}>
                      <Link
                        href={`/de/projects/${project.slug}`}
                        className={styles.caseStudyLink}
                        aria-label={`Fallstudie für ${project.title} lesen`}
                      >
                        <span>Fallstudie erkunden</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Experience & Operational Journey Snapshot */}
      <section className={styles.previewSectionAlternate} aria-labelledby="heading-experience-snapshot">
        <Container>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTextGroup}>
              <span className={styles.kicker}>Werdegang & Praxis</span>
              <h2 id="heading-experience-snapshot" className={styles.heading}>
                Operative & leitende Meilensteine
              </h2>
            </div>
            <Link href="/de/experience" className={styles.viewAllLink}>
              <span>Interaktiven Werdegang erkunden</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.experienceCards}>
            {/* A. Current QA / company leadership context */}
            {asaasRole && (
              <Reveal delay={0} className={styles.experienceCard}>
                <div className={styles.roleHeader}>
                  <span className={styles.roleCompany}>{asaasRole.company}</span>
                  <span className={styles.rolePeriod}>
                    <bdi dir="ltr">{asaasRole.period}</bdi>
                  </span>
                </div>
                <h3 className={styles.roleTitle}>{asaasRole.role}</h3>
                <p className={styles.roleDesc}>{asaasRole.description}</p>
                <div className={styles.techPills}>
                  {asaasRole.technologies.map((t) => (
                    <span key={t} className={styles.techPill}>
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            {/* B. Jaib Wallet Career Progression Editorial Feature */}
            <Reveal
              delay={50}
              className={cn(styles.experienceCard, styles.progressionHighlightCard)}
            >
              <div className={styles.roleHeader}>
                <span className={styles.roleCompany}>
                  {jaibExperienceJourney.organization.de}
                </span>
                <span className={styles.progressionBadge}>
                  {jaibExperienceJourney.label.de}
                </span>
              </div>

              <div className={styles.progressionTimelineBar}>
                <span className={styles.progressionDateStart}>
                  <bdi dir="ltr">Sept. 2025</bdi>
                </span>
                <div className={styles.progressionBarLine} aria-hidden="true">
                  <span className={styles.progressionBarDot} />
                  <span className={styles.progressionBarTrack} />
                  <span
                    className={cn(
                      styles.progressionBarDot,
                      styles.progressionBarDotCurrent
                    )}
                  />
                </div>
                <span className={styles.progressionDateEnd}>
                  <bdi dir="ltr">heute</bdi>
                </span>
              </div>

              <div className={styles.homeProgressionStepper}>
                <div className={styles.homeStepperLine} aria-hidden="true" />
                <div className={styles.homeStagesList}>
                  {jaibExperienceJourney.stages.map((stage) => {
                    const roleItem = experienceContentDe.items.find(
                      (i) => i.id === stage.roleId
                    );
                    return (
                      <div
                        key={stage.roleId}
                        className={cn(
                          styles.homeStageItem,
                          stage.isCurrent && styles.homeStageItemCurrent
                        )}
                      >
                        <span
                          className={cn(
                            styles.homeStageDot,
                            stage.isCurrent && styles.homeStageDotCurrent
                          )}
                          aria-hidden="true"
                        />
                        <span className={styles.homeStageNum}>
                          {stage.stageNumber}
                        </span>
                        <span className={styles.homeStageTitle}>
                          {roleItem ? roleItem.role : stage.shortTitle.de}
                        </span>
                        {stage.isCurrent && (
                          <span className={styles.homeStageCurrentTag}>
                            {jaibExperienceJourney.currentBadge.de}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className={styles.progressionSummary}>
                {jaibExperienceJourney.summary.de}
              </p>

              <div className={styles.progressionCtaWrap}>
                <Link
                  href="/de/experience#ahd-financial-deputy"
                  className={styles.progressionCtaLink}
                >
                  <span>{jaibExperienceJourney.cta.de}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>

            {/* C. Earlier Engineering Foundation */}
            {foundationRole && (
              <Reveal delay={100} className={styles.experienceCard}>
                <div className={styles.roleHeader}>
                  <span className={styles.roleCompany}>
                    {foundationRole.company}
                  </span>
                  <span className={styles.rolePeriod}>
                    <bdi dir="ltr">{foundationRole.period}</bdi>
                  </span>
                </div>
                <h3 className={styles.roleTitle}>{foundationRole.role}</h3>
                <p className={styles.roleDesc}>{foundationRole.description}</p>
                <div className={styles.techPills}>
                  {foundationRole.technologies.map((t) => (
                    <span key={t} className={styles.techPill}>
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* 4. Capabilities & Credentials Overview */}
      <section className={styles.previewSection} aria-labelledby="heading-capabilities-preview">
        <Container>
          <div className={styles.sectionHeader}>
            <div className={styles.headerTextGroup}>
              <span className={styles.kicker}>Fähigkeiten & Nachweise</span>
              <h2 id="heading-capabilities-preview" className={styles.heading}>
                Technische Kompetenzen & Fähigkeiten
              </h2>
            </div>
            <Link href="/de/capabilities" className={styles.viewAllLink}>
              <span>Komplette Kompetenzmatrix</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* 5 Official Capability Groups */}
          <div className={styles.capabilitiesDomainsGrid}>
            {skillsContentDe.groups.map((group, index) => {
              const anchor = getSkillGroupAnchor(group, index);
              const cardClass = `${styles.domainCard} ${styles[`domainCard${index + 1}`] || ""}`.trim();
              const displaySkills = group.skills.slice(0, 5);
              const evidence = group.id ? domainEvidenceMapDe[group.id] : undefined;

              return (
                <Reveal key={group.category} delay={index * 40} className={cardClass}>
                  <div className={styles.domainTop}>
                    <h3 className={styles.domainTitle}>{group.category}</h3>
                    <p className={styles.domainDesc}>{group.description}</p>
                    <div className={styles.domainTechPills}>
                      {displaySkills.map((s) => (
                        <span key={s} className={styles.domainTechPill}>
                          {s}
                        </span>
                      ))}
                    </div>

                    {evidence && (
                      <div className={styles.domainEvidenceRow}>
                        <span className={styles.domainEvidenceLabel}>{evidence.label}</span>
                        <div className={styles.domainEvidenceLinks}>
                          {evidence.links.map((item, linkIdx) => (
                            <React.Fragment key={item.href}>
                              {linkIdx > 0 && (
                                <span className={styles.domainEvidenceSep} aria-hidden="true">·</span>
                              )}
                              <Link href={item.href} className={styles.domainEvidenceLink}>
                                <span>{item.title}</span>
                                <span aria-hidden="true">→</span>
                              </Link>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/de/capabilities#${anchor}`}
                    className={styles.domainDetailLink}
                    aria-label={`Details zu ${group.category} ansehen`}
                  >
                    <span>Bereichsdetails ansehen</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Secondary Credentials & Community Bar */}
          <div className={styles.credentialsEvidenceBar}>
            <Reveal delay={200} className={styles.credHighlightCard}>
              <div className={styles.credHeaderGroup}>
                <span className={styles.credKicker}>Fachweiterbildungen</span>
                <h3 className={styles.credTitle}>
                  {credentialsContentDe.certifications.length} Zertifikate & Weiterbildungsprogramme
                </h3>
                <p className={styles.credDesc}>{credentialsContentDe.overviewText}</p>
              </div>
              <Link
                href="/de/capabilities#heading-certs"
                className={styles.credActionLink}
                aria-label="Alle Zertifikate und Weiterbildungsprogramme in der Kompetenzmatrix ansehen"
              >
                <span>Zertifikatsübersicht ansehen ({credentialsContentDe.certifications.length})</span>
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <Reveal delay={240} className={styles.credHighlightCard}>
              <div className={styles.credHeaderGroup}>
                <span className={styles.credKicker}>Netzwerk & Fachwelt</span>
                <h3 className={styles.credTitle}>Berufliche Mitgliedschaften</h3>
                <p className={styles.credDesc}>
                  {credentialsContentDe.memberships.map((m) => m.organization).join(" · ")}
                </p>
              </div>
              <Link
                href="/de/capabilities#heading-memberships"
                className={styles.credActionLink}
                aria-label="Mitgliedschaften in der Kompetenzmatrix ansehen"
              >
                <span>Mitgliedschaften ansehen</span>
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 5. Proof & Verification Section */}
      <ProofSection content={proofContentDe} locale="de" />

      {/* 6. Concise Closing Editorial Contact Band */}
      <section className={styles.closingCtaSection} aria-labelledby="heading-closing-contact">
        <Container>
          <div className={styles.closingCtaRow}>
            <div className={styles.closingCtaCopy}>
              <h2 id="heading-closing-contact" className={styles.closingCtaTitle}>
                Direkter Kontakt &amp; Offizielle Lebensläufe
              </h2>
              <p className={styles.closingCtaText}>
                Kontaktieren Sie mich direkt für Software-Engineering-Positionen und Architekturprojekte oder laden Sie die offiziellen Standard- und ATS-Lebensläufe herunter.
              </p>
            </div>
            <div className={styles.closingCtaActions}>
              <Link href="/de/contact" className={styles.flagshipCta}>
                <span>Direkt kontaktieren</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/de/contact#cv-downloads" className={styles.closingSecondaryLink}>
                <span>Lebensläufe herunterladen</span>
                <span aria-hidden="true">↓</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
