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

  return (
    <a href={`#${targetId}`} className={styles.skipLink}>
      {label ?? defaultLabel}
    </a>
  );
}
