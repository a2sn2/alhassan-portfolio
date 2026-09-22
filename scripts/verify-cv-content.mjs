#!/usr/bin/env node

/**
 * Deterministic English CV Content Parity & Semantic Verifier
 *
 * Verifies that:
 * 1. Official English Standard CV PDF SHA-256 matches the verified source baseline.
 * 2. Canonical CV data model (src/content/cv/) matches the exact source manifest
 *    (scripts/fixtures/canonical-cv-manifest.json) string-by-string:
 *    - Exact organizations, roles, locations, periods, and summaries
 *    - Exact AHD organization name without en dash
 *    - Exact reference names (no spurious hyphens)
 *    - Exact interest rawText ("tech club events" without hyphen)
 *    - Exact Project #13 description (no em dash)
 *    - Exact repository notices with ASCII markers (--< Certificate Documents >--, --< GITHUB >--)
 *    - Exact technical skills official lines and pure atomic splits (zero inferred skills)
 *    - Exact certification issuers ("Al-Hamdi Foundation") and explicit statuses (no invented "Completed")
 *    - Education source purity (no location attached to canonical education)
 * 3. Portfolio presentation layer (src/content/):
 *    - All 9 experience roles retain active-voice responsibilities (not stripped)
 *    - All 16 projects, 26 certifications, 5 memberships, 3 interests present
 *    - Certifications do not assign invented "Completed" statuses
 *    - Certifications use "Al-Hamdi Foundation"
 *    - Social channels and contact details align
 * 4. Reference Display Policy:
 *    - Reference phone numbers and personal emails are NOT rendered in public content files
 *    - Accurately reported as not rendered in public interface
 * 5. Clean typography & absence of OCR layout artifacts
 * 6. Zero presence of ungrounded / banned claims
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import ts from "typescript";

const baseRequire = createRequire(import.meta.url);

const root = process.cwd();
const sourcePdfPath = path.join(
  root,
  "docs",
  "ALHassan_Baligh_ALShami_CV_Package",
  "English",
  "ALHassan_Baligh_ALShami_CV_Standard.pdf"
);

const manifestPath = path.join(
  root,
  "scripts",
  "fixtures",
  "canonical-cv-manifest.json"
);

const sourcePdfPathAr = path.join(
  root,
  "docs",
  "ALHassan_Baligh_ALShami_CV_Package",
  "العربية",
  "السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf"
);

const manifestPathAr = path.join(
  root,
  "scripts",
  "fixtures",
  "canonical-cv-manifest.ar.json"
);

if (!fs.existsSync(manifestPath)) {
  console.error("❌ English manifest fixture missing at:", manifestPath);
  process.exit(1);
}

if (!fs.existsSync(manifestPathAr)) {
  console.error("❌ Arabic manifest fixture missing at:", manifestPathAr);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const manifestAr = JSON.parse(fs.readFileSync(manifestPathAr, "utf8"));

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

async function run() {
  console.log("============================================================");
  console.log("🔍 ENGLISH CV DETERMINISTIC CONTENT PARITY VERIFICATION");
  console.log("============================================================\n");

  // 1. PDF Hash Verification
  console.log("▶ [1/6] Verifying Official English Standard CV PDF Baseline...");
  check(fs.existsSync(sourcePdfPath), `Source PDF exists at ${path.relative(root, sourcePdfPath)}`);
  if (fs.existsSync(sourcePdfPath)) {
    const pdfBytes = fs.readFileSync(sourcePdfPath);
    const pdfHash = crypto.createHash("sha256").update(pdfBytes).digest("hex");
    check(
      pdfHash === manifest.pdfSha256,
      `Source PDF SHA-256 (${pdfHash}) matches baseline (${manifest.pdfSha256})`
    );
  }

  // 2. Canonical Model Deep Semantic Verification against Manifest
  console.log("\n▶ [2/6] Verifying Canonical CV Content Model (src/content/cv/) against Exact Source Manifest...");
  const cvDir = path.join(root, "src", "content", "cv");
  check(fs.existsSync(cvDir), "Canonical CV directory src/content/cv/ exists");

  // Load modules
  const identityMod = loadTsModule("src/content/cv/identity.ts");
  const profileMod = loadTsModule("src/content/cv/profile.ts");
  const educationMod = loadTsModule("src/content/cv/education.ts");
  const experienceMod = loadTsModule("src/content/cv/experience.ts");
  const membershipsMod = loadTsModule("src/content/cv/memberships.ts");
  const languagesMod = loadTsModule("src/content/cv/languages.ts");
  const skillsMod = loadTsModule("src/content/cv/technicalSkills.ts");
  const interestsMod = loadTsModule("src/content/cv/interests.ts");
  const referencesMod = loadTsModule("src/content/cv/references.ts");
  const certsMod = loadTsModule("src/content/cv/certifications.ts");
  const projectsMod = loadTsModule("src/content/cv/projects.ts");
  const indexMod = loadTsModule("src/content/cv/index.ts");

  check(
    indexMod.canonicalCvMeta?.sourcePdfSha256 === manifest.pdfSha256,
    `Canonical index metadata sourcePdfSha256 matches manifest baseline`
  );

  // A. Identity & Profile
  check(
    identityMod.canonicalIdentity?.fullName === manifest.identity.fullName,
    `Canonical fullName matches: "${manifest.identity.fullName}"`
  );
  check(
    identityMod.canonicalIdentity?.role === manifest.identity.role,
    `Canonical role matches: "${manifest.identity.role}"`
  );
  check(
    identityMod.canonicalIdentity?.location === manifest.identity.location,
    `Canonical location matches: "${manifest.identity.location}"`
  );
  check(
    profileMod.canonicalProfile?.raw === manifest.profile.raw,
    `Canonical profile statement matches exact verbatim CV source text`
  );

  // B. Education Purity
  check(
    educationMod.canonicalEducation?.institution === manifest.education.institution,
    `Canonical education institution matches: "${manifest.education.institution}"`
  );
  check(
    educationMod.canonicalEducation?.degree === manifest.education.degree,
    `Canonical education degree matches: "${manifest.education.degree}"`
  );
  check(
    educationMod.canonicalEducation?.period === manifest.education.period,
    `Canonical education period matches: "${manifest.education.period}"`
  );
  check(
    !("location" in educationMod.canonicalEducation),
    `Canonical education maintains source purity (no location attached to education block)`
  );
  check(
    educationMod.canonicalEducation?.graduationProject?.title === manifest.education.graduationProjectTitle,
    `Canonical graduation project title matches exact CV wording`
  );

  // C. Organizations & Experience Roles (AHD naming exactness)
  const canonicalOrgs = experienceMod.canonicalExperienceOrganizations || [];
  check(
    canonicalOrgs.length === manifest.organizations.length,
    `Canonical organizations count: ${canonicalOrgs.length} (expected ${manifest.organizations.length})`
  );

  const ahdOrg = canonicalOrgs.find((o) => o.id === "ahd-financial-services");
  check(
    ahdOrg?.company === "AHD for Financial Services Jaib Wallet",
    `Canonical AHD organization uses exact source text without en dash ("AHD for Financial Services Jaib Wallet")`
  );

  const canonicalRoles = experienceMod.canonicalExperienceRoles || [];
  check(
    canonicalRoles.length === manifest.experienceRoles.length,
    `Canonical experience roles count: ${canonicalRoles.length} (expected ${manifest.experienceRoles.length})`
  );

  manifest.experienceRoles.forEach((expectedRole, idx) => {
    const actual = canonicalRoles[idx];
    check(
      actual?.role === expectedRole.role &&
      actual?.company === expectedRole.company &&
      actual?.period === expectedRole.period &&
      actual?.location === expectedRole.location &&
      actual?.summary === expectedRole.summary,
      `Canonical role #${idx + 1} (${expectedRole.role} @ ${expectedRole.company}) matches manifest exactly`
    );
  });

  // D. Memberships
  const canonicalMemberships = membershipsMod.canonicalMemberships || [];
  check(
    canonicalMemberships.length === manifest.memberships.length,
    `Canonical memberships count: ${canonicalMemberships.length} (expected ${manifest.memberships.length})`
  );
  manifest.memberships.forEach((expMember, idx) => {
    const actual = canonicalMemberships[idx];
    check(
      actual?.organization === expMember.organization &&
      actual?.description === expMember.description,
      `Canonical membership #${idx + 1} (${expMember.organization}) matches manifest exactly`
    );
  });

  // E. Languages
  const canonicalLangs = languagesMod.canonicalLanguages || [];
  check(
    canonicalLangs.length === manifest.languages.length,
    `Canonical languages count: ${canonicalLangs.length} (expected ${manifest.languages.length})`
  );
  manifest.languages.forEach((expLang, idx) => {
    const actual = canonicalLangs[idx];
    check(
      actual?.language === expLang.language &&
      actual?.level === expLang.level &&
      actual?.ratingStars === expLang.ratingStars &&
      actual?.officialLine === expLang.officialLine,
      `Canonical language (${expLang.language} - ${expLang.level}) matches manifest exactly`
    );
  });

  // F. Technical Skills (Purity & Exact Lines)
  const canonicalSkillLines = skillsMod.canonicalTechnicalSkillLines || [];
  check(
    canonicalSkillLines.length === manifest.technicalSkillLines.length,
    `Canonical technical skill lines count: ${canonicalSkillLines.length} (expected ${manifest.technicalSkillLines.length})`
  );

  manifest.technicalSkillLines.forEach((expLine, idx) => {
    const actual = canonicalSkillLines[idx];
    check(
      actual?.officialLine === expLine.officialLine,
      `Canonical skill line #${idx + 1} matches: "${expLine.officialLine}"`
    );
    const actualAtomics = JSON.stringify(actual?.atomicSkills || []);
    const expectedAtomics = JSON.stringify(expLine.atomicSkills);
    check(
      actualAtomics === expectedAtomics,
      `Canonical atomic skills for "${expLine.officialLine}" are source-pure: ${actualAtomics}`
    );
  });

  // Check no forbidden inferred skills in canonical technical skills
  const allCanonicalAtomics = canonicalSkillLines.flatMap((g) => g.atomicSkills);
  const bannedInferredSkills = [
    "MySQL",
    "Oracle PL/SQL",
    "Database Design",
    "MikroTik RouterOS",
    "PPPoE",
    "RADIUS",
    "Operating Systems Architecture",
    "Hardware Diagnostics",
  ];
  const foundInferredSkills = allCanonicalAtomics.filter((s) => bannedInferredSkills.includes(s));
  check(
    foundInferredSkills.length === 0,
    `Canonical technical skills contain zero inferred/context skills (${foundInferredSkills.length} found)`
  );

  // G. Interests (exact rawText with "tech club events")
  const canonicalInterests = interestsMod.canonicalInterests || [];
  check(
    canonicalInterests.length === manifest.interests.length,
    `Canonical interests count: ${canonicalInterests.length} (expected ${manifest.interests.length})`
  );
  const communityInterest = canonicalInterests.find((i) => i.category === "Community");
  check(
    communityInterest?.rawText === "Open source, hackathons, tech club events, mentoring.",
    `Canonical Community interest rawText uses exact source text without hyphen: "${communityInterest?.rawText}"`
  );

  // H. References (exact names without unwanted hyphens)
  const canonicalRefs = referencesMod.canonicalReferences || [];
  check(
    canonicalRefs.length === manifest.references.length,
    `Canonical references count: ${canonicalRefs.length} (expected ${manifest.references.length})`
  );
  manifest.references.forEach((expRef, idx) => {
    const actual = canonicalRefs[idx];
    check(
      actual?.name === expRef.name && actual?.phone === expRef.phone,
      `Canonical reference #${idx + 1} matches exact source name: "${expRef.name}"`
    );
  });

  // I. Certifications & Courses (issuers, explicitStatus, notices)
  const canonicalCerts = certsMod.canonicalCertifications || [];
  check(
    canonicalCerts.length === manifest.certifications.length,
    `Canonical certifications count: ${canonicalCerts.length} (expected ${manifest.certifications.length})`
  );

  let statusDriftCount = 0;
  let issuerDriftCount = 0;
  canonicalCerts.forEach((cert, idx) => {
    const exp = manifest.certifications[idx];
    if (cert.explicitStatus !== exp.explicitStatus) {
      statusDriftCount++;
      failures.push(`Certification "${cert.title}" has status "${cert.explicitStatus}", expected "${exp.explicitStatus}"`);
    }
    if (cert.issuer !== exp.issuer) {
      issuerDriftCount++;
      failures.push(`Certification "${cert.title}" has issuer "${cert.issuer}", expected "${exp.issuer}"`);
    }
  });

  check(statusDriftCount === 0, `All certifications preserve exact explicit status with zero invented "Completed" claims`);
  check(issuerDriftCount === 0, `All certifications use exact source issuer wording (including "Al-Hamdi Foundation")`);

  check(
    certsMod.canonicalCertificatesRepositoryNotice?.text === manifest.certificationsRepositoryNotice,
    `Canonical certificates footer notice preserves exact ASCII markers: "${manifest.certificationsRepositoryNotice}"`
  );

  // J. Projects & Work (Project 13 and footer notice)
  const canonicalProjects = projectsMod.canonicalProjects || [];
  check(
    canonicalProjects.length === manifest.projects.length,
    `Canonical projects count: ${canonicalProjects.length} (expected ${manifest.projects.length})`
  );

  const proj13 = canonicalProjects.find((p) => p.index === 13);
  check(
    proj13?.officialDescription === manifest.projects[12].officialDescription,
    `Project #13 description matches exact source text without em dash: "${proj13?.officialDescription}"`
  );

  check(
    projectsMod.canonicalProjectsFooterNotice?.text === manifest.projectsFooterNotice,
    `Canonical projects footer notice preserves exact ASCII markers: "${manifest.projectsFooterNotice}"`
  );


  // 3. Portfolio Editorial Layer Integrity (src/content/)
  console.log("\n▶ [3/6] Verifying Portfolio Presentation Layer (src/content/)...");
  const pubExpMod = loadTsModule("src/content/experience.ts");
  const pubProjectsMod = loadTsModule("src/content/projects.ts");
  const pubCertsMod = loadTsModule("src/content/credentials.ts");
  const pubAboutMod = loadTsModule("src/content/about.ts");
  const pubContactMod = loadTsModule("src/content/contact.ts");
  const pubSocialMod = loadTsModule("src/content/social.ts");

  // Experience roles in portfolio presentation
  const pubRoles = pubExpMod.experienceContent?.items || [];
  check(
    pubRoles.length === manifest.experienceRoles.length,
    `Portfolio experience items count: ${pubRoles.length} (expected ${manifest.experienceRoles.length})`
  );

  // Check responsibilities are not empty in presentation layer
  const emptyRespCount = pubRoles.filter((r) => !r.responsibilities || r.responsibilities.length === 0).length;
  check(
    emptyRespCount === 0,
    `All experience items retain active responsibilities (${emptyRespCount} empty items found)`
  );

  // Projects in portfolio presentation
  const pubProjects = pubProjectsMod.projectItems || pubProjectsMod.projectsContent?.items || [];
  check(
    pubProjects.length === manifest.projects.length,
    `Portfolio project catalogue count: ${pubProjects.length} (expected ${manifest.projects.length})`
  );

  // Certifications in portfolio presentation
  const pubCerts = pubCertsMod.credentialsContent?.certifications || [];
  check(
    pubCerts.length === manifest.certifications.length,
    `Portfolio certifications count: ${pubCerts.length} (expected ${manifest.certifications.length})`
  );

  // Check no invented "Completed" in portfolio presentation credentials
  const inventedCompleted = pubCerts.filter((c) => c.status === "Completed");
  check(
    inventedCompleted.length === 0,
    `Portfolio certifications do not assign unverified "Completed" status (${inventedCompleted.length} found)`
  );

  // Check Al-Hamdi Foundation issuer wording in portfolio presentation credentials
  const wrongAlHamdi = pubCerts.filter((c) => c.issuer.includes("Al-Hamdi") && c.issuer !== "Al-Hamdi Foundation");
  check(
    wrongAlHamdi.length === 0,
    `Portfolio certifications use exact "Al-Hamdi Foundation" issuer wording (${wrongAlHamdi.length} drift found)`
  );

  // Memberships in portfolio presentation
  const pubMemberships = pubCertsMod.credentialsContent?.memberships || [];
  check(
    pubMemberships.length === manifest.memberships.length,
    `Portfolio memberships count: ${pubMemberships.length} (expected ${manifest.memberships.length})`
  );

  // Interests in portfolio presentation (about.ts)
  const pubInterests = pubAboutMod.aboutContent?.interests || [];
  check(
    pubInterests.length === manifest.interests.length,
    `Portfolio interests count on /about: ${pubInterests.length} (expected ${manifest.interests.length})`
  );

  // Social channels include GitHub, LinkedIn, Instagram
  const socials = pubSocialMod.socialLinks || [];
  check(socials.some((s) => s.url?.includes("github.com/a2sn2")), "Portfolio social channels include GitHub (a2sn2)");
  check(socials.some((s) => s.url?.includes("linkedin.com/in/a2sn4")), "Portfolio social channels include LinkedIn (a2sn4)");
  check(socials.some((s) => s.url?.includes("instagram.com/a2s.n4")), "Portfolio social channels include Instagram (@a2s.n4)");
  check(pubContactMod.contactContent?.location?.includes("Haddah, Sana'a, Yemen"), "Portfolio contact location includes Haddah, Sana'a, Yemen");


  // 4. Reference Display Policy Verification
  console.log("\n▶ [4/6] Verifying Reference Display Policy (Not Rendered in Public UI)...");
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

  const referencePhoneNumbers = manifest.references.map((r) => r.phone);
  const referenceEmails = manifest.references.filter((r) => r.email).map((r) => r.email);

  let renderedContactCount = 0;
  for (const relFile of publicFiles) {
    const content = fs.readFileSync(path.join(root, relFile), "utf8");
    for (const phone of referencePhoneNumbers) {
      if (content.includes(phone)) {
        renderedContactCount++;
        failures.push(`Reference phone "${phone}" detected in public content file ${relFile}`);
      }
    }
    for (const email of referenceEmails) {
      if (content.includes(email)) {
        renderedContactCount++;
        failures.push(`Reference email "${email}" detected in public content file ${relFile}`);
      }
    }
  }

  check(
    renderedContactCount === 0,
    `Reference phone numbers and personal emails are not rendered in public portfolio content files`
  );


  // 5. Clean Typography & Data Modeling
  console.log("\n▶ [5/6] Verifying Clean Typography & Absence of Layout Artifacts...");
  const pubAboutSrc = fs.readFileSync(path.join(root, "src", "content", "about.ts"), "utf8");
  const pubProjectsSrc = fs.readFileSync(path.join(root, "src", "content", "projects.ts"), "utf8");

  check(
    !pubAboutSrc.includes("Native |") && !pubAboutSrc.includes("B2 |"),
    `Language levels are free of literal pipe separator characters ("|")`
  );
  check(
    !pubProjectsSrc.includes("ROBOCAM CONTROLLER (FLUTTER + DART)") ||
      pubProjectsSrc.includes("ROBOCAM Controller"),
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
    `All ${BANNED_UNVERIFIED_PHRASES.length} ungrounded phrases are strictly absent across all public English content files`
  );

  // ============================================================
  // ARABIC CV DETERMINISTIC CONTENT PARITY
  // ============================================================
  console.log("\n============================================================");
  console.log("🔍 ARABIC CV DETERMINISTIC CONTENT PARITY VERIFICATION");
  console.log("============================================================\n");

  // 7. Arabic PDF Hash Verification
  console.log("▶ [7/12] Verifying Official Arabic Standard CV PDF Baseline...");
  check(fs.existsSync(sourcePdfPathAr), `Arabic Source PDF exists at ${path.relative(root, sourcePdfPathAr)}`);
  if (fs.existsSync(sourcePdfPathAr)) {
    const pdfBytesAr = fs.readFileSync(sourcePdfPathAr);
    const pdfHashAr = crypto.createHash("sha256").update(pdfBytesAr).digest("hex");
    check(
      pdfHashAr === manifestAr.pdfSha256,
      `Arabic Source PDF SHA-256 (${pdfHashAr}) matches baseline (${manifestAr.pdfSha256})`
    );
  }

  // 8. Arabic Canonical Model Verification
  console.log("\n▶ [8/12] Verifying Canonical Arabic CV Model (src/content/cv/ar/) against Manifest...");
  const cvDirAr = path.join(root, "src", "content", "cv", "ar");
  check(fs.existsSync(cvDirAr), "Canonical Arabic CV directory src/content/cv/ar/ exists");

  const identityModAr = loadTsModule("src/content/cv/ar/identity.ts");
  const profileModAr = loadTsModule("src/content/cv/ar/profile.ts");
  const educationModAr = loadTsModule("src/content/cv/ar/education.ts");
  const experienceModAr = loadTsModule("src/content/cv/ar/experience.ts");
  const membershipsModAr = loadTsModule("src/content/cv/ar/memberships.ts");
  const languagesModAr = loadTsModule("src/content/cv/ar/languages.ts");
  const skillsModAr = loadTsModule("src/content/cv/ar/technicalSkills.ts");
  const interestsModAr = loadTsModule("src/content/cv/ar/interests.ts");
  const referencesModAr = loadTsModule("src/content/cv/ar/references.ts");
  const certsModAr = loadTsModule("src/content/cv/ar/certifications.ts");
  const projectsModAr = loadTsModule("src/content/cv/ar/projects.ts");
  const indexModAr = loadTsModule("src/content/cv/ar/index.ts");

  check(
    indexModAr.canonicalCvMetaAr?.sourcePdfSha256 === manifestAr.pdfSha256,
    `Arabic canonical index metadata sourcePdfSha256 matches manifest baseline`
  );

  // A. Arabic Identity & Profile
  check(
    identityModAr.canonicalIdentityAr?.fullName === manifestAr.identity.fullName,
    `Arabic canonical fullName matches: "${manifestAr.identity.fullName}"`
  );
  check(
    identityModAr.canonicalIdentityAr?.role === manifestAr.identity.role,
    `Arabic canonical role matches: "${manifestAr.identity.role}"`
  );
  check(
    identityModAr.canonicalIdentityAr?.location === manifestAr.identity.location,
    `Arabic canonical location matches: "${manifestAr.identity.location}"`
  );
  check(
    profileModAr.canonicalProfileAr?.raw === manifestAr.profile.raw,
    `Arabic canonical profile statement matches exact verbatim CV source text`
  );

  // B. Arabic Education
  check(
    educationModAr.canonicalEducationAr?.institution === manifestAr.education.institution,
    `Arabic canonical education institution matches: "${manifestAr.education.institution}"`
  );
  check(
    educationModAr.canonicalEducationAr?.degree === manifestAr.education.degree,
    `Arabic canonical education degree matches: "${manifestAr.education.degree}"`
  );
  check(
    educationModAr.canonicalEducationAr?.period === manifestAr.education.period,
    `Arabic canonical education period matches: "${manifestAr.education.period}"`
  );
  check(
    educationModAr.canonicalEducationAr?.graduationProject?.title === manifestAr.education.graduationProjectTitle,
    `Arabic canonical graduation project title matches exact CV wording`
  );

  // C. Arabic Experience & Roles
  const canonicalOrgsAr = experienceModAr.canonicalExperienceOrganizationsAr || [];
  check(
    canonicalOrgsAr.length === manifestAr.organizations.length,
    `Arabic canonical organizations count: ${canonicalOrgsAr.length} (expected ${manifestAr.organizations.length})`
  );

  const canonicalRolesAr = experienceModAr.canonicalExperienceRolesAr || [];
  check(
    canonicalRolesAr.length === manifestAr.experienceRoles.length,
    `Arabic canonical experience roles count: ${canonicalRolesAr.length} (expected ${manifestAr.experienceRoles.length})`
  );

  manifestAr.experienceRoles.forEach((expectedRole, idx) => {
    const actual = canonicalRolesAr[idx];
    check(
      actual?.role === expectedRole.role &&
      actual?.company === expectedRole.company &&
      actual?.period === expectedRole.period &&
      actual?.location === expectedRole.location &&
      actual?.summary === expectedRole.summary,
      `Arabic canonical role #${idx + 1} (${expectedRole.role} @ ${expectedRole.company}) matches manifest exactly`
    );
  });

  // D. Arabic Memberships
  const canonicalMembershipsAr = membershipsModAr.canonicalMembershipsAr || [];
  check(
    canonicalMembershipsAr.length === manifestAr.memberships.length,
    `Arabic canonical memberships count: ${canonicalMembershipsAr.length} (expected ${manifestAr.memberships.length})`
  );
  manifestAr.memberships.forEach((expMember, idx) => {
    const actual = canonicalMembershipsAr[idx];
    check(
      actual?.organization === expMember.organization &&
      actual?.summary === expMember.summary,
      `Arabic canonical membership #${idx + 1} (${expMember.organization}) matches manifest exactly`
    );
  });

  // E. Arabic Languages
  const canonicalLangsAr = languagesModAr.canonicalLanguagesAr || [];
  check(
    canonicalLangsAr.length === manifestAr.languages.length,
    `Arabic canonical languages count: ${canonicalLangsAr.length} (expected ${manifestAr.languages.length})`
  );
  manifestAr.languages.forEach((expLang, idx) => {
    const actual = canonicalLangsAr[idx];
    check(
      actual?.language === expLang.language &&
      actual?.proficiency === expLang.proficiency &&
      actual?.raw === expLang.raw,
      `Arabic canonical language (${expLang.language} - ${expLang.proficiency}) matches manifest exactly`
    );
  });

  // F. Arabic Technical Skills
  const canonicalSkillLinesAr = skillsModAr.canonicalTechnicalSkillLinesAr || [];
  check(
    canonicalSkillLinesAr.length === manifestAr.technicalSkills.lines.length,
    `Arabic canonical technical skill lines count: ${canonicalSkillLinesAr.length} (expected ${manifestAr.technicalSkills.lines.length})`
  );

  manifestAr.technicalSkills.lines.forEach((expLine, idx) => {
    const actual = canonicalSkillLinesAr[idx];
    check(
      actual?.officialLine === expLine,
      `Arabic canonical skill line #${idx + 1} matches: "${expLine}"`
    );
  });

  // G. Arabic Interests
  const canonicalInterestsAr = interestsModAr.canonicalInterestsAr || [];
  check(
    canonicalInterestsAr.length === manifestAr.interests.length,
    `Arabic canonical interests count: ${canonicalInterestsAr.length} (expected ${manifestAr.interests.length})`
  );
  manifestAr.interests.forEach((expInterest, idx) => {
    const actual = canonicalInterestsAr[idx];
    check(
      actual?.category === expInterest.category && actual?.rawText === expInterest.rawText,
      `Arabic canonical interest #${idx + 1} (${expInterest.category}) matches manifest exactly`
    );
  });

  // H. Arabic References
  const canonicalRefsAr = referencesModAr.canonicalReferencesAr || [];
  check(
    canonicalRefsAr.length === manifestAr.references.length,
    `Arabic canonical references count: ${canonicalRefsAr.length} (expected ${manifestAr.references.length})`
  );
  manifestAr.references.forEach((expRef, idx) => {
    const actual = canonicalRefsAr[idx];
    check(
      actual?.name === expRef.name &&
      actual?.phone === expRef.phone &&
      actual?.email === expRef.email &&
      actual?.isPublic === false,
      `Arabic canonical reference #${idx + 1} matches exact source: "${expRef.name}"`
    );
  });

  // I. Arabic Certifications
  const canonicalCertsAr = certsModAr.canonicalCertificationsAr || [];
  check(
    canonicalCertsAr.length === manifestAr.certifications.length,
    `Arabic canonical certifications count: ${canonicalCertsAr.length} (expected ${manifestAr.certifications.length})`
  );

  let statusDriftCountAr = 0;
  let issuerDriftCountAr = 0;
  canonicalCertsAr.forEach((cert, idx) => {
    const exp = manifestAr.certifications[idx];
    if (cert.status !== exp.status) {
      statusDriftCountAr++;
      failures.push(`Arabic certification "${cert.title}" has status "${cert.status}", expected "${exp.status}"`);
    }
    if (cert.issuer !== exp.issuer) {
      issuerDriftCountAr++;
      failures.push(`Arabic certification "${cert.title}" has issuer "${cert.issuer}", expected "${exp.issuer}"`);
    }
  });

  check(statusDriftCountAr === 0, `All Arabic certifications preserve exact explicit status with zero invented claims`);
  check(issuerDriftCountAr === 0, `All Arabic certifications use exact source issuer wording`);
  check(
    certsModAr.canonicalCertificationsRepositoryNoticeAr === manifestAr.certificationsRepositoryNotice,
    `Arabic canonical certificates repository notice matches manifest: "${manifestAr.certificationsRepositoryNotice}"`
  );

  // J. Arabic Projects
  const canonicalProjectsAr = projectsModAr.canonicalProjectsAr || [];
  check(
    canonicalProjectsAr.length === manifestAr.projects.length,
    `Arabic canonical projects count: ${canonicalProjectsAr.length} (expected ${manifestAr.projects.length})`
  );
  manifestAr.projects.forEach((expProj, idx) => {
    const actual = canonicalProjectsAr[idx];
    check(
      actual?.index === expProj.index &&
      actual?.slug === expProj.slug &&
      actual?.title === expProj.title &&
      actual?.oneLineDescription === expProj.oneLineDescription,
      `Arabic canonical project #${expProj.index} matches manifest exactly`
    );
  });
  check(
    projectsModAr.canonicalProjectsGithubNoticeAr === manifestAr.projectsGithubNotice,
    `Arabic canonical projects footer notice matches manifest: "${manifestAr.projectsGithubNotice}"`
  );

  // 9. Arabic Portfolio Presentation Layer Integrity (src/content/ar/)
  console.log("\n▶ [9/12] Verifying Arabic Portfolio Presentation Layer (src/content/ar/)...");
  const pubExpModAr = loadTsModule("src/content/ar/experience.ts");
  const pubProjectsModAr = loadTsModule("src/content/ar/projects.ts");
  const pubCertsModAr = loadTsModule("src/content/ar/credentials.ts");
  const pubAboutModAr = loadTsModule("src/content/ar/about.ts");
  const pubContactModAr = loadTsModule("src/content/ar/contact.ts");
  const pubSocialModAr = loadTsModule("src/content/ar/social.ts");

  const pubRolesAr = pubExpModAr.experienceContentAr?.items || [];
  check(
    pubRolesAr.length === manifestAr.experienceRoles.length,
    `Arabic portfolio experience items count: ${pubRolesAr.length} (expected ${manifestAr.experienceRoles.length})`
  );
  const emptyRespCountAr = pubRolesAr.filter((r) => !r.responsibilities || r.responsibilities.length === 0).length;
  check(
    emptyRespCountAr === 0,
    `All Arabic experience items retain active responsibilities (${emptyRespCountAr} empty items found)`
  );

  const pubProjectsAr = pubProjectsModAr.projectItemsAr || pubProjectsModAr.projectsContentAr?.items || [];
  check(
    pubProjectsAr.length === manifestAr.projects.length,
    `Arabic portfolio project catalogue count: ${pubProjectsAr.length} (expected ${manifestAr.projects.length})`
  );

  const pubCertsAr = pubCertsModAr.credentialsContentAr?.certifications || [];
  check(
    pubCertsAr.length === manifestAr.certifications.length,
    `Arabic portfolio certifications count: ${pubCertsAr.length} (expected ${manifestAr.certifications.length})`
  );

  const pubMembershipsAr = pubCertsModAr.credentialsContentAr?.memberships || [];
  check(
    pubMembershipsAr.length === manifestAr.memberships.length,
    `Arabic portfolio memberships count: ${pubMembershipsAr.length} (expected ${manifestAr.memberships.length})`
  );

  const pubInterestsAr = pubAboutModAr.aboutContentAr?.interests || [];
  check(
    pubInterestsAr.length === manifestAr.interests.length,
    `Arabic portfolio interests count: ${pubInterestsAr.length} (expected ${manifestAr.interests.length})`
  );

  const socialsAr = pubSocialModAr.socialLinksAr || [];
  check(socialsAr.some((s) => s.url?.includes("github.com/a2sn2")), "Arabic portfolio social channels include GitHub (a2sn2)");
  check(socialsAr.some((s) => s.url?.includes("linkedin.com/in/a2sn4")), "Arabic portfolio social channels include LinkedIn (a2sn4)");
  check(socialsAr.some((s) => s.url?.includes("instagram.com/a2s.n4")), "Arabic portfolio social channels include Instagram (@a2s.n4)");
  check(pubContactModAr.contactContentAr?.location?.includes("صنعاء"), "Arabic portfolio contact location includes Sana'a");

  // 10. Project Slug 1:1 Parity between EN and AR
  console.log("\n▶ [10/12] Verifying Project Slug 1:1 Parity between English and Arabic...");
  const enSlugs = pubProjects.map((p) => p.slug);
  const arSlugs = pubProjectsAr.map((p) => p.slug);
  check(
    enSlugs.length === 16 && arSlugs.length === 16,
    `Both English (16) and Arabic (16) have exactly 16 project slugs`
  );
  let slugMismatches = 0;
  enSlugs.forEach((slug) => {
    if (!arSlugs.includes(slug)) {
      slugMismatches++;
      failures.push(`English slug "${slug}" is missing from Arabic projects`);
    }
  });
  arSlugs.forEach((slug) => {
    if (!enSlugs.includes(slug)) {
      slugMismatches++;
      failures.push(`Arabic slug "${slug}" is missing from English projects`);
    }
  });
  check(
    slugMismatches === 0,
    `All 16 project slugs match 1:1 between English and Arabic versions`
  );

  // 11. Arabic Reference Display Policy Verification
  console.log("\n▶ [11/12] Verifying Reference Display Policy in Arabic Content Files...");
  const publicFilesAr = [
    "src/content/ar/about.ts",
    "src/content/ar/contact.ts",
    "src/content/ar/experience.ts",
    "src/content/ar/identity.ts",
    "src/content/ar/projects.ts",
    "src/content/ar/skills.ts",
    "src/content/ar/credentials.ts",
    "src/content/ar/social.ts",
  ];

  const referencePhoneNumbersAr = manifestAr.references.map((r) => r.phone);
  const referenceEmailsAr = manifestAr.references.filter((r) => r.email).map((r) => r.email);

  let renderedContactCountAr = 0;
  for (const relFile of publicFilesAr) {
    const content = fs.readFileSync(path.join(root, relFile), "utf8");
    for (const phone of referencePhoneNumbersAr) {
      if (content.includes(phone)) {
        renderedContactCountAr++;
        failures.push(`Reference phone "${phone}" detected in public Arabic content file ${relFile}`);
      }
    }
    for (const email of referenceEmailsAr) {
      if (content.includes(email)) {
        renderedContactCountAr++;
        failures.push(`Reference email "${email}" detected in public Arabic content file ${relFile}`);
      }
    }
  }

  check(
    renderedContactCountAr === 0,
    `Arabic reference phone numbers and personal emails are not rendered in public Arabic content files`
  );

  // 12. Cross-Language Content Integrity & Banned Claims
  console.log("\n▶ [12/12] Scanning Arabic Content Files for Banned Unverified Claims...");
  let bannedViolationsAr = 0;
  for (const relFile of publicFilesAr) {
    const content = fs.readFileSync(path.join(root, relFile), "utf8").toLowerCase();
    for (const phrase of BANNED_UNVERIFIED_PHRASES) {
      if (content.includes(phrase.toLowerCase())) {
        bannedViolationsAr++;
        failures.push(`Banned phrase "${phrase}" detected in ${relFile}`);
      }
    }
  }

  check(
    bannedViolationsAr === 0,
    `All ungrounded phrases are strictly absent across all public Arabic content files`
  );

  // Final Summary
  console.log("\n============================================================");
  if (failures.length === 0) {
    console.log("✅ ALL ENGLISH & ARABIC CV DETERMINISTIC CONTENT PARITY CHECKS PASSED!");
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
