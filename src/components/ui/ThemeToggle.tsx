"use client";

import React, { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

function subscribe(callback: () => void) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
        callback();
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMedia = () => callback();
  media.addEventListener("change", handleMedia);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", handleMedia);
  };
}

function getSnapshot(): "light" | "dark" {
  const current = document.documentElement.getAttribute("data-theme");
  if (current === "dark" || current === "light") {
    return current;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getServerSnapshot(): "light" | "dark" {
  return "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Ignore localStorage errors
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`${styles.toggle} ${className || ""}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Sun Icon */}
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Moon Icon */}
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
