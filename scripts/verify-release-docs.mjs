#!/usr/bin/env node

/**
 * Deterministic Release Documentation & Metric Baseline Verification Script
 *
 * Verifies that current release documentation strictly matches PR #18 release truth:
 * - 17 Portfolio Presentation Projects (16 from Official CV Catalogue + 1 FoundationKit)
 * - 16 Official Canonical CV Projects (preserved in CV content contracts and parity docs)
 * - 69 Public Indexable Routes (18 core + 51 project details across EN, AR, DE)
 * - 64/64 E2E Tests (Playwright + Axe accessibility suite)
 * - 24 Canonical Visual Routes (8 EN + 8 AR + 8 DE)
 * - 240 Static Screenshot Pairs + 15 Interactive States = 255 Total Visual Pairs
 * - 96 Responsive Route-Viewport Combinations (24 representative routes × 4 viewports)
 * - 26 Credential Records (22 verified, 3 ongoing, 1 missing)
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = process.cwd();

const failures = [];
let passedChecks = 0;

function check(description, condition, failureMessage) {
  if (condition) {
    passedChecks++;
    console.log(`  ✓ ${description}`);
  } else {
    failures.push(`${description}: ${failureMessage}`);
    console.error(`  ❌ ${description}: ${failureMessage}`);
  }
}

console.log('============================================================');
console.log('📚 VERIFYING RELEASE DOCUMENTATION & METRIC BASELINES');
console.log('============================================================\n');

// -------------------------------------------------------------
// 1. ROOT README (README.md)
// -------------------------------------------------------------
console.log('▶ [1/5] Verifying Root README.md Release Metrics...');
const readmePath = path.join(ROOT_DIR, 'README.md');
const readmeContent = fs.readFileSync(readmePath, 'utf8');

check(
  'README: 69 public indexable routes documented in build command',
  readmeContent.includes('69 public/indexable portfolio routes'),
  'Expected "69 public/indexable portfolio routes" not found in README.md'
);

check(
  'README: 64/64 E2E tests documented in test command',
  readmeContent.includes('64/64 tests'),
  'Expected "64/64 tests" not found in README.md'
);

check(
  'README: 69 public routes documented in verify:production',
  readmeContent.includes('69 public routes'),
  'Expected "69 public routes" not found in verify:production line in README.md'
);

check(
  'README: 96 responsive combinations documented in verify:production',
  readmeContent.includes('96 combinations'),
  'Expected "96 combinations" not found in README.md'
);

check(
  'README: 24 visual routes documented in verify:visual-parity',
  readmeContent.includes('24 routes x 5 viewports') || readmeContent.includes('24 Canonical Routes'),
  'Expected 24 visual routes specification not found in README.md'
);

check(
  'README: 240 static screenshot pairs documented',
  readmeContent.includes('240 Static Screenshot Pairs') || readmeContent.includes('240 static'),
  'Expected 240 static screenshot pairs not found in README.md'
);

check(
  'README: 15 interactive states documented',
  readmeContent.includes('15 Interactive States') || readmeContent.includes('15 interactive'),
  'Expected 15 interactive states not found in README.md'
);

check(
  'README: 255 total visual parity pairs documented',
  readmeContent.includes('255 Total Visual Parity Pairs') || readmeContent.includes('255 pairs'),
  'Expected 255 total visual parity pairs not found in README.md'
);

check(
  'README: foundationkit-dotnet included in visual routes list',
  readmeContent.includes('/projects/foundationkit-dotnet'),
  'Expected /projects/foundationkit-dotnet not found in visual routes in README.md'
);

check(
  'README: verify:release-docs command listed in verification suite',
  readmeContent.includes('npm run verify:release-docs'),
  'Expected "npm run verify:release-docs" not found in README.md'
);

// Stale metrics guard in README
check(
  'README: Zero stale 66 public routes references',
  !readmeContent.includes('66 public routes') && !readmeContent.includes('66 public/indexable portfolio routes'),
  'Stale "66 public routes" found in README.md'
);

check(
  'README: Zero stale 49/49 E2E tests references',
  !readmeContent.includes('49/49 tests'),
  'Stale "49/49 tests" found in README.md'
);

check(
  'README: Zero stale 60/60 E2E tests references',
  !readmeContent.includes('60/60 tests'),
  'Stale "60/60 tests" found in README.md'
);

check(
  'README: Zero stale 62/62 E2E tests references',
  !readmeContent.includes('62/62 tests'),
  'Stale "62/62 tests" found in README.md'
);

check(
  'README: Zero stale 63/63 E2E tests references',
  !readmeContent.includes('63/63 tests'),
  'Stale "63/63 tests" found in README.md'
);

check(
  'README: Zero stale 21 visual routes references',
  !readmeContent.includes('21 routes x 5 viewports') && !readmeContent.includes('21 Canonical Routes'),
  'Stale "21 routes" found in README.md'
);

check(
  'README: Zero stale 210 static pairs references',
  !readmeContent.includes('210 Static Screenshot Pairs'),
  'Stale "210 Static Screenshot Pairs" found in README.md'
);

check(
  'README: Zero stale 225 visual pairs references',
  !readmeContent.includes('225 Total Visual Parity Pairs'),
  'Stale "225 Total Visual Parity Pairs" found in README.md'
);

// -------------------------------------------------------------
// 2. EVIDENCE HUB README (docs/evidence/README.md)
// -------------------------------------------------------------
console.log('\n▶ [2/5] Verifying Evidence Hub README (docs/evidence/README.md)...');
const evidenceReadmePath = path.join(ROOT_DIR, 'docs', 'evidence', 'README.md');
const evidenceReadmeContent = fs.readFileSync(evidenceReadmePath, 'utf8');

check(
  'Evidence README: Documents 17 portfolio project evidence records',
  evidenceReadmeContent.includes('17 Portfolio project evidence records') || evidenceReadmeContent.includes('17 projects: 16 CV projects + FoundationKit'),
  'Expected 17 portfolio project evidence records not documented in docs/evidence/README.md'
);

check(
  'Evidence README: Lists foundationkit-dotnet in directory tree',
  evidenceReadmeContent.includes('foundationkit-dotnet/'),
  'Expected foundationkit-dotnet/ not found in directory structure in docs/evidence/README.md'
);

check(
  'Evidence README: Differentiates 16 CV projects from FoundationKit',
  evidenceReadmeContent.includes('16 CV') && evidenceReadmeContent.includes('FoundationKit'),
  'Expected distinction between 16 CV projects and FoundationKit not found in docs/evidence/README.md'
);

check(
  'Evidence README: Credential breakdown precisely specifies 22 verified, 3 ongoing, 1 missing',
  evidenceReadmeContent.includes('22 verified, 3 ongoing, 1 missing') || evidenceReadmeContent.includes('22 verified'),
  'Expected precise credential breakdown not found in docs/evidence/README.md'
);

check(
  'Evidence README: Zero stale "16 Canonical project evidence folders"',
  !evidenceReadmeContent.includes('16 Canonical project evidence folders'),
  'Stale "16 Canonical project evidence folders" found in docs/evidence/README.md'
);

// -------------------------------------------------------------
// 3. CONTENT SOURCE MATRIX (docs/content/CONTENT-SOURCE-MATRIX.md)
// -------------------------------------------------------------
console.log('\n▶ [3/5] Verifying Content Source Matrix (docs/content/CONTENT-SOURCE-MATRIX.md)...');
const matrixPath = path.join(ROOT_DIR, 'docs', 'content', 'CONTENT-SOURCE-MATRIX.md');
const matrixContent = fs.readFileSync(matrixPath, 'utf8');

check(
  'Content Matrix: Preserves exactly 16 canonical CV projects heading',
  matrixContent.includes('Projects & Strict Technology Attachment (16 Projects)'),
  'Canonical CV projects heading (16 Projects) was modified or missing in CONTENT-SOURCE-MATRIX.md'
);

check(
  'Content Matrix: Contains section 5.1 for FoundationKit addition',
  matrixContent.includes('5.1 Additional Evidence-Backed Portfolio Project'),
  'Expected section 5.1 for FoundationKit not found in CONTENT-SOURCE-MATRIX.md'
);

check(
  'Content Matrix: FoundationKit classified as OWNER-APPROVED PORTFOLIO ADDITION + EVIDENCE-BACKED PROJECT',
  matrixContent.includes('OWNER-APPROVED PORTFOLIO ADDITION + EVIDENCE-BACKED PROJECT'),
  'Expected FoundationKit classification not found in CONTENT-SOURCE-MATRIX.md'
);

check(
  'Content Matrix: Clarifies 17 presentation projects vs 16 official CV entries',
  matrixContent.includes('17') && matrixContent.includes('16 project entries in the current official CV package'),
  'Expected 17 presentation vs 16 CV explanation not found in CONTENT-SOURCE-MATRIX.md'
);

// -------------------------------------------------------------
// 4. CV CONTENT PARITY (docs/content/CV-CONTENT-PARITY.md)
// -------------------------------------------------------------
console.log('\n▶ [4/5] Verifying CV Content Parity Specification (docs/content/CV-CONTENT-PARITY.md)...');
const parityPath = path.join(ROOT_DIR, 'docs', 'content', 'CV-CONTENT-PARITY.md');
const parityContent = fs.readFileSync(parityPath, 'utf8');

check(
  'CV Parity: Preserves exact Projects & Work (16 items) in canonical Layer A',
  parityContent.includes('Projects & Work (16 items)'),
  'Canonical Projects & Work (16 items) modified or missing in CV-CONTENT-PARITY.md'
);

check(
  'CV Parity: Explains Layer B public portfolio contains 17 projects',
  parityContent.includes('17 projects') && parityContent.includes('16 source-exact CV project entries'),
  'Layer B 17 projects (16 CV + FoundationKit) explanation missing in CV-CONTENT-PARITY.md'
);

// -------------------------------------------------------------
// 5. APPLICATION LAYER CODE CONTRACTS
// -------------------------------------------------------------
console.log('\n▶ [5/5] Verifying Application Code Contract Project Counts...');
const appProjectsPath = path.join(ROOT_DIR, 'src', 'content', 'projects.ts');
const appProjectsContent = fs.readFileSync(appProjectsPath, 'utf8');

// Check that presentation layer has 17 projects
const presentationProjectMatches = appProjectsContent.match(/id:\s*["'][a-z0-9-]+["']/g) || [];
check(
  'App Presentation: src/content/projects.ts defines exactly 17 project items',
  presentationProjectMatches.length === 17,
  `Expected 17 project entries in src/content/projects.ts, found ${presentationProjectMatches.length}`
);

// Check that canonical CV layer has 16 projects
const cvProjectsPath = path.join(ROOT_DIR, 'src', 'content', 'cv', 'projects.ts');
const cvProjectsContent = fs.readFileSync(cvProjectsPath, 'utf8');
const cvProjectMatches = cvProjectsContent.match(/slug:\s*["'][a-z0-9-]+["']/g) || [];
check(
  'Canonical CV Layer: src/content/cv/projects.ts defines exactly 16 projects',
  cvProjectMatches.length === 16,
  `Expected 16 projects in src/content/cv/projects.ts, found ${cvProjectMatches.length}`
);

// Check that E2E test suite has 64 test cases
const e2eSpecPath = path.join(ROOT_DIR, 'tests', 'e2e', 'portfolio.spec.ts');
const e2eSpecContent = fs.readFileSync(e2eSpecPath, 'utf8');
const testMatches = e2eSpecContent.match(/test\("TC-\d+/g) || [];
check(
  'E2E Test Suite: tests/e2e/portfolio.spec.ts defines exactly 64 test cases (TC-01 through TC-64)',
  testMatches.length === 64,
  `Expected 64 test cases in portfolio.spec.ts, found ${testMatches.length}`
);

// -------------------------------------------------------------
// 6. OFFICIAL CUSTOM DOMAIN & ACTIVE PRODUCTION INVARIANTS
// -------------------------------------------------------------
console.log('\n▶ [6/8] Verifying Official Custom Domain & Active Production Invariants...');

const siteMetaEn = fs.readFileSync(path.join(ROOT_DIR, 'src', 'content', 'siteMetadata.ts'), 'utf8');
const siteMetaAr = fs.readFileSync(path.join(ROOT_DIR, 'src', 'content', 'ar', 'siteMetadata.ts'), 'utf8');
const siteMetaDe = fs.readFileSync(path.join(ROOT_DIR, 'src', 'content', 'de', 'siteMetadata.ts'), 'utf8');

check(
  'SiteMetadata EN: official production domain is https://www.engalhassanalshami.com',
  siteMetaEn.includes('siteUrl: "https://www.engalhassanalshami.com"') && siteMetaEn.includes('productionDomain: "www.engalhassanalshami.com"'),
  'Expected official production domain https://www.engalhassanalshami.com in src/content/siteMetadata.ts'
);

check(
  'SiteMetadata AR: official production domain is https://www.engalhassanalshami.com',
  siteMetaAr.includes('siteUrl: "https://www.engalhassanalshami.com"') && siteMetaAr.includes('productionDomain: "www.engalhassanalshami.com"'),
  'Expected official production domain https://www.engalhassanalshami.com in src/content/ar/siteMetadata.ts'
);

check(
  'SiteMetadata DE: official production domain is https://www.engalhassanalshami.com',
  siteMetaDe.includes('siteUrl: "https://www.engalhassanalshami.com"') && siteMetaDe.includes('productionDomain: "www.engalhassanalshami.com"'),
  'Expected official production domain https://www.engalhassanalshami.com in src/content/de/siteMetadata.ts'
);

check(
  'README: Production URL points to custom domain https://www.engalhassanalshami.com',
  readmeContent.includes('Production URL: [https://www.engalhassanalshami.com](https://www.engalhassanalshami.com)'),
  'Expected custom domain in Production URL link in README.md'
);

// Zero old active Vercel domain in active configuration / metadata
check(
  'Active Config Guard: Zero old Vercel URL in active metadata or README',
  !siteMetaEn.includes('alhassan-portfolio-phi.vercel.app') &&
  !siteMetaAr.includes('alhassan-portfolio-phi.vercel.app') &&
  !siteMetaDe.includes('alhassan-portfolio-phi.vercel.app') &&
  !readmeContent.includes('alhassan-portfolio-phi.vercel.app'),
  'Old active Vercel URL found in active configuration or README!'
);

// -------------------------------------------------------------
// 7. SITE MANAGEMENT & ANALYTICS OPERATIONS DOCS
// -------------------------------------------------------------
console.log('\n▶ [7/8] Verifying Site Management & Analytics Documentation...');
const siteMgmtPath = path.join(ROOT_DIR, 'docs', 'operations', 'SITE-MANAGEMENT.md');
const siteMgmtExists = fs.existsSync(siteMgmtPath);

check(
  'Site Management Doc: docs/operations/SITE-MANAGEMENT.md exists',
  siteMgmtExists,
  'Expected docs/operations/SITE-MANAGEMENT.md to exist'
);

if (siteMgmtExists) {
  const siteMgmtContent = fs.readFileSync(siteMgmtPath, 'utf8');

  check(
    'Site Management Doc: Documents official domain https://www.engalhassanalshami.com',
    siteMgmtContent.includes('https://www.engalhassanalshami.com'),
    'Expected official domain https://www.engalhassanalshami.com not found in SITE-MANAGEMENT.md'
  );

  check(
    'Site Management Doc: Documents Vercel Web Analytics (@vercel/analytics)',
    siteMgmtContent.includes('@vercel/analytics'),
    'Expected @vercel/analytics reference not found in SITE-MANAGEMENT.md'
  );

  check(
    'Site Management Doc: Documents Vercel Speed Insights (@vercel/speed-insights)',
    siteMgmtContent.includes('@vercel/speed-insights'),
    'Expected @vercel/speed-insights reference not found in SITE-MANAGEMENT.md'
  );

  // Check A: SITE-MANAGEMENT.md must NOT claim Content-Security-Policy unless next.config actually contains it
  const nextConfigContent = fs.readFileSync(path.join(ROOT_DIR, 'next.config.ts'), 'utf8');
  const nextConfigHasCsp = nextConfigContent.includes('Content-Security-Policy');
  const siteMgmtHasCsp = siteMgmtContent.includes('Content-Security-Policy');
  check(
    'Site Management Doc: Security header claims match next.config.ts (no inaccurate CSP claim)',
    nextConfigHasCsp ? siteMgmtHasCsp : !siteMgmtHasCsp,
    'SITE-MANAGEMENT.md claims Content-Security-Policy but next.config.ts does not enforce it'
  );

  check(
    'Site Management Doc: Preserves zero private token exposure',
    !siteMgmtContent.includes('VERCEL_TOKEN') && !siteMgmtContent.includes('secret_'),
    'Sensitive token patterns found in SITE-MANAGEMENT.md'
  );
}

// -------------------------------------------------------------
// 8. ASSET MANIFEST SPECIFICATION
// -------------------------------------------------------------
console.log('\n▶ [8/8] Verifying Asset Manifest Specification...');
const assetManifestPath = path.join(ROOT_DIR, 'docs', 'REPOSITORY-ASSET-MANIFEST.md');
const assetManifestExists = fs.existsSync(assetManifestPath);

check(
  'Asset Manifest: docs/REPOSITORY-ASSET-MANIFEST.md exists',
  assetManifestExists,
  'Expected docs/REPOSITORY-ASSET-MANIFEST.md to exist'
);

if (assetManifestExists) {
  const assetManifestContent = fs.readFileSync(assetManifestPath, 'utf8');

  // Check B: REPOSITORY-ASSET-MANIFEST.md must state 17 Portfolio project evidence records
  check(
    'Asset Manifest: States exactly 17 Portfolio project evidence records',
    assetManifestContent.includes('17 Portfolio project evidence records'),
    'Expected "17 Portfolio project evidence records" not found in REPOSITORY-ASSET-MANIFEST.md'
  );

  // Check C: Canonical CV project count remains 16
  check(
    'Asset Manifest: Preserves canonical CV breakdown (16 projects from the official CV catalogue)',
    assetManifestContent.includes('16 projects from the official CV catalogue'),
    'Expected "16 projects from the official CV catalogue" not found in REPOSITORY-ASSET-MANIFEST.md'
  );

  check(
    'Asset Manifest: Clarifies FoundationKit as additional evidence-backed project',
    assetManifestContent.includes('1 additional evidence-backed Portfolio project: FoundationKit'),
    'Expected FoundationKit breakdown not found in REPOSITORY-ASSET-MANIFEST.md'
  );

  check(
    'Asset Manifest: Tracks drawingface.png as official browser/app icon source',
    assetManifestContent.includes('drawingface.png') && assetManifestContent.includes('Official browser/application icon source'),
    'Expected drawingface.png tracking entry not found in REPOSITORY-ASSET-MANIFEST.md'
  );
}

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n============================================================');
console.log(`📊 RELEASE DOCUMENTATION AUDIT SUMMARY`);
console.log(`Passed Checks: ${passedChecks}`);
console.log(`Failures:      ${failures.length}`);
console.log('============================================================\n');

if (failures.length > 0) {
  console.error('❌ DOCUMENTATION DRIFT DETECTED:\n');
  failures.forEach((f, idx) => console.error(`  ${idx + 1}. ${f}`));
  console.error('\nPlease reconcile documentation files before proceeding.');
  process.exit(1);
} else {
  console.log('✅ ALL RELEASE DOCUMENTATION & METRIC BASELINES ARE FULLY RECONCILED.\n');
  process.exit(0);
}
