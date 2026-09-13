# Local Development Runbook

This runbook guides engineers through running, modifying, testing, and debugging the portfolio locally.

---

## 1. Prerequisites

- **Node.js:** `v20.x` or `v22.x` (LTS recommended).
- **Package Manager:** `npm` (bundled with Node.js).
- **Operating System:** Windows, macOS, or Linux.

---

## 2. Setup & Installation

Clone the repository and install dependencies cleanly:
```bash
git clone https://github.com/a2sn2/alhassan-portfolio.git
cd alhassan-portfolio

# Clean, reproducible installation from package-lock.json
npm ci
```

---

## 3. Development Server

Start the local Next.js development server with Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Fast Refresh updates the interface instantly upon file changes.

---

## 4. Quality Verification Commands

Before pushing any commits, execute the verification suite:

```bash
# 1. Code Style & Syntax Linting
npm run lint

# 2. Strict TypeScript Verification
npx tsc --noEmit

# 3. Production Static Build Test
npm run build

# 4. End-to-End and Accessibility Tests
npx playwright test
```

---

## 5. Development Guidelines

- **Editing Content:** Do not edit React components to change biographical text. Edit the modular files in `src/content/`.
- **Styling Changes:** Do not add inline styles or component-specific arbitrary numbers. Use CSS variables from `src/styles/tokens.css`.
- **Adding Dependencies:** Review whether native platform capabilities or standard CSS can achieve the goal first before running `npm install`.
