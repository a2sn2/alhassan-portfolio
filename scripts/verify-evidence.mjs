#!/usr/bin/env node

/**
 * Deterministic Portfolio Evidence Hub Verifier
 *
 * Verifies that:
 * 1. All 16 canonical project slugs have an evidence record.
 * 2. All 26 canonical credential IDs have an evidence record.
 * 3. Zero duplicate project slugs exist.
 * 4. Zero duplicate credential IDs exist.
 * 5. All referenced public evidence files and directories exist on disk.
 * 6. Zero generic project URLs equal 'https://github.com/a2sn2'.
 * 7. Zero public evidence entries point into '_private', '_unclassified', or '_raw-private'.
 * 8. Zero disallowed build/cache directories are present in public evidence.
 * 9. Zero forbidden large ML model files (*.h5, *.onnx, *.pt, etc.) or files > 15MB.
 * 10. Unclassified '123.pdf' is NOT published under public evidence.
 * 11. Zero ongoing credentials are marked completed or verified with fake certificates.
 * 12. Zero certificate CTAs point to missing evidence.
 * 13. Zero private recommendation or reference contact details are exposed publicly.
 * 14. Exact source URL and evidence parity across English, Arabic, and German content layers.
 * 15. Zero Windows absolute paths leak into committed public evidence metadata.
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const baseRequire = createRequire(import.meta.url);
const root = process.cwd();

const manifestPath = path.join(root, "docs", "evidence", "evidence-manifest.json");
const matrixPath = path.join(root, "docs", "evidence", "EVIDENCE-MATRIX.md");
const evidenceReadmePath = path.join(root, "docs", "evidence", "README.md");
const candidatesReadmePath = path.join(root, "docs", "evidence", "candidates", "README.md");
const auditDocPath = path.join(root, "docs", "evidence", "GITHUB-REPOSITORY-AUDIT.md");

const CANONICAL_PROJECT_SLUGS = [
  "real-time-object-detection",
  "robocam-controller",
  "pump-station-analytics",
  "real-time-image-classification-api",
  "urbanmindos",
  "mikrotik-hotspot-portal",
  "arduino-traffic-light",
  "obstacle-avoidance",
  "ai-tic-tac-toe",
  "pacman-pygame",
  "text-summarizer",
  "user-role-manager",
  "inventory-sales-manager",
  "student-evaluation-system",
  "cafe-pos-system",
  "omnifood-landing-page",
];

const CANONICAL_CREDENTIAL_IDS = [
  "cert-cyberai-2026",
  "cert-yeb-research-2025",
  "cert-yemen-intern-2025",
  "cert-yeb-ai-2025",
  "cert-yeb-frontend-2025",
  "cert-nh-design-2025",
  "cert-su-dl-cv-2025",
  "cert-su-robotics-2025",
  "cert-su-embedded-2025",
  "cert-su-matlab-2025",
  "cert-su-netadmin-2025",
  "cert-su-ai-rpi-2025",
  "cert-nh-aplus-2025",
  "cert-ai-approach-2025",
  "cert-alhamdi-med-2024",
  "cert-nh-mikrotik-2024",
  "cert-su-networks-2024",
  "cert-su-plc-2024",
  "cert-su-arduino-2024",
  "cert-su-solar-2024",
  "cert-alhamdi-marketing-2024",
  "cert-alhamdi-projmgmt-2024",
  "cert-alhamdi-admin-2024",
  "cert-sphere-2023",
  "cert-nh-icdl-2020",
  "cert-phone-maint-2019",
];

const ONGOING_CREDENTIAL_IDS = [
  "cert-yeb-ai-2025",
  "cert-yeb-frontend-2025",
  "cert-nh-design-2025",
];

const FORBIDDEN_MODEL_EXTS = [".h5", ".onnx", ".pt", ".pth", ".weights", ".bin", ".safetensors"];
const FORBIDDEN_BUILD_DIRS = [
  ".git",
  ".idea",
  ".vscode",
  "node_modules",
  "build",
  "dist",
  ".dart_tool",
  ".gradle",
  "__pycache__",
  "coverage",
  "test-results",
  "playwright-report",
];

const failures = [];

function check(condition, message) {
  if (!condition) {
    failures.push(message);
    console.error(`  ❌ ${message}`);
  } else {
    console.log(`  ✓ ${message}`);
  }
}

function loadTsModule(relativePath) {
  const fullPath = path.join(root, relativePath);
  const dir = path.dirname(fullPath);
  const src = fs.readFileSync(fullPath, "utf8");
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = { exports: {} };

  const customRequire = (reqPath) => {
    let resolved = reqPath;
    if (resolved.startsWith("@/")) {
      resolved = path.join(root, "src", resolved.slice(2));
    } else if (resolved.startsWith(".")) {
      resolved = path.join(dir, resolved);
    }
    if (!path.extname(resolved)) {
      if (fs.existsSync(`${resolved}.ts`)) resolved = `${resolved}.ts`;
      else if (fs.existsSync(`${resolved}.tsx`)) resolved = `${resolved}.tsx`;
      else if (fs.existsSync(path.join(resolved, "index.ts"))) resolved = path.join(resolved, "index.ts");
    }
    if (resolved.endsWith(".ts") || resolved.endsWith(".tsx")) {
      return loadTsModule(path.relative(root, resolved));
    }
    return baseRequire(resolved);
  };

  const fn = new Function("exports", "require", "module", js);
  fn(mod.exports, customRequire, mod);
  return mod.exports;
}

function scanDirRecursive(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      callback(fullPath, true);
      scanDirRecursive(fullPath, callback);
    } else if (entry.isFile()) {
      callback(fullPath, false);
    }
  }
}

async function run() {
  console.log("============================================================");
  console.log("🔍 PORTFOLIO EVIDENCE HUB DETERMINISTIC VERIFICATION");
  console.log("============================================================\n");

  // 1. Evidence Hub core structural documents exist
  console.log("▶ [1/15] Verifying Evidence Hub core documents...");
  check(fs.existsSync(manifestPath), "evidence-manifest.json exists");
  check(fs.existsSync(matrixPath), "EVIDENCE-MATRIX.md exists");
  check(fs.existsSync(evidenceReadmePath), "docs/evidence/README.md exists");
  check(fs.existsSync(candidatesReadmePath), "docs/evidence/candidates/README.md exists");
  check(fs.existsSync(auditDocPath), "docs/evidence/GITHUB-REPOSITORY-AUDIT.md exists");

  if (!fs.existsSync(manifestPath)) {
    console.error("FATAL: manifest file does not exist. Aborting.");
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  // 2. Canonical 16 project slugs & duplicate detection
  console.log("\n▶ [2/15] Verifying 16/16 project slugs in manifest and content layers...");
  const manifestProjects = manifest.projects || [];
  const manifestProjectSlugs = manifestProjects.map((p) => p.slug);
  const uniqueProjectSlugs = new Set(manifestProjectSlugs);

  check(manifestProjects.length === 16, `Manifest contains exactly 16 projects (found ${manifestProjects.length})`);
  check(uniqueProjectSlugs.size === 16, `All 16 project slugs are unique (found ${uniqueProjectSlugs.size})`);

  for (const slug of CANONICAL_PROJECT_SLUGS) {
    check(uniqueProjectSlugs.has(slug), `Project slug '${slug}' exists in manifest`);
  }

  // Load content layers
  const enProjectsMod = loadTsModule("src/content/projects.ts");
  const arProjectsMod = loadTsModule("src/content/ar/projects.ts");
  const deProjectsMod = loadTsModule("src/content/de/projects.ts");

  const enProjects = enProjectsMod.projectItems || [];
  const arProjects = arProjectsMod.projectItemsAr || [];
  const deProjects = deProjectsMod.projectItemsDe || [];

  check(enProjects.length === 16, `EN content layer has 16 projects (found ${enProjects.length})`);
  check(arProjects.length === 16, `AR content layer has 16 projects (found ${arProjects.length})`);
  check(deProjects.length === 16, `DE content layer has 16 projects (found ${deProjects.length})`);

  // 3. Canonical 26 credential IDs & duplicate detection
  console.log("\n▶ [3/15] Verifying 26/26 credential IDs in manifest and content layers...");
  const manifestCredentials = manifest.credentials || [];
  const manifestCredIds = manifestCredentials.map((c) => c.id);
  const uniqueCredIds = new Set(manifestCredIds);

  check(manifestCredentials.length === 26, `Manifest contains exactly 26 credentials (found ${manifestCredentials.length})`);
  check(uniqueCredIds.size === 26, `All 26 credential IDs are unique (found ${uniqueCredIds.size})`);

  for (const id of CANONICAL_CREDENTIAL_IDS) {
    check(uniqueCredIds.has(id), `Credential ID '${id}' exists in manifest`);
  }

  const enCredMod = loadTsModule("src/content/credentials.ts");
  const arCredMod = loadTsModule("src/content/ar/credentials.ts");
  const deCredMod = loadTsModule("src/content/de/credentials.ts");

  const enCerts = enCredMod.credentialsContent?.certifications || [];
  const arCerts = arCredMod.credentialsContentAr?.certifications || [];
  const deCerts = deCredMod.credentialsContentDe?.certifications || [];

  check(enCerts.length === 26, `EN content layer has 26 certifications (found ${enCerts.length})`);
  check(arCerts.length === 26, `AR content layer has 26 certifications (found ${arCerts.length})`);
  check(deCerts.length === 26, `DE content layer has 26 certifications (found ${deCerts.length})`);

  // 4. Physical existence of public evidence paths
  console.log("\n▶ [4/15] Verifying physical presence of public evidence files & folders...");
  for (const p of manifestProjects) {
    if (p.publicEvidencePath) {
      const fullP = path.join(root, p.publicEvidencePath);
      check(fs.existsSync(fullP), `Project public evidence path exists: ${p.publicEvidencePath}`);
    }
    if (p.archivePath) {
      const fullA = path.join(root, p.archivePath);
      check(fs.existsSync(fullA), `Project archive path exists: ${p.archivePath}`);
    }
  }

  for (const c of manifestCredentials) {
    if (c.publicPath) {
      const fullC = path.join(root, c.publicPath);
      check(fs.existsSync(fullC), `Credential certificate PDF exists: ${c.publicPath}`);
      if (fs.existsSync(fullC)) {
        const stats = fs.statSync(fullC);
        check(stats.size > 1000, `Certificate PDF is valid non-empty binary (>1KB): ${c.publicPath} (${stats.size} bytes)`);
      }
    }
  }

  // 5. Zero generic project URL: 'https://github.com/a2sn2'
  console.log("\n▶ [5/15] Verifying absence of generic GitHub profile URLs as project CTAs...");
  for (const p of enProjects) {
    check(p.githubUrl !== "https://github.com/a2sn2", `EN project '${p.slug}' does not use generic githubUrl`);
  }
  for (const p of arProjects) {
    check(p.githubUrl !== "https://github.com/a2sn2", `AR project '${p.slug}' does not use generic githubUrl`);
  }
  for (const p of deProjects) {
    check(p.githubUrl !== "https://github.com/a2sn2", `DE project '${p.slug}' does not use generic githubUrl`);
  }
  for (const p of manifestProjects) {
    check(p.repositoryUrl !== "https://github.com/a2sn2", `Manifest project '${p.slug}' does not use generic repositoryUrl`);
  }

  // 6. Zero public evidence references into _private, _unclassified, or _raw-private
  console.log("\n▶ [6/15] Verifying private containment integrity (zero leaks to _private)...");
  const manifestStr = fs.readFileSync(manifestPath, "utf8");
  check(!manifestStr.includes("_private/"), "Manifest contains no references to _private/");
  check(!manifestStr.includes("_unclassified/"), "Manifest contains no references to _unclassified/");
  check(!manifestStr.includes("_raw-private/"), "Manifest contains no references to _raw-private/");

  const evidenceTsStr = fs.readFileSync(path.join(root, "src", "content", "evidence.ts"), "utf8");
  check(!evidenceTsStr.includes("_private"), "src/content/evidence.ts contains no references to _private");
  check(!evidenceTsStr.includes("_unclassified"), "src/content/evidence.ts contains no references to _unclassified");

  // 7. Disallowed build/cache directories check
  console.log("\n▶ [7/15] Verifying absence of build/cache artifacts under public docs/evidence/...");
  const publicEvidenceRoots = [
    path.join(root, "docs", "evidence", "projects"),
    path.join(root, "docs", "evidence", "certifications"),
    path.join(root, "docs", "evidence", "candidates"),
  ];

  let disallowedFound = 0;
  for (const pRoot of publicEvidenceRoots) {
    scanDirRecursive(pRoot, (itemPath, isDir) => {
      const base = path.basename(itemPath);
      if (isDir && FORBIDDEN_BUILD_DIRS.includes(base)) {
        disallowedFound++;
        failures.push(`Disallowed directory found in public evidence: ${itemPath}`);
      }
    });
  }
  check(disallowedFound === 0, `No forbidden build/cache directories in public evidence (found ${disallowedFound})`);

  // 8. Forbidden ML models and large binaries (>15MB)
  console.log("\n▶ [8/15] Verifying absence of forbidden ML model weights and files > 15MB...");
  let forbiddenModelFound = 0;
  let largeBinaryFound = 0;

  for (const pRoot of publicEvidenceRoots) {
    scanDirRecursive(pRoot, (itemPath, isDir) => {
      if (!isDir) {
        const ext = path.extname(itemPath).toLowerCase();
        if (FORBIDDEN_MODEL_EXTS.includes(ext)) {
          forbiddenModelFound++;
          failures.push(`Forbidden ML model binary found: ${itemPath}`);
        }
        const stats = fs.statSync(itemPath);
        if (stats.size > 15 * 1024 * 1024) {
          largeBinaryFound++;
          failures.push(`File exceeds 15 MB limit: ${itemPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
        }
      }
    });
  }
  check(forbiddenModelFound === 0, `No forbidden model weights committed (found ${forbiddenModelFound})`);
  check(largeBinaryFound === 0, `No files exceeding 15MB limit committed (found ${largeBinaryFound})`);

  // 9. Unclassified '123.pdf' is NOT published
  console.log("\n▶ [9/15] Verifying unclassified '123.pdf' is NOT published under public directories...");
  let found123Pdf = false;
  for (const pRoot of publicEvidenceRoots) {
    scanDirRecursive(pRoot, (itemPath, isDir) => {
      if (!isDir && path.basename(itemPath) === "123.pdf") {
        found123Pdf = true;
      }
    });
  }
  check(!found123Pdf, "123.pdf is NOT present in any public project/certification evidence directory");

  // 10. Ongoing credentials must NOT be marked completed or verified with certificate
  console.log("\n▶ [10/15] Verifying ongoing/in-progress credentials have no fake certificates...");
  for (const cId of ONGOING_CREDENTIAL_IDS) {
    const credMeta = manifestCredentials.find((c) => c.id === cId);
    check(credMeta?.status === "ongoing", `Ongoing credential '${cId}' has status 'ongoing' in manifest`);
    check(!credMeta?.publicPath, `Ongoing credential '${cId}' has no public certificate path`);

    const enC = enCerts.find((c) => c.id === cId);
    check(enC?.status === "Ongoing" || enC?.status === "In Progress", `EN credential '${cId}' has non-completed status: ${enC?.status}`);
    check(enC?.evidence?.status === "ongoing", `EN credential '${cId}' evidence status is 'ongoing'`);
    check(!enC?.evidence?.url, `EN credential '${cId}' has no fake evidence URL`);
  }

  // 11. Certificate CTAs point only to verified evidence
  console.log("\n▶ [11/15] Verifying certificate CTAs point only to verified public evidence...");
  for (const c of enCerts) {
    if (c.evidence?.url) {
      check(c.evidence.status === "verified", `Credential '${c.id}' with URL must have status 'verified'`);
      check(c.evidence.kind === "certificate", `Credential '${c.id}' with URL must have kind 'certificate'`);
    }
  }

  // 12. Zero public references to private recommendation / reference contact info
  console.log("\n▶ [12/15] Verifying zero leakage of private reference/recommendation contact data...");
  const BANNED_PRIVATE_STRINGS = [
    "+967",
    "@sanaau.edu.ye",
    "grade report",
    "detailed transcript",
    "bachelor transcript",
  ];
  let leakFound = 0;
  for (const banned of BANNED_PRIVATE_STRINGS) {
    if (manifestStr.toLowerCase().includes(banned.toLowerCase())) {
      leakFound++;
      failures.push(`Private string '${banned}' leaked into evidence-manifest.json`);
    }
  }
  check(leakFound === 0, `No private contact/transcript strings leaked in manifest (found ${leakFound})`);

  // 13. Exact source URL and evidence parity across EN, AR, and DE
  console.log("\n▶ [13/15] Verifying exact cross-locale source URL and evidence parity...");
  for (let i = 0; i < 16; i++) {
    const en = enProjects[i];
    const ar = arProjects[i];
    const de = deProjects[i];

    check(en.slug === ar.slug && en.slug === de.slug, `Project slug parity at index ${i}: ${en.slug}`);
    check(en.githubUrl === ar.githubUrl && en.githubUrl === de.githubUrl, `Project '${en.slug}' githubUrl identical across EN/AR/DE`);
    check(
      JSON.stringify(en.repository) === JSON.stringify(ar.repository) &&
      JSON.stringify(en.repository) === JSON.stringify(de.repository),
      `Project '${en.slug}' repository contract identical across EN/AR/DE`
    );
  }

  for (let i = 0; i < 26; i++) {
    const en = enCerts[i];
    const ar = arCerts[i];
    const de = deCerts[i];

    check(en.id === ar.id && en.id === de.id, `Credential ID parity at index ${i}: ${en.id}`);
    check(
      JSON.stringify(en.evidence) === JSON.stringify(ar.evidence) &&
      JSON.stringify(en.evidence) === JSON.stringify(de.evidence),
      `Credential '${en.id}' evidence contract identical across EN/AR/DE`
    );
  }

  // 14. Zero Windows absolute paths in committed public evidence metadata
  console.log("\n▶ [14/15] Verifying zero Windows absolute paths in committed metadata...");
  const matrixStr = fs.readFileSync(matrixPath, "utf8");
  const readmeStr = fs.readFileSync(evidenceReadmePath, "utf8");

  const filesToCheckForWinPaths = [
    { name: "evidence-manifest.json", content: manifestStr },
    { name: "EVIDENCE-MATRIX.md", content: matrixStr },
    { name: "README.md", content: readmeStr },
    { name: "src/content/evidence.ts", content: evidenceTsStr },
  ];

  const WIN_PATH_REGEX = /[A-Z]:\\[^"'\s\n]+/i;
  for (const item of filesToCheckForWinPaths) {
    const match = item.content.match(WIN_PATH_REGEX);
    check(!match, `Zero Windows absolute paths in ${item.name} (match: ${match ? match[0] : "none"})`);
  }

  // 15. Overall verification summary
  console.log("\n▶ [15/15] Evidence Hub Coverage Summary");
  const verifiedProjects = manifestProjects.filter((p) => p.status === "verified");
  const conflictProjects = manifestProjects.filter((p) => p.status === "conflict");
  const partialProjects = manifestProjects.filter((p) => p.status === "partial");
  const missingProjects = manifestProjects.filter((p) => p.status === "missing");

  const verifiedCerts = manifestCredentials.filter((c) => c.status === "verified");
  const ongoingCerts = manifestCredentials.filter((c) => c.status === "ongoing");
  const missingCerts = manifestCredentials.filter((c) => c.status === "missing");

  console.log(`  - Projects Total: 16 (Verified: ${verifiedProjects.length}, Conflict: ${conflictProjects.length}, Partial: ${partialProjects.length}, Missing: ${missingProjects.length})`);
  console.log(`  - Credentials Total: 26 (Verified PDFs: ${verifiedCerts.length}, Ongoing: ${ongoingCerts.length}, Missing: ${missingCerts.length})`);

  check(verifiedProjects.length === 12, `Verified projects count is 12 (found ${verifiedProjects.length})`);
  check(conflictProjects.length === 1, `Conflict projects count is 1 (found ${conflictProjects.length})`);
  check(partialProjects.length === 1, `Partial projects count is 1 (found ${partialProjects.length})`);
  check(missingProjects.length === 2, `Missing projects count is 2 (found ${missingProjects.length})`);

  check(verifiedCerts.length === 21, `Verified certificates count is 21 (found ${verifiedCerts.length})`);
  check(ongoingCerts.length === 3, `Ongoing credentials count is 3 (found ${ongoingCerts.length})`);
  check(missingCerts.length === 2, `Missing credentials count is 2 (found ${missingCerts.length})`);

  console.log("\n============================================================");
  if (failures.length > 0) {
    console.error(`❌ EVIDENCE VERIFICATION FAILED: ${failures.length} issues detected.`);
    process.exit(1);
  } else {
    console.log("✅ ALL EVIDENCE VERIFICATION CHECKS PASSED DETERMINISTICALLY.");
    console.log("============================================================\n");
  }
}

run().catch((err) => {
  console.error("FATAL UNCAUGHT ERROR:", err);
  process.exit(1);
});
