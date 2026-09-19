# English CV Content Parity Architecture Baseline

## Official Source of Truth

- **Source Document**: `docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf`
- **Source PDF SHA-256**: `e49a9ce438d04e537f5aef8c478c74d947e6a5a4df7bb360b915f7861b7eb63c`
- **Canonical Model Directory**: `src/content/cv/`
- **Semantic Verification Gate**: `scripts/verify-cv-content.mjs` (`npm run verify:cv-content`)

---

## Two-Layer Architecture: Canonical vs. Editorial

To prevent accidental omission of official qualifications while maintaining a modern, interactive web-first portfolio, content is organized into two distinct layers:

### Layer A: Canonical Professional Content (`src/content/cv/`)
- **Purpose**: Authoritative, source-traceable representation of 100% of facts, organizations, dates, and official wording from the 4-page English Standard CV PDF.
- **Rules**: Zero invention, zero omission, immutable facts, source-indexed.
- **Section Counts**:
  - **Organizations**: 6
  - **Experience Roles**: 9 (including 4 roles under AHD Financial Services – Jaib Wallet)
  - **Memberships**: 5
  - **Languages**: 3 (Arabic Native, English B2, German B1)
  - **Technical Skills**: 9 official grouping lines
  - **Interests**: 3 categories (Community, Personal, Technical)
  - **References**: 6 complete professional records
  - **Certifications & Courses**: 26 verified credentials
  - **Projects & Work**: 16 catalogue systems

### Layer B: Portfolio Editorial & Presentation Layer (`src/content/` & `src/app/`)
- **Purpose**: Web-first storytelling, interactive components, responsive design, visual hierarchy, and engineering case studies.
- **Rules**:
  - Adheres to `.agents/rules/content-integrity.md` (active web copy highlighting craftsmanship, technical depth, and tangible impact).
  - Preserves verified responsibility bullet points and technologies in `ExperienceExplorer`.
  - Maps skills into atomic badges for filtering and visual rendering in `CapabilitiesMatrix`.
  - Maintains project case-study depths (Problem / Solution / Technologies / Result) across presentation tiers (Featured, Core, Archive) without arbitrary ALL CAPS.
  - Exposes interests on `/about` via an editorial layout without cluttering cards.

---

## Reference Privacy Policy

The official CV includes 6 professional references with personal telephone numbers and email addresses.

- **Storage**: The complete 6-reference record is preserved in `src/content/cv/references.ts` with `isPublic: false` for content parity and internal verification.
- **Public Portfolio**: To safeguard third-party privacy and prevent automated harvesting by scrapers, individual contact numbers and personal emails are **not** published to public web routes or sitemaps.
- **Public Policy**: The public site displays the verified standard:
  > *"Academic and professional references from faculty leadership, engineering supervisors, and executive directors are available upon request."*

---

## Semantic Verification Gate

The pipeline runs `npm run verify:cv-content` in local verification and GitHub Actions CI before linting and testing:

1. **PDF Integrity**: Verifies that the source PDF SHA-256 exactly equals `e49a9ce438d04e537f5aef8c478c74d947e6a5a4df7bb360b915f7861b7eb63c`.
2. **Canonical Model Completeness**: Confirms all 12 modules in `src/content/cv/` exist and match the expected section counts.
3. **Presentation Layer Parity**: Confirms that all 9 experience roles, 16 projects, 26 certifications, 5 memberships, 3 languages, 3 interest groups, and 3 social channels are exposed without omission.
4. **No Responsibility Erasure**: Confirms no experience items have empty `responsibilities: []` arrays.
5. **Privacy Enforcement**: Scans all public content files to verify zero personal phone numbers or third-party emails are leaked.
6. **Integrity Guard**: Confirms zero ungrounded/banned phrases appear in public content.

---

## Protocol for Future CV Updates

If a new official English Standard CV PDF is issued:

1. Place the new PDF into `docs/ALHassan_Baligh_ALShami_CV_Package/English/`.
2. Compute the new SHA-256 hash (`sha256sum <path>`).
3. Reconcile added, updated, or removed facts inside `src/content/cv/`.
4. Update `EXPECTED_PDF_SHA256` in `scripts/verify-cv-content.mjs` and `src/content/cv/index.ts`.
5. Map any new qualifications into the portfolio presentation layer (`src/content/`).
6. Run `npm run verify:cv-content` to validate full parity before committing.
