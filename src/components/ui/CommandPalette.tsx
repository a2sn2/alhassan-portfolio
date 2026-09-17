"use client";

import React, { useState, useEffect, useRef, useId, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./CommandPalette.module.css";
import { navigationContent, projectItems, contactContent, socialLinks } from "@/content";
import { cn } from "@/utils/cn";

interface PaletteItem {
  id: string;
  category: "Navigation" | "Featured Case Studies" | "Documents & Proof" | "Actions & Profiles";
  title: string;
  description: string;
  action: () => void;
  meta?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  // Define palette items from verified content
  const allItems: PaletteItem[] = useMemo(() => {
    const navItems: PaletteItem[] = navigationContent.navItems.map((item) => ({
      id: `nav-${item.href}`,
      category: "Navigation",
      title: item.label,
      description: item.description || `Navigate to ${item.label}`,
      meta: `0${item.chapterIndex}`,
      action: () => {
        router.push(item.href);
        setIsOpen(false);
      },
    }));

    const projectNav: PaletteItem[] = projectItems
      .filter((p) => p.presentationTier === "featured")
      .map((proj) => ({
        id: `proj-${proj.slug}`,
        category: "Featured Case Studies",
        title: proj.title,
        description: proj.tagline,
        meta: proj.category,
        action: () => {
          router.push(`/projects/${proj.slug}`);
          setIsOpen(false);
        },
      }));

    const docItems: PaletteItem[] = contactContent.cvDocuments
      .filter((doc) => doc.format === "Standard")
      .map((doc) => ({
        id: `doc-${doc.language}`,
        category: "Documents & Proof",
        title: `Download CV — ${doc.language}`,
        description: `${doc.label} (${doc.filesize || "PDF"})`,
        meta: "PDF",
        action: () => {
          window.open(doc.href, "_blank");
          setIsOpen(false);
        },
      }));

    const actionItems: PaletteItem[] = [
      {
        id: "action-theme",
        category: "Actions & Profiles",
        title: "Toggle Light / Dark Mode",
        description: "Switch visual theme between light and dark",
        meta: "Theme",
        action: () => {
          const current = document.documentElement.getAttribute("data-theme");
          const next = current === "dark" ? "light" : "dark";
          document.documentElement.setAttribute("data-theme", next);
          try {
            localStorage.setItem("theme", next);
          } catch {
            // Ignore
          }
          setIsOpen(false);
        },
      },
      ...socialLinks.map((s) => ({
        id: `social-${s.platform}`,
        category: "Actions & Profiles" as const,
        title: `${s.platform} Profile`,
        description: s.url,
        meta: "External",
        action: () => {
          window.open(s.url, "_blank", "noopener,noreferrer");
          setIsOpen(false);
        },
      })),
    ];

    return [...navItems, ...projectNav, ...docItems, ...actionItems];
  }, [router]);

  // Filter items by query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const lower = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower)
    );
  }, [allItems, query]);

  const closePalette = () => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
    previousFocusRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  // Global keydown listener for Ctrl+K / Cmd+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (prev) {
            document.body.style.overflow = "";
            previousFocusRef.current?.focus();
            return false;
          }
          return true;
        });
      } else if (e.key === "Escape") {
        setIsOpen(false);
        document.body.style.overflow = "";
        previousFocusRef.current?.focus();
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Manage focus and scrolling when opened
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Keyboard navigation within the palette
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl && typeof activeEl.scrollIntoView === "function") {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  // Group filtered items by category
  const categories = Array.from(new Set(filteredItems.map((i) => i.category)));

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePalette();
      }}
      role="presentation"
    >
      <div
        className={styles.palette}
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio Navigator & Command Palette"
      >
        <div className={styles.searchBar}>
          <svg
            className={styles.searchIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search pages, projects, credentials, actions..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-activedescendant={
              filteredItems[selectedIndex] ? `item-${filteredItems[selectedIndex].id}` : undefined
            }
          />
          <kbd className={styles.kbdHint}>ESC</kbd>
        </div>

        <ul
          id={listboxId}
          ref={listRef}
          className={styles.resultsList}
          role="listbox"
          aria-label="Search suggestions"
        >
          {filteredItems.length === 0 ? (
            <li className={styles.noResults} role="status">
              No matching pages, projects, or actions found for &ldquo;{query}&rdquo;.
            </li>
          ) : (
            categories.map((cat) => {
              const catItems = filteredItems.filter((i) => i.category === cat);
              return (
                <li key={cat} role="presentation">
                  <div className={styles.groupLabel}>{cat}</div>
                  <ul role="presentation" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {catItems.map((item) => {
                      const overallIndex = filteredItems.indexOf(item);
                      const isSelected = overallIndex === selectedIndex;
                      return (
                        <li
                          key={item.id}
                          id={`item-${item.id}`}
                          data-index={overallIndex}
                          role="option"
                          aria-selected={isSelected}
                          className={cn(styles.item, isSelected && styles.itemActive)}
                          onClick={() => item.action()}
                          onMouseEnter={() => setSelectedIndex(overallIndex)}
                        >
                          <div className={styles.itemMain}>
                            <svg
                              className={styles.itemIcon}
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                            <div className={styles.itemText}>
                              <span className={styles.itemTitle}>{item.title}</span>
                              <span className={styles.itemDesc}>{item.description}</span>
                            </div>
                          </div>
                          {item.meta && <span className={styles.itemMeta}>{item.meta}</span>}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })
          )}
        </ul>

        <div className={styles.footerBar}>
          <div className={styles.footerShortcuts}>
            <span className={styles.footerShortcut}>
              <kbd>↑</kbd> <kbd>↓</kbd> Navigate
            </span>
            <span className={styles.footerShortcut}>
              <kbd>↵</kbd> Select
            </span>
            <span className={styles.footerShortcut}>
              <kbd>ESC</kbd> Close
            </span>
          </div>
          <span>ALHassan ALShami — Portfolio</span>
        </div>
      </div>
    </div>
  );
}
