# Test Strategy & Quality Verification Plan

**Project:** ALHassan Baligh ALShami — Personal Portfolio Platform  
**Target Maturity:** Production-Grade / High-Confidence Automation  

---

## 1. Testing Philosophy: Real Evidence Over Coverage Theater

In alignment with the Universal Software Project Execution Playbook, testing must provide **real evidence of user-facing correctness**, not artificial metric chasing. 

For a mostly static, content-driven portfolio:
- Unit testing pure static markup (e.g. asserting that a `<div>` renders text) provides zero resilience against real-world layout, overflow, or accessibility bugs.
- Static analysis (TypeScript strict mode and ESLint) guarantees 100% type safety and syntax hygiene.
- End-to-End (E2E) browser automation verifies responsive rendering, navigation integrity, keyboard traps, and accessibility standards in real browser engines.

---

## 2. Test Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Static Quality Gates (Build Time)                        │
│    - ESLint (Code style, unused vars, Next.js best practices│
│    - TypeScript `tsc --noEmit` (Strict contract adherence)  │
│    - Next.js Production Build (Dead-code, prerendering)     │
├─────────────────────────────────────────────────────────────┤
│ 2. Automated E2E & Accessibility Tests (Playwright + Axe)   │
│    - Page load & status code (200 OK)                       │
│    - Responsive layout across 5 viewports (320px to 1440px) │
│    - Zero page-level horizontal overflow assertions         │
│    - Desktop & mobile navigation drawer interaction         │
│    - Keyboard focus management & SkipLink functionality     │
│    - Automated WCAG 2.1 AA accessibility audit via Axe-Core │
├─────────────────────────────────────────────────────────────┤
│ 3. Visual QA & Multi-Device Verification (Chrome Headless)  │
│    - Visual screenshot inspection at 1440, 1280, 768, 390,  │
│      and 320 viewports                                      │
│    - Inspection of typography rhythm, margins, and wrapping │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Automated Test Suites Specification

### Suite 1: Critical User Journey & Navigation (`tests/e2e/portfolio.spec.ts`)
- **TC-01: Page Load & Hero Presence:** Homepage loads with status 200, displays name, role headline, and primary call-to-action buttons.
- **TC-02: Desktop Anchor Navigation:** Clicking `#about`, `#experience`, `#projects`, `#skills`, `#proof`, `#contact` smoothly scrolls to the target section with matching `id`.
- **TC-03: Mobile Drawer Interaction:** On viewports ≤ 768px, hamburger menu button toggles drawer open/closed; clicking nav links closes the drawer; pressing `Escape` closes the drawer.
- **TC-04: Keyboard & Skip Link:** Pressing `Tab` from initial page load focuses the skip link; pressing `Enter` moves focus directly to `#main-content`.
- **TC-05: Outbound Links Security:** All external links (e.g. GitHub profile) contain `target="_blank"` and `rel="noopener noreferrer"`.

### Suite 2: Multi-Viewport Overflow & Responsive Sanity
- Emulates viewports: `1440x900`, `1280x800`, `768x1024`, `390x844`, `320x640`.
- Evaluates `document.documentElement.scrollWidth <= window.innerWidth` across the entire document.

### Suite 3: Automated WCAG 2.1 AA Audit (`@axe-core/playwright`)
- Evaluates color contrast, heading hierarchy, aria attribute validity, button names, and image alt attributes.
- Fails the build if any `serious` or `critical` violation is detected.

---

## 4. Execution Commands

```bash
# Run static linting
npm run lint

# Run strict TypeScript verification
npx tsc --noEmit

# Run full Next.js production build
npm run build

# Run Playwright E2E and Axe accessibility suite
npx playwright test
```
