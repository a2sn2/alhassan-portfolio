# Non-Functional Requirements & Performance Budgets

**Project:** ALHassan Baligh ALShami — Personal Portfolio Platform  
**Target Quality Bar:** Production-Grade / WCAG 2.1 AA / Core Web Vitals  

---

## 1. Performance Budgets & Web Vitals

The portfolio must deliver instant, zero-jank browsing experiences across all global network tiers.

| Metric | Target Budget | Measurement Tool | Rationale |
| :--- | :--- | :--- | :--- |
| **Cumulative Layout Shift (CLS)** | `< 0.05` (Strict: `< 0.1`) | Chrome DevTools / Lighthouse | Zero visual jumping while reading content. |
| **Largest Contentful Paint (LCP)** | `< 1.5s` on 4G | Chrome DevTools / Lighthouse | Instant hero display and font availability. |
| **Interaction to Next Paint (INP)** | `< 100ms` | Chrome DevTools / Real User | Immediate response when clicking navigation/buttons. |
| **First Contentful Paint (FCP)** | `< 1.0s` | Lighthouse | Near-instant edge HTML delivery. |
| **Total Client JS Bundle** | `< 100 KB` (gzipped) | Next.js Build Analyzer | Minimizes memory overhead on low-end phones. |
| **Static HTML Payload** | `< 40 KB` (initial page) | Next.js Build Output | Prerendered static HTML delivers instant text. |

---

## 2. Accessibility (WCAG 2.1 AA Compliance)

- **Semantic Hierarchy:** Single `<h1>` per page (Hero title). Strict hierarchical progression (`<h2>` for section headers, `<h3>` for cards/roles).
- **Keyboard Navigation:** 100% of interactive controls reachable and operable via `Tab`, `Shift+Tab`, `Enter`, and `Space`.
- **Focus Management:** Clear, high-contrast focus rings (`outline: 2px solid var(--accent-primary)`) on all focused elements; focus trapped when mobile drawer is open; focus restored on close.
- **Color Contrast:** All body text meets minimum contrast ratio of `4.5:1` against backgrounds; headings and large text meet `3.0:1`.
- **Target Sizes:** Touch targets must be at least `44px × 44px` on touch screens.
- **Screen Reader Support:** Accessible ARIA attributes (`aria-expanded`, `aria-label`, `aria-modal`) used only where native semantic HTML is insufficient.
- **Motion Reduction:** Full compliance with `prefers-reduced-motion: reduce`.

---

## 3. Responsive & Cross-Browser Compatibility

The layout must render flawlessly without horizontal clipping, text truncation, or layout breakdown across the following target matrix:

| Breakpoint / Device Class | Viewport Width | Specific Test Criteria |
| :--- | :--- | :--- |
| **Narrow Mobile** | `320px` | No horizontal scroll, full-width buttons, clean text wrapping. |
| **Standard Mobile** | `390px` | Mobile drawer navigation, readable 16px base typography. |
| **Tablet / Foldable** | `768px` | Adaptive 2-column or single-column transitions. |
| **Laptop** | `1024px – 1280px` | Desktop horizontal navigation bar, multi-column card grids. |
| **Desktop / Widescreen** | `1440px+` | Constrained content max-width (`1200px`), centered alignment. |

### Browser Support Matrix:
- Modern Evergreen Browsers: Chrome, Firefox, Safari (WebKit), Edge.
- Mobile Web: Mobile Safari (iOS), Chrome Mobile (Android).

---

## 4. Security Baseline

- **Zero Credentials:** No secrets, API keys, or private tokens committed to Git or exposed in client bundles.
- **HTTP Security Headers:**
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- **External Links:** All external outbound links must enforce `rel="noopener noreferrer"` to prevent window opener tabnabbing.
- **Dependency Hygiene:** Zero high/critical vulnerabilities via `npm audit` and automated Dependabot scans.

---

## 5. SEO & Web Identity

- **Canonical URL:** Enforce `https://alhassan-portfolio-phi.vercel.app` as single canonical origin.
- **Metadata Routes:** Programmatic `robots.txt` allowing indexing and pointing to `sitemap.xml`.
- **Structured Data:** Valid JSON-LD `@graph` containing `Schema.org/Person` and `Schema.org/WebSite`.
- **Social Graph:** Open Graph and Twitter Card metadata configured with preview cards.
