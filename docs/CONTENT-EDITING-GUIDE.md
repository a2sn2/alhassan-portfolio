# Content Editing Guide (Canonical Source of Truth)

This guide documents how to update, add, or remove verified professional facts from the portfolio without touching any layout or UI presentation components.

All professional content lives strictly under:
```
src/content/
```

---

## 1. Directory & File Reference

| Content Domain | File Path | Responsible For |
| :--- | :--- | :--- |
| **Identity** | `src/content/identity.ts` | Full name, short name, professional headline, bio brief, location, status badge |
| **Navigation** | `src/content/navigation.ts` | Header nav links, target anchors (`#about`, `#experience`, etc.) |
| **About** | `src/content/about.ts` | Section header, narrative paragraphs, engineering pillars/values |
| **Experience** | `src/content/experience.ts` | Work history: roles, companies, dates, locations, bullets, technologies |
| **Projects** | `src/content/projects.ts` | Featured projects: title, summary, highlights, tech tags, links |
| **Skills** | `src/content/skills.ts` | Technical competencies grouped by category (Architecture, Frontend, etc.) |
| **Proof** | `src/content/proof.ts` | Quantitative metrics, testimonials, verifiable credentials |
| **Contact** | `src/content/contact.ts` | Email address, location, response time, booking availability |
| **Social** | `src/content/social.ts` | External profiles: GitHub, LinkedIn, etc. |
| **Site Metadata** | `src/content/siteMetadata.ts` | Production URL, title template, description, keywords for SEO |

---

## 2. Common Content Editing Tasks

### Changing Your Name, Title, or Headline
Open `src/content/identity.ts`:
```typescript
export const identityContent = {
  fullName: "ALHassan Baligh ALShami",
  shortName: "ALHassan ALShami",
  role: "Senior Software Engineer", // <-- Update title here
  headline: "Software Engineer specializing in...", // <-- Update headline here
  bioBrief: "Building robust, human-centric software systems...",
  location: "Damascus, Syria",
  statusBadge: {
    label: "Available for engineering roles",
    showDot: true,
  },
} satisfies Identity;
```

---

### Adding or Updating Work Experience
Open `src/content/experience.ts`. To add a new position, add an item to the `items` array:
```typescript
{
  id: "lead-engineer-acme",
  role: "Lead Front-End Architect",
  company: "Acme Corp",
  location: "Remote",
  period: "2025 — Present",
  description: "Led frontend architecture migration to Next.js App Router.",
  highlights: [
    "Improved Core Web Vitals (LCP < 1.2s, CLS 0.00).",
    "Architected decoupled typed content contracts across 12 teams."
  ],
  technologies: ["Next.js", "TypeScript", "React", "Playwright"],
  isCurrent: true,
}
```

> [!NOTE]
> If a field is not verified or not applicable (e.g. `companyUrl`), simply omit it. Do **not** invent dates or achievements.

---

### Adding or Editing Projects
Open `src/content/projects.ts`:
```typescript
{
  id: "telecom-billing-engine",
  title: "Real-time Telecom Billing Engine",
  summary: "High-throughput mediation and CDR processing system handling 50M+ events daily.",
  category: "Systems Engineering",
  highlights: [
    "Engineered sub-millisecond mediation pipelines.",
    "Integrated automated reconciliation and audit auditing."
  ],
  tags: ["C++", "Distributed Systems", "SQL", "Linux"],
  links: [
    {
      label: "GitHub Repository",
      url: "https://github.com/a2sn2/example",
      type: "github"
    }
  ],
  featured: true,
}
```

---

### Updating Skills
Open `src/content/skills.ts`. Skills are grouped into logical clusters:
```typescript
export const skillsContent = {
  sectionTitle: "Skills & Expertise",
  sectionSubtitle: "Core competencies developed across systems, front-end architecture, and platform engineering.",
  categories: [
    {
      id: "architecture",
      name: "Architecture & Systems",
      skills: ["Clean Architecture", "Distributed Systems", "API Design", "Performance Optimization"],
    },
    {
      id: "frontend",
      name: "Front-End Engineering",
      skills: ["React", "Next.js", "TypeScript", "Modern CSS", "Accessibility (WCAG)"],
    },
    // Add or modify skill groups here
  ],
} satisfies SkillsContent;
```

---

### Updating Contact Methods & Social Links
1. Email and availability: Open `src/content/contact.ts`.
2. Social profiles (e.g. GitHub, LinkedIn): Open `src/content/social.ts`.
```typescript
export const socialLinks = [
  {
    platform: "GitHub",
    username: "a2sn2",
    url: "https://github.com/a2sn2",
  },
  {
    platform: "LinkedIn",
    username: "alhassan-alshami",
    url: "https://linkedin.com/in/alhassan-alshami",
  },
] satisfies SocialLink[];
```

---

## 3. Adding Assets (Photos, Logos, Badges)

Static assets must be placed inside the structured directories under `public/images/`:
- **Headshots / Profile Photos:** `public/images/profile/` (e.g., `public/images/profile/avatar.jpg`)
- **Project Screenshots:** `public/images/projects/` (e.g., `public/images/projects/billing-system.webp`)
- **Company Logos:** `public/images/companies/`
- **Certificate Credentials:** `public/images/certificates/`

Once placed in `public/`, reference the asset by relative URL in the content file:
```typescript
image: "/images/projects/billing-system.webp",
```

---

## 4. Reordering Sections on the Homepage
If you wish to reorder how sections appear on the homepage, open `src/app/page.tsx`. Reorder the JSX components:
```tsx
<HeroSection ... />
<AboutSection ... />
<ExperienceSection ... />
<ProjectsSection ... />
<SkillsSection ... />
<ProofSection ... />
<ContactSection ... />
```
Then ensure `src/content/navigation.ts` reflects the updated visual order.

---

## 5. Validation Checklist After Editing Content

After updating content, verify that you didn't introduce syntax or contract violations:
```bash
# 1. Typecheck: verifies all content conforms to contracts
npx tsc --noEmit

# 2. Linting: catches formatting errors
npm run lint

# 3. Test build: ensures zero prerender failures
npm run build
```
If `npx tsc --noEmit` fails, TypeScript will point to the exact file and line where a required property was missing or mismatched.
