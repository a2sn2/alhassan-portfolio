import React from "react";
import styles from "./Badge.module.css";
import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "subtle" | "accent" | "category" | "tech" | "index" | "status";
  showDot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  showDot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        styles.badge,
        variant === "subtle" && styles.subtle,
        variant === "accent" && styles.accent,
        variant === "category" && styles.category,
        variant === "tech" && styles.tech,
        variant === "index" && styles.index,
        variant === "status" && styles.status,
        className
      )}
    >
      {showDot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
