"use client";

import React, { useState, useEffect } from "react";
import styles from "./ExperienceExplorer.module.css";
import { ExperienceItem } from "@/contracts/experience";
import { cn } from "@/utils/cn";

interface ExperienceExplorerProps {
  items: ExperienceItem[];
}

export function ExperienceExplorer({ items }: ExperienceExplorerProps) {
  const [selectedId, setSelectedId] = useState<string>(items[0]?.id || "");
  const [openMobileIds, setOpenMobileIds] = useState<Record<string, boolean>>({
    [items[0]?.id || ""]: true,
  });

  // Check for deep link hash on mount and hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && items.some((item) => item.id === hash)) {
        setSelectedId(hash);
        setOpenMobileIds((prev) => ({ ...prev, [hash]: true }));
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [items]);

  const selectedItem = items.find((item) => item.id === selectedId) || items[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
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

  return (
    <div className={styles.explorer}>
      {/* Desktop Split View */}
      <div className={styles.desktopLayout}>
        <div className={styles.timelineNav} role="tablist" aria-label="Professional Roles Timeline">
          {items.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-${item.id}`}
                className={cn(styles.roleTab, isSelected && styles.roleTabSelected)}
                onClick={() => handleSelect(item.id)}
              >
                <span className={styles.roleTabRole}>{item.role}</span>
                <span className={styles.roleTabCompany}>{item.company}</span>
                <span className={styles.roleTabPeriod}>{item.period}</span>
              </button>
            );
          })}
        </div>

        {selectedItem && (
          <div
            id={`panel-${selectedItem.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${selectedItem.id}`}
            className={styles.detailPanel}
          >
            <div className={styles.panelHeader}>
              <div className={styles.roleTitleRow}>
                <h2 className={styles.panelRole}>{selectedItem.role}</h2>
                {selectedItem.isCurrent && (
                  <span className={styles.currentBadge}>Current Role</span>
                )}
              </div>
              <div className={styles.panelMeta}>
                <span className={styles.panelCompany}>{selectedItem.company}</span>
                <span>·</span>
                <span className={styles.panelPeriod}>{selectedItem.period}</span>
                <span>·</span>
                <span className={styles.panelLocation}>{selectedItem.location}</span>
              </div>
            </div>

            <p className={styles.panelDescription}>{selectedItem.description}</p>

            {selectedItem.responsibilities && selectedItem.responsibilities.length > 0 && (
              <div>
                <h3 className={styles.sectionTitle}>Key Deliverables & Responsibilities</h3>
                <ul className={styles.responsibilitiesList}>
                  {selectedItem.responsibilities.map((resp, i) => (
                    <li key={i} className={styles.responsibilityItem}>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.technologies && selectedItem.technologies.length > 0 && (
              <div className={styles.techGroup}>
                <h3 className={styles.sectionTitle}>Verified Technologies & Domains</h3>
                <div className={styles.techPills}>
                  {selectedItem.technologies.map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Accordion View */}
      <div className={styles.mobileLayout} role="region" aria-label="Experience Accordion">
        {items.map((item) => {
          const isOpen = Boolean(openMobileIds[item.id]);
          return (
            <div key={item.id} id={item.id} className={styles.mobileItem}>
              <button
                type="button"
                className={cn(styles.mobileTrigger, isOpen && styles.mobileTriggerActive)}
                onClick={() => toggleMobile(item.id)}
                aria-expanded={isOpen}
                aria-controls={`mobile-body-${item.id}`}
              >
                <div className={styles.mobileTriggerText}>
                  <span className={styles.mobileRole}>{item.role}</span>
                  <span className={styles.mobileCompany}>{item.company}</span>
                  <span className={styles.mobilePeriod}>{item.period}</span>
                </div>
                <svg
                  className={cn(styles.mobileIcon, isOpen && styles.mobileIconOpen)}
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
                <div id={`mobile-body-${item.id}`} className={styles.mobileBody}>
                  <p className={styles.panelDescription}>{item.description}</p>

                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div>
                      <h4 className={styles.sectionTitle}>Key Deliverables</h4>
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
                      <h4 className={styles.sectionTitle}>Technologies</h4>
                      <div className={styles.techPills}>
                        {item.technologies.map((tech) => (
                          <span key={tech} className={styles.techPill}>
                            {tech}
                          </span>
                        ))}
                      </div>
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
