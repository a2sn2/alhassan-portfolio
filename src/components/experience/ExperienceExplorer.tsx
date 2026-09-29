"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import styles from "./ExperienceExplorer.module.css";
import { ExperienceItem } from "@/contracts/experience";
import {
  jaibExperienceJourney,
  normalizeExperienceHash,
} from "@/content/experienceJourneys";
import { cn } from "@/utils/cn";

interface ExperienceExplorerProps {
  items: ExperienceItem[];
}

export function ExperienceExplorer({ items }: ExperienceExplorerProps) {
  const [selectedId, setSelectedId] = useState<string>(items[0]?.id || "");
  const [openMobileIds, setOpenMobileIds] = useState<Record<string, boolean>>({
    [items[0]?.id || ""]: true,
  });
  const [isJaibMobileOpen, setIsJaibMobileOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const isGerman = pathname === "/de" || pathname.startsWith("/de/");
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const locale: "en" | "ar" | "de" = isGerman ? "de" : isArabic ? "ar" : "en";

  const isJaibActive = jaibExperienceJourney.roleIds.includes(selectedId);
  const activeJaibStageIndex = jaibExperienceJourney.stages.findIndex(
    (s) => s.roleId === selectedId
  );

  // Check for deep link hash on mount and hashchange
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace("#", "");
      if (!rawHash) return;
      const hash = normalizeExperienceHash(rawHash);

      if (items.some((item) => item.id === hash)) {
        setSelectedId(hash);

        if (jaibExperienceJourney.roleIds.includes(hash)) {
          setIsJaibMobileOpen(true);
        } else {
          setOpenMobileIds((prev) => ({ ...prev, [hash]: true }));
        }

        if (rawHash !== hash && window.history.replaceState) {
          window.history.replaceState(null, "", `#${hash}`);
        }

        requestAnimationFrame(() => {
          const el =
            document.getElementById(hash) ||
            document.getElementById(`tab-${hash}`) ||
            document.getElementById("ahd-jaib");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [items]);

  const selectedItem = items.find((item) => item.id === selectedId) || items[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (jaibExperienceJourney.roleIds.includes(id)) {
      setIsJaibMobileOpen(true);
    }
    if (window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const toggleMobile = (id: string) => {
    setOpenMobileIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Grouped items for desktop timeline
  const desktopTimelineGroups = useMemo(() => {
    const groups: Array<
      | { type: "single"; item: ExperienceItem }
      | { type: "jaib-journey"; journey: typeof jaibExperienceJourney }
    > = [];

    let jaibAdded = false;

    for (const item of items) {
      if (jaibExperienceJourney.roleIds.includes(item.id)) {
        if (!jaibAdded) {
          groups.push({ type: "jaib-journey", journey: jaibExperienceJourney });
          jaibAdded = true;
        }
      } else {
        groups.push({ type: "single", item });
      }
    }

    return groups;
  }, [items]);

  // Grouped items for mobile view
  const mobileLayoutGroups = useMemo(() => {
    const groups: Array<
      | { type: "single"; item: ExperienceItem }
      | { type: "jaib-journey"; journey: typeof jaibExperienceJourney }
    > = [];

    let jaibAdded = false;

    for (const item of items) {
      if (jaibExperienceJourney.roleIds.includes(item.id)) {
        if (!jaibAdded) {
          groups.push({ type: "jaib-journey", journey: jaibExperienceJourney });
          jaibAdded = true;
        }
      } else {
        groups.push({ type: "single", item });
      }
    }

    return groups;
  }, [items]);

  return (
    <div className={styles.explorer}>
      {/* Desktop Split View */}
      <div className={styles.desktopLayout}>
        <div
          className={styles.timelineNav}
          role="tablist"
          aria-label={
            isGerman
              ? "Zeitstrahl der beruflichen Positionen"
              : isArabic
              ? "المسار الزمني للأدوار المهنية"
              : "Professional Roles Timeline"
          }
        >
          {desktopTimelineGroups.map((group) => {
            if (group.type === "single") {
              const item = group.item;
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${item.id}`}
                  className={cn(
                    styles.roleTab,
                    isSelected && styles.roleTabSelected
                  )}
                  onClick={() => handleSelect(item.id)}
                >
                  <span className={styles.roleTabRole}>{item.role}</span>
                  <span className={styles.roleTabCompany}>{item.company}</span>
                  <span className={styles.roleTabPeriod}>
                    <bdi>{item.period}</bdi>
                  </span>
                </button>
              );
            }

            // Jaib Career Progression Group
            const journey = group.journey;
            return (
              <div
                key={journey.id}
                id="progression-ahd-jaib"
                className={cn(
                  styles.progressionBlock,
                  isJaibActive && styles.progressionBlockActive
                )}
                role="presentation"
              >
                {/* Organization Header */}
                <div
                  className={styles.progressionHeader}
                  role="presentation"
                >
                  <span className={styles.progressionCompany}>
                    {journey.organization[locale]}
                  </span>
                  <div className={styles.progressionKickerRow}>
                    <span className={styles.progressionLabel}>
                      {journey.label[locale]}
                    </span>
                    <span className={styles.progressionPeriod}>
                      <bdi>{journey.period[locale]}</bdi>
                    </span>
                  </div>
                </div>

                {/* 4 Connected Stages (Chronological: Oldest -> Newest) */}
                <div className={styles.progressionStepper} role="presentation">
                  <div className={styles.stepperTrack} aria-hidden="true">
                    <div
                      className={styles.stepperFill}
                      style={{
                        height:
                          activeJaibStageIndex >= 0
                            ? `${(activeJaibStageIndex / 3) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>

                  <div className={styles.stagesContainer} role="presentation">
                    {journey.stages.map((stage, idx) => {
                      const item = items.find((i) => i.id === stage.roleId);
                      if (!item) return null;
                      const isSelected = selectedId === stage.roleId;
                      const isPassedOrActive =
                        activeJaibStageIndex >= 0 && activeJaibStageIndex >= idx;

                      return (
                        <button
                          key={stage.roleId}
                          id={`tab-${stage.roleId}`}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          aria-controls={`panel-${stage.roleId}`}
                          className={cn(
                            styles.stageButton,
                            isSelected && styles.stageButtonSelected,
                            stage.isCurrent && styles.stageButtonCurrent
                          )}
                          onClick={() => handleSelect(stage.roleId)}
                        >
                          <span
                            className={cn(
                              styles.stageNodeDot,
                              isPassedOrActive && styles.stageNodeDotPassed,
                              isSelected && styles.stageNodeDotSelected,
                              stage.isCurrent && styles.stageNodeDotCurrent
                            )}
                            aria-hidden="true"
                          />
                          <div className={styles.stageButtonContent}>
                            <div className={styles.stageNumberRoleRow}>
                              <span className={styles.stageNumber}>
                                {stage.stageNumber}
                              </span>
                              <span className={styles.stageRoleTitle}>
                                {item.role}
                              </span>
                              {stage.isCurrent && (
                                <span className={styles.currentTagBadge}>
                                  {journey.currentBadge[locale]}
                                </span>
                              )}
                            </div>
                            <span className={styles.stagePeriodText}>
                              <bdi>{item.period}</bdi>
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedItem && (
          <div
            id={`panel-${selectedItem.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${selectedItem.id}`}
            className={styles.detailPanel}
            key={selectedItem.id}
          >
            {/* Restrained Contextual Strip for Jaib Progression */}
            {isJaibActive && (
              <div
                className={styles.contextualStrip}
                role="region"
                aria-label={jaibExperienceJourney.label[locale]}
              >
                <div className={styles.contextualHeader}>
                  <span className={styles.contextualKicker}>
                    {jaibExperienceJourney.stageContextPrefix[locale]}
                  </span>
                  <span className={styles.contextualSubtitle}>
                    {isArabic
                      ? `المرحلة ${
                          jaibExperienceJourney.stages[activeJaibStageIndex]
                            ?.stageNumber || "01"
                        } / 04 · ${jaibExperienceJourney.organization[locale]}`
                      : isGerman
                      ? `Phase ${
                          jaibExperienceJourney.stages[activeJaibStageIndex]
                            ?.stageNumber || "01"
                        } / 04 · ${jaibExperienceJourney.organization[locale]}`
                      : `Stage ${
                          jaibExperienceJourney.stages[activeJaibStageIndex]
                            ?.stageNumber || "01"
                        } / 04 · ${jaibExperienceJourney.organization[locale]}`}
                  </span>
                </div>

                <div
                  className={styles.contextualStepper}
                  role="navigation"
                  aria-label="Career progression stages"
                >
                  {jaibExperienceJourney.stages.map((stage, sIdx) => {
                    const isStageCurrent = selectedId === stage.roleId;
                    const isPassed =
                      activeJaibStageIndex >= 0 && activeJaibStageIndex >= sIdx;

                    return (
                      <React.Fragment key={stage.roleId}>
                        {sIdx > 0 && (
                          <span
                            className={cn(
                              styles.contextualConnector,
                              activeJaibStageIndex >= sIdx &&
                                styles.contextualConnectorActive
                            )}
                            aria-hidden="true"
                          />
                        )}
                        <button
                          type="button"
                          className={cn(
                            styles.contextualNode,
                            isStageCurrent && styles.contextualNodeSelected,
                            isPassed && styles.contextualNodePassed
                          )}
                          onClick={() => handleSelect(stage.roleId)}
                          aria-current={isStageCurrent ? "step" : undefined}
                        >
                          <span
                            className={styles.contextualDot}
                            aria-hidden="true"
                          />
                          <span className={styles.contextualLabel}>
                            {stage.shortTitle[locale]}
                          </span>
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            <div className={styles.panelHeader}>
              <div className={styles.roleTitleRow}>
                <h2 className={styles.panelRole}>{selectedItem.role}</h2>
                {selectedItem.isCurrent && (
                  <span className={styles.currentBadge}>
                    {isGerman
                      ? "Aktuelle Position"
                      : isArabic
                      ? "الدور الحالي"
                      : "Current Role"}
                  </span>
                )}
              </div>
              <div className={styles.panelMeta}>
                <span className={styles.panelCompany}>
                  {selectedItem.company}
                </span>
                <span>·</span>
                <span className={styles.panelPeriod}>
                  <bdi>{selectedItem.period}</bdi>
                </span>
                <span>·</span>
                <span className={styles.panelLocation}>
                  {selectedItem.location}
                </span>
              </div>
            </div>

            <p className={styles.panelDescription}>
              {selectedItem.description}
            </p>

            {selectedItem.responsibilities &&
              selectedItem.responsibilities.length > 0 && (
                <div>
                  <h3 className={styles.sectionTitle}>
                    {isGerman
                      ? "Hauptaufgaben & Kernleistungen"
                      : isArabic
                      ? "المسؤوليات والإنجازات الرئيسية"
                      : "Key Deliverables & Responsibilities"}
                  </h3>
                  <ul className={styles.responsibilitiesList}>
                    {selectedItem.responsibilities.map((resp, i) => (
                      <li key={i} className={styles.responsibilityItem}>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {selectedItem.technologies &&
              selectedItem.technologies.length > 0 && (
                <div className={styles.techGroup}>
                  <h3 className={styles.sectionTitle}>
                    {isGerman
                      ? "Technologien & Schwerpunkte"
                      : isArabic
                      ? "التقنيات ومجالات العمل المعتمدة"
                      : "Verified Technologies & Domains"}
                  </h3>
                  <div className={styles.techPills}>
                    {selectedItem.technologies.map((tech) => (
                      <span key={tech} className={styles.techPill}>
                        <bdi>{tech}</bdi>
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>

      {/* Mobile Accordion View */}
      <div
        className={styles.mobileLayout}
        role="region"
        aria-label={
          isGerman
            ? "Akkordeon-Übersicht des Werdegangs"
            : isArabic
            ? "قائمة الخبرات المتداخلة"
            : "Experience Accordion"
        }
      >
        {mobileLayoutGroups.map((group) => {
          if (group.type === "single") {
            const item = group.item;
            const isOpen = Boolean(openMobileIds[item.id]);
            return (
              <div key={item.id} id={item.id} className={styles.mobileItem}>
                <button
                  type="button"
                  className={cn(
                    styles.mobileTrigger,
                    isOpen && styles.mobileTriggerActive
                  )}
                  onClick={() => toggleMobile(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`mobile-body-${item.id}`}
                >
                  <div className={styles.mobileTriggerText}>
                    <span className={styles.mobileRole}>{item.role}</span>
                    <span className={styles.mobileCompany}>{item.company}</span>
                    <span className={styles.mobilePeriod}>
                      <bdi>{item.period}</bdi>
                    </span>
                  </div>
                  <svg
                    className={cn(
                      styles.mobileIcon,
                      isOpen && styles.mobileIconOpen
                    )}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isOpen && (
                  <div
                    id={`mobile-body-${item.id}`}
                    className={styles.mobileBody}
                  >
                    <p className={styles.panelDescription}>
                      {item.description}
                    </p>

                    {item.responsibilities &&
                      item.responsibilities.length > 0 && (
                        <div>
                          <h4 className={styles.sectionTitle}>
                            {isGerman
                              ? "Hauptaufgaben"
                              : isArabic
                              ? "أبرز المسؤوليات"
                              : "Key Deliverables"}
                          </h4>
                          <ul className={styles.responsibilitiesList}>
                            {item.responsibilities.map((resp, idx) => (
                              <li key={idx} className={styles.responsibilityItem}>
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {item.technologies && item.technologies.length > 0 && (
                      <div className={styles.techGroup}>
                        <h4 className={styles.sectionTitle}>
                          {isGerman
                            ? "Technologien"
                            : isArabic
                            ? "التقنيات"
                            : "Technologies"}
                        </h4>
                        <div className={styles.techPills}>
                          {item.technologies.map((tech) => (
                            <span key={tech} className={styles.techPill}>
                              <bdi>{tech}</bdi>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          }

          // Jaib Mobile Journey Accordion
          const journey = group.journey;
          const activeMobileRole =
            items.find((i) => i.id === selectedId && journey.roleIds.includes(i.id)) ||
            items.find((i) => i.id === journey.currentRoleId) ||
            items[0];

          return (
            <div
              key={journey.id}
              id="ahd-jaib"
              className={cn(
                styles.mobileItem,
                styles.mobileJourneyItem,
                isJaibMobileOpen && styles.mobileJourneyItemOpen
              )}
            >
              <button
                type="button"
                className={cn(
                  styles.mobileTrigger,
                  isJaibMobileOpen && styles.mobileTriggerActive
                )}
                onClick={() => setIsJaibMobileOpen(!isJaibMobileOpen)}
                aria-expanded={isJaibMobileOpen}
                aria-controls="mobile-body-ahd-jaib"
              >
                <div className={styles.mobileTriggerText}>
                  <span className={styles.mobileRole}>
                    {journey.organization[locale]}
                  </span>
                  <span className={styles.mobileJourneyKicker}>
                    {journey.label[locale]} · {journey.sublabel[locale]}
                  </span>
                  <span className={styles.mobilePeriod}>
                    <bdi>{journey.period[locale]}</bdi>
                  </span>
                </div>
                <svg
                  className={cn(
                    styles.mobileIcon,
                    isJaibMobileOpen && styles.mobileIconOpen
                  )}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isJaibMobileOpen && (
                <div id="mobile-body-ahd-jaib" className={styles.mobileJourneyBody}>
                  {/* Compact Stepper for Mobile */}
                  <div
                    className={styles.mobileStepper}
                    role="tablist"
                    aria-label={`${journey.organization[locale]} stages`}
                  >
                    {journey.stages.map((stage) => {
                      const stageItem = items.find((i) => i.id === stage.roleId);
                      if (!stageItem) return null;
                      const isSelected = selectedId === stage.roleId;

                      return (
                        <button
                          key={stage.roleId}
                          id={stage.roleId}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          className={cn(
                            styles.mobileStageBtn,
                            isSelected && styles.mobileStageBtnActive
                          )}
                          onClick={() => handleSelect(stage.roleId)}
                        >
                          <span
                            className={cn(
                              styles.mobileStageDot,
                              isSelected && styles.mobileStageDotActive,
                              stage.isCurrent && styles.mobileStageDotCurrent
                            )}
                            aria-hidden="true"
                          />
                          <span className={styles.mobileStageTextGroup}>
                            <span className={styles.mobileStageTitleRow}>
                              <span className={styles.mobileStageNum}>
                                {stage.stageNumber}
                              </span>
                              <span className={styles.mobileStageName}>
                                {stageItem.role}
                              </span>
                              {stage.isCurrent && (
                                <span className={styles.mobileCurrentBadge}>
                                  {journey.currentBadge[locale]}
                                </span>
                              )}
                            </span>
                            <span className={styles.mobileStagePeriod}>
                              <bdi>{stageItem.period}</bdi>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Role Detail Inside Journey */}
                  {activeMobileRole && (
                    <div className={styles.mobileActiveDetail}>
                      <div className={styles.mobileActiveHeader}>
                        <h4 className={styles.mobileActiveRole}>
                          {activeMobileRole.role}
                        </h4>
                        <div className={styles.mobileActiveMeta}>
                          <span className={styles.panelPeriod}>
                            <bdi>{activeMobileRole.period}</bdi>
                          </span>
                          <span>·</span>
                          <span className={styles.panelLocation}>
                            {activeMobileRole.location}
                          </span>
                        </div>
                      </div>

                      <p className={styles.panelDescription}>
                        {activeMobileRole.description}
                      </p>

                      {activeMobileRole.responsibilities &&
                        activeMobileRole.responsibilities.length > 0 && (
                          <div>
                            <h5 className={styles.sectionTitle}>
                              {isGerman
                                ? "Hauptaufgaben"
                                : isArabic
                                ? "أبرز المسؤوليات"
                                : "Key Deliverables"}
                            </h5>
                            <ul className={styles.responsibilitiesList}>
                              {activeMobileRole.responsibilities.map(
                                (resp, idx) => (
                                  <li
                                    key={idx}
                                    className={styles.responsibilityItem}
                                  >
                                    {resp}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                      {activeMobileRole.technologies &&
                        activeMobileRole.technologies.length > 0 && (
                          <div className={styles.techGroup}>
                            <h5 className={styles.sectionTitle}>
                              {isGerman
                                ? "Technologien"
                                : isArabic
                                ? "التقنيات"
                                : "Technologies"}
                            </h5>
                            <div className={styles.techPills}>
                              {activeMobileRole.technologies.map((tech) => (
                                <span key={tech} className={styles.techPill}>
                                  <bdi>{tech}</bdi>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
