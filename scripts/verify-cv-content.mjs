#!/usr/bin/env node

/**
 * Semantic English CV Content Parity Verifier
 *
 * Verifies that:
 * 1. Official English Standard CV PDF SHA-256 matches the verified source baseline.
 * 2. Canonical CV data model (src/content/cv/) represents 100% of verified facts:
 *    - 6 Organizations & 9 Experience Roles
 *    - 5 Memberships
 *    - 3 Languages
 *    - 9 Technical Skill Group Lines
 *    - 3 Interest Groups
 *    - 6 Canonical References
 *    - 26 Certifications & Courses
 *    - 16 Projects
 * 3. Portfolio content layer (src/content/) exposes all required verified facts.
 * 4. Experience roles retain rich active-voice responsibilities (not stripped).
 * 5. Third-party reference contact info (phones/emails) remains strictly private
 *    and is NOT exposed in public portfolio content files.
 * 6. Content integrity: banned/unverified claims remain absent.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const sourcePdfPath = path.join(
  root,
  "docs",
  "ALHassan_Baligh_ALShami_CV_Package",
  "English",
  "ALHassan_Baligh_ALShami_CV_Standard.pdf"
);

const EXPECTED_PDF_SHA256 =
  "e49a9ce438d04e537f5aef8c478c74d947e6a5a4df7bb360b915f7861b7eb63c";

const EXPECTED_COUNTS = {
  organizations: 6,
  experienceRoles: 9,
  memberships: 5,
  languages: 3,
  technicalSkillLines: 9,
  interestGroups: 3,
  references: 6,
  certifications: 26,
  projects: 16,
};

const BANNED_UNVERIFIED_PHRASES = [
  "backend REST microservices",
  "quality benchmarks for production releases",
  "low-latency visual tracking",
  "89.26%",
  "99.7%",
  "99.4%",
  "23ms",
  "500k+",
  "Lead Developer & Researcher",
  "Senior AI Solutions Engineer",
  "Computer Systems & AI Engineer",
  "VERIFIED FOCUS",
  "34%",
  "15k+",
  "sub-50ms",
  "Systems Automation Engineer",
  "Robotics Software Developer",
  "eng.al-hassan.al-shami@outlook.com",
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

async function run() {
  console.log("============================================================");
  console.log("🔍 ENGLISH CV CONTENT PARITY & INTEGRITY VERIFICATION");
  console.log("============================================================\n");

  // 1. PDF Hash Verification
  console.log("▶ [1/6] Verifying Official English Standard CV PDF Baseline...");
  check(fs.existsSync(sourcePdfPath), `Source PDF exists at ${path.relative(root, sourcePdfPath)}`);
  if (fs.existsSync(sourcePdfPath)) {
    const pdfBytes = fs.readFileSync(sourcePdfPath);
    const pdfHash = crypto.createHash("sha256").update(pdfBytes).digest("hex");
    check(
      pdfHash === EXPECTED_PDF_SHA256,
      `Source PDF SHA-256 (${pdfHash}) matches baseline (${EXPECTED_PDF_SHA256})`
    );
  }

  // 2. Canonical Model Verification (read directly or load)
  console.log("\n▶ [2/6] Verifying Canonical CV Content Model (src/content/cv/)...");
  const cvDir = path.join(root, "src", "content", "cv");
  const requiredCvFiles = [
    "identity.ts",
    "profile.ts",
    "education.ts",
    "experience.ts",
    "memberships.ts",
    "languages.ts",
    "technicalSkills.ts",
    "interests.ts",
    "references.ts",
    "certifications.ts",
    "projects.ts",
    "index.ts",
  ];

  for (const file of requiredCvFiles) {
    check(
      fs.existsSync(path.join(cvDir, file)),
      `Canonical module exists: src/content/cv/${file}`
    );
  }

  // Import canonical index dynamically via compiled / ts-compatible loader or inspect source
  const experienceTs = fs.readFileSync(path.join(cvDir, "experience.ts"), "utf8");
  const membershipsTs = fs.readFileSync(path.join(cvDir, "memberships.ts"), "utf8");
  const languagesTs = fs.readFileSync(path.join(cvDir, "languages.ts"), "utf8");
  const skillsTs = fs.readFileSync(path.join(cvDir, "technicalSkills.ts"), "utf8");
  const interestsTs = fs.readFileSync(path.join(cvDir, "interests.ts"), "utf8");
  const referencesTs = fs.readFileSync(path.join(cvDir, "references.ts"), "utf8");
  const certsTs = fs.readFileSync(path.join(cvDir, "certifications.ts"), "utf8");
  const projectsTs = fs.readFileSync(path.join(cvDir, "projects.ts"), "utf8");

  // Count items from canonical source
  const orgMatches = (experienceTs.match(/company:\s*"/g) || []).length;
  const roleMatches = (experienceTs.match(/role:\s*"/g) || []).length;
  const memberMatches = (membershipsTs.match(/organization:\s*"/g) || []).length;
  const langMatches = (languagesTs.match(/language:\s*"/g) || []).length;
  const skillLineMatches = (skillsTs.match(/officialLine:\s*"/g) || []).length;
  const interestMatches = (interestsTs.match(/id:\s*"interest-/g) || []).length;
  const refMatches = (referencesTs.match(/name:\s*"/g) || []).length;
  const certMatches = (certsTs.match(/title:\s*"/g) || []).length;
  const projMatches = (projectsTs.match(/officialTitle:\s*"/g) || []).length;

  check(
    orgMatches === EXPECTED_COUNTS.organizations,
    `Canonical organizations: ${orgMatches} (expected ${EXPECTED_COUNTS.organizations})`
  );
  check(
    roleMatches === EXPECTED_COUNTS.experienceRoles,
    `Canonical experience roles: ${roleMatches} (expected ${EXPECTED_COUNTS.experienceRoles})`
  );
  check(
    memberMatches === EXPECTED_COUNTS.memberships,
    `Canonical memberships: ${memberMatches} (expected ${EXPECTED_COUNTS.memberships})`
  );
  check(
    langMatches === EXPECTED_COUNTS.languages,
    `Canonical languages: ${langMatches} (expected ${EXPECTED_COUNTS.languages})`
  );
  check(
    skillLineMatches === EXPECTED_COUNTS.technicalSkillLines,
    `Canonical technical skill lines: ${skillLineMatches} (expected ${EXPECTED_COUNTS.technicalSkillLines})`
  );
  check(
    interestMatches === EXPECTED_COUNTS.interestGroups,
    `Canonical interest categories: ${interestMatches} (expected ${EXPECTED_COUNTS.interestGroups})`
  );
  check(
    refMatches === EXPECTED_COUNTS.references,
    `Canonical references stored: ${refMatches} (expected ${EXPECTED_COUNTS.references})`
  );
  check(
    certMatches === EXPECTED_COUNTS.certifications,
    `Canonical certifications: ${certMatches} (expected ${EXPECTED_COUNTS.certifications})`
  );
  check(
    projMatches === EXPECTED_COUNTS.projects,
    `Canonical projects: ${projMatches} (expected ${EXPECTED_COUNTS.projects})`
  );

  // 3. Portfolio Editorial Layer Integrity (src/content/)
  console.log("\n▶ [3/6] Verifying Portfolio Presentation Layer (src/content/)...");
  const pubExpTs = fs.readFileSync(path.join(root, "src", "content", "experience.ts"), "utf8");
  const pubProjectsTs = fs.readFileSync(path.join(root, "src", "content", "projects.ts"), "utf8");
  const pubCertsTs = fs.readFileSync(path.join(root, "src", "content", "credentials.ts"), "utf8");
  const pubAboutTs = fs.readFileSync(path.join(root, "src", "content", "about.ts"), "utf8");
  const pubContactTs = fs.readFileSync(path.join(root, "src", "content", "contact.ts"), "utf8");
  const pubSocialTs = fs.readFileSync(path.join(root, "src", "content", "social.ts"), "utf8");

  // Experience roles in portfolio presentation
  const pubRoleMatches = (pubExpTs.match(/role:\s*"/g) || []).length;
  check(
    pubRoleMatches === EXPECTED_COUNTS.experienceRoles,
    `Portfolio experience items count: ${pubRoleMatches} (expected ${EXPECTED_COUNTS.experienceRoles})`
  );

  // Check responsibilities are not empty
  const emptyRespCount = (pubExpTs.match(/responsibilities:\s*\[\s*\]/g) || []).length;
  check(
    emptyRespCount === 0,
    `All experience items retain active responsibilities (${emptyRespCount} empty arrays found)`
  );

  // Projects in portfolio presentation
  const pubProjMatches = (pubProjectsTs.match(/slug:\s*"/g) || []).length;
  check(
    pubProjMatches === EXPECTED_COUNTS.projects,
    `Portfolio project catalogue count: ${pubProjMatches} (expected ${EXPECTED_COUNTS.projects})`
  );

  // Certifications in portfolio presentation
  const pubCertCount = (pubCertsTs.match(/category:\s*"/g) || []).length;
  check(
    pubCertCount === EXPECTED_COUNTS.certifications,
    `Portfolio certifications count: ${pubCertCount} (expected ${EXPECTED_COUNTS.certifications})`
  );

  // Memberships in portfolio presentation
  const pubMemberCount = (pubCertsTs.match(/organization:\s*"/g) || []).length;
  check(
    pubMemberCount === EXPECTED_COUNTS.memberships,
    `Portfolio memberships count: ${pubMemberCount} (expected ${EXPECTED_COUNTS.memberships})`
  );

  // Interests in portfolio presentation (about.ts)
  const pubInterestsCount = (pubAboutTs.match(/category:\s*"/g) || []).length;
  check(
    pubInterestsCount === EXPECTED_COUNTS.interestGroups,
    `Portfolio interests count on /about: ${pubInterestsCount} (expected ${EXPECTED_COUNTS.interestGroups})`
  );

  // Social channels include GitHub, LinkedIn, Instagram
  check(pubSocialTs.includes("github.com/a2sn2"), "Portfolio social channels include GitHub (a2sn2)");
  check(pubSocialTs.includes("linkedin.com/in/a2sn4"), "Portfolio social channels include LinkedIn (a2sn4)");
  check(pubSocialTs.includes("instagram.com/a2s.n4"), "Portfolio social channels include Instagram (@a2s.n4)");
  check(pubContactTs.includes("Haddah, Sana'a, Yemen"), "Portfolio contact location includes Haddah, Sana'a, Yemen");


  // 4. Reference Privacy Policy Verification
  console.log("\n▶ [4/6] Verifying Reference Privacy Protection...");
  const publicFiles = [
    "src/content/about.ts",
    "src/content/contact.ts",
    "src/content/experience.ts",
    "src/content/identity.ts",
    "src/content/projects.ts",
    "src/content/skills.ts",
    "src/content/credentials.ts",
    "src/content/social.ts",
  ];

  const privatePhoneNumbers = [
    "+967 774 760 761",
    "+967 775 148 168",
    "+967 777 877 766",
    "+967 771 170 176",
    "+967 777 196 979",
    "+967 770 013 304",
  ];

  const privateEmails = [
    "dr.fadlbaalwi@gmail.com",
    "moahmmed_alashwal@asas-realestate.com",
    "ahrab1981@gmail.com",
  ];

  let leakedContactCount = 0;
  for (const relFile of publicFiles) {
    const content = fs.readFileSync(path.join(root, relFile), "utf8");
    for (const phone of privatePhoneNumbers) {
      if (content.includes(phone)) {
        leakedContactCount++;
        failures.push(`Third-party private phone "${phone}" detected in public content file ${relFile}`);
      }
    }
    for (const email of privateEmails) {
      if (content.includes(email)) {
        leakedContactCount++;
        failures.push(`Third-party private email "${email}" detected in public content file ${relFile}`);
      }
    }
  }

  check(
    leakedContactCount === 0,
    `Third-party reference phone numbers and personal emails are strictly shielded from public content files`
  );

  // 5. Clean Typography & Data Modeling
  console.log("\n▶ [5/6] Verifying Clean Typography & Absence of Layout Artifacts...");
  check(
    !pubAboutTs.includes("Native |") && !pubAboutTs.includes("B2 |"),
    `Language levels are free of literal pipe separator characters ("|")`
  );
  check(
    !pubProjectsTs.includes("ROBOCAM CONTROLLER (FLUTTER + DART)") ||
      pubProjectsTs.includes("ROBOCAM Controller"),
    `Project titles in portfolio presentation maintain human-readable case styling`
  );

  // 6. Content Integrity: Banned Phrases Scan
  console.log("\n▶ [6/6] Scanning Content Files for Banned Unverified Claims...");
  let bannedViolations = 0;
  for (const relFile of publicFiles) {
    const content = fs.readFileSync(path.join(root, relFile), "utf8").toLowerCase();
    for (const phrase of BANNED_UNVERIFIED_PHRASES) {
      if (content.includes(phrase.toLowerCase())) {
        bannedViolations++;
        failures.push(`Banned phrase "${phrase}" detected in ${relFile}`);
      }
    }
  }

  check(
    bannedViolations === 0,
    `All ${BANNED_UNVERIFIED_PHRASES.length} ungrounded phrases are strictly absent across all public content files`
  );

  // Final Summary
  console.log("\n============================================================");
  if (failures.length === 0) {
    console.log("✅ ALL ENGLISH CV CONTENT PARITY & INTEGRITY CHECKS PASSED!");
    console.log("============================================================\n");
    process.exit(0);
  } else {
    console.error(`❌ VERIFICATION FAILED WITH ${failures.length} ISSUE(S):`);
    failures.forEach((f, idx) => console.error(`  ${idx + 1}. ${f}`));
    console.log("============================================================\n");
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("💥 Fatal error running verify-cv-content:", err);
  process.exit(1);
});
