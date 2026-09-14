# Clean Front-End Architecture Specification

**Project:** ALHassan Baligh ALShami — Personal Portfolio Platform  
**Target Platform:** Next.js 16 (App Router) / React 19 / TypeScript Strict / Vercel  
**Status:** Canonical & Active

---

## 1. Architectural Philosophy & Principles

This architecture applies **Clean Architecture Principles** tailored specifically for a static, content-driven, high-performance web application. Rather than introducing ceremonial backend enterprise patterns (e.g., fake domain services, repositories, or ORM layers), the system enforces strict, single-direction dependency boundaries between:

1. **Contracts & Content (Truth):** Pure data schemas and verified facts.
2. **Section Presentation (Composition):** Pure presentational components consuming typed props.
3. **UI Primitives (Building Blocks):** Context-agnostic reusable design elements.
4. **App Shell & Routing (Integration):** Page composition, metadata injection, and platform wiring.

### Core Architecture Axioms:
- **Zero Professional Hallucination:** No fake employers, roles, projects, or metrics are ever fabricated. Absence of data is represented honestly through explicit nullable contracts and graceful fallback rendering.
- **Content Decoupled from Presentation:** Modifying verified professional history requires editing only modular files in `src/content/`. Layout and section components do not own business or biographical truth.
- **Server Components by Default:** All sections render as pure Server Components on the server/build time. Client Components (`"use client"`) are restricted strictly to browser-driven interactivity (such as the responsive mobile navigation drawer and focus management).
- **Design Tokens as Source of Truth:** Centralized CSS custom properties govern colors, typography scales, spacing, radii, and transitions. Component-specific magic numbers are prohibited.

---

## 2. Dependency Direction & Layer Boundaries

```
┌─────────────────────────────────────────────────────────┐
│              src/contracts (TypeScript Types)           │
└──────────────────────────┬──────────────────────────────┘
                           │ satisfies
┌──────────────────────────▼──────────────────────────────┐
│              src/content (Canonical Fact Data)          │
└──────────────────────────┬──────────────────────────────┘
                           │ injected into
┌──────────────────────────▼──────────────────────────────┐
│          src/app/page.tsx (Route Assembly Shell)        │
└──────────────┬───────────────────────────┬──────────────┘
               │ props                     │ props
┌──────────────▼───────────┐  ┌────────────▼──────────────┐
│  src/components/layout   │  │  src/components/sections  │
│  (Header, Footer, Nav)   │  │  (Hero, Projects, Skills) │
└──────────────┬───────────┘  └────────────┬──────────────┘
               │                           │
               │ consumes                  │ consumes
               ▼                           ▼
┌─────────────────────────────────────────────────────────┐
│        src/components/ui (Primitives: Button, Tag, etc) │
└──────────────────────────┬──────────────────────────────┘
                           │ styles via
┌──────────────────────────▼──────────────────────────────┐
│       src/styles (tokens.css, reset.css, globals.css)   │
└─────────────────────────────────────────────────────────┘
```

### Dependency Rules:
1. `src/contracts` has **zero dependencies** on React, Next.js, or DOM.
2. `src/content` depends **only** on `src/contracts`.
3. `src/components/ui` knows **nothing** about portfolio content or sections.
4. `src/components/sections` receive typed data via props adhering to `src/contracts`. They do **not** import content directly.
5. `src/app/page.tsx` acts as the composition root, importing canonical content and injecting it into sections.
6. Client Components are used only where browser state is unavoidable (`Header.tsx` for mobile drawer toggle, Escape listener, and body scroll lock).

---

## 3. Directory Layout & Responsibilities

