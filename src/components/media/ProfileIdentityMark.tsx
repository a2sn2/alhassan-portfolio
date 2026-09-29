import React from "react";
import Image from "next/image";
import { SupportedLocale, getProfileMedia } from "@/content/profileMedia";
import styles from "./ProfileIdentityMark.module.css";

export interface ProfileIdentityMarkProps {
  locale?: SupportedLocale;
  priority?: boolean;
  className?: string;
}

export function ProfileIdentityMark({
  locale = "en",
  priority = false,
  className,
}: ProfileIdentityMarkProps) {
  const media = getProfileMedia("formal", locale);

  return (
    <div
      className={`${styles.identityMark} ${className || ""}`.trim()}
      data-testid="profile-identity-mark"
      aria-hidden="true"
    >
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        priority={priority}
        sizes="(max-width: 640px) 56px, 70px"
        className={styles.image}
      />
    </div>
  );
}
