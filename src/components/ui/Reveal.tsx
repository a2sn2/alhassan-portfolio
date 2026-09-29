"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "none";
  className?: string;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer";
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        rootMargin: "0px 0px -30px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${direction === "none" ? styles.noTransform : ""} ${
        isVisible ? styles.visible : ""
      } ${className}`.trim()}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
      data-revealed={isVisible ? "true" : "false"}
    >
      {children}
    </Tag>
  );
}
