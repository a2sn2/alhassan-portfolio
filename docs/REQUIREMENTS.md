# Project Requirements (Functional Specifications)

**Project:** ALHassan Baligh ALShami — Personal Portfolio Platform  
**Owner:** ALHassan Baligh ALShami  
**Status:** Approved Baseline  

---

## 1. Core Mission & User Personas

The portfolio serves as the primary public professional presence for **ALHassan Baligh ALShami**.

### Primary Audience / Personas:
1. **Engineering Leaders & CTOs:** Assessing architectural maturity, code craftsmanship, systems thinking, and technical breadth.
2. **Technical Recruiters & Talent Partners:** Rapidly scanning for core technologies, verified experience, roles, and direct contact avenues.
3. **Collaborators & Peers:** Exploring technical projects, open-source work, and engineering philosophy.

---

## 2. Functional Requirements Matrix

### FR-01: Canonical Identity & Hero Presentation
- **FR-01.1:** Display verified full name (`ALHassan Baligh ALShami`) and professional role (`Software Engineer`).
- **FR-01.2:** Present professional summary/headline and availability status badge.
- **FR-01.3:** Provide primary and secondary calls to action (e.g. view projects, contact) with working anchor destinations.

### FR-02: About & Engineering Pillars
- **FR-02.1:** Present biographical narrative articulating engineering approach and systems philosophy.
- **FR-02.2:** Showcase engineering pillars (Scalability & Architecture, Craftsmanship & Clean Code, Systems Design).

### FR-03: Work Experience & Career Trajectory
- **FR-03.1:** Display chronological career timeline of verified roles.
- **FR-03.2:** Each experience entry must show role, company, period, description, impact bullets, and technology tags.
- **FR-03.3:** Gracefully handle missing or upcoming role details without layout deformation.

### FR-04: Featured Engineering Projects
- **FR-04.1:** Display verified technical projects with title, category, summary, impact highlights, and tech stack tags.
- **FR-04.2:** Provide verified external links (e.g., GitHub repo, live demo). Missing links must omit broken button anchors gracefully.

### FR-05: Skills & Competencies Architecture
- **FR-05.1:** Group technical competencies into logical categories (Systems & Architecture, Front-End, Platforms & Tooling).
- **FR-05.2:** Render individual skills as clean, accessible tags.

### FR-06: Verifiable Proof & Credentials
- **FR-06.1:** Present quantitative metrics or impact indicators.
- **FR-06.2:** Support verified testimonials, endorsements, or certificates when available. Omit cleanly if empty.

### FR-07: Contact & Social Integrations
- **FR-07.1:** Provide direct email communication link (`mailto:`) with explicit expected response window.
- **FR-07.2:** Present verified social links (GitHub profile `https://github.com/a2sn2`).

### FR-08: Responsive Multi-Device Navigation
- **FR-08.1:** Desktop navigation bar with brand anchor, section links, and contact CTA.
- **FR-08.2:** Mobile navigation drawer triggered by an accessible hamburger button on screens ≤ 768px.
- **FR-08.3:** Mobile drawer must support touch closing, backdrop clicks, Escape key listener, and focus trapping.
- **FR-08.4:** Accessible skip-link allowing keyboard users to bypass navigation directly to main content.

---

## 3. Scope Boundaries & Explicit Exclusions

| Capability | In Scope? | Justification |
| :--- | :--- | :--- |
| **Static Content Delivery** | Yes | Primary portfolio goal. |
| **SEO & Structured Data** | Yes | Discoverability for recruitment and industry recognition. |
| **Automated A11y & E2E Tests**| Yes | Verification of non-functional quality gates. |
| **Authentication / Login** | **No** | Public website; no user accounts exist. |
| **Database / CMS** | **No** | Verified content is maintained statically in Git. |
| **Contact Form Backend** | **No** | Standard `mailto:` meets current needs without spam bots/API keys. |
| **Full Multilingual / RTL** | Conditional | Architecture uses logical properties for future support; translation deferred. |
