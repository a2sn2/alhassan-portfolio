"use client";

import React, { useState, useEffect, useRef, useId, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./CommandPalette.module.css";
import { navigationContent, projectItems, contactContent, socialLinks } from "@/content";
import { navigationContentAr, projectItemsAr, contactContentAr } from "@/content/ar";
import { cn } from "@/utils/cn";

interface PaletteItem {
  id: string;
  category: string;
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
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");

  // Define palette items from verified content
  const allItems: PaletteItem[] = useMemo(() => {
    const categoryNav = isArabic ? "التنقل السريع" : "Navigation";
    const categoryFeatured = isArabic ? "دراسات الحالة المميزة" : "Featured Case Studies";
    const categoryDocs = isArabic ? "المستندات والإثباتات" : "Documents & Proof";
    const categoryActions = isArabic ? "الإجراءات والملفات" : "Actions & Profiles";

    const navSource = isArabic ? navigationContentAr.navItems : navigationContent.navItems;
    const projectSource = isArabic ? projectItemsAr : projectItems;
    const docSource = isArabic ? contactContentAr.cvDocuments : contactContent.cvDocuments;

    const navItems: PaletteItem[] = navSource.map((item) => ({
      id: `nav-${item.href}`,
      category: categoryNav,
      title: item.label,
      description: item.description || (isArabic ? `الانتقال إلى ${item.label}` : `Navigate to ${item.label}`),
      meta: `0${item.chapterIndex}`,
      action: () => {
        router.push(item.href);
        setIsOpen(false);
      },
    }));

    const projectNav: PaletteItem[] = projectSource
      .filter((p) => p.presentationTier === "featured")
      .map((proj) => ({
        id: `proj-${proj.slug}`,
        category: categoryFeatured,
        title: proj.title,
        description: proj.tagline,
        meta: proj.category,
        action: () => {
          router.push(isArabic ? `/ar/projects/${proj.slug}` : `/projects/${proj.slug}`);
          setIsOpen(false);
        },
      }));

    const docItems: PaletteItem[] = docSource
      .filter((doc) => doc.format === "Standard")
      .map((doc) => ({
        id: `doc-${doc.language}`,
        category: categoryDocs,
        title: isArabic ? `تحميل السيرة الذاتية — ${doc.language}` : `Download CV — ${doc.language}`,
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
        category: categoryActions,
        title: isArabic ? "تبديل المظهر الفاتح / الداكن" : "Toggle Light / Dark Mode",
        description: isArabic
          ? "التبديل بين الوضع الليلي والنهاري"
          : "Switch visual theme between light and dark",
        meta: isArabic ? "المظهر" : "Theme",
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
        category: categoryActions,
        title: isArabic ? `ملف ${s.platform}` : `${s.platform} Profile`,
        description: s.url,
        meta: isArabic ? "رابط خارجي" : "External",
        action: () => {
          window.open(s.url, "_blank", "noopener,noreferrer");
          setIsOpen(false);
        },
      })),
    ];

    return [...navItems, ...projectNav, ...docItems, ...actionItems];
  }, [router, isArabic]);

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

  // Handle open / close lifecycle
  const openPalette = () => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  };

  const closePalette = () => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
    // Return focus to previously focused element
    setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 10);
  };

  // Listen for custom open event and keyboard shortcut (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    const handleCustomOpen = () => {
      openPalette();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
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

  // Safe selected index to avoid out-of-bounds selection
  const safeSelectedIndex =
    filteredItems.length > 0 && selectedIndex < filteredItems.length
      ? selectedIndex
      : 0;

  // Handle keyboard navigation within the listbox
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[safeSelectedIndex]) {
        filteredItems[safeSelectedIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${safeSelectedIndex}"]`);
    if (activeEl && typeof activeEl.scrollIntoView === "function") {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [safeSelectedIndex]);

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
        aria-label={isArabic ? "المستكشف ولوحة الأوامر" : "Portfolio Navigator & Command Palette"}
        dir={isArabic ? "rtl" : "ltr"}
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
            placeholder={
              isArabic
                ? "ابحث في الأقسام، والمشاريع، والمستندات..."
                : "Search pages, projects, credentials, actions..."
            }
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-activedescendant={
              filteredItems[safeSelectedIndex] ? `item-${filteredItems[safeSelectedIndex].id}` : undefined
            }
          />
          <kbd className={styles.kbdHint}>ESC</kbd>
        </div>

        <ul
          id={listboxId}
          ref={listRef}
          className={styles.resultsList}
          role="listbox"
          aria-label={isArabic ? "اقتراحات البحث" : "Search suggestions"}
        >
          {filteredItems.length === 0 ? (
            <li className={styles.noResults} role="status">
              {isArabic
                ? `لم يتم العثور على صفحات أو مشاريع مطابقة لـ "${query}".`
                : `No matching pages, projects, or actions found for "${query}".`}
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
                      const isSelected = overallIndex === safeSelectedIndex;
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
                              style={{ transform: isArabic ? "scaleX(-1)" : undefined }}
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
              <kbd>↑</kbd> <kbd>↓</kbd> {isArabic ? "للتنقل" : "Navigate"}
            </span>
            <span className={styles.footerShortcut}>
              <kbd>↵</kbd> {isArabic ? "للاختيار" : "Select"}
            </span>
            <span className={styles.footerShortcut}>
              <kbd>ESC</kbd> {isArabic ? "للإغلاق" : "Close"}
            </span>
          </div>
          <span>{isArabic ? "الحسن الشامي — معرض الأعمال" : "ALHassan ALShami — Portfolio"}</span>
        </div>
      </div>
    </div>
  );
}
