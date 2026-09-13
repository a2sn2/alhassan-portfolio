# ADR-0007: Vercel Edge Deployment & Preview Architecture

**Status:** Accepted  
**Date:** 2026-09-13  
**Deciders:** DevOps Engineer, Release Engineer  

---

## Context
The application is connected via Git integration: Local → Git → GitHub → Vercel. Production branch is `main`. The production URL is `https://alhassan-portfolio-phi.vercel.app`. The platform requires zero-downtime deployments, atomic preview URLs for pull requests, and instant rollback capabilities.

## Decision
Retain Vercel as the hosting platform, using its native Git integration. Preview environments are automatically created for every pull request, allowing visual and runtime verification before merging into `main`. The production deployment is triggered exclusively by merging approved changes into `main`.

## Options Considered
1. **Managed Vercel Platform (Selected):** Native Next.js optimizations, automatic preview deployments, global edge CDN, zero-config SSL, instant rollback to previous deployment hashes.
2. **Self-Hosted VPS (Docker / Nginx):** Incurs ongoing server patching, manual SSL renewal, uptime monitoring, and infrastructure-as-code complexity disproportionate to a static portfolio.
3. **AWS S3 + CloudFront:** Requires complex IAM permissions and lacks automatic preview URL generation per Git branch.

## Why
Vercel is the creator and maintainer of Next.js, providing the highest reliability, optimal edge caching, and automated preview environments for every pull request with zero ongoing maintenance overhead.
