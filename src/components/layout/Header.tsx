"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { identityContent, navigationContent, socialLinks } from "@/content";
import { identityContentAr, navigationContentAr } from "@/content/ar";
import { cn } from "@/utils/cn";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const firstDrawerLinkRef = useRef<HTMLAnchorElement>(null);

  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const identity = isArabic ? identityContentAr : identityContent;
  const navigation = isArabic ? navigationContentAr : navigationContent;

  const targetLocalePath = isArabic
    ? pathname === "/ar"
      ? "/"
      : pathname.replace(/^\/ar/, "")
    : pathname === "/"
    ? "/ar"
    : `/ar${pathname}`;

  const homeHref = isArabic ? "/ar" : "/";
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
  };

  const handleOpenPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const isLinkActive = (href: string) => {
    if (href === "/" || href === "/ar") {
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
            aria-label={`${identity.fullName} - ${isArabic ? "الرئيسية" : "Home"}`}
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
            <nav className={styles.desktopNav} aria-label={isArabic ? "التنقل الرئيسي" : "Main Navigation"}>
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
                aria-label={isArabic ? "فتح لوحة الأوامر (Ctrl+K)" : "Open command palette (Ctrl+K)"}
                title={isArabic ? "البحث والتنقل في الموقع (Ctrl+K)" : "Search portfolio (Ctrl+K)"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span>{isArabic ? "تنقل" : "Navigate"}</span>
                <kbd className={styles.searchKbd}>⌘K</kbd>
              </button>

              {/* Language Switcher */}
              <Link
                href={targetLocalePath}
                className={styles.langSwitch}
                aria-label={isArabic ? "Switch to English" : "التبديل إلى اللغة العربية"}
                title={isArabic ? "English" : "العربية"}
                lang={isArabic ? "en" : "ar"}
                dir={isArabic ? "ltr" : "rtl"}
              >
                {isArabic ? "English" : "العربية"}
              </Link>

              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Header Controls */}
          <div className={styles.mobileControls}>
            <Link
              href={targetLocalePath}
              className={styles.langSwitchMobile}
              aria-label={isArabic ? "Switch to English" : "التبديل إلى اللغة العربية"}
              title={isArabic ? "English" : "العربية"}
              lang={isArabic ? "en" : "ar"}
              dir={isArabic ? "ltr" : "rtl"}
            >
              {isArabic ? "EN" : "عربي"}
            </Link>
            <button
              type="button"
              className={styles.searchTriggerMobile}
              onClick={handleOpenPalette}
              aria-label={isArabic ? "البحث والتنقل" : "Search & Navigator"}
              title={isArabic ? "بحث سريع" : "Quick Search"}
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
                  ? isArabic
                    ? "إغلاق قائمة التنقل"
                    : "Close navigation menu"
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
        aria-label={isArabic ? "قائمة التنقل للأجهزة المحمولة" : "Mobile Navigation"}
        aria-hidden={!isOpen}
      >
        <nav className={styles.drawerNav} aria-label={isArabic ? "روابط التنقل للأجهزة المحمولة" : "Mobile Navigation Links"}>
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
              <span>{isArabic ? "اللغة" : "Language"}</span>
              <Link
                href={targetLocalePath}
                className={styles.langSwitch}
                onClick={handleLinkClick}
                aria-label={isArabic ? "Switch to English" : "التبديل إلى اللغة العربية"}
                lang={isArabic ? "en" : "ar"}
                dir={isArabic ? "ltr" : "rtl"}
              >
                {isArabic ? "English" : "العربية"}
              </Link>
            </div>
            <div className={styles.drawerThemeRow}>
              <span>{isArabic ? "المظهر" : "Appearance"}</span>
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
