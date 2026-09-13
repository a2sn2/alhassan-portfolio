# ADR-0005: Playwright E2E and Axe Accessibility Testing Strategy

**Status:** Accepted  
**Date:** 2026-09-13  
**Deciders:** QA Lead, Senior Front-End Engineer  

---

## Context
Static analysis (ESLint and TypeScript) guarantees syntax and type correctness, but cannot verify whether a real user on a mobile device experiences horizontal overflow, whether the drawer closes on Escape, or whether keyboard focus navigation complies with WCAG 2.1 AA. Unit tests on static markup create testing theater without real evidence.

## Decision
Adopt Playwright as the end-to-end testing engine coupled with `@axe-core/playwright` for automated WCAG accessibility audits. Focus testing efforts on real user interaction flows, multi-viewport visual sanity, and keyboard navigation.

## Options Considered
1. **Playwright + @axe-core/playwright (Selected):** Fast, headless cross-browser testing, native viewport emulation (320px to 1440px), network interception, and automated accessibility tree inspection.
2. **Jest / React Testing Library alone:** Tests virtual JSDOM environments, which cannot calculate layout shifts, CSS media queries, or real horizontal overflow.
3. **Cypress:** Heavier footprint, slower startup times in CI compared to Playwright.

## Why
Playwright tests provide genuine evidence of runtime correctness across critical viewport sizes (320px, 390px, 768px, 1280px, 1440px) against actual rendered pages.

## Consequences
- E2E tests run against production builds locally and in GitHub Actions CI.
- Real accessibility violations are caught automatically before merging to main.
- Minimal test maintenance burden since tests assert user-facing contracts rather than internal component implementation details.
