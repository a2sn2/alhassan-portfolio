"use client";

import React, { useEffect, useState } from "react";
import styles from "./RouteProgressBar.module.css";
import { cn } from "@/utils/cn";

interface RouteProgressBarProps {
  isNavigating: boolean;
}

export function RouteProgressBar({ isNavigating }: RouteProgressBarProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "complete">("idle");
  const [prevNavigating, setPrevNavigating] = useState(isNavigating);

  // React-recommended pattern for adjusting state from props during render
  if (isNavigating !== prevNavigating) {
    setPrevNavigating(isNavigating);
    if (isNavigating) {
      setStatus("loading");
    } else if (status === "loading") {
      setStatus("complete");
    }
  }

  useEffect(() => {
    if (status === "complete") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 240);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (status === "idle") {
    return null;
  }

  return (
    <div
      className={styles.track}
      aria-hidden="true"
      data-testid="route-progress-bar"
    >
      <div
        className={cn(
          styles.bar,
          status === "loading" && styles.barLoading,
          status === "complete" && styles.barComplete
        )}
      />
    </div>
  );
}
