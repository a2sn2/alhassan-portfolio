# External GitHub Repository Audit

This document records the audit findings for external GitHub repositories associated with ALHassan ALShami's portfolio projects. In accordance with portfolio governance rules, external repositories are **not modified** in this branch; findings are recorded here for traceability and provenance.

---

## 1. a2sn2/yolo-object-detection
- **Target Project**: `real-time-object-detection`
- **URL**: [https://github.com/a2sn2/yolo-object-detection](https://github.com/a2sn2/yolo-object-detection)
- **Status**: Active / Public
- **Files Inspected**:
  - `README.md`
  - `od.ipynb`
- **Assessment**: Primary source code repository for real-time object detection using YOLO and OpenCV within a Jupyter notebook environment. Clean, directly aligned with canonical project scope.

---

## 2. a2sn2/pump_DA_Batch2
- **Target Project**: `pump-station-analytics`
- **URL**: [https://github.com/a2sn2/pump_DA_Batch2](https://github.com/a2sn2/pump_DA_Batch2)
- **Status**: Active / Public
- **Files Inspected**:
  - `README.md` (Arabic description of wastewater pump telemetry analysis)
  - `pump_DA_Batch2.ipynb`
  - `wastewater_pump_station_data.csv`
- **Assessment**: Primary source code repository for pump station predictive maintenance analysis. Contains the original municipal pump telemetry dataset and complete exploratory analysis notebook.

---

## 3. a2sn2/ImageClassify_ML_Batch1
- **Target Project**: `real-time-image-classification-api`
- **URL**: [https://github.com/a2sn2/ImageClassify_ML_Batch1](https://github.com/a2sn2/ImageClassify_ML_Batch1)
- **Status**: Active / Public
- **Files Inspected**:
  - `README.md`
  - `Codes/IC.py`
  - `Codes/R.jpg`, `Codes/g.jpeg`, `Codes/t.jpg`
- **Assessment**: Primary repository for Flask-based image classification microservice utilizing pre-trained EfficientNetB0 on ImageNet.
- **Audit Note**: Minor run-instruction drift in repository README; code file is located under `Codes/IC.py`. Primary code operates as expected.

---

## 4. a2sn2/UrbanMindOS
- **Target Project**: `urbanmindos`
- **URL**: [https://github.com/a2sn2/UrbanMindOS](https://github.com/a2sn2/UrbanMindOS)
- **Status**: Active / Public
- **Files Inspected**:
  - `index.html`
  - `style.css`
  - `images/` (about-img.png, footer-bg.png, home-img.png, pic1.png, pic2.png, pic3.png, subscribe-bg.png)
  - `README.md`
- **Assessment**: Primary source code repository for the smart city operating system concept website. A synchronized public snapshot is also maintained locally in `docs/evidence/projects/urbanmindos/source/`.

---

## 5. a2sn2/OmnifoodHTML-CSS
- **Target Project**: `omnifood-landing-page`
- **URL**: [https://github.com/a2sn2/OmnifoodHTML-CSS](https://github.com/a2sn2/OmnifoodHTML-CSS)
- **Status**: Active / Public
- **Files Inspected**:
  - `index.html`
  - `styles.css`
  - `img/` (full asset collection)
  - `omnii-food.pdf`
  - `README.md`
- **Assessment**: Authoritative primary repository for the responsive food delivery landing page. Clean HTML5 and CSS3 implementation.

---

## 6. a2sn2/Omnifood-html
- **Target Project**: `omnifood-landing-page` (Legacy / Duplicate)
- **URL**: [https://github.com/a2sn2/Omnifood-html](https://github.com/a2sn2/Omnifood-html)
- **Status**: Active / Public
- **Assessment**: Earlier iteration / mirror of the Omnifood project. In accordance with Section J governance rules, this repository is preserved and documented as legacy/duplicate, not deleted. `a2sn2/OmnifoodHTML-CSS` remains canonical.

---

## 7. a2sn2/GraduationProject
- **Target Project**: `real-time-object-detection` (Supporting Academic Archive)
- **URL**: [https://github.com/a2sn2/GraduationProject](https://github.com/a2sn2/GraduationProject)
- **Status**: Active / Public
- **Files Inspected**:
  - `docs/FinalALHassanALShamiObjectTrackingAlgorithms.pdf`
  - `docs/BSc_English_StudyProof.pdf`
  - `docs/BSc_Specialization_Plan.pdf`
  - `extras/PhoneDroneSim.rar`
  - `media/IMG_9459.JPG`, `media/IMG_9462.JPG`, `media/IMG_9464.JPG`, `media/IMG_9501.JPG`, `media/IMG_9504.JPG`, `media/IMG_9505.JPG`
  - `recommendations/` (Faculty recommendation letters)
  - `السجل الاكاديمي للاربع السنوات.pdf`
- **Assessment & Warning (Section K)**:
  - This repository does **not** contain software tracking execution scripts. The references in its README to `requirements.txt` or `src/run_tracker.py` represent documentation drift from a prior template and do not exist in the commit tree.
  - The repository functions as an **Academic Documentation & Defense Archive** containing the official BSc thesis PDF (`FinalALHassanALShamiObjectTrackingAlgorithms.pdf`), university study proofs, and defense session photographs.
  - Technical pipeline code is exclusively maintained in `a2sn2/yolo-object-detection`.

---

## 8. a2sn2/certificates
- **Target Context**: Legacy Certificates Repository
- **URL**: [https://github.com/a2sn2/certificates](https://github.com/a2sn2/certificates)
- **Status**: Active / Public
- **Assessment**: Grouped repository holding legacy certificate scans. The Portfolio Evidence Hub (`docs/evidence/certifications/`) now serves as the primary indexed ledger, with `a2sn2/certificates` preserved as a secondary legacy link.

---

## 9. a2sn2/project_uni
- **Status**: Empty / Staging
- **Assessment**: Empty placeholder repository; documented for complete index coverage without modification.
