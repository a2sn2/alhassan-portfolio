import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

export function HeroSection() {
  return (
    <section id="top" className={styles.heroSection} aria-label="Introduction">
      <Container>
        <div className={styles.heroContent}>
          <Badge variant="accent" showDot>
            Software Engineer Portfolio
          </Badge>

          <h1 className={styles.heroHeading}>
            {siteConfig.name}
          </h1>

          <p className={styles.heroLead}>
            {siteConfig.role} specializing in scalable architecture, intuitive digital systems, and high-performance engineering.
          </p>

          <div className={styles.heroActions}>
            <Button href="#projects" variant="primary">
              View Work
            </Button>
            <Button href="#contact" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
