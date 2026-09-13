import React from "react";
import styles from "./SectionHeader.module.css";
import { cn } from "@/utils/cn";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(styles.header, className)}>
      {kicker && <span className={styles.kicker}>{kicker}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
