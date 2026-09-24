import React from "react";
import Image from "next/image";
import {
  ProfileMediaVariant,
  SupportedLocale,
  getProfileMedia,
} from "@/content/profileMedia";
import styles from "./ProfilePortrait.module.css";

export interface ProfilePortraitProps {
  variant: ProfileMediaVariant;
  locale?: SupportedLocale;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function ProfilePortrait({
  variant,
  locale = "en",
  priority = false,
  className,
  sizes,
}: ProfilePortraitProps) {
  const media = getProfileMedia(variant, locale);

  const defaultSizes =
    variant === "studio"
      ? "(max-width: 640px) 280px, (max-width: 860px) 340px, (max-width: 1200px) 440px, 480px"
      : "(max-width: 640px) 240px, (max-width: 860px) 280px, 320px";

  const isStudio = variant === "studio";
  const frameClass = isStudio ? styles.studioFrame : styles.formalFrame;
  const frameInnerClass = isStudio ? styles.studioFrameInner : styles.formalFrameInner;
  const tickClass = isStudio ? styles.studioAccentTick : styles.formalAccentTick;

  return (
    <div
      className={`${styles.portraitWrapper} ${className || ""}`.trim()}
      data-profile-portrait={variant}
    >
      <div className={frameClass}>
        {/* Restrained JAIB brand accent indicator */}
        <span className={tickClass} aria-hidden="true" />

        <div className={frameInnerClass}>
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            priority={priority}
            sizes={sizes || defaultSizes}
            className={styles.portraitImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}
