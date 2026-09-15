# Content Source Reconciliation Matrix

**Document:** Canonical Professional Information Source Reconciliation  
**Primary Source Package:** [docs/ALHassan_Baligh_ALShami_CV_Package/](file:///docs/ALHassan_Baligh_ALShami_CV_Package/)  
**Sources Analyzed:**
1. `English/ALHassan_Baligh_ALShami_CV_Standard.pdf`
2. `English/ALHassan_Baligh_ALShami_CV_ATS.pdf`
3. `Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_Standardversion.pdf`
4. `Deutsch/Lebenslauf_ALHassan_Baligh_ALShami_ATS-Version.pdf`
5. `العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf`
6. `العربية/السيرة الذاتية - الحسن بليغ الشامي - نسخة ATS.pdf`

---

## 1. Professional Identity & Contact

| Field | Canonical Value | Source File(s) | Source Language(s) | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Full Name (EN)** | ALHassan Baligh ALShami | All English/German CVs | English, German | **VERIFIED & CONSISTENT** | Canonical Latin spelling across all CVs |
| **Full Name (AR)** | الحسن بليغ الشامي | All Arabic CVs | Arabic | **VERIFIED & CONSISTENT** | Canonical Arabic script across all CVs |
| **Professional Role** | Software Engineer | All CV variants | English, German, Arabic | **VERIFIED & CONSISTENT** | Stated as "Software Engineer" / "Softwareentwickler" / "مهندس برمجيات" |
| **Location** | Haddah, Sana'a, Yemen | All CV variants | English, German, Arabic | **VERIFIED & CONSISTENT** | Concise public display: "Sana'a, Yemen" |
| **Availability Status Badge** | "Available for Engineering Opportunities" | Active public availability declaration | All | **OWNER-APPROVED CURRENT STATE** | Declared and approved by repository owner for current professional representation; not a historical CV fact |
| **Email** | `hassan1alshami6@gmail.com` | All CV variants | All | **VERIFIED & CONSISTENT** | Canonical direct public contact |
| **Phone** | `+967 772 765 120` | All CV variants | All | **VERIFIED & CONSISTENT** | Direct mobile contact |
| **Date of Birth** | 01 Oct 2002 | All CV variants | All | **VERIFIED & CONSISTENT** | Private CV detail (withheld from public web UI) |
| **LinkedIn** | `linkedin.com/in/a2sn4` | All CV variants | All | **VERIFIED & CONSISTENT** | Professional network profile |
| **GitHub** | `github.com/a2sn2` | English ATS CV & footer links | English, German, Arabic | **VERIFIED & CONSISTENT** | Verified code repository profile |
| **Instagram** | `@a2s.n4` | All CV variants | All | **VERIFIED & CONSISTENT** | Social profile handle |
| **Certificates Repo**| `github.com/a2sn2/certificates.git` | English ATS CV (p. 1) | English | **VERIFIED & CONSISTENT** | Official certificate proof repository |

---

## 2. Professional Summary, Positioning & Derived Copy Register

To maintain absolute transparency and integrity, content across the portfolio is strictly partitioned into three verifiable tiers:
1. **VERIFIED SOURCE FACT**: Sourced directly and verifiably from the official CV package.
2. **OWNER-APPROVED CURRENT STATE**: Current active status approved by the portfolio owner (e.g. availability badge).
3. **OWNER-APPROVED DERIVED COPY**: Editorial synthesis, high-level positioning, and architectural framing approved by the portfolio owner.

| Field | Current Implementation | Source Grounding / Basis | Status | Classification |
| :--- | :--- | :--- | :--- | :--- |
| **CV Summary (EN)** | Software engineer combining academic knowledge with hands-on practice to turn theoretical ideas into tangible outcomes in engineering environments. Strong believer in teamwork, time management, and practical, effective delivery, with a continuous drive for self-development and contribution in dynamic workplaces. | `English/ALHassan_Baligh_ALShami_CV_Standard.pdf` | **VERIFIED & CONSISTENT** | **VERIFIED SOURCE FACT** |
| **Homepage Headline** | "Software Systems, Full-Stack Engineering & Applied AI" | Synthesis of verified engineering scope (systems, web, computer vision) | **VERIFIED & CONSISTENT** | **OWNER-APPROVED DERIVED COPY** |
| **Homepage Bio Brief** | "Software engineer combining academic foundations with hands-on systems implementation, full-stack application development, and quality assurance." | Editorial synthesis of CV profile + verified roles | **VERIFIED & CONSISTENT** | **OWNER-APPROVED DERIVED COPY** |
| **Hero Focus Pillars (01–04)** | 1. **01 / SYSTEMS**: Software Systems & Integration — Fintech accounting systems, operational workflows, and institutional integrations.<br>2. **02 / FULL-STACK**: Application Engineering — Responsive web interfaces, Flutter mobile clients, and backend service integrations.<br>3. **03 / AI & VISION**: Applied AI & Computer Vision — Live camera stream object detection and tracking algorithms on Linux with OpenCV.<br>4. **04 / QUALITY**: Quality Assurance & Review Rigor — Testing protocols, feasibility reviews, and software quality evaluations. | Canonical 4 focus pillars in `src/content/identity.ts` reflecting verified technical areas; unsupported claims purged | **VERIFIED & CONSISTENT** | **OWNER-APPROVED DERIVED COPY** |
| **About Narrative: "practical, reliable digital solutions"** | "turning theoretical concepts into practical, reliable digital solutions" in paragraph 1 of `/about` | Source-grounded refinement of "turn theoretical ideas into tangible outcomes" | **VERIFIED & CONSISTENT** | **OWNER-APPROVED DERIVED COPY** |
| **About Narrative: "engineering ethos"** | Sentence in paragraph 3 of `/about` | Editorial framing of multi-disciplinary technical curiosity | **VERIFIED & CONSISTENT** | **OWNER-APPROVED DERIVED COPY** |
| **Professional Principles** | "Pragmatic Implementation", "End-to-End System Visibility", "Quality & Review Rigor" | Synthesized working principles reflecting verified experience | **VERIFIED & CONSISTENT** | **OWNER-APPROVED DERIVED COPY** |
| **Project 3 Narrative Framing** | Problem/Context: "Real-time object detection on a live video stream."<br>Solution: "Python/PyTorch + OpenCV pipeline for live object detection."<br>Result: "Live pipeline with real-time visual output." | Strict conservative source-grounded framing in `src/content/projects.ts` (`real-time-object-detection`) | **VERIFIED & CONSISTENT** | **OWNER-APPROVED DERIVED COPY** |
| **Experience Role Summaries** | 1-sentence overviews for each of the 9 roles in `src/content/experience.ts` | Editorial condensation of verbatim responsibility bullets | **VERIFIED & CONSISTENT** | **OWNER-APPROVED DERIVED COPY** |

---

## 3. Education & Graduation Project Disambiguation

| Field | Canonical Value | Source File(s) | Source Language(s) | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Institution** | International University of Technology Twintech | All CV variants | English, German, Arabic | **VERIFIED & CONSISTENT** | Canonical university name |
| **Degree** | B.Sc. in Computer Science | All CV variants | English, German, Arabic | **VERIFIED & CONSISTENT** | "B.Sc. in Computer Science" (2021–2025) |
| **Graduation Project** | Object-tracking algorithm on Linux using Python and OpenCV, implemented on a live camera feed with real-time visualization of results. | All CV variants (Education section) | English, German, Arabic | **VERIFIED & CONSISTENT** | Modeled under Education on `/about`. Repository includes final report, transcript, specialization plan, recommendation letters. |
| **Disambiguation vs Project 3** | Sourced separately: Graduation Project is an academic degree milestone on Linux using Python/OpenCV. Project 3 in "Projects & Work" is a personal project: "Real-Time Object Detection: Live Python/PyTorch + OpenCV pipeline." | Official CV (Education vs Projects & Work #3) | English | **VERIFIED & CONSISTENT** | Not conflated. Project 3 does not claim to be the graduation project. |
| **GPA / Honors / Thesis Grade** | *None* | *None* | *None* | **MISSING** | **PURGED**: Fabricated claims ("GPA 89.26%", "Graduated with honors", "Grade: Excellent") were purged completely. |

---

## 4. Professional Experience (Strict CV Grounding — All 9 Canonical Roles)

| Role & Organization | Period | Location | Source File(s) | Status | Key Verified Deliverables |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Asaas AI** — Co-Founder & Director of Quality Assurance | Jan 2026 – Present | Sana'a | All CV variants | **VERIFIED & CONSISTENT** | Set testing and review standards and policies; evaluated software-system and AI-solution quality; reviewed plans, feasibility studies, and product readiness before approval and launch. |
| **AHD Financial Services (Jaib Wallet)** — Deputy Development Manager | Jul 2026 – Present | Sana'a | All CV variants | **VERIFIED & CONSISTENT** | Organize and manage projects; analyze internal development requirements; deliver system integrations with external institutions. |
| **AHD Financial Services (Jaib Wallet)** — Developer, Development Dept. | Jan – Jul 2026 | Sana'a | All CV variants | **VERIFIED & CONSISTENT** | Built a production operations/accounting product integrated with Jaib Wallet workflows; contributed to software development. |
| **AHD Financial Services (Jaib Wallet)** — Development Trainee | Dec 2025 – Jan 2026 | Sana'a | All CV variants | **VERIFIED & CONSISTENT** | Worked with .NET backend logic, SQL databases, web features, testing, and troubleshooting. |
| **AHD Financial Services (Jaib Wallet)** — Customer Service Trainee | Sep – Dec 2025 | Sana'a | All CV variants | **VERIFIED & CONSISTENT** | Handled ticketing-system calls; applied compliance policies. |
| **Water & Sanitation Local Corporation** — Control Engineer Trainee | Aug – Dec 2024 | Al Hudaydah | All CV variants | **VERIFIED & CONSISTENT** | Monitored PLC panels and field signals (pumps, levels, alarms); supported preventive maintenance, wiring, and control-loop troubleshooting; coordinated with technicians, documented faults, and ensured safe restart procedures. |
| **Al-Rahma Foundation** — Network Engineer Trainee | Jan – Dec 2023 | Sana'a | All CV variants | **VERIFIED & CONSISTENT** | Operated and maintained internal LAN/Wi-Fi networks and basic router/switch configurations; supported cabling, routine follow-up, and logs; documented incidents and suggested stability improvements. |
| **Private Project (Healthcare & Apparel)** — Sales | 2020 – 2022 | Sana'a | All CV variants | **VERIFIED & CONSISTENT** | Managed customer relationships, orders, and invoices; organized inventory data and prepared simple sales reports; followed up on purchasing and supplier communication. |
| **Glory of Civilization Schools** — Administrative Assistant Trainee | Jan – Dec 2019 | Sana'a | All CV variants | **VERIFIED & CONSISTENT** | Supported daily school operations, events, schedules, and interdepartmental coordination. |

---

## 5. Projects & Strict Technology Attachment (16 Projects)

Technologies are attached to projects **only** where explicitly supported by the project entry in the official CV:

| ID / Slug | Title | Category | Verified Evidence Depth | Strictly Attached Technologies (Explicitly Sourced) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `real-time-object-detection` | Real-Time Object Detection | Computer Vision & AI | **RICH** | `Python`, `PyTorch`, `OpenCV` | **VERIFIED & CONSISTENT** (Source bullet) / **DERIVED** (Narrative chapters) |
| `pump-station-analytics` | Pump Station Analytics | Systems & Robotics | **BASIC** | `Predictive Maintenance` | **VERIFIED & CONSISTENT** |
| `real-time-image-classification-api` | Real-Time Image Classification API | Computer Vision & AI | **BASIC** | `Python`, `Flask`, `API` | **VERIFIED & CONSISTENT** |
| `robocam-controller` | ROBOCAM Controller | Systems & Robotics | **BASIC** | `Flutter`, `Dart`, `Android` | **VERIFIED & CONSISTENT** |
| `mikrotik-hotspot-portal` | MikroTik Hotspot Portal | Embedded & IoT | **BASIC** | `MikroTik RouterOS`, `Dual-WAN`, `PPPoE`, `Hotspot Portal`, `RADIUS` | **VERIFIED & CONSISTENT** |
| `arduino-traffic-light` | Arduino Traffic Light Controller | Embedded & IoT | **BASIC** | `Arduino` | **VERIFIED & CONSISTENT** |
| `obstacle-avoidance` | Obstacle Avoidance | Computer Vision & AI | **BASIC** | `TensorFlow`, `Depth Estimation` | **VERIFIED & CONSISTENT** |
| `ai-tic-tac-toe` | AI Tic-Tac-Toe | Computer Vision & AI | **BASIC** | `Python`, `Pygame`, `Minimax AI` | **VERIFIED & CONSISTENT** |
| `pacman-pygame` | Pac-Man with Pygame | Full-Stack & Web | **BASIC** | `Python`, `Pygame`, `Collision Detection` | **VERIFIED & CONSISTENT** |
| `text-summarizer` | Text Summarizer | Computer Vision & AI | **BASIC** | `Desktop Application`, `Extractive Summarization` | **VERIFIED & CONSISTENT** |
| `user-role-manager` | User & Role Manager | Full-Stack & Web | **BASIC** | `Oracle Forms 6i`, `PL/SQL` | **VERIFIED & CONSISTENT** |
| `inventory-sales-manager` | Inventory & Sales Manager | Full-Stack & Web | **BASIC** | `Web Application`, `CRUD` | **VERIFIED & CONSISTENT** |
| `student-evaluation-system` | Student Evaluation System | Full-Stack & Web | **BASIC** | `C#`, `Desktop`, `PHP`, `Web` | **VERIFIED & CONSISTENT** |
| `cafe-pos-system` | Café POS System | Full-Stack & Web | **BASIC** | `Java Swing`, `JDBC` | **VERIFIED & CONSISTENT** |
| `omnifood-landing-page` | OMNIFOOD — Responsive Landing Page | Full-Stack & Web | **BASIC** | `Responsive Web` | **VERIFIED & CONSISTENT** |
| `urbanmindos` | URBANMINDOS — Smart City Operating System | Systems & Robotics | **BASIC** | `Concept Design`, `Urban Air Mobility` | **VERIFIED & CONSISTENT** |

---

## 6. Technical Skills & Languages

| Domain | Verified Skills from CV | Source Language(s) | Status |
| :--- | :--- | :--- | :--- |
| **Programming & Applications** | Dart/Flutter, Android Studio, Python, HTML/CSS/JS, C/C++, Java, .NET, C# | English, German, Arabic | **VERIFIED & CONSISTENT** |
| **Data & Computer Science** | Databases (SQL, Oracle Forms 6i + PL/SQL), OOP, Data Structures, Algorithms, Data Mining (Weka/Orange) | English, German, Arabic | **VERIFIED & CONSISTENT** |
| **Systems & Networks** | Routing/Switching & Structured Cabling, Linux & Operating Systems, Hardware & Troubleshooting, MikroTik RouterOS, PPPoE, RADIUS | English, German, Arabic | **VERIFIED & CONSISTENT** |
| **Automation & Control** | PLC (Programmable Logic Controllers), Arduino, Control Loops & Wiring, Solar Energy, Sensors | English, German, Arabic | **VERIFIED & CONSISTENT** |
| **Arabic Language** | Native / Mother tongue (لغة أم) | English, German, Arabic | **VERIFIED & CONSISTENT** |
| **English Language** | B2 (CEFR) | English, German, Arabic | **VERIFIED & CONSISTENT** |
| **German Language** | B1 (CEFR) | English, German, Arabic | **VERIFIED & CONSISTENT** |

---

## 7. Certifications & Courses (26 Verified Records)

| Year | Issuer | Title / Program | Status |
| :--- | :--- | :--- | :--- |
| **2026** | CYBERAI Club | Automation & AI Agents | **VERIFIED & CONSISTENT** |
| **2025** | Yemen Elite Bloc | Research Development | **VERIFIED & CONSISTENT** |
| **2025** | Yemen Intern Platform | Work Ethics, Professional Environment & Teamwork | **VERIFIED & CONSISTENT** |
| **2025** | Yemen Elite Bloc (Technology & IT Sector) | Artificial Intelligence Program (Ongoing) | **VERIFIED & CONSISTENT** |
| **2025** | Yemen Elite Bloc (Technology & IT Sector) | Front-End Development Bootcamp (Ongoing) | **VERIFIED & CONSISTENT** |
| **2025** | New Horizons Institutes | Graphic Design Diploma (In Progress) | **VERIFIED & CONSISTENT** |
| **2025** | Sana'a University – Faculty of Engineering | Deep Learning & Computer Vision | **VERIFIED & CONSISTENT** |
| **2025** | Sana'a University – Faculty of Engineering | Robotics | **VERIFIED & CONSISTENT** |
| **2025** | Sana'a University – Faculty of Engineering | Embedded Systems | **VERIFIED & CONSISTENT** |
| **2025** | Sana'a University – Faculty of Engineering | MATLAB | **VERIFIED & CONSISTENT** |
| **2025** | Sana'a University – Faculty of Engineering | Network Administration | **VERIFIED & CONSISTENT** |
| **2025** | Sana'a University – Faculty of Engineering | Artificial Intelligence & Raspberry Pi | **VERIFIED & CONSISTENT** |
| **2025** | New Horizons Institutes | CompTIA A+ | **VERIFIED & CONSISTENT** |
| **2025** | AI APPROACH CLUB | Data Analysis & Machine Learning | **VERIFIED & CONSISTENT** |
| **2024** | Al-Hamdi Foundation | Medical Program (First Aid, Injection Types, Vital Signs) | **VERIFIED & CONSISTENT** |
| **2024** | New Horizons Institutes | MikroTik Fundamentals | **VERIFIED & CONSISTENT** |
| **2024** | Sana'a University – Faculty of Engineering | Networks | **VERIFIED & CONSISTENT** |
| **2024** | Sana'a University – Faculty of Engineering | Programmable Logic Controllers (PLC) | **VERIFIED & CONSISTENT** |
| **2024** | Sana'a University – Faculty of Engineering | Arduino | **VERIFIED & CONSISTENT** |
| **2024** | Sana'a University – Faculty of Engineering | Solar Energy | **VERIFIED & CONSISTENT** |
| **2024** | Al-Hamdi Foundation | Advanced Digital Marketing | **VERIFIED & CONSISTENT** |
| **2024** | Al-Hamdi Foundation | Small Project Management | **VERIFIED & CONSISTENT** |
| **2024** | Al-Hamdi Foundation | Administrative Program (Business, Human Resources, Customer Service) | **VERIFIED & CONSISTENT** |
| **2023** | Al-Hamdi Foundation | Emergency Humanitarian Response — SPHERE Standards | **VERIFIED & CONSISTENT** |
| **2020** | New Horizons Institutes | ICDL (International Computer Driving Licence) | **VERIFIED & CONSISTENT** |
| **2019** | Science & Technology Center | Mobile Phone Maintenance Diploma | **VERIFIED & CONSISTENT** |

---

## 8. Memberships & Community Engagement (5 Verified Records)

| Organization | Canonical Role / Engagement | Status |
| :--- | :--- | :--- |
| **CYBERAI CLUB** | Member of the Artificial Intelligence and Projects Committees. | **VERIFIED & CONSISTENT** |
| **Society of Petroleum Engineers (SPE)** | Used SPE technical programs to broaden understanding of petroleum engineering and operations. | **VERIFIED & CONSISTENT** |
| **Al-Hamdi Foundation for Human Development** | Program participant and volunteer; supported events and peer learning. | **VERIFIED & CONSISTENT** |
| **Nastatee Charity Association** | Community volunteer supporting youth technology initiatives and event logistics. | **VERIFIED & CONSISTENT** |
| **Yemen Elite Bloc** | Active in AI/robotics and programming units; peer mentoring and event logistics support. | **VERIFIED & CONSISTENT** |

---

## 9. Purged Unsupported / Fabricated Claims (Audit Register)

The following claims were identified as unsupported by the official CV package and have been **purged completely**:

1. **Stale / Incorrect Contact Data:**
   - ❌ `eng.al-hassan.al-shami@outlook.com` → Purged. Canonical email is `hassan1alshami6@gmail.com`.
2. **Unsupported Engineering Roles & Stale Report Items:**
   - ❌ "Computer Systems & AI Engineer" → Purged
   - ❌ "Senior AI Solutions Engineer" → Purged
   - ❌ "Systems Automation Engineer" → Purged
   - ❌ "Robotics Software Developer" → Purged
   - ❌ "Lead Developer & Researcher" on Project 3 → Purged
   - ❌ Stale report roles: "Project Developer — Freelance", "Assistant Supervisor — Al-Rowad", "Technical Assistant & System Setup Specialist", "TeleYemen", "Maintenance & Technical Support Specialist", "International Youth Council Yemen (IYCY)" → Purged from reports and walkthroughs.
3. **Fabricated Metrics & Numbers:**
   - ❌ "GPA 89.26%" → Purged
   - ❌ "Graduated with honors" → Purged
   - ❌ "Grade: Excellent" → Purged
   - ❌ "99.7% uptime" → Purged
   - ❌ "34% reduction" → Purged
   - ❌ "99.4% accuracy" → Purged
   - ❌ "23ms inference" → Purged
   - ❌ "15k+ items" → Purged
   - ❌ "500k+ events" → Purged
   - ❌ "sub-50ms query response" → Purged
   - ❌ "12-station lines" → Purged
4. **Inferred / Ungrounded Project Technology Attachments:**
   - ❌ `REST API` attached to `real-time-image-classification-api` → Purged
   - ❌ `Machine Learning` attached to `real-time-image-classification-api` → Purged
   - ❌ `Robot Control` attached to `robocam-controller` → Purged
   - ❌ `Sensors`, `PLC`, `Industrial Control` attached to `pump-station-analytics` → Purged
   - ❌ `Embedded C/C++`, `Sensors`, `Hardware Logic` attached to `arduino-traffic-light` → Purged
   - ❌ `SQL`, `Point of Sale` attached to `cafe-pos-system` → Purged
   - ❌ `Databases`, `Inventory Management` attached to `inventory-sales-manager` → Purged
   - ❌ `Systems Architecture` attached to `urbanmindos` → Purged
5. **Unsupported External Certifications:**
   - ❌ "Google Cybersecurity certification" → Purged
   - ❌ "IBM certification" → Purged
   - ❌ "DeepLearning.AI certification" → Purged
   - ❌ "Michigan Python credential" → Purged
   - ❌ "NVIDIA certification" → Purged
6. **Inflated Language Proficiency:**
   - ❌ English "Fluent / Professional" → Corrected to **B2**
   - ❌ German "Intermediate B1+" → Corrected to **B1**
7. **Unsupported UI Claims & Phrases Purged in Pre-Merge SSOT Fix:**
   - ❌ "backend REST microservices" → Purged from Hero Focus Pillar 2 (`02 / FULL-STACK`). Replaced with verified "backend service integrations".
   - ❌ "quality benchmarks for production releases" → Purged from Hero Focus Pillar 4 (`04 / QUALITY`). Replaced with verified "software quality evaluations".
   - ❌ "low-latency visual tracking" → Purged from Project 3 (`real-time-object-detection`). Replaced with conservative source-grounded copy: "Real-time object detection on a live video stream."
   - ❌ "turning theoretical concepts into robust, measurable digital products" → Refined to "turning theoretical concepts into practical, reliable digital solutions" on `/about`.
   - ❌ Public label "VERIFIED FOCUS" → Replaced with neutral, accurate label "CORE FOCUS" in Hero showcase header.

