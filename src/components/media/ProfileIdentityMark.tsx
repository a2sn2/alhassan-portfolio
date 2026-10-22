import React from "react";
import Image from "next/image";
import { SupportedLocale, getProfileMedia } from "@/content/profileMedia";
import styles from "./ProfileIdentityMark.module.css";

export interface ProfileIdentityMarkProps {
  locale?: SupportedLocale;
  priority?: boolean;
  className?: string;
  variant?: "mark" | "editorial";
}

export function ProfileIdentityMark({
  locale = "en",
  priority = false,
  className,
  variant = "mark",
}: ProfileIdentityMarkProps) {
  const media = getProfileMedia("formal", locale);
  const isEditorial = variant === "editorial";

  return (
    <div
      className={`${styles.identityMark} ${isEditorial ? styles.editorialPortrait : ""} ${className || ""}`.trim()}
      data-testid="profile-identity-mark"
      aria-hidden={isEditorial ? undefined : "true"}
    >
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        priority={priority}
        sizes={
          isEditorial
            ? "(max-width: 640px) 130px, (max-width: 860px) 180px, 240px"
            : "(max-width: 640px) 56px, 70px"
        }
        className={styles.image}
      />
    </div>
  );
}
