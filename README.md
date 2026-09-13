# alhassan-portfolio

> Personal interactive portfolio website for **ALHassan Baligh ALShami** — Software Engineer.

A premium, bespoke digital portfolio built with architectural restraint, intentional typography, and performance-first engineering.

---

## ✦ Core Design Principles

- **Human-Crafted & Intentional**: Designed with typographic rhythm, purposeful whitespace, and refined tonal contrast. Avoids generic AI template tropes, excessive cards, and gratuitous glow/neon effects.
- **Narrative Storytelling Flow**:
  1. **Who I am** — Identity, background, perspective
  2. **What I do** — Engineering discipline & problem domains
  3. **Experience** — Career trajectory and real-world ownership
  4. **Projects** — Rigorous case studies (Problem → Role → Solution → Technologies → Result)
  5. **Skills** — Systems, languages, frameworks, and architecture competencies
  6. **Proof** — Recommendations, metrics, technical writing, and peer endorsements
  7. **Contact** — Friction-free direct communication channels
- **Inclusive Accessibility**: Full keyboard navigation, visible focus indicators, skip-to-content accessibility link, and semantic HTML5 throughout.
- **Content Integrity**: Zero hallucinated claims or fabricated metrics. All biographical and professional entries are grounded strictly in verified CV data.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: Modern Vanilla CSS with CSS Modules & CSS Custom Properties (Design Tokens)
- **Typography**: Geist Sans & Geist Mono via `next/font`
- **SEO**: Metadata API, OpenGraph protocols, structured semantics

---

## 📂 Project Structure

```text
alhassan-portfolio/
├── .agents/
│   └── rules/                  # Workspace-level agent rules
│       ├── design-system.md    # Aesthetics, rhythm, motion, and visual restraint
│       ├── frontend-quality.md # Semantic HTML, modularity, and zero magic numbers
│       ├── responsive-accessibility.md # Viewport resilience and WCAG AA standards
│       ├── content-integrity.md# Zero-invention policy & verified data guidelines
│       └── visual-qa.md        # Mandatory browser testing checklist
├── src/
│   ├── app/
│   │   ├── globals.css         # Global shell layout & imports
│   │   ├── layout.tsx          # Root layout, metadata, SEO, and shell
│   │   └── page.tsx            # Composition of narrative storytelling sections
│   ├── components/
│   │   ├── layout/             # Header, Footer, and Navigation
│   │   ├── sections/           # Hero, About, Experience, Projects, Skills, Proof, Contact
│   │   └── ui/                 # Container, Button, Badge, SkipLink, SectionHeader
│   ├── data/
│   │   ├── siteConfig.ts       # Verified site metadata and navigation
│   │   └── types.ts            # TypeScript data contracts
│   ├── styles/
│   │   ├── reset.css           # Modern CSS reset & reduced-motion queries
│   │   └── tokens.css          # Design token primitives (colors, fluid clamp fonts, spaces)
│   └── utils/
│       └── cn.ts               # Zero-dependency classname utility
├── public/                     # Static assets
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `20.x` or higher (tested with Node `22.x`)
- npm `10.x` or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/a2sn2/alhassan-portfolio.git
cd alhassan-portfolio

# Install dependencies
npm install
```

### Local Development

```bash
# Start development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Verification

```bash
# Run TypeScript type check
npx tsc --noEmit

# Run ESLint check
npm run lint

# Build production bundle
npm run build

# Run production server locally
npm start
```

---

## 🌐 Deployment

### Vercel (Recommended)
1. Push the repository to GitHub: `a2sn2/alhassan-portfolio`.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Next.js App Router defaults are automatically detected and deployed.

---

## 📜 License

Private personal portfolio repository © ALHassan Baligh ALShami.
