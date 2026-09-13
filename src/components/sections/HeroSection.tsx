import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Identity } from "@/contracts/identity";

interface HeroSectionProps {
  content: Identity;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function HeroSection({
  content,
  primaryAction = { label: "View Work", href: "#projects" },
  secondaryAction = { label: "Get in Touch", href: "#contact" },
}: HeroSectionProps) {
  return (
    <section id="top" className={styles.heroSection} aria-label="Introduction">
      <Container>
        <div className={styles.heroContent}>
          <Badge variant="accent" showDot={content.statusBadge.showDot}>
            {content.statusBadge.label}
          </Badge>

          <h1 className={styles.heroHeading}>{content.fullName}</h1>

          <p className={styles.heroLead}>{content.headline}</p>

          <div className={styles.heroActions}>
            <Button href={primaryAction.href} variant="primary">
              {primaryAction.label}
            </Button>
            <Button href={secondaryAction.href} variant="secondary">
              {secondaryAction.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
