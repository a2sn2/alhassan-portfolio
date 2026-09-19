import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { Container } from "@/components/ui/Container";
import { identityContent, navigationContent, socialLinks } from "@/content";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const github = socialLinks.find((s) => s.platform === "GitHub");
  const linkedin = socialLinks.find((s) => s.platform === "LinkedIn");

  return (
    <footer className={styles.footer} role="contentinfo">
      <Container>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.identity}>
              <span className={styles.name}>{identityContent.fullName}</span>
              <span className={styles.role}>{identityContent.role} · {identityContent.location}</span>
            </div>

            <nav className={styles.navLinks} aria-label="Footer Navigation">
              {navigationContent.navItems.map((item) => (
                <Link key={item.href} href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={styles.links}>
              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  GitHub
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  LinkedIn
                </a>
              )}
              <Link href="/official-cv" className={styles.link}>
                Official CV Record
              </Link>
              <Link href="/contact" className={styles.link}>
                Download CV
              </Link>
            </div>
          </div>

          <div className={styles.bottom}>
            <span>
              © {currentYear} {identityContent.fullName}. All rights reserved.
            </span>
            <span>Built with Next.js App Router & JAIB Visual System.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
