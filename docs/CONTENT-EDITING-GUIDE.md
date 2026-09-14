# Content Editing Guide (Canonical Source of Truth)

This guide documents how to update, add, or remove verified professional facts from the multi-page portfolio without altering any presentation or layout components.

All professional content is strictly organized under:
```
src/content/
```

---

## 1. Directory & File Reference

| Content Domain | File Path | Responsible For |
| :--- | :--- | :--- |
| **Identity** | `src/content/identity.ts` | Full name, short name, professional headline, bio brief, location, email, phone, status badge |
| **Navigation** | `src/content/navigation.ts` | Top-level routes (`/`, `/about`, `/experience`, `/projects`, `/capabilities`, `/contact`), chapter indices, descriptions |
| **About** | `src/content/about.ts` | Narrative paragraphs, Twintech education & graduation thesis, verified languages, working principles |
| **Experience** | `src/content/experience.ts` | Chronological work journey: role, company, period, location, descriptions, deliverables, technologies |
| **Projects** | `src/content/projects.ts` | 16 verified project case studies: slug, title, category, problem, solution, technologies, architecture, result |
| **Skills** | `src/content/skills.ts` | Technical competency groups (Programming, Data, Systems, Automation, Quality) |
| **Credentials** | `src/content/credentials.ts` | 26 certifications & courses, 5 verified community memberships, certificates repo link |
| **Contact** | `src/content/contact.ts` | Direct channels (Email, LinkedIn, GitHub, Instagram), 6 official CV downloads |
| **Social** | `src/content/social.ts` | External profiles & usernames |
| **Site Metadata** | `src/content/siteMetadata.ts` | Production URL, title template, canonical description, keywords for SEO |

---

## 2. Common Content Editing Tasks

### Editing Identity & Positioning
Open `src/content/identity.ts`:
```typescript
export const identityContent: Identity = {
  fullName: "ALHassan Baligh ALShami",
  shortName: "ALHassan ALShami",
  role: "Software Engineer",
  headline: "Software Systems, Full-Stack Engineering & Applied AI",
  bioBrief: "Software engineer combining academic foundations with hands-on systems implementation...",
  location: "Sana'a, Yemen",
  email: "hassan1alshami6@gmail.com",
  phone: "+967 772 765 120",
  statusBadge: {
    label: "Available for Engineering Opportunities",
    showDot: true,
  },
  educationHighlight: "B.Sc. in Computer Science — International University of Technology Twintech (2021–2025)",
};
```

---

### Adding or Updating Work Experience
Open `src/content/experience.ts`:
Add or modify an entry in the `items` array:
```typescript
{
  id: "new-role-slug", // Used for deep linking (/experience#new-role-slug)
  company: "Company Name",
  role: "Role Title",
  period: "Month Year – Present",
  location: "City, Country",
  description: "High-level overview of the position.",
  responsibilities: [
    "Primary responsibility or verified deliverable.",
    "Secondary responsibility or process.",
  ],
  technologies: ["Tech 1", "Tech 2", "Tech 3"],
  isCurrent: true,
}
```

---

### Adding or Updating a Project Case Study
Open `src/content/projects.ts`:
Add a typed `ProjectItem` object to `projectItems`:
```typescript
{
  id: "my-new-project",
  slug: "my-new-project", // Generates route: /projects/my-new-project
  title: "Project Title",
  tagline: "One-line clear description of what was built.",
  category: "Computer Vision & AI", // Choose from verified categories
  badge: "Case Study Badge",
  period: "2025",
  problem: "What technical challenge or operational issue needed solving?",
  role: "Lead Developer",
  solution: "How was the solution engineered and deployed?",
  technologies: ["Python", "PyTorch", "OpenCV"],
  result: "What was the measurable outcome or operational impact?",
  architecture: "Input → Processing → Model Evaluation → Output Canvas",
  implementationHighlights: [
    "Key implementation point 1",
    "Key implementation point 2",
  ],
  githubUrl: "https://github.com/a2sn2/...",
  featured: true, // If true, appears on Homepage curated work
}
```

> [!IMPORTANT]
> The `slug` must be URL-safe (lowercase, dashes only). The Next.js router automatically generates static pages for all slugs via `generateStaticParams()`.

---

### Adding a Certification or Specialized Course
Open `src/content/credentials.ts`:
Add an item to the `certifications` array:
```typescript
{
  id: "cert-unique-id",
  title: "Program or Certification Title",
  issuer: "Institution / Organization",
  year: "2026",
  category: "AI & Data", // "AI & Data" | "Engineering & Hardware" | "Systems & Networks" | "Professional & Management" | "Foundation"
  status: "Completed", // "Completed" | "Ongoing" | "In Progress"
}
```

---

### Adding a Community Membership
Open `src/content/credentials.ts`:
Add an item to the `memberships` array:
```typescript
{
  id: "membership-id",
  organization: "Organization Name",
  role: "Member / Committee",
  description: "Summary of activities, committees, or volunteer contributions.",
}
```

---

### Updating Official CV Downloads
1. Place the new PDF into `public/cv/` with standard naming (e.g. `ALHassan_Baligh_ALShami_CV_English_Standard.pdf`).
2. Update the document entry in `src/content/contact.ts`:
```typescript
{
  label: "English Curriculum Vitae (Standard)",
  language: "English",
  format: "Standard",
  href: "/cv/ALHassan_Baligh_ALShami_CV_English_Standard.pdf",
  filename: "ALHassan_Baligh_ALShami_CV_English_Standard.pdf",
  filesize: "8.3 MB",
}
```

---

## 3. Strict Content Integrity Rules

1. **No Invented Accomplishments:** Every fact, title, employer, and date must come from official sources or be marked as approved derived copy.
2. **No Inflated Metrics:** If a metric is not documented in the official CV, do not invent one.
3. **No Content in UI Components:** Presentation components in `src/components/` must receive their data through props or by importing from `@/content`. Never hardcode text in JSX.
