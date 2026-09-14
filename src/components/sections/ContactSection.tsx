import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ContactContent } from "@/contracts/contact";

interface ContactSectionProps {
  content: ContactContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <Container>
        <SectionHeader
          kicker={content.kicker}
          title={content.title}
          description={content.description}
        />

        <div className={styles.placeholderBox}>
          {content.placeholderText && (
            <p className={styles.placeholderText}>{content.placeholderText}</p>
          )}

          <div className={styles.heroActions}>
            {content.methods.map((method) => (
              <Button
                key={method.id}
                href={method.href}
                variant={method.isPrimary ? "primary" : "secondary"}
                target={method.isExternal ? "_blank" : undefined}
                rel={method.isExternal ? "noopener noreferrer" : undefined}
              >
                {method.label} ({method.value})
              </Button>
            ))}
          </div>

          {content.placeholderNotice && (
            <span className={styles.placeholderNotice}>
              {content.placeholderNotice}
            </span>
          )}
        </div>
      </Container>
    </section>
  );
}
