import React from "react";
import styles from "./Header.module.css";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/siteConfig";

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <a href="#top" className={styles.brand} aria-label={`${siteConfig.name} - Home`}>
            <span className={styles.brandDot} aria-hidden="true" />
            <span>{siteConfig.name}</span>
          </a>

          <nav className={styles.nav} aria-label="Main Navigation">
            {siteConfig.navItems.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
