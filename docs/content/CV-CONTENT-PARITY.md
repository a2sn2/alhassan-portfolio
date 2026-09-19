# English CV Content Parity Baseline

## Canonical Source

- Source PDF: `docs/ALHassan_Baligh_ALShami_CV_Package/English/ALHassan_Baligh_ALShami_CV_Standard.pdf`
- Source PDF SHA-256: `e49a9ce438d04e537f5aef8c478c74d947e6a5a4df7bb360b915f7861b7eb63c`
- Canonical text file: `docs/content/ENGLISH-CV-CANONICAL.txt`
- Canonical text SHA-256: `56410f5f614eaf15722c52ebfcd17af437e3f80b6115a5736a2da19d9f2c90b1`
- Web parity route: `/official-cv`

## Definition of Content-Complete

The English portfolio content baseline is considered complete when the normalized visible text inside `[data-cv-verbatim]` on `/official-cv` exactly equals the normalized text in `docs/content/ENGLISH-CV-CANONICAL.txt`.

Normalization is limited to whitespace so responsive line wrapping does not create false mismatches. Wording, capitalization, punctuation, numbers, dates, names, titles, and symbols remain exact.

The canonical text was reconciled directly from the official 4-page PDF. PDF page markers (`1 — 4` through `4 — 4`) are intentionally retained so the parity record covers the complete textual source. Decorative icons and graphical rating stars are visual artifacts rather than words or letters and are not part of textual parity.

## Creative Content Boundary

Creative portfolio copy, interface labels, case-study framing, badges, technical tags, interaction text, and visual storytelling may exist outside `[data-cv-verbatim]`. They must not replace, mutate, or silently rewrite the canonical professional record.

## Automated Gate

`tests/e2e/portfolio.spec.ts` contains a CV parity assertion that reads the canonical text file, loads `/official-cv`, reads only `[data-cv-verbatim]`, normalizes whitespace on both values, and requires exact equality.
