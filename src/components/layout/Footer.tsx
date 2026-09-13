import React from "react";
import styles from "./Footer.module.css";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/siteConfig";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.identity}>
              <span className={styles.name}>{siteConfig.name}</span>
              <span className={styles.role}>{siteConfig.role}</span>
            </div>

            <div className={styles.links}>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub ({siteConfig.githubUsername})
              </a>
              <a href="#top" className={styles.link}>
                Back to top ↑
              </a>
            </div>
          </div>

          <div className={styles.bottom}>
            <span>© {currentYear} {siteConfig.name}. All rights reserved.</span>
            <span>Crafted with intentionality & restraint.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
