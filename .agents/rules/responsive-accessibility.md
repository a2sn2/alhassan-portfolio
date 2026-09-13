# Responsive Design & Accessibility Rules

These rules ensure universal usability, responsive excellence, and inclusive accessibility across **alhassan-portfolio**.

## Responsive Experience
- **Mobile As A Dedicated Experience**:
  - Do not treat mobile as a shrunken, compromised version of desktop. Re-architect information density, navigation drawers/menus, and interaction models specifically for thumb reach and mobile viewport realities.
  - Test across all standard viewport tiers:
    - Mobile Portrait (< 640px)
    - Mobile Landscape & Small Tablet (640px – 768px)
    - Tablet & Small Laptop (769px – 1024px)
    - Desktop & Ultra-wide (> 1024px)
- **Fluid & Resilient Layouts**:
  - Layouts must adapt smoothly using fluid typography (`clamp()`), CSS Grid, and Flexbox rather than fragile breakpoint jumps.
  - Zero horizontal scrollbars or unintentional clipping on any viewport width.
  - Handle extreme text wrapping and localized content without overflowing cards or breaking parent containers.
  - Touch targets must be at least 44x44px with comfortable tap padding.

## Accessibility (A11y)
- **Keyboard Navigation & Focus**:
  - Every interactive element (links, buttons, disclosure panels, modals) must be 100% accessible via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`).
  - Focus rings must be prominently visible and styled consistently (`:focus-visible`). Never suppress focus outlines (`outline: none`) without an accessible high-contrast replacement.
  - Logical DOM tab order that matches the visual presentation.
- **Color Contrast & Readability**:
  - Maintain WCAG 2.1 AA minimum contrast ratios (at least 4.5:1 for normal text, 3:1 for large text and critical UI boundaries).
  - Do not convey information by color alone; pair colors with iconography, typography, or text labels.
- **ARIA & Assistive Tech**:
  - Prioritize native HTML elements over custom ARIA widgets.
  - When custom interaction is necessary, provide descriptive `aria-label`, `aria-expanded`, and `aria-hidden` attributes appropriately.
  - Ensure all decorative imagery uses empty `alt=""` or `aria-hidden="true"`, while meaningful diagrams and media provide clear, descriptive alt text.
