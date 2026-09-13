"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { Container } from "@/components/ui/Container";
import { identityContent, navigationContent, socialLinks } from "@/content";
import { cn } from "@/utils/cn";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const firstDrawerLinkRef = useRef<HTMLAnchorElement>(null);

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

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <a
            href="#top"
            className={styles.brand}
            aria-label={`${identityContent.fullName} - Home`}
            onClick={handleLinkClick}
          >
            <span className={styles.brandDot} aria-hidden="true" />
            <span className={styles.brandText}>{identityContent.fullName}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            {navigationContent.navItems.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={toggleButtonRef}
            type="button"
            className={styles.menuToggle}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
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
      </Container>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        className={cn(styles.drawer, isOpen && styles.drawerOpen)}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
      >
        <nav className={styles.drawerNav} aria-label="Mobile Navigation Links">
          {navigationContent.navItems.map((item, index) => (
            <a
              key={item.href}
              ref={index === 0 ? firstDrawerLinkRef : undefined}
              href={item.href}
              className={styles.drawerLink}
              onClick={handleLinkClick}
              tabIndex={isOpen ? 0 : -1}
            >
              <span className={styles.drawerLinkIndex}>0{index + 1}</span>
              <span>{item.label}</span>
            </a>
          ))}

          {github && (
            <div className={styles.drawerFooter}>
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
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
