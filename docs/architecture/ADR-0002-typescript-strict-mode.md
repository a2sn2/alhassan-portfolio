# ADR-0002: Strict TypeScript Configuration and Compile-Time Schema Contracts

**Status:** Accepted  
**Date:** 2026-09-13  
**Deciders:** Principal Software Architect, Senior Front-End Engineer  

---

## Context
A portfolio application relies heavily on verified factual data (experience, projects, skills, contact). Without strong type guarantees, subtle omissions or typos cause UI rendering regressions or silent runtime failures. Adding heavy runtime validation libraries (e.g., Zod) introduces runtime bundle overhead for static data known at build time.

## Decision
Enforce strict TypeScript checking (`"strict": true` in `tsconfig.json`) across the entire repository. Implement pure TypeScript interfaces in `src/contracts/` and validate canonical content at compile-time using the `satisfies` operator in `src/content/`.

## Options Considered
1. **TypeScript Strict Mode with `satisfies` Contracts (Selected):** Zero runtime overhead, 100% compile-time safety, auto-completion in IDEs, and instant build-time failure if content contracts are violated.
2. **Runtime Schema Validation (Zod / Yup / Valibot):** Unnecessary for static data that does not come from untrusted user input or dynamic external APIs at runtime; adds unnecessary dependencies.
3. **Loose TypeScript / Plain JavaScript:** Prone to undefined property accesses, broken props, and undocumented data schemas.

## Why
Static portfolios do not parse untrusted runtime inputs. Compile-time typing via `satisfies` gives the exact same safety guarantees as runtime schemas without shipping extra JavaScript to client browsers.

## Consequences
- Every content update must strictly adhere to the contract defined in `src/contracts/`.
- CI gates enforce `npx tsc --noEmit` before any build can proceed.
- Any change to the structure of portfolio facts is caught immediately during development.

## Risks & Mitigation
- **Risk:** Type errors might temporarily block content updates if a contributor is unfamiliar with TypeScript.
- **Mitigation:** Comprehensive instructions and example templates provided in `docs/CONTENT-EDITING-GUIDE.md`.
