# Design Extension Guide

This guide explains how to evolve, style, and introduce artistic visual or interaction features without compromising architectural stability, accessibility, or performance.

---

## 1. Design System Tokens (`src/styles/tokens.css`)

All visual styling is driven by CSS custom properties declared in `src/styles/tokens.css`.

### Token Categories:

| Category | Token Prefix | Purpose | Example |
| :--- | :--- | :--- | :--- |
| **Color Palette** | `--bg-*`, `--text-*`, `--accent-*`, `--border-*` | High-contrast dark theme palette | `var(--accent-primary)` |
| **Typography Scale**| `--font-size-*`, `--line-height-*`, `--font-weight-*` | Harmonic fluid scale using clamp | `var(--font-size-2xl)` |
| **Spacing System** | `--space-*` | 4px-based geometric progression | `var(--space-md)` (16px) |
| **Border Radii** | `--radius-*` | Consistent curvature for pills, cards, inputs | `var(--radius-lg)` (12px) |
| **Shadows & Elevation** | `--shadow-*` | Ambient dark-mode elevation | `var(--shadow-card)` |
| **Layout & Breakpoints** | `--container-*`, `--header-height` | Responsive max-widths and shells | `var(--container-max)` |
| **Transitions & Motion** | `--transition-*` | Predictable cubic-bezier timing curves | `var(--transition-base)` |
| **Z-Index Scale** | `--z-*` | Predictable stacking order | `var(--z-header)` (100) |

---

## 2. Rules for Introducing New Visual Styles

1. **No Magic Numbers:** Never write arbitrary pixel measurements like `margin-top: 37px;` or `color: #1a2b3c;`. If a new spacing value or color is genuinely required across the brand, register it in `tokens.css`.
2. **CSS Logical Properties:** Use logical properties (`margin-inline`, `padding-block`, `inset-inline`) rather than physical properties (`left`, `right`) to ensure future RTL localization requires zero CSS refactoring.
3. **Fluid Typography:** When adding new heading styles, use CSS `clamp(min, preferred, max)` to ensure graceful scaling from 320px mobile screens to 1440px desktop displays without abrupt breakpoint jumps.
4. **Touch Targets:** All interactive controls (buttons, links, toggle switches) must preserve a minimum tap target of `44px × 44px` on mobile screens (`@media (max-width: 768px)`).

---

## 3. Interaction & Motion Architecture

All animations and micro-interactions must serve a clear purpose:
- **Feedback:** Confirming an action occurred (e.g. active press scale on buttons).
- **Navigation / Orientation:** Helping the user understand where they entered or where a drawer slides from.
- **Focus:** Highlighting the currently active keyboard target.

### Accessibility Requirement: `prefers-reduced-motion`
Any new animation or transition must respect user motion preferences. The reset stylesheet (`src/styles/reset.css`) already enforces:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
When authoring custom CSS animations, ensure they do not cause disorientation or vestibulary triggers.

---

## 4. Introducing New Interactive Components

When adding interactive or artistic components (e.g. 3D canvas, interactive timeline, animated particle grid):
1. **Colocate in `src/components/interactive/` or `src/components/ui/`:** Keep the interactive logic completely decoupled from content data.
2. **Strict Client Boundaries:** Add `"use client"` only to the leaf component that requires browser window APIs.
3. **Graceful Fallback:** If JavaScript fails to load or WebGL is unsupported, ensure the page content remains fully readable in static HTML.
4. **Zero Dependency Bloat:** Prefer native Web APIs, standard SVG, and CSS animations over heavy third-party animation libraries (e.g. Framer Motion, GSAP) unless a specific, complex physics requirement demonstrates true value.
