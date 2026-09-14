# Deployment & Promotion Runbook

**Production URL:** `https://alhassan-portfolio-phi.vercel.app`  
**Production Branch:** `main`  
**Hosting Provider:** Vercel Global Edge Network  

---

## 1. Automated CI/CD Pipeline Flow

```
Local Feature Branch (feat/*, fix/*, chore/*)
       │
       ▼ (push to GitHub)
GitHub Actions CI Pipeline (.github/workflows/ci.yml)
  ├── 1. Clean install (`npm ci`)
  ├── 2. Lint check (`npm run lint`)
  ├── 3. Type check (`npx tsc --noEmit`)
  ├── 4. Static build (`npm run build`)
  └── 5. E2E & Accessibility tests (`playwright test`)
       │
       ▼ (create Pull Request)
Vercel Automated Preview Deployment
  └── Generates unique preview URL (e.g. https://alhassan-portfolio-git-*.vercel.app)
       │
       ▼ (QA & Owner Review on Preview)
Release Gate Verification Passed
       │
       ▼ (Merge Pull Request into main)
Vercel Production Deployment
  └── Atomic promotion to https://alhassan-portfolio-phi.vercel.app
       │
       ▼
Production Smoke Test
```

---

## 2. Environment Strategy

- **Production:** Connected directly to branch `main`. Automatically deployed upon every merged pull request.
- **Preview:** Generated automatically by Vercel for every open pull request and feature branch. Isolated, non-indexed by search engines (via `X-Robots-Tag: noindex` injected automatically by Vercel on preview deployments).
- **Canonical Protection:** `siteMetadata.siteUrl` ensures canonical links always point to the production domain, preventing preview URLs from hijacking SEO rankings.

---

## 3. Post-Deployment Verification Checklist

Immediately after production deployment:
1. Open `https://alhassan-portfolio-phi.vercel.app`.
2. Verify HTTP status is `200 OK`.
3. Check browser DevTools console for zero runtime errors or failed assets.
4. Verify `/robots.txt` and `/sitemap.xml` return valid responses.
5. Click primary calls-to-action to confirm smooth navigation.