```
d:/Projects/alhassan-portfolio/
├── .github/                      # CI/CD workflows, issue/PR templates, dependabot
│   └── workflows/ci.yml          # Automated lint, typecheck, build, test pipeline
├── docs/                         # Canonical documentation suite
│   ├── architecture/             # Architectural specs and ADRs
│   ├── quality/                  # Test strategy, release gates, definition of done
│   ├── operations/               # Local dev, deployment, and rollback runbooks
│   ├── standards/                # Universal execution playbook
│   ├── CONTENT-EDITING-GUIDE.md  # Step-by-step verified content editing manual
│   └── DESIGN-EXTENSION-GUIDE.md # Token extension & motion guide
├── public/                       # Static public assets
│   └── images/                   # Structured media folders
│       ├── profile/              # Headshots and avatar assets
│       ├── projects/             # Verified project screenshots
│       ├── companies/            # Company and client logos
│       └── certificates/         # Verified certification badges
├── src/
│   ├── app/                      # Next.js App Router root
│   │   ├── layout.tsx            # Global HTML shell, fonts, JSON-LD, metadata
│   │   ├── page.tsx              # Composition root (assembles sections)
│   │   ├── robots.ts             # Programmatic robots.txt route
│   │   ├── sitemap.ts            # Programmatic sitemap.xml route
│   │   └── globals.css           # Global reset and layout utilities
│   ├── components/
│   │   ├── layout/               # Header, Footer, navigation shells
│   │   ├── sections/             # Pure presentational section components
│   │   └── ui/                   # Reusable UI primitives (Button, SectionHeader, etc)
│   ├── content/                  # Single Source of Truth for verified portfolio facts
│   │   ├── identity.ts           # Name, title, headline, location
│   │   ├── navigation.ts         # Navigation items and destinations
│   │   ├── about.ts              # Bio narrative, pillars, core values
│   │   ├── experience.ts         # Career roles, dates, bullets, technologies
│   │   ├── projects.ts           # Featured work, links, highlights, tags
│   │   ├── skills.ts             # Technical skills grouped by competency
│   │   ├── proof.ts              # Testimonials, metrics, verifiable artifacts
│   │   ├── contact.ts            # Email, response time, booking availability
│   │   ├── social.ts             # Verified external profiles (GitHub, etc)
│   │   └── siteMetadata.ts       # Canonical URLs, OG data, SEO constants
│   ├── contracts/                # Strict TypeScript interfaces defining the data model
│   │   ├── identity.ts
│   │   ├── navigation.ts
│   │   ├── about.ts
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── proof.ts
│   │   ├── contact.ts
│   │   ├── social.ts
│   │   └── siteMetadata.ts
│   └── styles/                   # Design system tokens and styling foundations
│       ├── tokens.css            # CSS custom properties (color, space, typography)
│       └── reset.css             # Modern CSS reset and accessibility rules
├── tests/                        # Automated testing suite
│   └── e2e/                      # Playwright E2E and Axe accessibility tests
├── next.config.ts                # Next.js compiler settings and security headers
└── tsconfig.json                 # TypeScript strict configuration
```

---

## 4. State Management & Hydration Architecture

- **Zero Global State Libraries:** For a static presentation portfolio, Redux, Zustand, or Jotai are unwarranted overhead.
- **Local Interactivity:** Browser state is isolated to local React hooks (`useState`, `useEffect`) inside Client Components.
- **SSR/SSG Purity:** The entire page HTML is prerendered statically at build time (`output: "export"` capable, though deployed seamlessly on Vercel's Edge Network).

---

## 5. Extensibility Roadmap

The system is engineered to absorb future expansion without architectural demolition:

1. **Project Detail Pages (`/projects/[slug]`):**  
   Add `slug` to `ProjectItem` contract, convert `src/content/projects.ts` to expose slug lookups, and add `src/app/projects/[slug]/page.tsx` with `generateStaticParams`.
2. **Technical Blog (`/blog`):**  
   Mount an MDX or local markdown pipeline under `src/content/posts/` without altering portfolio sections.
3. **Multilingual / RTL Support:**  
   Tokens and layout utilize CSS Logical Properties (`margin-inline`, `padding-block`, `inset-inline`). The content layer can be keyed by locale (`src/content/en/`, `src/content/ar/`) with zero UI primitive restructuring.
4. **Headless CMS Migration:**  
   The `contracts/` layer defines the exact payload interface. Replacing `src/content/*.ts` with API calls (`fetchFromCMS()`) matching the same contracts leaves all section components completely untouched.
