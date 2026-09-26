# ALHassan Baligh ALShami — Personal Portfolio Platform

[![CI Pipeline](https://github.com/a2sn2/alhassan-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/a2sn2/alhassan-portfolio/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Production-black?logo=vercel)](https://alhassan-portfolio-phi.vercel.app)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-5.x_Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-green)](docs/quality/TEST-STRATEGY.md)
[![Locales: EN | AR | DE](https://img.shields.io/badge/Locales-EN%20%7C%20AR%20%7C%20DE-blueviolet)](src/content/)

Production URL: [https://alhassan-portfolio-phi.vercel.app](https://alhassan-portfolio-phi.vercel.app)  
Repository: [https://github.com/a2sn2/alhassan-portfolio](https://github.com/a2sn2/alhassan-portfolio)  
Owner: **ALHassan Baligh ALShami**

---

## 🧭 Documentation Navigation Hub

This repository is governed by the **Universal Software Project Execution Playbook** and structured under Clean Front-End Architecture principles. All technical specifications, architectural decision records, and operational runbooks are cataloged below:

### 1. Project Charter & Governance
- [Project Charter](docs/PROJECT-CHARTER.md) — Mission, ownership, and consumer-ready standards.
- [Project Execution Profile](docs/PROJECT-EXECUTION-PROFILE.md) — Playbook capability classification (Applicable, Conditionally Applicable, Not Applicable).
- [Repository Asset Manifest](docs/REPOSITORY-ASSET-MANIFEST.md) — SHA-256 integrity baseline for tracked CV and theme assets.
- [Universal Execution Playbook](docs/standards/UNIVERSAL_SOFTWARE_PROJECT_EXECUTION_PLAYBOOK_AR.md) — Core engineering methodology.

### 2. Requirements & Standards
- [Functional Requirements](docs/REQUIREMENTS.md) — Personas, section specifications, and scope boundaries.
- [Non-Functional Requirements](docs/NON-FUNCTIONAL-REQUIREMENTS.md) — Web Vitals budgets, WCAG 2.1 AA standards, security baselines.

### 3. Architecture & Decisions
- [Clean Architecture Specification](docs/architecture/ARCHITECTURE.md) — Layer boundaries, dependency flow, Server/Client component rules.
- **Architecture Decision Records (ADRs):**
  - [ADR-0001: Next.js 16 App Router](docs/architecture/ADR-0001-nextjs-app-router.md)
  - [ADR-0002: TypeScript Strict Mode & Schema Contracts](docs/architecture/ADR-0002-typescript-strict-mode.md)
  - [ADR-0003: Vanilla CSS Modules & Design Tokens](docs/architecture/ADR-0003-vanilla-css-modules-design-tokens.md)
  - [ADR-0004: Canonical Typed Content Architecture](docs/architecture/ADR-0004-canonical-typed-content-contracts.md)
  - [ADR-0005: Playwright E2E & Axe Accessibility Testing](docs/architecture/ADR-0005-playwright-e2e-and-axe-accessibility-testing.md)
  - [ADR-0006: GitHub Actions CI Pipeline](docs/architecture/ADR-0006-github-actions-ci-pipeline.md)
  - [ADR-0007: Vercel Edge Deployment](docs/architecture/ADR-0007-vercel-edge-deployment.md)
  - [ADR-0008: Minimalist Production Observability](docs/architecture/ADR-0008-minimalist-production-observability.md)

### 4. Content & Design Guides
- [Content Editing Guide](docs/CONTENT-EDITING-GUIDE.md) — Step-by-step instructions for editing verified bio, roles, projects, and skills without touching UI code.
- [Design Extension Guide](docs/DESIGN-EXTENSION-GUIDE.md) — Token definitions, fluid typography scale, and motion rules.

### 5. Quality, Testing & Release
- [Test Strategy & Quality Plan](docs/quality/TEST-STRATEGY.md) — E2E suite, multi-viewport tests, automated Axe a11y audit.
- [Definition of Done](docs/quality/DEFINITION-OF-DONE.md) — Verifiable exit criteria for pull requests.
- [Release Gate Specification](docs/quality/RELEASE-GATE.md) — 12-point release gate before merging into `main`.
- [Production Readiness Review](docs/quality/PRODUCTION-READINESS.md) — Production audit across security, hosting, and performance.

### 6. Operations & Deployment
- [Local Development Runbook](docs/operations/LOCAL-DEVELOPMENT.md) — Setup, scripts, and local debugging.
- [Deployment Runbook](docs/operations/DEPLOYMENT.md) — CI/CD automation, preview environments, and production promotion.
- [Rollback Runbook](docs/operations/ROLLBACK.md) — Instant Vercel recovery and Git synchronization.

---

## ⚡ Quickstart

```bash
# 1. Clone repository
git clone https://github.com/a2sn2/alhassan-portfolio.git
cd alhassan-portfolio

# 2. Clean install dependencies
npm ci

# 3. Start local development server
npm run dev

# 4. Run automated verification suite
npm run lint                 # ESLint code style
npm run typecheck            # TypeScript strict checks
npm run build                # Next.js static prerender (66 public/indexable portfolio routes + framework/internal routes)
npm run verify:cv-content    # Deterministic CV source parity audit across English, Arabic & German
npm run verify:evidence      # Deterministic project and credential evidence verification
npx playwright test          # E2E (49/49 tests) and WCAG 2.1 AA accessibility suite
npm run verify:production    # Trilingual production route, responsive overflow, SEO & sitemap verification (66 public routes)
npm run verify:visual-parity # Pixel-level Local vs Production visual diff audit (21 routes x 5 viewports x 2 themes + 15 interactive states = 225 pairs)
```

### 🔬 Strict Visual Parity Verifier (`npm run verify:visual-parity`)
Performs deterministic, pixel-level visual diff auditing between local development (`http://localhost:3000`) and live production (`https://alhassan-portfolio-phi.vercel.app`):
- **21 Canonical Routes**:
  - English (7): `/`, `/about`, `/experience`, `/projects`, `/capabilities`, `/contact`, `/projects/real-time-object-detection`
  - Arabic (7): `/ar`, `/ar/about`, `/ar/experience`, `/ar/projects`, `/ar/capabilities`, `/ar/contact`, `/ar/projects/real-time-object-detection`
  - German (7): `/de`, `/de/about`, `/de/experience`, `/de/projects`, `/de/capabilities`, `/de/contact`, `/de/projects/real-time-object-detection`
- **5 Viewports**: Desktop Large (1440×900), Desktop Medium (1280×800), Tablet (768×1024), Mobile (390×844), Narrow Mobile (320×700)
- **2 Themes**: Light and Dark modes
- **210 Static Screenshot Pairs**: 21 routes × 5 viewports × 2 themes
- **15 Interactive States**: Category filter selection, Experience role selection, Mobile drawer open, Command Palette open, Theme toggled (evaluated for English, Arabic, and German)
- **225 Total Visual Parity Pairs**: Evaluated deterministically with 0-pixel delta tolerance
- **Coverage & Indexing Parity**: Validates 66 public indexable sitemap URLs (18 core + 48 project detail) across Next.js static prerender build targets
- **Exact Pixel Comparison**: Uncompressed raw RGB byte inspection calculating exact changed-pixel counts, percentages, max channel deltas, and visual difference bounding boxes
- **Geometry & Typography Checks**: Validates `getBoundingClientRect()` dimensions and computed typography (`font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `color`)
- **Dev-Only Masking**: Masks strictly Next.js development artifacts (`nextjs-portal`, `#nextjs-dev-overlay`, `[data-nextjs-toast]`, etc.) while leaving all application UI and content unmasked

---

## 🏛 Clean Front-End Dependency Boundary

```
src/content/ (Canonical Data) ── satisfies ──► src/contracts/ (TypeScript Types)
            │
            ▼ (injected into)
src/app/page.tsx (Composition Shell)
  ├──► src/components/layout/   (Header, Footer, Navigation Drawer)
  └──► src/components/sections/ (Hero, About, Experience, Projects, Skills, Proof, Contact)
            │
            ▼ (consumes)
src/components/ui/ (Primitives) ◄── styled via ── src/styles/tokens.css
```

---

## 📜 License
Private personal portfolio repository © **ALHassan Baligh ALShami**. All rights reserved.
