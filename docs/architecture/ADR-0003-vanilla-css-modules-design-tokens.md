# ADR-0003: Vanilla CSS Modules & Centralized Design Tokens

**Status:** Accepted  
**Date:** 2026-09-13  
**Deciders:** Principal Software Architect, Senior Front-End Engineer  

---

## Context
Styling in modern front-end applications often suffers from design drift, runtime overhead (CSS-in-JS), or fragile utility class bloat. The portfolio requires predictable scoping, high performance, zero runtime style injection, and centralized design variables.

## Decision
Retain Vanilla CSS with CSS Modules (`*.module.css`) for component styling and centralized CSS custom properties in `src/styles/tokens.css` for the design system foundations.

## Options Considered
1. **Vanilla CSS Modules + CSS Custom Properties (Selected):** Built into Next.js without third-party tooling, zero runtime overhead, scoped class names, effortless theming via CSS variables, and full support for modern CSS features (clamp, container queries, logical properties).
2. **Tailwind CSS:** Adds utility abstraction and build tooling overhead; introduces arbitrary class strings across JSX components when standard CSS properties provide cleaner separation.
3. **CSS-in-JS (Styled-Components / Emotion):** Heavy runtime overhead, incompatibilities with React 19 Server Components, and style hydration delays.

## Why
Native CSS Modules provide 100% standard web compatibility, zero dependency risk, optimal streaming performance with React Server Components, and clean encapsulation.

## Consequences
- Every component styles its own markup using a colocated `.module.css` file.
- All colors, typography scales, radii, and spacing units MUST reference `var(--token-name)`.
- Magic numbers in CSS files are strictly flagged during code review.
