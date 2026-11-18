"use client";

import React, { useState, useEffect, useRef, useId, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./CommandPalette.module.css";
import { navigationContent, projectItems, contactContent, socialLinks } from "@/content";
import { navigationContentAr, projectItemsAr, contactContentAr } from "@/content/ar";
import { navigationContentDe, projectItemsDe, contactContentDe } from "@/content/de";
import { BidiText } from "@/components/ui/BidiText";
import { cn } from "@/utils/cn";
import { formatProjectCategory } from "@/utils/categories";

interface PaletteItem {
  id: string;
  category: string;
  title: string;
  description: string;
  keywords?: string;
  meta?: string;
  actionKind: "route" | "external" | "theme";
  href?: string;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CommandPalette() {
  const [openedPathname, setOpenedPathname] = useState<string | null>(null);
  const [restoreFocusOnClose, setRestoreFocusOnClose] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = openedPathname === pathname;
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();
  const headingId = useId();

  const isGerman = pathname === "/de" || pathname.startsWith("/de/");
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const locale: "en" | "ar" | "de" = isGerman ? "de" : isArabic ? "ar" : "en";

  const closePalette = useCallback((restoreFocus = true) => {
    setRestoreFocusOnClose(restoreFocus);
    setOpenedPathname(null);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const openPalette = useCallback(() => {
    setRestoreFocusOnClose(false);
    setOpenedPathname(pathname);
    setQuery("");
    setSelectedIndex(0);
  }, [pathname]);

  const executeItem = useCallback(
    (item: PaletteItem) => {
      if (item.actionKind === "route" && item.href) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("navigation-start", { detail: { href: item.href } })
          );
        }
        closePalette(false);
        router.push(item.href);
        return;
      }

      if (item.actionKind === "external" && item.href) {
        window.open(item.href, "_blank", "noopener,noreferrer");
        closePalette(true);
        return;
      }

      if (item.actionKind === "theme") {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem("theme", next);
        } catch {
          // Ignore
        }
        closePalette(true);
      }
    },
    [closePalette, router]
  );

  // Define palette items from complete canonical content (all 17 projects + all 6 CV editions)
  const allItems: PaletteItem[] = useMemo(() => {
    const categoryNav = isGerman
      ? "Navigation"
      : isArabic
      ? "التنقل السريع"
      : "Navigation";
    const categoryFeatured = isGerman
      ? "Ausgewählte Fallstudien"
      : isArabic
      ? "دراسات الحالة المميزة"
      : "Featured Case Studies";
    const categoryAllProjects = isGerman
      ? "Weitere Ingenieurprojekte"
      : isArabic
      ? "مشاريع هندسية وأرشيف الأعمال"
      : "Engineering Projects & Archive";
    const categoryDocs = isGerman
      ? "Lebensläufe & Dokumente (Standard / ATS)"
      : isArabic
      ? "ملفات السيرة الذاتية (القياسية و ATS)"
      : "CV Downloads (Standard & ATS PDF)";
    const categoryActions = isGerman
      ? "Aktionen & Profile"
      : isArabic
      ? "الإجراءات والملفات"
      : "Actions & Profiles";

    const navSource = isGerman
      ? navigationContentDe.navItems
      : isArabic
      ? navigationContentAr.navItems
      : navigationContent.navItems;
    const projectSource = isGerman
      ? projectItemsDe
      : isArabic
      ? projectItemsAr
      : projectItems;
    const docSource = isGerman
      ? contactContentDe.cvDocuments
      : isArabic
      ? contactContentAr.cvDocuments
      : contactContent.cvDocuments;

    const navItems: PaletteItem[] = navSource.map((item) => ({
      id: `nav-${item.href}`,
      category: categoryNav,
      title: item.label,
      description:
        item.description ||
        (isGerman
          ? `Zu ${item.label} navigieren`
          : isArabic
          ? `الانتقال إلى ${item.label}`
          : `Navigate to ${item.label}`),
      keywords: `${item.href} ${item.label}`,
      meta: `0${item.chapterIndex}`,
      actionKind: "route",
      href: item.href,
    }));

    const featuredProjectNav: PaletteItem[] = projectSource
      .filter((p) => p.presentationTier === "featured")
      .map((proj) => ({
        id: `proj-${proj.slug}`,
        category: categoryFeatured,
        title: proj.title,
        description: proj.tagline,
        keywords: `${proj.slug} ${proj.category} ${proj.technologies.join(" ")}`,
        meta: formatProjectCategory(proj.category, locale),
        actionKind: "route",
        href: isGerman
          ? `/de/projects/${proj.slug}`
          : isArabic
          ? `/ar/projects/${proj.slug}`
          : `/projects/${proj.slug}`,
      }));

    const otherProjectNav: PaletteItem[] = projectSource
      .filter((p) => p.presentationTier !== "featured")
      .map((proj) => ({
        id: `proj-${proj.slug}`,
        category: categoryAllProjects,
        title: proj.title,
        description: proj.tagline,
        keywords: `${proj.slug} ${proj.category} ${proj.technologies.join(" ")}`,
        meta: formatProjectCategory(proj.category, locale),
        actionKind: "route",
        href: isGerman
          ? `/de/projects/${proj.slug}`
          : isArabic
          ? `/ar/projects/${proj.slug}`
          : `/projects/${proj.slug}`,
      }));

    const docItems: PaletteItem[] = docSource.map((doc) => ({
      id: `doc-${doc.language}-${doc.format}`,
      category: categoryDocs,
      title: isGerman
        ? `Lebenslauf (${doc.format}) — ${doc.language}`
        : isArabic
        ? `السيرة الذاتية (${doc.format}) — ${doc.language}`
        : `CV (${doc.format} PDF) — ${doc.language}`,
      description: `${doc.label} (${doc.filesize || "PDF"})`,
      keywords: `cv resume lebenslauf السيرة ${doc.format} ${doc.language} ${doc.filename} pdf ats standard`,
      meta: `${doc.format} PDF`,
      actionKind: "external",
      href: doc.href,
    }));

    const actionItems: PaletteItem[] = [
      {
        id: "action-theme",
        category: categoryActions,
        title: isGerman
          ? "Helles / Dunkles Design umschalten"
          : isArabic
          ? "تبديل المظهر الفاتح / الداكن"
          : "Toggle Light / Dark Mode",
        description: isGerman
          ? "Zwischen Hell- und Dunkelmodus wechseln"
          : isArabic
          ? "التبديل بين الوضع الليلي والنهاري"
          : "Switch visual theme between light and dark",
        keywords: "theme dark light mode design مظهر ليلي نهاري",
        meta: isGerman ? "Design" : isArabic ? "المظهر" : "Theme",
        actionKind: "theme",
      },
      ...socialLinks.map((s) => ({
        id: `social-${s.platform}`,
        category: categoryActions,
        title: isGerman
          ? `${s.platform}-Profil`
          : isArabic
          ? `ملف ${s.platform}`
          : `${s.platform} Profile`,
        description: s.url,
        keywords: `${s.platform} ${s.username || ""} ${s.url}`,
        meta: isGerman ? "Extern" : isArabic ? "رابط خارجي" : "External",
        actionKind: "external" as const,
        href: s.url,
      })),
    ];

    return [...navItems, ...featuredProjectNav, ...docItems, ...otherProjectNav, ...actionItems];
  }, [isArabic, isGerman, locale]);

  // Filter items by query across title, description, category, meta, and keywords
  const filteredItems = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      // Show curated overview when query is empty (keep list focused and fast)
      return allItems.filter(
        (item) =>
          item.id.startsWith("nav-") ||
          item.id.startsWith("proj-foundationkit") ||
          item.id.startsWith("proj-real-time-object-detection") ||
          item.id.startsWith("proj-robocam") ||
          item.id.startsWith("proj-pump-station") ||
          item.id.startsWith("doc-") ||
          item.id.startsWith("action-") ||
          item.id.startsWith("social-")
      );
    }
    const lower = trimmed.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower) ||
        (item.meta && item.meta.toLowerCase().includes(lower)) ||
        (item.keywords && item.keywords.toLowerCase().includes(lower))
    );
  }, [allItems, query]);

  // Listen for custom open event, Ctrl+K / Cmd+K, Escape, and modal Tab focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          closePalette(true);
        } else {
          openPalette();
        }
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closePalette(true);
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null && !el.hasAttribute("disabled"));

        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;

        if (!activeEl || !dialogRef.current.contains(activeEl)) {
          e.preventDefault();
          (e.shiftKey ? lastEl : firstEl).focus();
          return;
        }

        if (e.shiftKey) {
          if (activeEl === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (activeEl === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
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
  }, [isOpen, openPalette, closePalette]);

  // Lock background scroll, capture opener focus, apply inert to background landmarks, and auto-focus input
  useEffect(() => {
    if (!isOpen) {
      if (restoreFocusOnClose) {
        const target = previousFocusRef.current;
        if (target && target.isConnected) {
          requestAnimationFrame(() => {
            if (target.isConnected) {
              target.focus();
            }
          });
        }
      }
      return;
    }

    if (document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    }

    const backgroundNodes = Array.from(
      document.querySelectorAll<HTMLElement>("header, main, footer, a[href='#main-content']")
    );
    const previousInert = backgroundNodes.map((node) => node.hasAttribute("inert"));

    backgroundNodes.forEach((node) => {
      node.setAttribute("inert", "");
    });
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      backgroundNodes.forEach((node, idx) => {
        if (!previousInert[idx]) {
          node.removeAttribute("inert");
        }
      });
    };
  }, [isOpen, restoreFocusOnClose]);

  // Safe selected index to avoid out-of-bounds selection
  const safeSelectedIndex =
    filteredItems.length > 0 && selectedIndex < filteredItems.length
      ? selectedIndex
      : 0;

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
        executeItem(filteredItems[safeSelectedIndex]);
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

  const categories = Array.from(new Set(filteredItems.map((i) => i.category)));

  const dialogLabel = isGerman
    ? "Portfolio-Navigator & Befehlspalette"
    : isArabic
    ? "المستكشف ولوحة الأوامر"
    : "Portfolio Navigator & Command Palette";

  const closeLabel = isGerman
    ? "Suchdialog schließen"
    : isArabic
    ? "إغلاق نافذة البحث"
    : "Close search dialog";

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePalette(true);
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={styles.palette}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <span id={headingId} className={styles.srOnly}>
          {dialogLabel}
        </span>

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
              isGerman
                ? "Seiten, alle 17 Projekte, Standard-/ATS-CV suchen..."
                : isArabic
                ? "ابحث في الصفحات، جميع المشاريع (17)، ونسخ السيرة..."
                : "Search pages, all 17 projects, Standard/ATS CVs..."
            }
            aria-label={
              isGerman
                ? "Portfolio durchsuchen"
                : isArabic
                ? "البحث في معرض الأعمال"
                : "Search portfolio"
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
          <kbd className={styles.kbdHint} aria-hidden="true">
            ESC
          </kbd>
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeBtn}
            onClick={() => closePalette(true)}
            aria-label={closeLabel}
            title={closeLabel}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <ul
          id={listboxId}
          ref={listRef}
          tabIndex={-1}
          className={styles.resultsList}
          role="listbox"
          aria-label={
            isGerman
              ? "Suchvorschläge"
              : isArabic
              ? "اقتراحات البحث"
              : "Search suggestions"
          }
        >
          {filteredItems.length === 0 ? (
            <li className={styles.noResults} role="status">
              {isGerman
                ? `Keine passenden Seiten, Projekte oder Dokumente für „${query}“ gefunden.`
                : isArabic
                ? `لم يتم العثور على صفحات أو مشاريع أو مستندات مطابقة لـ "${query}".`
                : `No matching pages, projects, or documents found for "${query}".`}
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
                          onClick={() => executeItem(item)}
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
                              <span className={styles.itemTitle}>
                                <BidiText text={item.title} locale={locale} />
                              </span>
                              <span className={styles.itemDesc}>
                                <BidiText text={item.description} locale={locale} />
                              </span>
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
              <kbd>↑</kbd> <kbd>↓</kbd> {isGerman ? "Navigieren" : isArabic ? "للتنقل" : "Navigate"}
            </span>
            <span className={styles.footerShortcut}>
              <kbd>↵</kbd> {isGerman ? "Auswählen" : isArabic ? "للاختيار" : "Select"}
            </span>
            <span className={styles.footerShortcut}>
              <kbd>ESC</kbd> {isGerman ? "Schließen" : isArabic ? "للإغلاق" : "Close"}
            </span>
          </div>
          <span>
            {isGerman
              ? "ALHassan ALShami — Portfolio"
              : isArabic
              ? "الحسن الشامي — معرض الأعمال"
              : "ALHassan ALShami — Portfolio"}
          </span>
        </div>
      </div>
    </div>
  );
}
