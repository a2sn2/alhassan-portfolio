import React from "react";
import styles from "./Footer.module.css";
import { Container } from "@/components/ui/Container";
import { identityContent, socialLinks } from "@/content";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const github = socialLinks.find((s) => s.platform === "GitHub");

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.identity}>
              <span className={styles.name}>{identityContent.fullName}</span>
              <span className={styles.role}>{identityContent.role}</span>
            </div>

            <div className={styles.links}>
              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  GitHub ({github.username})
                </a>
              )}
              <a href="#top" className={styles.link}>
                Back to top ↑
              </a>
            </div>
          </div>

          <div className={styles.bottom}>
            <span>
              © {currentYear} {identityContent.fullName}. All rights reserved.
            </span>
            <span>Crafted with intentionality & restraint.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
