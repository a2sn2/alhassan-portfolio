"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Header.module.css";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { identityContent, navigationContent, socialLinks } from "@/content";
import { identityContentAr, navigationContentAr } from "@/content/ar";
import { identityContentDe, navigationContentDe } from "@/content/de";
import { cn } from "@/utils/cn";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const firstDrawerLinkRef = useRef<HTMLAnchorElement>(null);
  const langSelectorRef = useRef<HTMLDivElement>(null);
  const langTriggerRef = useRef<HTMLButtonElement>(null);

  const isGerman = pathname === "/de" || pathname.startsWith("/de/");
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const currentLocale: "en" | "ar" | "de" = isGerman ? "de" : isArabic ? "ar" : "en";

  const identity = isGerman
    ? identityContentDe
    : isArabic
    ? identityContentAr
    : identityContent;

  const navigation = isGerman
    ? navigationContentDe
    : isArabic
    ? navigationContentAr
    : navigationContent;

  let cleanPath = pathname;
  if (pathname === "/ar" || pathname === "/de") {
    cleanPath = "/";
  } else if (pathname.startsWith("/ar/")) {
    cleanPath = pathname.slice(3);
  } else if (pathname.startsWith("/de/")) {
    cleanPath = pathname.slice(3);
  }

  const [urlSuffix, setUrlSuffix] = useState("");

  useEffect(() => {
    const updateSuffix = () => {
      const search = window.location.search || "";
      const hash = window.location.hash || "";
      setUrlSuffix(`${search}${hash}`);
    };

    updateSuffix();
    window.addEventListener("hashchange", updateSuffix);
    window.addEventListener("popstate", updateSuffix);
    return () => {
      window.removeEventListener("hashchange", updateSuffix);
      window.removeEventListener("popstate", updateSuffix);
    };
  }, [pathname]);

  const getLocaleHref = (target: "en" | "ar" | "de") => {
    let targetPath = cleanPath;
    if (target === "ar") {
      targetPath = cleanPath === "/" ? "/ar" : `/ar${cleanPath}`;
    } else if (target === "de") {
      targetPath = cleanPath === "/" ? "/de" : `/de${cleanPath}`;
    }
    return `${targetPath}${urlSuffix}`;
  };

  const handleLangOptionClick = (target: "en" | "ar" | "de") => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsLangOpen(false);
    setIsOpen(false);
    if (typeof window !== "undefined") {
      const search = window.location.search || "";
      const hash = window.location.hash || "";
      let targetPath = cleanPath;
      if (target === "ar") {
        targetPath = cleanPath === "/" ? "/ar" : `/ar${cleanPath}`;
      } else if (target === "de") {
        targetPath = cleanPath === "/" ? "/de" : `/de${cleanPath}`;
      }
      const latestTarget = `${targetPath}${search}${hash}`;
      const currentTargetHref = getLocaleHref(target);
      if (latestTarget !== currentTargetHref) {
        e.preventDefault();
        router.push(latestTarget);
      }
    }
  };

  const homeHref = isGerman ? "/de" : isArabic ? "/ar" : "/";
  const github = socialLinks.find((s) => s.platform === "GitHub");

  // Close drawer on Escape key and return focus to toggle button
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close language popover on Escape key or click outside
  useEffect(() => {
    if (!isLangOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLangOpen(false);
        langTriggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (langSelectorRef.current && !langSelectorRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangOpen]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        firstDrawerLinkRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Auto-close if screen expands past mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsLangOpen(false);
  };

  const handleOpenPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const isLinkActive = (href: string) => {
    if (href === "/" || href === "/ar" || href === "/de") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          {/* JAIB Brand Identity Signature */}
          <Link
            href={homeHref}
            className={styles.brand}
            aria-label={`${identity.fullName} - ${
              isGerman ? "Startseite" : isArabic ? "الرئيسية" : "Home"
            }`}
            onClick={handleLinkClick}
          >
            <div className={styles.brandmark} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
            </div>
            <div className={styles.brandTextGroup}>
              <span className={styles.brandTitle}>{identity.fullName}</span>
              <span className={styles.brandRole}>{identity.role}</span>
            </div>
          </Link>

          {/* Desktop Navigation & Controls */}
          <div className={styles.navGroup}>
            <nav
              className={styles.desktopNav}
              aria-label={
                isGerman
                  ? "Hauptnavigation"
                  : isArabic
                  ? "التنقل الرئيسي"
                  : "Main Navigation"
              }
            >
              {navigation.navItems.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(styles.navLink, active && styles.navLinkActive)}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className={styles.desktopNav}>
              {/* Command Palette Trigger */}
              <button
                type="button"
                className={styles.searchTrigger}
                onClick={handleOpenPalette}
                aria-label={
                  isGerman
                    ? "Befehlspalette öffnen (Strg+K)"
                    : isArabic
                    ? "فتح لوحة الأوامر (Ctrl+K)"
                    : "Open command palette (Ctrl+K)"
                }
                title={
                  isGerman
                    ? "Portfolio durchsuchen (Strg+K)"
                    : isArabic
                    ? "البحث والتنقل في الموقع (Ctrl+K)"
                    : "Search portfolio (Ctrl+K)"
                }
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span>{isGerman ? "Navigation" : isArabic ? "تنقل" : "Navigate"}</span>
                <kbd className={styles.searchKbd}>⌘K</kbd>
              </button>

              {/* Trilingual Language Selector Popover */}
              <div className={styles.langSelector} ref={langSelectorRef}>
                <button
                  ref={langTriggerRef}
                  type="button"
                  className={cn(styles.langTrigger, isLangOpen && styles.langTriggerActive)}
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  aria-expanded={isLangOpen}
                  aria-haspopup="menu"
                  aria-label={
                    isGerman
                      ? "Sprache wählen (Deutsch aktiv)"
                      : isArabic
                      ? "اختيار اللغة (العربية نشطة)"
                      : "Select language (English active)"
                  }
                  title={
                    isGerman
                      ? "Sprache wählen"
                      : isArabic
                      ? "اختيار اللغة"
                      : "Select language"
                  }
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  <span>{currentLocale === "de" ? "DE" : currentLocale === "ar" ? "العربية" : "EN"}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(styles.langChevron, isLangOpen && styles.langChevronOpen)}
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  className={cn(styles.langPopover, isLangOpen && styles.langPopoverOpen)}
                  role="menu"
                  aria-label={
                    isGerman
                      ? "Sprachauswahl"
                      : isArabic
                      ? "قائمة اللغات"
                      : "Language selection"
                  }
                >
                  <Link
                    href={getLocaleHref("en")}
                    onClick={handleLangOptionClick("en")}
                    role="menuitem"
                    className={cn(styles.langOption, currentLocale === "en" && styles.langOptionActive)}
                    aria-current={currentLocale === "en" ? "true" : undefined}
                    lang="en"
                    dir="ltr"
                  >
                    <span className={styles.langOptionName}>English</span>
                    <span className={styles.langOptionBadge}>EN</span>
                  </Link>
                  <Link
                    href={getLocaleHref("ar")}
                    onClick={handleLangOptionClick("ar")}
                    role="menuitem"
                    className={cn(styles.langOption, currentLocale === "ar" && styles.langOptionActive)}
                    aria-current={currentLocale === "ar" ? "true" : undefined}
                    lang="ar"
                    dir="rtl"
                  >
                    <span className={styles.langOptionName}>العربية</span>
                    <span className={styles.langOptionBadge}>AR</span>
                  </Link>
                  <Link
                    href={getLocaleHref("de")}
                    onClick={handleLangOptionClick("de")}
                    role="menuitem"
                    className={cn(styles.langOption, currentLocale === "de" && styles.langOptionActive)}
                    aria-current={currentLocale === "de" ? "true" : undefined}
                    lang="de"
                    dir="ltr"
                  >
                    <span className={styles.langOptionName}>Deutsch</span>
                    <span className={styles.langOptionBadge}>DE</span>
                  </Link>
                </div>
              </div>

              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Header Controls */}
          <div className={styles.mobileControls}>
            <button
              type="button"
              className={styles.langSwitchMobile}
              onClick={() => setIsOpen(true)}
              aria-label={
                isGerman
                  ? "Sprache wählen (Deutsch)"
                  : isArabic
                  ? "اختيار اللغة (العربية)"
                  : "Select language (English)"
              }
              title={
                isGerman
                  ? "Sprache wählen"
                  : isArabic
                  ? "اختيار اللغة"
                  : "Select language"
              }
            >
              {currentLocale === "de" ? "DE" : currentLocale === "ar" ? "عربي" : "EN"}
            </button>
            <button
              type="button"
              className={styles.searchTriggerMobile}
              onClick={handleOpenPalette}
              aria-label={
                isGerman
                  ? "Suchen und Navigieren"
                  : isArabic
                  ? "البحث والتنقل"
                  : "Search & Navigator"
              }
              title={
                isGerman
                  ? "Schnellsuche"
                  : isArabic
                  ? "بحث سريع"
                  : "Quick Search"
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <ThemeToggle />
            <button
              ref={toggleButtonRef}
              type="button"
              className={styles.menuToggle}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={
                isOpen
                  ? isGerman
                    ? "Navigationsmenü schließen"
                    : isArabic
                    ? "إغلاق قائمة التنقل"
                    : "Close navigation menu"
                  : isGerman
                  ? "Navigationsmenü öffnen"
                  : isArabic
                  ? "فتح قائمة التنقل"
                  : "Open navigation menu"
              }
            >
              <span
                className={cn(styles.hamburgerIcon, isOpen && styles.hamburgerOpen)}
                aria-hidden="true"
              >
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        className={cn(styles.drawer, isOpen && styles.drawerOpen)}
        role="dialog"
        aria-modal="true"
        aria-label={
          isGerman
            ? "Mobile Navigation"
            : isArabic
            ? "قائمة التنقل للأجهزة المحمولة"
            : "Mobile Navigation"
        }
        aria-hidden={!isOpen}
      >
        <nav
          className={styles.drawerNav}
          aria-label={
            isGerman
              ? "Mobile Navigationslinks"
              : isArabic
              ? "روابط التنقل للأجهزة المحمولة"
              : "Mobile Navigation Links"
          }
        >
          {navigation.navItems.map((item, index) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                ref={index === 0 ? firstDrawerLinkRef : undefined}
                href={item.href}
                className={cn(styles.drawerLink, active && styles.drawerLinkActive)}
                onClick={handleLinkClick}
                tabIndex={isOpen ? 0 : -1}
                aria-current={active ? "page" : undefined}
              >
                <span className={styles.drawerLinkIndex}>0{index + 1}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className={styles.drawerFooter}>
            <div className={styles.drawerLangRow}>
              <span>{isGerman ? "Sprache" : isArabic ? "اللغة" : "Language"}</span>
              <div className={styles.drawerLangOptions}>
                <Link
                  href={getLocaleHref("en")}
                  onClick={handleLangOptionClick("en")}
                  className={cn(
                    styles.drawerLangBtn,
                    currentLocale === "en" && styles.drawerLangBtnActive
                  )}
                  lang="en"
                  dir="ltr"
                >
                  English
                </Link>
                <Link
                  href={getLocaleHref("ar")}
                  onClick={handleLangOptionClick("ar")}
                  className={cn(
                    styles.drawerLangBtn,
                    currentLocale === "ar" && styles.drawerLangBtnActive
                  )}
                  lang="ar"
                  dir="rtl"
                >
                  العربية
                </Link>
                <Link
                  href={getLocaleHref("de")}
                  onClick={handleLangOptionClick("de")}
                  className={cn(
                    styles.drawerLangBtn,
                    currentLocale === "de" && styles.drawerLangBtnActive
                  )}
                  lang="de"
                  dir="ltr"
                >
                  Deutsch
                </Link>
              </div>
            </div>
            <div className={styles.drawerThemeRow}>
              <span>{isGerman ? "Design" : isArabic ? "المظهر" : "Appearance"}</span>
              <ThemeToggle />
            </div>
            {github && (
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.drawerGithubLink}
                tabIndex={isOpen ? 0 : -1}
                onClick={handleLinkClick}
              >
                <span>GitHub (@{github.username})</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
