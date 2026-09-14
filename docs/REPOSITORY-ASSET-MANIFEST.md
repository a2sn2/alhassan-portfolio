# Repository Asset Manifest & Integrity Specification

This document establishes the deterministic integrity baseline for tracked source and reference assets within the repository.

---

## 1. Governance & Retention Policy

The following asset suites are **intentionally public** and permanently tracked in the repository:
1. `docs/ALHassan_Baligh_ALShami_CV_Package/` — Official multi-lingual CV packages (German, English, Arabic) in Standard and ATS-optimized editions.
2. `docs/Themes/Jaib Theme/` — Comprehensive design system reference material, color specifications, design prompts, and interactive identity previews.

These files serve as the canonical source material for portfolio content verification and visual design consistency. They must never be deleted, renamed without traceability, or excluded via `.gitignore`.

---

## 2. Asset Integrity Inventory (SHA-256 Baseline)

| Relative Path | Size (Bytes) | SHA-256 Hash | Purpose / Category |
| :--- | :--- | :--- | :--- |
| `docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_ATS-Version.pdf` | 3,377,730 | `6fd6e4acb1a180c758be67d3ab628b67ffc8dcd1a9039063377a1e6507c2cb94` | Source CV / German (ATS Edition) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf` | 8,873,416 | `7001ecceab794a1fc92b2b2a0abe614f491e2a2ccdb6835dec583a1aa05ce6c3` | Source CV / German (Standard Edition) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_ATS.pdf` | 3,320,365 | `ec0b5a2d342c808e2e20f97295decf2c8c4517424d4a8b06fede7685801daf8d` | Source CV / English (ATS Edition) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf` | 8,690,368 | `e49a9ce438d04e537f5aef8c478c74d947e6a5a4df7bb360b915f7861b7eb63c` | Source CV / English (Standard Edition) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf` | 7,846,418 | `7d459d21a3fa738aef0c9f4de42e43b7b5b8b5a807b70c7bd2dfd11174c3da0c` | Source CV / Arabic (Standard Edition) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - نسخة ATS.pdf` | 2,568,124 | `6abbd4cee5043964413736914ef26295415b98023f52f1a49eb36f5feddcaab3` | Source CV / Arabic (ATS Edition) |
| `docs/Themes/Jaib Theme/All.png` | 1,540,269 | `b36fc25ed1c8770058bc8097494f598333933c1fedaca34f7792863afd2dfc39` | Visual Identity / Brand Overview Sheet |
| `docs/Themes/Jaib Theme/PromptEngineer.txt` | 28,746 | `059df4d2a6d1806012bcb305b870d9a00a5bfa6dc1b9a374b56641d70be96eb3` | Brand Specification / Typography & Palette Prompt |
| `docs/Themes/Jaib Theme/README - شرح مجلد هوية JAIB.docx` | 20,630 | `9cebde159373e998bb580b1abbcd7c9f168bd05ac83bd4b02b1af0054e5187d5` | Brand Documentation / Identity Guide (Arabic) |
| `docs/Themes/Jaib Theme/jaib_visual_identity_interactive.html` | 38,120 | `5e302183714d7cb7cc2812acda32291c300b93324f86a7a6c68598faf5b344de` | Visual Identity / Interactive Component Showcase |

---

## 3. Verification Command

To re-verify the integrity of these assets at any point, execute:

```bash
node -e "
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const files = [
  'docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_ATS-Version.pdf',
  'docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf',
  'docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_ATS.pdf',
  'docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf',
  'docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf',
  'docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - نسخة ATS.pdf',
  'docs/Themes/Jaib Theme/All.png',
  'docs/Themes/Jaib Theme/PromptEngineer.txt',
  'docs/Themes/Jaib Theme/README - شرح مجلد هوية JAIB.docx',
  'docs/Themes/Jaib Theme/jaib_visual_identity_interactive.html'
];

files.forEach(f => {
  const buf = fs.readFileSync(f);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  console.log(f + ': ' + hash);
});
"
```
