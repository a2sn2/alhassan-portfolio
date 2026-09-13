# Production Rollback Runbook

This runbook outlines the rapid emergency rollback procedures for the portfolio in the event of an unexpected regression in production.

---

## 1. Instant Vercel Rollback (< 30 Seconds)

Because deployments on Vercel are immutable and atomic, you can instantly restore a prior stable build without rebuilding or waiting for CI:

1. Navigate to the [Vercel Dashboard](https://vercel.com).
2. Select the `alhassan-portfolio` project.
3. Click the **Deployments** tab.
4. Locate the last known healthy production deployment.
5. Click the three dots menu (`...`) on the right side of the deployment row.
6. Click **Instant Rollback**.
7. Confirm the prompt. The healthy deployment is immediately promoted to serve `https://alhassan-portfolio-phi.vercel.app` instantly.

---

## 2. Git-Level Rollback & Main Alignment

After executing an instant rollback on Vercel, realign the Git history on `main`:

```bash
# 1. Check out main and pull the latest commits
git checkout main
git pull origin main

# 2. Revert the problematic commit
git revert <problematic-commit-sha> -m "Revert: restore production stability"

# 3. Push the revert commit to main
git push origin main
```
This triggers a clean build of the reverted state, ensuring repository state and deployed state are synchronized.
