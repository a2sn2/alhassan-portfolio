"use client";

import React, { useId } from "react";

export interface BrandmarkProps {
  size?: number | string;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
  title?: string;
}

/**
 * Direction 1 — Canonical Interlocking AS Monogram
 * Precision dual-axis typographic monogram for ALHassan ALShami
 */
export function Brandmark({
  size = 22,
  className,
  "aria-hidden": ariaHidden = true,
  title,
}: BrandmarkProps) {
  const rawId = useId();
  // Sanitize React useId for strict XML ID compliance
  const maskId = `as-monogram-mask-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 40"
      fill="none"
      className={className}
      aria-hidden={ariaHidden}
      role={title ? "img" : undefined}
      style={{ display: "block" }}
    >
      {title && <title>{title}</title>}
      <defs>
        <mask id={maskId}>
          <rect width="42" height="40" fill="#ffffff" />
          <path
            d="M35.5 13 C35.5 9.2 32 7.5 28 7.5 C23.5 7.5 20 10 20 14 C20 18 23.8 19.5 28 21 C32.2 22.5 36 24.5 36 28.5 C36 32.5 32 34 27.5 34 C22.5 34 19.5 31.5 19.5 27.5"
            stroke="#000000"
            strokeWidth="6.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </mask>
      </defs>
      <g
        mask={`url(#${maskId})`}
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 33.5 L13 7.5 L21.5 33.5" />
        <path d="M7.8 23.5 H18.2" />
      </g>
      <path
        d="M35.5 13 C35.5 9.2 32 7.5 28 7.5 C23.5 7.5 20 10 20 14 C20 18 23.8 19.5 28 21 C32.2 22.5 36 24.5 36 28.5 C36 32.5 32 34 27.5 34 C22.5 34 19.5 31.5 19.5 27.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
