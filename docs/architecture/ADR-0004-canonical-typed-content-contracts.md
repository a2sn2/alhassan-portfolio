# ADR-0004: Canonical Typed Content Architecture

**Status:** Accepted  
**Date:** 2026-09-13  
**Deciders:** Principal Software Architect, Senior Front-End Engineer  

---

## Context
In monolithic frontend portfolios, biographical facts, project descriptions, skills, and links are often hardcoded directly into JSX markup. Whenever facts change, engineers must edit React components, risking regression in layouts, responsiveness, or accessibility.

## Decision
Decouple content completely from presentation. Establish `src/contracts/` for TypeScript data interfaces, `src/content/` for canonical verified data files, and refactor all section components into pure presentational components that receive data via props.

## Options Considered
1. **Typed Static Modules in `src/content/` (Selected):** Compile-time safety via TypeScript contracts, zero runtime overhead, instant git diffs, modular file organization, and clean separation from UI components.
2. **Headless CMS (Sanity / Strapi / Contentful):** Overkill for a solo engineer portfolio; introduces network latency, API keys, rate limits, and external service downtime risks.
3. **Hardcoded Component Content:** High risk of regression when updating dates, titles, or descriptions; violates Clean Architecture boundaries.
4. **Static JSON / Markdown Files:** Lacks first-class TypeScript autocomplete and type-checking without runtime parsing libraries.

## Why
TypeScript static modules provide the fastest editing workflow, total type safety, zero build overhead, and git-tracked content revisions.

## Consequences
- 90% of routine updates (e.g. adding a new project or updating a bio) touch only files in `src/content/`.
- UI components become pure functions of their props, making them easily testable and reusable.
- Any future migration to an external CMS requires changing only the data retrieval layer, leaving UI components unchanged.
