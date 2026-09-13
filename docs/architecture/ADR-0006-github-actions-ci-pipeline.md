# ADR-0006: GitHub Actions CI Pipeline & Branch Protection

**Status:** Accepted  
**Date:** 2026-09-13  
**Deciders:** DevOps Engineer, Release Engineer  

---

## Context
To prevent defective code from reaching production, every pull request and push must be verified automatically. However, for a solo developer, heavy multi-stage pipelines or policies requiring secondary human approval create unnecessary friction and stall velocity.

## Decision
Implement a streamlined GitHub Actions workflow (`.github/workflows/ci.yml`) that executes:
1. `npm ci` (clean dependency installation)
2. `npm run lint` (ESLint verification)
3. `npx tsc --noEmit` (TypeScript strict typecheck)
4. `npm run build` (Next.js production static compilation)
5. `npx playwright test` (E2E and accessibility test suite)

Configure solo-developer-friendly branch protection on `main`: require CI checks to pass before merging, prevent force pushes, and prevent accidental branch deletion, without requiring an external reviewer approval.

## Options Considered
1. **GitHub Actions with Comprehensive Single Job Pipeline (Selected):** Fast feedback (under 2 minutes), minimal concurrency consumption, zero external dependencies.
2. **Third-Party CI (CircleCI / Travis):** Unnecessary external service integration when GitHub Actions is natively integrated.
3. **No CI (Manual local verification only):** High risk of committing broken code that works on one machine but fails on Vercel.

## Why
This pipeline provides verifiable proof of software quality without compromising solo developer speed.
