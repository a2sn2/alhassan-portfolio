# Project Release Gate Specification

This document defines the strict gate criteria required before merging any branch into production `main`.

---

## 1. Release Gate Criteria & Status Matrix

| Gate Item | Requirement | Tool / Method | Required Status |
| :--- | :--- | :--- | :--- |
| **G-01: Working Tree Hygiene** | Clean working directory; no untracked scratch/test artifacts. | `git status` | PASS |
| **G-02: Code Linting** | Strict ESLint rules pass. | `npm run lint` | PASS |
| **G-03: Type System** | TypeScript compilation check passes. | `npx tsc --noEmit` | PASS |
| **G-04: Static Production Build** | Next.js prerenders all static routes and metadata. | `npm run build` | PASS |
| **G-05: E2E Interaction Suite** | Navigation, drawer, skip link, and links pass. | `npx playwright test` | PASS |
| **G-06: Accessibility Audit** | Zero WCAG 2.1 AA critical/serious violations. | Axe-Core Playwright | PASS |
| **G-07: Responsive Viewports** | 1440px, 1280px, 768px, 390px, 320px verified. | Headless Chrome QA | PASS |
| **G-08: Zero Page Overflow** | `scrollWidth <= innerWidth` across all screen sizes. | Automated assertions | PASS |
| **G-09: Dependency Audit** | Zero high or critical security vulnerabilities. | `npm audit` | PASS |
| **G-10: SEO & Structured Data** | Valid metadataBase, robots.txt, sitemap, JSON-LD. | Metadata inspection | PASS |
| **G-11: Preview Verification** | Vercel PR preview inspected and smoke-tested. | Vercel URL QA | PASS |
| **G-12: Visual Parity Audit** | Strict pixel diffing, geometry, and typography parity. | `npm run verify:visual-parity` | PASS |
| **G-13: Human Sign-off** | Explicit owner approval granted before main merge. | User Approval Gate | PASS |

---

## 2. Explicit Non-Applicable Gates

The following enterprise capabilities from the Universal Playbook are explicitly classified as **Not Applicable (N/A)** for this release:

- **Database Migration Gate:** N/A — No database in architecture.
- **Backend API Contract Gate:** N/A — No custom backend API routes.
- **Multi-Tenant Isolation Gate:** N/A — Single-tenant public portfolio.
- **Payment & Compliance Gate:** N/A — No commercial transactions or PCI requirements.
- **Microservices Deployment Gate:** N/A — Monolithic Next.js edge application.

---

## 3. Emergency Release & Rollback Policy
If an undetected regression reaches production:
1. Immediately execute instant deployment rollback via the Vercel Dashboard to the previous stable commit SHA (takes `< 10 seconds`).
2. Triage the failure in a reproduction branch.
3. Add a regression test to `tests/e2e/portfolio.spec.ts` preventing recurrence.
