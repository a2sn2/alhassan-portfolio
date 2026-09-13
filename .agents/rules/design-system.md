# Design System Rules

These rules are mandatory for all design and styling work on **alhassan-portfolio**.

## Core Philosophy
- **Think visually before thinking technically**: Evaluate the emotional, aesthetic, and functional impact of an element before writing code.
- **Human-Designed & Intentional**: The portfolio must feel bespoke, crafted with care, restraint, and personality. It must never feel like a template or AI-generated cookie-cutter layout.
- **Creative + Professional + Simple + Functional**: Strive for confident minimalism and high typographic sophistication rather than decorative noise.

## Visual Aesthetics & Restraint
- **No Generic Portfolio Tropes**:
  - Avoid excessive cards and card-grid sprawl.
  - Avoid gratuitous glowing borders, gaudy neon gradients, cheesy floating orbs, and generic glassmorphism effects unless specifically justified for a distinct tactile purpose.
  - Rely on whitespace, sharp typography, proportion, scale, and tonal contrast to create depth and structure.
- **Strong Visual Hierarchy**:
  - Clear editorial flow with intentional scale jumps between headings, subheadings, and body copy.
  - Every section must possess a distinct visual identity while harmonizing seamlessly into the overall system.
  - **The Hero Section is the most critical visual area**: It establishes credibility, craft, and curiosity within the first 3 seconds. Give it breathing room, distinct scale, and unmistakable polish.
- **Typography & Rhythm**:
  - Use deliberate font pairings (e.g. clean modernist sans or editorial serif paired with high-legibility geometric sans / mono accents).
  - Strictly enforce typographic rhythm: consistent line-heights (`1.1` to `1.25` for display, `1.5` to `1.7` for body copy), optical sizing, and balanced line lengths (max 65–75 characters per line for body copy).
  - Use modular spacing tokens (multiples of 4px / 8px). Avoid ad-hoc, random margin or padding values.

## UX Flow & Motion
- **Narrative Storytelling Flow**:
  1. **Who I am** (Identity, perspective, focus)
  2. **What I do** (Core competencies, domain focus)
  3. **Experience** (Impact, trajectory, real-world responsibility)
  4. **Projects** (Deep-dive case studies showcasing engineering craft)
  5. **Skills** (Systematic tools, architecture, and technology capabilities)
  6. **Proof** (Recommendations, impact metrics, technical writings, or verification)
  7. **Contact** (Clear, direct, friction-free paths to connect)
- **Motion With Purpose**:
  - Every animation or transition must serve a clear user feedback or continuity purpose.
  - Micro-interactions must feel snappy, physical, and subtle (150ms–300ms, using cubic-bezier easing).
  - No slow, lingering, or distracting entrance animations that impede fast navigation.
  - Respect `prefers-reduced-motion` at all times.
- **Design Continuity**:
  - Preserve proven design decisions instead of constantly rewriting layouts. Iterate with surgical refinement.
