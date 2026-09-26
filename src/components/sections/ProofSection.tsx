import React from "react";
import Link from "next/link";
import styles from "./Sections.module.css";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProofContent } from "@/contracts/proof";

interface ProofSectionProps {
  content: ProofContent;
  locale?: "en" | "ar" | "de";
}

export function ProofSection({ content, locale = "en" }: ProofSectionProps) {
  const isAr = locale === "ar";
  const isDe = locale === "de";

  const getLocalizedHref = (path?: string) => {
    if (!path) return "";
    if (isAr) return `/ar${path}`;
    if (isDe) return `/de${path}`;
    return path;
  };

  const getActionLabel = () => {
    if (isDe) return "Erkunden";
    if (isAr) return "استكشاف";
    return "Explore";
  };

  return (
    <section
      id="proof"
      className={styles.section}
      aria-label={
        isDe
          ? "Nachweise & Verifikation"
          : isAr
          ? "التوثيق والإثباتات الهندسية"
          : "Proof and Verification"
      }
    >
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
                {item.metric && (
                  <div className={styles.proofTop}>
                    <span className={styles.proofMetric}>
                      <bdi>{item.metric}</bdi>
                    </span>
                  </div>
                )}
                <h3 className={styles.proofTitle}>{item.title}</h3>
                {item.quote && <p className={styles.proofText}>{item.quote}</p>}
                {item.author && <span className={styles.proofAuthor}>{item.author}</span>}
                {item.url && (
                  <Link
                    href={getLocalizedHref(item.url)}
                    className={styles.proofLink}
                    aria-label={`${item.title} — ${getActionLabel()}`}
                  >
                    <span>{getActionLabel()}</span>
                    <span aria-hidden="true">{isAr ? "←" : "→"}</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
