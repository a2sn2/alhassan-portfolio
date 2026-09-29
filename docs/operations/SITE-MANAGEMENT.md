# Site Management & Production Operations Guide

**Platform:** ALHassan Baligh ALShami — Personal Portfolio  
**Official Production URL:** `https://www.engalhassanalshami.com`  
**Hosting Provider:** Vercel Global Edge Network  
**Production Branch:** `main`  

---

## 1. Overview & Operational Philosophy

The portfolio platform is designed as an ultra-high performance, statically generated multi-lingual web platform deployed globally via Vercel Edge Network. Site management and observability are conducted through Vercel's first-party operational toolset without embedding third-party trackers, external advertising pixels, or public administrative routes.

---

## 2. Core Site Management Areas

### 1. Deployments & Rollbacks
- **Continuous Deployment:** Merges to branch `main` automatically trigger immutable, atomic production builds.
- **Preview Environments:** Pull requests generate isolated preview deployments with unique URLs and automatic `X-Robots-Tag: noindex` protection.
- **Instant Rollback:** Accessible via Vercel Dashboard → Deployments → Select healthy build → Instant Rollback (< 30 seconds recovery without rebuild).

### 2. Vercel Web Analytics
- **Instrumentation:** First-party integration via `@vercel/analytics` mounted in Root Layout (`src/app/layout.tsx`).
- **Privacy Standard:** Zero third-party trackers, zero cookies, zero PII collection (no emails, phone numbers, or form contents collected).
- **Metrics Collected:**
  - Unique Visitors & Page Views
  - Route & Path Performance (`/`, `/about`, `/ar`, `/de`, etc.)
  - Hostnames & Canonical Verification (`www.engalhassanalshami.com`)
  - Referrers & Clean Traffic Channels
  - Geographic Demographics (Countries / Regions)
  - Devices, Operating Systems, and Browsers

### 3. Vercel Speed Insights
- **Instrumentation:** Native Core Web Vitals telemetry via `@vercel/speed-insights` mounted in Root Layout.
- **Real-User Monitoring (RUM):**
  - Largest Contentful Paint (LCP)
  - Interaction to Next Paint (INP)
  - Cumulative Layout Shift (CLS)
  - First Contentful Paint (FCP)
  - Time to First Byte (TTFB)
  - Device- and region-segmented performance telemetry

### 4. Observability & Runtime Logs
- **Deployment Logs:** Build logs, TypeScript diagnostics, and Turbopack asset maps preserved per deployment hash.
- **Edge Request Logs:** Status codes, request paths, cache hit/miss statuses, and edge invocation latency.
- **Error Tracking:** Real-time logging of edge runtime exceptions or 4xx/5xx responses.

### 5. Custom Domain & DNS Management
- **Canonical Origin:** `https://www.engalhassanalshami.com`
- **Apex Domain:** `https://engalhassanalshami.com` (enforces HTTP 308 Permanent Redirect to `www.engalhassanalshami.com`).
- **SSL / TLS:** Managed automatically by Vercel with automatic TLS 1.3 certificate renewals.
- **Preview Isolation:** Previews never override or pollute production canonical indexing.

### 6. Firewall & Security
- **Security Headers:** Enforced via `next.config.ts`:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- **DDoS Mitigation:** Automated L3/L4/L7 mitigation powered by Vercel edge infrastructure.
- **Dependency Hygiene:** Regular automated audits enforcing 0 high/critical vulnerabilities.
