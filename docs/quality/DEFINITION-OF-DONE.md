# Definition of Done (DoD)

A task, feature, or bugfix in this repository is considered **Done** only when all applicable criteria below have been satisfied with verifiable evidence.

---

## 1. Engineering & Code Standards
- [ ] **Clean Architecture Boundaries Preserved:** No presentation component owns biographical facts. All content edits occur within `src/content/`.
- [ ] **Contract Conformance:** All new or updated content adheres strictly to TypeScript interfaces in `src/contracts/` verified by `satisfies`.
- [ ] **Zero Fact Invention:** No fictitious jobs, dates, technologies, metrics, or credentials have been introduced. Missing data is represented gracefully.
- [ ] **Type Safety:** `npx tsc --noEmit` exits with status `0` (zero warnings or errors).
- [ ] **Lint Cleanliness:** `npm run lint` exits with status `0` (zero ESLint errors).
- [ ] **Token Integrity:** Styling relies strictly on CSS custom properties from `src/styles/tokens.css`. No arbitrary magic numbers.

---

## 2. Responsive & Accessibility Validation
- [ ] **Five-Viewport Verification:** Layout verified at `1440px`, `1280px`, `768px`, `390px`, and `320px`.
- [ ] **Zero Horizontal Overflow:** No page-level horizontal scrollbar at any viewport width down to 320px.
- [ ] **Touch Target Sizing:** All interactive elements on mobile are at least `44px × 44px`.
- [ ] **Keyboard Accessibility:** All interactive paths navigable via keyboard; focus outline clearly visible; skip-link operable.
- [ ] **Automated A11y Audit:** Playwright Axe-Core audit passes with zero critical or serious WCAG 2.1 AA violations.

---

## 3. Build & CI/CD Readiness
- [ ] **Clean Production Build:** `npm run build` succeeds locally without errors.
- [ ] **Automated Test Suite:** `npx playwright test` runs and passes 100% of test cases.
- [ ] **Security Baseline:** Outbound links use `rel="noopener noreferrer"`. No sensitive keys or local secrets in commit history.
- [ ] **GitHub CI Green:** Pull request checks run cleanly in GitHub Actions.
- [ ] **Preview Deployment Verified:** Vercel preview URL inspected and validated on mobile and desktop viewports.
