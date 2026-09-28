"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { SupportedLocale, getProfileMedia } from "@/content/profileMedia";
import styles from "./HeroPortraitStage.module.css";

export interface HeroPortraitStageProps {
  locale?: SupportedLocale;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function HeroPortraitStage({
  locale = "en",
  priority = true,
  className,
  sizes = "(max-width: 480px) 260px, (max-width: 860px) 320px, 420px",
}: HeroPortraitStageProps) {
  const media = getProfileMedia("studio", locale);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const target = wrapperRef.current;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Normalised pointer coordinates: -1 to 1 from element center
    const x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));

    rafRef.current = requestAnimationFrame(() => {
      if (target) {
        target.style.setProperty("--ptr-x", x.toFixed(3));
        target.style.setProperty("--ptr-y", y.toFixed(3));
      }
    });
  };

  const handlePointerLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    const target = wrapperRef.current;
    if (target) {
      target.style.setProperty("--ptr-x", "0");
      target.style.setProperty("--ptr-y", "0");
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.stageWrapper} ${className || ""}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-testid="hero-portrait-stage"
    >
      {/* Asymmetrical Structural Frame & Corner Marks */}
      <div className={styles.structuralFrame} aria-hidden="true">
        <span className={styles.cornerMarkBR}>+</span>
      </div>

      {/* Primary Photographic Stage Container */}
      <div className={styles.photoStage}>
        {/* Restrained JAIB brand accent indicator */}
        <span className={styles.jaibAccentRail} aria-hidden="true" />
        {/* Corner registration tick */}
        <span className={styles.cornerMarkTL} aria-hidden="true">
          +
        </span>

        <div className={styles.photoStageInner}>
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            priority={priority}
            sizes={sizes}
            className={styles.stageImage}
          />
        </div>
      </div>
    </div>
  );
}
