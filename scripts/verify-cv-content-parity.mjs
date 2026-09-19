#!/usr/bin/env node

/**
 * Deterministic English CV content-integrity gate.
 *
 * The source PDF is immutable for this baseline. If the PDF changes, this gate
 * fails and requires a fresh source reconciliation rather than silently
 * accepting drift.
 *
 * This verifier checks:
 * 1. Official English Standard CV PDF SHA-256.
 * 2. Canonical reconciled text SHA-256.
 * 3. The exported canonical text used by the web route is byte-for-byte the
 *    same text as docs/content/ENGLISH-CV-CANONICAL.txt.
 *
 * Runtime DOM parity is covered independently by Playwright TC-13.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const sourcePdf = path.join(
  root,
  "docs",
  "ALHassan_Baligh_ALShami_CV_Package",
  "English",
  "ALHassan_Baligh_ALShami_CV_Standard.pdf"
);
const canonicalText = path.join(root, "docs", "content", "ENGLISH-CV-CANONICAL.txt");
const webSource = path.join(root, "src", "content", "officialCv.ts");

const EXPECTED_PDF_SHA256 =
  "e49a9ce438d04e537f5aef8c478c74d947e6a5a4df7bb360b915f7861b7eb63c";
const EXPECTED_TEXT_SHA256 =
  "56410f5f614eaf15722c52ebfcd17af437e3f80b6115a5736a2da19d9f2c90b1";

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function fail(message) {
  console.error(`❌ CV CONTENT PARITY FAILED: ${message}`);
  process.exit(1);
}

for (const file of [sourcePdf, canonicalText, webSource]) {
  if (!fs.existsSync(file)) {
    fail(`Required file is missing: ${path.relative(root, file)}`);
  }
}

const pdfBytes = fs.readFileSync(sourcePdf);
const canonicalBytes = fs.readFileSync(canonicalText);
const sourceText = fs.readFileSync(webSource, "utf8");

const pdfHash = sha256(pdfBytes);
const textHash = sha256(canonicalBytes);

if (pdfHash !== EXPECTED_PDF_SHA256) {
  fail(
    `Official source PDF changed. Expected ${EXPECTED_PDF_SHA256}, received ${pdfHash}. Reconcile the new PDF before updating the baseline.`
  );
}

if (textHash !== EXPECTED_TEXT_SHA256) {
  fail(
    `Canonical CV text changed. Expected ${EXPECTED_TEXT_SHA256}, received ${textHash}. Verify every source word before changing the baseline.`
  );
}

const canonicalMatch = sourceText.match(
  /export const officialCvCanonicalText = ("(?:\\.|[^"\\])*") as const;/
);

if (!canonicalMatch) {
  fail("Unable to locate officialCvCanonicalText in src/content/officialCv.ts.");
}

let exportedText;
try {
  exportedText = JSON.parse(canonicalMatch[1]);
} catch (error) {
  fail(`Unable to decode officialCvCanonicalText: ${error.message}`);
}

const canonical = canonicalBytes.toString("utf8");
if (exportedText !== canonical) {
  fail(
    "src/content/officialCv.ts no longer matches docs/content/ENGLISH-CV-CANONICAL.txt byte-for-byte."
  );
}

console.log("✅ English CV content baseline verified.");
console.log(`   PDF SHA-256:       ${pdfHash}`);
console.log(`   Canonical SHA-256: ${textHash}`);
console.log("   Exported web source: exact byte-for-byte match");
console.log("   DOM parity: enforced by Playwright TC-13");
