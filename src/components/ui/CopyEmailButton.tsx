"use client";

import React, { useState } from "react";
import styles from "./CopyEmailButton.module.css";
import { cn } from "@/utils/cn";

interface CopyEmailButtonProps {
  email?: string;
  className?: string;
  variant?: "default" | "compact";
  locale?: "en" | "ar" | "de";
}

export function CopyEmailButton({
  email = "hassan1alshami6@gmail.com",
  className,
  variant = "default",
  locale = "en",
}: CopyEmailButtonProps) {
  const isAr = locale === "ar";
  const isDe = locale === "de";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Gracefully handle any permission error
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          styles.copyBtn,
          variant === "compact" && styles.compact,
          copied && styles.copied,
          className
        )}
        aria-label={
          isAr
            ? "نسخ عنوان البريد الإلكتروني إلى الحافظة"
            : isDe
            ? "E-Mail-Adresse in die Zwischenablage kopieren"
            : "Copy email address to clipboard"
        }
      >
        <svg
          className={styles.copyIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {copied ? (
            <polyline points="20 6 9 17 4 12" />
          ) : (
            <>
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </>
          )}
        </svg>
        <span>
          {copied
            ? isAr
              ? "تم النسخ إلى الحافظة"
              : isDe
              ? "In die Zwischenablage kopiert"
              : "Copied to Clipboard"
            : isAr
            ? "نسخ البريد الإلكتروني"
            : isDe
            ? "E-Mail kopieren"
            : "Copy Email"}
        </span>
      </button>

      {/* Screen-reader announcement container */}
      <span className={styles.srOnly} aria-live="polite">
        {copied
          ? isAr
            ? "تم نسخ عنوان البريد الإلكتروني إلى الحافظة"
            : isDe
            ? "E-Mail-Adresse in die Zwischenablage kopiert"
            : "Email address copied to clipboard"
          : ""}
      </span>
    </div>
  );
}
