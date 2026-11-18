"use client";

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./SkipLink.module.css";

interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

export function SkipLink({
  targetId = "main-content",
  label,
}: SkipLinkProps) {
  const pathname = usePathname();
  const isGerman = pathname === "/de" || pathname?.startsWith("/de/");
  const isArabic = pathname === "/ar" || pathname?.startsWith("/ar/");

  const defaultLabel = isGerman
    ? "Zum Hauptinhalt springen"
    : isArabic
    ? "الانتقال إلى المحتوى الرئيسي"
    : "Skip to main content";

  const handleActivate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", `#${targetId}`);
    }

    target.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <a
      href={`#${targetId}`}
      className={styles.skipLink}
      onClick={handleActivate}
    >
      {label ?? defaultLabel}
    </a>
  );
}
