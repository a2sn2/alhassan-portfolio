# ADR-0001: Adoption of Next.js 16 App Router

**Status:** Accepted  
**Date:** 2026-09-13  
**Deciders:** Principal Software Architect, Senior Front-End Engineer  

---

## Context
The portfolio requires a modern, production-grade foundation capable of static site prerendering, instant edge delivery, built-in font and image optimization, robust metadata generation for SEO, and minimal client-side JavaScript overhead.

## Decision
Adopt Next.js 16 with the App Router (`src/app/`) as the core application framework, utilizing React 19 Server Components as the default execution model.

## Options Considered
1. **Next.js App Router (Selected):** Built-in Server Component support, automatic code-splitting, first-class metadata APIs, and zero client JS for static sections.
2. **Next.js Pages Router:** Mature, but lacks React 19 Server Components by default; requires transmitting JavaScript bundles for static presentational components.
3. **Vite + React SPA:** High client bundle size, requires external SSR/prerender plugins for crawlable SEO, and lacks native framework routing conventions.
4. **Astro:** Excellent for static content, but introduces a new template syntax when the team's core competency and existing project code are React/Next.js.

## Why
Next.js App Router provides the cleanest alignment with the playbook's requirement for minimal client hydration, automatic static generation, and native integration with Vercel edge infrastructure.

## Consequences
- All presentational sections are rendered on the server/build time with zero hydration footprint.
- Client interactivity is explicitly cordoned off into client components using `"use client"`.
- Developers must heed Next.js 16 file conventions (`layout.tsx`, `page.tsx`, `robots.ts`, `sitemap.ts`).

## Risks & Mitigation
- **Risk:** New API changes in Next.js 16 compared to training data.
- **Mitigation:** Consult local documentation in `node_modules/next/dist/docs/` as the single source of truth (as codified in `AGENTS.md`).

## Migration / Reversal
If migration away is ever required, the presentation components and content layer are already decoupled and export plain React JSX and TypeScript objects, easily portable to any modern React framework.
