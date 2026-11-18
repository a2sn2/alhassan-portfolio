"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { formatProjectCategory } from "@/utils/categories";
import { ProjectCategory } from "@/contracts/projects";

interface BackToProjectsLinkProps {
  baseHref: string;
  locale: "en" | "ar" | "de";
  className?: string;
  filterClassName?: string;
  variant?: "top" | "bottom";
}

const VALID_CATEGORIES = new Set<ProjectCategory>([
  "All",
  "Full-Stack & Web",
  "Computer Vision & AI",
  "Systems & Robotics",
  "Embedded & IoT",
]);

function subscribeLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("storage", callback);
  };
}

function getActiveFilterSnapshot(): ProjectCategory | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const rawUrl = params.get("fromCategory") as ProjectCategory | null;
    if (rawUrl && rawUrl !== "All" && VALID_CATEGORIES.has(rawUrl)) {
      return rawUrl;
    }
    const stored = sessionStorage.getItem("portfolio:lastProjectCategory") as ProjectCategory | null;
    if (stored && stored !== "All" && VALID_CATEGORIES.has(stored)) {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }
  return null;
}

function getServerSnapshot(): ProjectCategory | null {
  return null;
}

export function BackToProjectsLink({
  baseHref,
  locale,
  className,
  filterClassName,
  variant = "top",
}: BackToProjectsLinkProps) {
  const fromCategory = useSyncExternalStore(
    subscribeLocation,
    getActiveFilterSnapshot,
    getServerSnapshot
  );

  const isDe = locale === "de";
  const isAr = locale === "ar";
  const categoryLabel = fromCategory
    ? formatProjectCategory(fromCategory, locale)
    : null;
  const filteredHref = fromCategory
    ? `${baseHref}?category=${encodeURIComponent(fromCategory)}`
    : null;

  const baseLabel =
    variant === "bottom"
      ? isDe
        ? "Weitere Ingenieurprojekte erkunden"
        : isAr
        ? "استكشاف المزيد من المشاريع الهندسية"
        : "Explore more engineering projects"
      : isDe
      ? "Zurück zu allen Projekten"
      : isAr
      ? "العودة إلى كافة المشاريع"
      : "Back to All Projects";

  const filterLabel = categoryLabel
    ? isDe
      ? `Zurück zum Filter: ${categoryLabel}`
      : isAr
      ? `العودة إلى تصنيف: ${categoryLabel}`
      : `Return to ${categoryLabel}`
    : null;

  return (
    <>
      <Link href={baseHref} className={className}>
        <span aria-hidden="true">{isAr ? "→" : "←"}</span>
        <span>{baseLabel}</span>
      </Link>
      {filteredHref && filterLabel && (
        <Link href={filteredHref} className={filterClassName || className}>
          <span>{filterLabel}</span>
        </Link>
      )}
    </>
  );
}
