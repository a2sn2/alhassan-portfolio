# Front-End Quality Rules

These rules dictate code quality, architecture, and engineering standards for **alhassan-portfolio**.

## Architecture & Maintainability
- **Production-Ready Components**:
  - Components must be modular, single-responsibility, type-safe, and self-contained.
  - Colocate component styles or use clearly scoped CSS modules / design tokens.
  - Avoid duplicate components or copy-pasting styling logic. Abstract shared patterns into reusable UI primitives (e.g. `Button`, `Badge`, `Container`, `SectionHeader`).
- **Clean Structure**:
  - Follow standard Next.js App Router conventions.
  - Separate static content definitions (`data/`) from presentation components (`components/`).
  - No bloated monolith files. Keep files concise, legible, and focused.
- **Dependency Discipline**:
  - Maintain a lean dependency footprint. Do not install heavy external libraries for simple UI patterns that can be written natively in modern CSS/TypeScript.
  - Avoid bloated animation or icon libraries when lightweight SVGs or subtle CSS transitions suffice.

## Code Craft & Performance
- **Semantic HTML & Standards**:
  - Use proper semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<time>`).
  - Never use nested `<div>`s when semantic alternatives exist.
  - Headings must follow a strict sequential hierarchy (`h1` -> `h2` -> `h3`) with exactly one `h1` per page.
- **Eliminate Magic Numbers**:
  - Avoid arbitrary pixel offsets (`top: 23px; margin-left: 17px;`) or magic z-indices.
  - Utilize design tokens for spacing, z-index layers, color palettes, and typographic scales.
- **Performance Optimization**:
  - Optimize all images using Next.js `<Image />` with explicit dimensions, appropriate formats (AVIF/WebP), and priority flags on above-the-fold hero imagery.
  - Zero layout shifts: ensure elements declare aspect ratios or min-heights to eliminate Cumulative Layout Shift (CLS).
  - Minimize clientside JavaScript: prioritize React Server Components (RSC) for content rendering, reserving `'use client'` strictly for components with interactive state.
