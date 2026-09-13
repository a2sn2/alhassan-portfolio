# Project Charter: alhassan-portfolio

## 1. Executive Summary
**alhassan-portfolio** is the personal, production-grade professional software engineering portfolio for **ALHassan Baligh ALShami**. The application serves as an authentic, high-performance, accessible, and responsive showcase of engineering capability, systems design, architecture leadership, and verified real-world project impact.

---

## 2. Project Identification
- **Project Name:** `alhassan-portfolio`
- **Owner / Author:** ALHassan Baligh ALShami
- **Local Workspace:** `D:\Projects\alhassan-portfolio`
- **Source Repository:** `https://github.com/a2sn2/alhassan-portfolio`
- **Production URL:** `https://alhassan-portfolio-phi.vercel.app`
- **Production Branch:** `main`
- **Hosting Platform:** Vercel (Edge Network)

---

## 3. Mission & Core Philosophy
The core objective is to deliver an authentic, restrained, and robust digital platform adhering to the Universal Software Project Execution Playbook:
$$\text{Contract} \longrightarrow \text{Evidence} \longrightarrow \text{Reuse} \longrightarrow \text{Automation} \longrightarrow \text{Governance}$$

### Fundamental Directives
1. **Zero Hallucination Policy:** Every professional fact, title, role, company name, date, link, and outcome must originate strictly from verified CV data. Where content is pending, clean missing-data structural placeholders are maintained.
2. **Clean Separation of Concerns:** Content facts, design tokens, presentation components, and layout assembly must remain isolated. Future content edits should never require modifying UI layout code.
3. **Restraint & Typographic Craft:** Avoid generic AI portfolio tropes (excessive card grids, gratuitous neon glow, cheesy floating orbs). Rely on intentional typography (Geist), modular whitespace, and tonal contrast.
4. **Universal Accessibility & Responsive Resilience:** Target WCAG 2.1 AA compliance across all viewports (from 320px mobile to 1440px+ ultra-wide desktop).
5. **No Technology Without Justification:** No backend, database, authentication, or external animation libraries will be introduced without an evidence-backed requirement.

---

## 4. Scope Boundaries

### In-Scope (Phase: Production Engineering Foundation)
- Typed Canonical Content Architecture (`src/contracts/`, `src/content/`).
- Presentational section decoupling via strict TypeScript contracts.
- Fluid responsive design system and modular design tokens (`src/styles/tokens.css`, `reset.css`).
- Fully accessible mobile navigation drawer with keyboard trap and scroll lock.
- Production-grade SEO (Metadata, OpenGraph, JSON-LD Schema.org, `robots.ts`, `sitemap.ts`).
- Automated testing infrastructure (Playwright E2E, Axe-core accessibility).
- Strict CI automation (GitHub Actions workflow for lint, typecheck, build, test).
- Complete architectural and operational documentation.

### Out-of-Scope (Non-Goals for Foundation)
- Redesigning the final visual identity (visual refinement occurs in subsequent design passes).
- Inventing unverified biography or project facts.
- Multi-tenancy, authentication, user databases, or payment infrastructure.
- Complex backend APIs or server-side microservices.

---

## 5. Success Criteria & Definition of Consumer-Ready
The engineering foundation is complete and deemed **Consumer-Ready** when:
- Content editing is completely decoupled from UI code via `src/content/`.
- All automated checks pass (`lint`, `tsc --noEmit`, `build`, Playwright E2E, Axe a11y).
- The site renders flawlessly across 1440px, 1280px, 768px, 390px, and 320px with zero clipping or horizontal overflow.
- GitHub Actions CI pipeline runs green on branch push.
- Preview and Production deployments on Vercel are fully verified.
- Complete documentation guides future content and design extensions without tribal knowledge.
