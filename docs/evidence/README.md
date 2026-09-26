# Portfolio Evidence Hub

The Portfolio Evidence Hub serves as the authoritative, tamper-evident repository of source code archives, verified certification documents, and technical provenance records for ALHassan ALShami's portfolio systems.

---

## 🏛 Purpose & Architecture

1. **Proof & Traceability**: Provides public reviewers, engineering managers, and technical evaluators with direct, unverifiable proof backing every canonical project and credential claim.
2. **Canonical CV vs. Evidence Distinction**:
   - `src/content/cv/**` represents the **canonical CV layer** (immutable ground truth for professional statements).
   - `docs/evidence/**` functions as the **verification layer**. Evidence may *confirm*, *partially support*, or *flag a conflict* with canonical statements, but evidence **never silently rewrites** canonical facts.
3. **Dedicated Repositories vs. Local Archives**:
   - For projects with active standalone GitHub repositories (e.g. \`yolo-object-detection\`, \`pump_DA_Batch2\`, \`ImageClassify_ML_Batch1\`, \`UrbanMindOS\`, \`OmnifoodHTML-CSS\`), the dedicated repository remains the primary development home. The Evidence Hub provides indexing, provenance documentation, and metadata links.
   - For systems developed in university or offline lab environments without standalone repositories, clean and audited source archives are preserved under \`docs/evidence/projects/<slug>/source/\`.

---

## 🛡 Privacy & Exclusion Policies

In accordance with strict public repository governance:
- **Private Academic Records**: Official bachelor transcripts, detailed grade sheets, grading scale documents, high school transcripts, and academic recommendations are stored in local-only directories (\`_private/\`) and **never committed** publicly.
- **Reference Privacy**: All third-party names, direct phone numbers, personal emails, and recommendation letter signatures are excluded from public git tracking. References remain strictly *Available on Request*.
- **Binary Cleanliness**: Build artifacts (\`build/\`, \`dist/\`, \`.dart_tool/\`, \`.gradle/\`, \`__pycache__/\`), large machine learning weights (\`*.h5\`, \`*.onnx\`, \`*.pt\`), and compiled executables (\`*.exe\`, \`*.apk\`) exceeding 15 MB are strictly barred from git tracking.
- **Unclassified Files**: Any ambiguously titled or unverified file (such as \`123.pdf\`) is placed in staging (\`_unclassified/\`) and never published without deterministic identity verification.

---

## ⚖️ Source Conflict Protocol

If physical evidence discovers an implementation difference against canonical CV statements (e.g. the Student Evaluation System evidence containing Flutter/Dart & PHP code while the canonical CV records C# Desktop + PHP Web):
- **Rule**: Do not speculate or alter canonical CV technologies.
- **Action**: The item is classified as **\`SOURCE CONFLICT — OWNER REVIEW REQUIRED\`**. Both the canonical statements and the physical evidence files are documented transparently in [\`EVIDENCE-MATRIX.md\`](./EVIDENCE-MATRIX.md).

---

## 📂 Hub Directory Structure

```
docs/evidence/
├── README.md                  # This governance and architecture guide
├── EVIDENCE-MATRIX.md         # Full tabular matrix of 16 projects & 26 credentials
├── evidence-manifest.json     # Machine-readable verification manifest
├── GITHUB-REPOSITORY-AUDIT.md # Provenance audit of external GitHub repositories
│
├── projects/                  # 16 Canonical project evidence folders
│   ├── real-time-object-detection/
│   ├── robocam-controller/
│   ├── pump-station-analytics/
│   ├── real-time-image-classification-api/
│   ├── urbanmindos/
│   ├── mikrotik-hotspot-portal/
│   ├── arduino-traffic-light/
│   ├── obstacle-avoidance/
│   ├── ai-tic-tac-toe/
│   ├── pacman-pygame/
│   ├── text-summarizer/
│   ├── user-role-manager/
│   ├── inventory-sales-manager/
│   ├── student-evaluation-system/
│   ├── cafe-pos-system/
│   └── omnifood-landing-page/
│
├── certifications/            # 26 Canonical credential records (21 verified PDFs)
│   └── <credential-id>/
│       ├── README.md
│       ├── evidence.json
│       └── certificate.pdf    (for verified records)
│
└── candidates/                # Catalog of non-canonical experimental projects
    └── README.md
```

---

## 🔍 Verification Commands

To deterministically validate that all canonical projects and credentials comply with evidence policies, run:

\`\`\`bash
npm run verify:evidence
\`\`\`
