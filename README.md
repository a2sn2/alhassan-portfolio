# ALHassan Baligh ALShami — Personal Portfolio Platform

[![CI Pipeline](https://github.com/a2sn2/alhassan-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/a2sn2/alhassan-portfolio/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Production-black?logo=vercel)](https://alhassan-portfolio-phi.vercel.app)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-5.x_Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-green)](docs/quality/TEST-STRATEGY.md)

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
npm run lint          # ESLint code style
npm run typecheck     # TypeScript strict checks
npm run build         # Next.js static prerender
npx playwright test   # E2E and WCAG 2.1 AA accessibility suite
```

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
