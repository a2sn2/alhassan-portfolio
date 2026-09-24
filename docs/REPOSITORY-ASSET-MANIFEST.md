# Repository Asset Manifest & Integrity Specification

This document establishes the deterministic integrity baseline for tracked source and reference assets within the repository.

---

## 1. Governance & Retention Policy

The following asset suites are **intentionally public** and permanently tracked in the repository:
1. `docs/ALHassan_Baligh_ALShami_CV_Package/` — Official multi-lingual CV packages (German, English, Arabic) in Standard and ATS-optimized editions.
2. `docs/Themes/Jaib Theme/` — Comprehensive design system reference material, color specifications, design prompts, and interactive identity previews.
3. `docs/images/` — Official high-resolution source personal portrait photography suite (`AllPic.png`, `FacePic.jpeg`).

These files serve as the canonical source material for portfolio content verification and visual design consistency. They must never be deleted, renamed without traceability, or excluded via `.gitignore`.

---

## 2. Asset Integrity Inventory (SHA-256 Baseline)

| Relative Path | Public Delivery Path | Dimensions / Type | Size (Bytes) | SHA-256 Hash | Purpose / Category |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `docs/images/AllPic.png` | `public/images/profile/alhassan-studio.png` | 1254 × 1254 (PNG, 1:1) | 1,898,660 | `2dc8c86107ac9131adad4ae311f84bcd8ca55e40591831320c38977198e2055e` | Profile Photography / Primary Editorial Studio Portrait (Hero) |
| `docs/images/FacePic.jpeg` | `public/images/profile/alhassan-formal.jpeg` | 2400 × 2814 (JPEG) | 1,898,824 | `ec36fe585feff7c858188af4f2c0bf67455c9fc68547155499bc623fb184cf08` | Profile Photography / Formal Professional Portrait (About Intro) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_ATS-Version.pdf` | `public/cv/ALHassan_Baligh_ALShami_CV_German_ATS.pdf` | Document (PDF) | 3,377,730 | `6fd6e4acb1a180c758be67d3ab628b67ffc8dcd1a9039063377a1e6507c2cb94` | Source CV / German (ATS Edition) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf` | `public/cv/ALHassan_Baligh_ALShami_CV_German_Standard.pdf` | Document (PDF) | 8,873,416 | `7001ecceab794a1fc92b2b2a0abe614f491e2a2ccdb6835dec583a1aa05ce6c3` | Source CV / German (Standard Edition) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_ATS.pdf` | `public/cv/ALHassan_Baligh_ALShami_CV_English_ATS.pdf` | Document (PDF) | 3,320,365 | `ec0b5a2d342c808e2e20f97295decf2c8c4517424d4a8b06fede7685801daf8d` | Source CV / English (ATS Edition) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf` | `public/cv/ALHassan_Baligh_ALShami_CV_English_Standard.pdf` | Document (PDF) | 8,690,368 | `e49a9ce438d04e537f5aef8c478c74d947e6a5a4df7bb360b915f7861b7eb63c` | Source CV / English (Standard Edition) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf` | `public/cv/ALHassan_Baligh_ALShami_CV_Arabic_Standard.pdf` | Document (PDF) | 7,846,418 | `7d459d21a3fa738aef0c9f4de42e43b7b5b8b5a807b70c7bd2dfd11174c3da0c` | Source CV / Arabic (Standard Edition) |
| `docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - نسخة ATS.pdf` | `public/cv/ALHassan_Baligh_ALShami_CV_Arabic_ATS.pdf` | Document (PDF) | 2,568,124 | `6abbd4cee5043964413736914ef26295415b98023f52f1a49eb36f5feddcaab3` | Source CV / Arabic (ATS Edition) |
| `docs/Themes/Jaib Theme/All.png` | N/A | Image (PNG) | 1,540,269 | `b36fc25ed1c8770058bc8097494f598333933c1fedaca34f7792863afd2dfc39` | Visual Identity / Brand Overview Sheet |
| `docs/Themes/Jaib Theme/PromptEngineer.txt` | N/A | Text | 28,746 | `059df4d2a6d1806012bcb305b870d9a00a5bfa6dc1b9a374b56641d70be96eb3` | Brand Specification / Typography & Palette Prompt |
| `docs/Themes/Jaib Theme/README - شرح مجلد هوية JAIB.docx` | N/A | Document (DOCX) | 20,630 | `9cebde159373e998bb580b1abbcd7c9f168bd05ac83bd4b02b1af0054e5187d5` | Brand Documentation / Identity Guide (Arabic) |
| `docs/Themes/Jaib Theme/jaib_visual_identity_interactive.html` | N/A | Interactive HTML | 38,120 | `5e302183714d7cb7cc2812acda32291c300b93324f86a7a6c68598faf5b344de` | Visual Identity / Interactive Component Showcase |

---

## 3. Verification Command

To re-verify the integrity of these assets at any point, execute:

```bash
node -e "
const fs = require('fs');
const crypto = require('crypto');

const files = [
  'docs/images/AllPic.png',
  'docs/images/FacePic.jpeg',
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
