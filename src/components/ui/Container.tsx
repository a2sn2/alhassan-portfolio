import React from "react";
import styles from "./Container.module.css";
import { cn } from "@/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "narrow" | "full";
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  id?: string;
}

export function Container({
  children,
  className,
  variant = "default",
  as: Component = "div",
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        styles.container,
        variant === "narrow" && styles.narrow,
        variant === "full" && styles.full,
        className
      )}
    >
      {children}
    </Component>
  );
}
