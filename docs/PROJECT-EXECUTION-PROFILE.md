# Project Execution Profile: alhassan-portfolio

This document establishes the project-specific execution profile for **alhassan-portfolio**, mapped directly from the **Universal Software Project Execution Playbook** (`docs/standards/UNIVERSAL_SOFTWARE_PROJECT_EXECUTION_PLAYBOOK_AR.md`).

---

## 1. Project Classification

| Dimension | Classification | Rationale & Evidence |
| :--- | :--- | :--- |
| **Project Size** | **Small** (Playbook §237) | Single Next.js web application, focused solo engineering ownership, zero distributed services. |
| **Product Type** | **Public Professional Portfolio** | Interactive, content-driven, personal brand & engineering showcase. |
| **Workload Profile** | **Frontend / Mostly Static Content** | Static prerendering via React Server Components, client-side interactivity only for navigation drawer and micro-interactions. |
| **Data Sensitivity** | **Public** | Public professional CV facts, verified projects, and contact channels. Zero confidential user data. |
| **Architecture** | **Clean Component-Driven Next.js App** | Clean boundaries: Content & Contracts $\rightarrow$ Section Presentation $\rightarrow$ UI Primitives. No enterprise backend bloat. |
| **Hosting & CI/CD** | **Vercel + GitHub Actions** | Global edge CDN, automatic preview deployments, exact-head CI verification. |

---

## 2. Playbook Capabilities Matrix

In strict accordance with the Playbook's rule:
> *"Build the simplest correct system, prove it, then generalize only what evidence justifies. Do NOT blindly apply enterprise/backend sections that are irrelevant to this project."*

Each major capability is classified below:

### A. Applicable Capabilities (Implemented & Enforced)
1. **Contract-First Content Architecture (Playbook §420, §403):**  
   - Typed TypeScript contracts (`src/contracts/`) define the shape of all professional facts.
   - Central content files (`src/content/`) act as the single Source of Truth.
   - Presentation components consume data via typed props without hardcoding.
2. **Design Tokens & Fluid Typography (Playbook §415):**  
   - CSS custom properties (`src/styles/tokens.css`) define colors, modular spacing, and fluid `clamp()` font scales.
   - Zero magic numbers or arbitrary pixel overrides.
3. **Responsive Architecture & Mobile-First Quality (Playbook §415):**  
   - Verified support across 1440px, 1280px, 768px, 390px, and 320px.
   - Zero horizontal overflow, no clipped text, accessible touch targets ($\ge 44\times 44\text{px}$).
4. **Universal Accessibility (WCAG 2.1 AA) (Playbook §415, §416):**  
   - Semantic HTML5, accessible skip link, visible focus outlines, keyboard drawer navigation (`Tab`, `Escape`).
   - Automated accessibility audits using Playwright + `@axe-core/playwright`.
5. **Static Quality & Exact-Head Verification (Playbook §417, §420):**  
   - ESLint (Next.js config), strict TypeScript compilation (`noEmit`), and Next.js production build in CI.
6. **Automated E2E & Browser Visual QA (Playbook §218, §410):**  
   - Automated browser testing validating page loads, navigation anchors, drawer states, and multi-viewport rendering.
7. **Production SEO & Web Standards (Playbook §415):**  
   - Next.js App Router metadata API, OpenGraph protocols, Schema.org JSON-LD structured data (`Person`, `WebSite`), `robots.ts`, and `sitemap.ts`.
8. **Security Baseline (Playbook §416):**  
   - Safe HTTP response headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
   - Zero committed secrets, least-privilege CI workflow permissions, safe external link attributes (`rel="noopener noreferrer"`).
9. **Solo-Developer Branch & Release Governance (Playbook §223, §225):**  
   - Feature branches (`chore/*`, `feat/*`, `fix/*`), PR template, Vercel preview environments, zero force pushes to `main`.

---

### B. Conditionally Applicable Capabilities (Deferred to Evidence)
1. **Server-Side API Routes (Route Handlers):**  
   - *Status:* Deferred. If a contact form submission, reCAPTCHA verification, or dynamic newsletter subscription is added in the future, a dedicated Next.js Route Handler (`src/app/api/contact/route.ts`) will be implemented. Currently not required.
2. **Headless CMS Integration:**  
   - *Status:* Deferred. If content updates require a non-technical GUI or external editorial workflow, content can be pulled from a headless CMS (e.g. Sanity/Contentful). Currently, typed static files in `src/content/` provide superior type safety, zero operational cost, and immediate version control.
3. **Analytics Integration:**  
   - *Status:* Ready for optional enablement. Vercel Web Analytics and Speed Insights can be activated with a single package import when production traffic warrants it.

---

### C. Not Applicable (Explicitly Excluded by Technical Rationale)
The following enterprise/backend capabilities are excluded because introducing them would violate the Playbook's YAGNI directive (§245) and add unwarranted complexity with zero benefit:

| Capability | Rationale for Exclusion |
| :--- | :--- |
| **Relational / NoSQL Database** | The portfolio is public and static. All professional facts reside in version-controlled content contracts. A database introduces unnecessary connection pooling, latency, cost, and maintenance. |
| **ORM / Query Builders (Prisma, Drizzle, EF)** | Without a database, an ORM serves zero purpose. |
| **Authentication & Authorization (NextAuth, OAuth, JWT)** | The portfolio contains zero gated or user-specific content. Implementing auth would be pure theater. |
| **Multi-Tenancy** | This is a single-tenant personal portfolio platform. |
| **Microservices / Message Brokers (Kafka, RabbitMQ)** | Overengineering an informational static portfolio into distributed microservices violates core software engineering principles. |
| **Distributed Caching (Redis, Memcached)** | Vercel's global Edge CDN natively caches statically generated assets at the network edge with zero infrastructure overhead. |
| **CQRS / Event Sourcing** | No write-heavy command domain exists. |
| **Payment Gateways (Stripe, PayPal)** | No e-commerce or commercial transactions exist. |
| **Background Jobs / Schedulers (BullMQ, Celery)** | All page generation occurs at build time; no asynchronous batch processing is needed. |
| **Kubernetes / Docker Runtime** | Vercel Edge/Serverless platform manages the runtime, scaling, SSL termination, and deployments natively. |
| **Infrastructure-as-Code (Terraform, Pulumi)** | Infrastructure is fully declared through Git $\rightarrow$ Vercel integration and standard Next.js configuration. |

---

## 3. Governance & Quality Gates
Every milestone and pull request must satisfy the **Release Gate** (§394) and **Definition of Done** (§212) defined in `docs/quality/`.
