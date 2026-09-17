import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { ContactContent } from "@/contracts/contact";

interface ContactSectionProps {
  content: ContactContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const emailMethod = content.methods.find((m) => m.id === "email");
  const otherMethods = content.methods.filter((m) => m.id !== "email");

  return (
    <section id="contact" className={`${styles.section} ${styles.sectionAlternate}`} aria-label="Contact">
      <Container>
        <SectionHeader
          kicker={content.kicker}
          title={content.title}
          description={content.description}
        />

        <div className={styles.contactEditorialPlate}>
          <div className={styles.contactActionRow}>
            {emailMethod && (
              <Button
                href={emailMethod.href}
                variant="primary"
              >
                Send Email ({emailMethod.value})
              </Button>
            )}

            <CopyEmailButton email="hassan1alshami6@gmail.com" />

            {otherMethods.map((method) => (
              <Button
                key={method.id}
                href={method.href}
                variant="secondary"
                target={method.isExternal ? "_blank" : undefined}
                rel={method.isExternal ? "noopener noreferrer" : undefined}
              >
                {method.label} ({method.value})
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
