"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";
import { Container } from "@/components/ui/Container";
import { identityContent, navigationContent, socialLinks } from "@/content";
import { identityContentAr, navigationContentAr } from "@/content/ar";

export function Footer() {
  const pathname = usePathname();
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const identity = isArabic ? identityContentAr : identityContent;
  const navigation = isArabic ? navigationContentAr : navigationContent;

  const currentYear = new Date().getFullYear();
  const github = socialLinks.find((s) => s.platform === "GitHub");
  const linkedin = socialLinks.find((s) => s.platform === "LinkedIn");

  return (
    <footer className={styles.footer} role="contentinfo">
      <Container>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.identity}>
              <span className={styles.name}>{identity.fullName}</span>
              <span className={styles.role}>
                {identity.role} · {identity.location}
              </span>
            </div>

            <nav className={styles.navLinks} aria-label={isArabic ? "روابط تذييل الصفحة" : "Footer Navigation"}>
              {navigation.navItems.map((item) => (
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
              <Link href={isArabic ? "/ar/contact" : "/contact"} className={styles.link}>
                {isArabic ? "تحميل السيرة الذاتية" : "Download CV"}
              </Link>
            </div>
          </div>

          <div className={styles.bottom}>
            <span>
              {isArabic
                ? `© ${currentYear} ${identity.fullName}. جميع الحقوق محفوظة.`
                : `© ${currentYear} ${identity.fullName}. All rights reserved.`}
            </span>
            <span>
              {isArabic
                ? "تم البناء باستخدام Next.js App Router ونظام جيب البصري."
                : "Built with Next.js App Router & JAIB Visual System."}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
