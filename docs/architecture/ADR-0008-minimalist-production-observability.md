# ADR-0008: Minimalist Production Observability

**Status:** Accepted  
**Date:** 2026-09-13  
**Deciders:** Principal Software Architect, DevOps Engineer  

---

## Context
Production web applications require visibility into real-user traffic, edge performance, and client errors. However, adding third-party heavy APM agents (Datadog, New Relic) or client tracking SDKs degrades Core Web Vitals (LCP, INP) and increases client bundle weight unnecessarily.

## Decision
Utilize Vercel's native lightweight observability stack:
1. **Vercel Production Edge Logs & Deployment Logs:** For tracking build status, HTTP response status codes, and edge routing errors.
2. **Vercel Web Analytics & Speed Insights (Optional/Conditional):** Zero-friction native measurement of Core Web Vitals (CLS, LCP, INP) without third-party tracking scripts.
3. **Local Dev & CI Telemetry:** Browser console error interception in Playwright test suites.

## Options Considered
1. **Platform Native Observability (Selected):** Zero third-party cookies, privacy-compliant, zero maintenance, native dashboard integration.
2. **Third-party APM / Sentry:** Adds client bundle weight and external network calls; inappropriate for a static portfolio without dynamic backend transactions.
3. **Zero Observability:** Blind to production regressions or broken client assets.

## Why
Platform-native observability delivers real Web Vitals and HTTP health monitoring without penalizing page performance or user privacy.
