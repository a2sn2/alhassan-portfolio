import React from "react";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProofContent } from "@/contracts/proof";

interface ProofSectionProps {
  content: ProofContent;
}

export function ProofSection({ content }: ProofSectionProps) {
  return (
    <section id="proof" className={styles.section} aria-label="Proof and Verification">
      <Container>
        <SectionHeader
          kicker={content.kicker}
          title={content.title}
          description={content.description}
        />

        {content.status === "placeholder" || content.items.length === 0 ? (
          <div className={styles.placeholderBox}>
            {content.placeholderNotice && (
              <span className={styles.placeholderNotice}>
                {content.placeholderNotice}
              </span>
            )}
            {content.placeholderText && (
              <p className={styles.placeholderText}>{content.placeholderText}</p>
            )}
          </div>
        ) : (
          <div className={styles.proofGrid}>
            {content.items.map((item) => (
              <article key={item.id} className={styles.proofCard}>
                <h3 className={styles.proofTitle}>{item.title}</h3>
                {item.quote && <blockquote className={styles.proofQuote}>{item.quote}</blockquote>}
                {item.author && <span className={styles.proofAuthor}>{item.author}</span>}
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
