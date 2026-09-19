# English CV Content Parity Architecture Baseline

## Official Source of Truth

- **Source Document**: `docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf`
- **Source PDF SHA-256**: `e49a9ce438d04e537f5aef8c478c74d947e6a5a4df7bb360b915f7861b7eb63c`
- **Canonical Model Directory**: `src/content/cv/`
- **Deterministic Manifest Fixture**: `scripts/fixtures/canonical-cv-manifest.json`
- **Verification Gate**: `scripts/verify-cv-content.mjs` (`npm run verify:cv-content`)

---

## Two-Layer Architecture: Canonical vs. Presentation

To guarantee complete factual fidelity to the official CV while maintaining a modern, interactive web-first portfolio, content is organized into two distinct layers:

### Layer A: Canonical Professional Content (`src/content/cv/`)
- **Purpose**: Source-exact, immutable representation of 100% of facts, organizations, dates, and official wording from the 4-page English Standard CV PDF.
- **Rules**: Zero invention, zero omission, no normalization, no inferred technologies, source-exact strings.
- **Section Details & Source Exactness**:
  - **Identity**: Full name, role, Haddah location, date of birth, contact, socials.
  - **Profile**: Verbatim statement from Page 1.
  - **Education**: Source-pure education block (`Twintech`, `B.Sc. in Computer Science`, `2021 – 2025`, graduation project thesis and repository notice). Location is not attached to the canonical education block as it is not part of the source education section.
  - **Organizations (6)**: Exact source strings, specifically `AHD for Financial Services Jaib Wallet` (no en dash in canonical source).
  - **Experience Roles (9)**: All 9 roles across 6 organizations with verbatim official summaries.
  - **Memberships (5)**: All 5 verified organizations, including `CYBERAI CLUB`, `SOCIETY OF PETROLEUM ENGINEERS (SPE)`, and `Al-Hamdi Foundation for Human Development`.
  - **Languages (3)**: Exact levels (Arabic Native, English B2, German B1) and star ratings.
  - **Technical Skills (9 lines)**: Exactly the 9 official grouping lines. Atomic skills are strictly pure semantic splits of each line with zero inferred/context additions (e.g. Databases -> `["Databases"]`; zero speculative additions like MySQL, Oracle, MikroTik, etc.).
  - **Interests (3 groups)**: Community, Personal, and Technical categories. The Community group rawText strictly preserves `tech club events` without hyphens.
  - **References (6 records)**: Complete source records with exact names from Page 2 (`Eng. Mohammed Al-Hazmi`, `Mohammed Al Sanea`, `Prof. Dr. Fadl Baalawi`, `Eng. Mohammed Al Aghbari`, `Eng. Mohammed Al Ashwal`, `Ms. Rabab Al Ashwal` — no spurious hyphens).
  - **Certifications & Courses (26 entries)**: Exact source issuers (specifically `Al-Hamdi Foundation`, distinct from the longer membership name) and exact explicit statuses (`Ongoing` for AI Program and Front-End Bootcamp, `In Progress` for Graphic Design Diploma). No entry claims an invented "Completed" status.
  - **Projects & Work (16 items)**: Exact titles and descriptions, specifically Project #13 `Student Evaluation System` without an em dash before `C# Desktop + PHP Web`.
  - **Repository & GitHub Notices**: Canonical footer strings preserve exact ASCII markers: `Open --< Certificate Documents >-- to view them in the repository.` and `Explore my future projects in programming, engineering, and graphic design on --< GITHUB >--`.

### Layer B: Portfolio Presentation & Editorial Layer (`src/content/` & `src/app/`)
- **Purpose**: Web-first storytelling, interactive components, responsive design, visual hierarchy, and engineering case studies.
- **Characteristics**:
  - Editorial display copy (e.g., `AHD for Financial Services – Jaib Wallet` with display styling).
  - Preserves verified, active-voice `responsibilities: [...]` bullet points in `ExperienceExplorer`.
  - Maps skills into atomic badges for filtering and visual rendering in `CapabilitiesMatrix`.
  - Exposes interests on `/about` via an editorial layout without cluttering cards.
  - Maintains project case-study depths (Problem / Solution / Technologies / Result) across presentation tiers (Featured, Core, Archive).
  - Keeps credentials status-free unless explicitly stated as Ongoing / In Progress.

---

## Reference Display & Data Parity Policy

The official CV includes 6 professional references with telephone numbers and email addresses.

- **Data Parity Retention**: The complete 6-reference records are retained in `src/content/cv/references.ts` for content parity and audit verification.
- **Portfolio Interface Policy**: These contact details are **not rendered in the normal portfolio interface**.
- **Public Availability Statement**: The public portfolio routes display the verified standard notice:
  > *"Academic and professional references from faculty leadership, engineering supervisors, and executive directors are available upon request."*

---

## Deterministic Verification Gate (`verify:cv-content`)

The pipeline runs `scripts/verify-cv-content.mjs` (`npm run verify:cv-content`) in local verification and GitHub Actions CI:

1. **PDF Baseline Integrity**: Verifies that the source PDF SHA-256 equals `e49a9ce438d04e537f5aef8c478c74d947e6a5a4df7bb360b915f7861b7eb63c`.
2. **Canonical Manifest String Matching**: Loads all canonical modules and verifies every entity property against `scripts/fixtures/canonical-cv-manifest.json` string-for-string.
3. **Purity Enforcement**: Guarantees zero inferred skills in canonical technical skills, zero invented "Completed" statuses in certifications, exact reference names, exact AHD wording, and exact repository notices.
4. **Presentation Parity & Responsibilities**: Confirms all 9 experience roles retain non-empty `responsibilities: [...]` arrays, all 16 projects and 26 certifications are accounted for, and presentation certifications use `Al-Hamdi Foundation`.
5. **Reference Display Protection**: Ensures reference phone numbers and personal emails are not rendered in public content files.
6. **Integrity Guard**: Confirms zero ungrounded / banned phrases appear in public content.

---

## Protocol for Future CV Updates

If a new official English Standard CV PDF is issued:

1. Place the new PDF into `docs/ALHassan_Baligh_ALShami_CV_Package/English/`.
2. Compute the new SHA-256 hash (`sha256sum <path>`).
3. Reconcile facts inside `src/content/cv/` and `scripts/fixtures/canonical-cv-manifest.json`.
4. Update `EXPECTED_PDF_SHA256` in `src/content/cv/index.ts` and manifest.
5. Map any new qualifications into the portfolio presentation layer (`src/content/`).
6. Run `npm run verify:cv-content` to validate full parity before committing.
