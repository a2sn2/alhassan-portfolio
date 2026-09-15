import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";
import path from "path";

test.describe("Multi-Page Portfolio Architecture & User Experience", () => {
  test("TC-01: Homepage loads successfully with verified identity and curated highlights", async ({
    page,
  }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // Canonical title
    await expect(page).toHaveTitle(/ALHassan Baligh ALShami/);

    // Hero h1 and verified name
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("ALHassan");
    await expect(h1).toContainText("Baligh ALShami");

    // Verified positioning & status
    await expect(page.locator("text=Available for Engineering Opportunities")).toBeVisible();
    await expect(page.locator("main").locator("text=Sana'a, Yemen")).toBeVisible();

    // Featured Work and Experience snapshots exist on Homepage
    await expect(page.locator("text=Featured Engineering Work")).toBeVisible();
    await expect(page.locator("text=Operational & Leadership Highlights")).toBeVisible();

    // Chapter navigation indicates Chapter 01
    await expect(page.locator("text=CHAPTER 01 / 06")).toBeVisible();
  });

  test("TC-02: Multi-page navigation links navigate to all 6 primary routes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const routes = [
      { href: "/about", heading: "Engineering from Academic Foundations to Production Systems" },
      { href: "/experience", heading: "Professional Experience & Operational Journey" },
      { href: "/projects", heading: "Projects Across Systems, Vision & Applications" },
      { href: "/capabilities", heading: "Technical Capabilities & Engineering Matrix" },
      { href: "/contact", heading: "Get in Touch & Access Official Documents" },
    ];

    for (const r of routes) {
      await page.click(`header nav a[href="${r.href}"]`);
      await page.waitForURL(`**${r.href}`);
      await expect(page.locator("h1")).toContainText(r.heading);
    }
  });

  test("TC-03: Command Palette (Ctrl+K) opens, filters, and navigates", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    // Open palette via header trigger button or shortcut
    const searchBtn = page.locator('button[aria-label*="command palette"]');
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    const dialog = page.getByRole("dialog", {
      name: "Portfolio Navigator & Command Palette",
    });
    await expect(dialog).toBeVisible();

    // Search input exists and receives focus
    const input = page.locator('input[placeholder*="Search"]');
    await expect(input).toBeFocused();

    // Type query to filter
    await input.fill("experience");
    const resultItem = dialog.locator('[role="option"]:has-text("Experience")');
    await expect(resultItem).toBeVisible();

    // Navigate via click
    await resultItem.click();
    await page.waitForURL("**/experience");
    await expect(page.locator("h1")).toContainText(
      "Professional Experience & Operational Journey"
    );

    // Reopen palette and test Escape key to close
    await page.click('button[aria-label*="command palette"]');
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("TC-04: Experience Explorer desktop split tabs & deep linking", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/experience");

    // Left role switcher exists with all items
    const roleButtons = page.locator("button[role='tab']");
    await expect(roleButtons).toHaveCount(9);

    // Initial role details displayed in tabpanel
    const detailPanel = page.locator('[role="tabpanel"]');
    await expect(detailPanel.locator("text=Asaas AI")).toBeVisible();
    await expect(
      detailPanel.locator("text=Co-Founder & Director of Quality Assurance")
    ).toBeVisible();

    // Switch to another role via tab click
    await page.click('button:has-text("AHD Financial Services (Jaib Wallet)")');
    await expect(detailPanel.locator("text=Deputy Development Manager")).toBeVisible();

    // Deep linking via hash parameter
    await page.goto("/experience#water-sanitation-corp");
    await expect(
      detailPanel.locator("text=Water & Sanitation Local Corporation")
    ).toBeVisible();
    await expect(
      detailPanel.locator("text=Control Engineer Trainee")
    ).toBeVisible();
  });

  test("TC-05: Project Explorer category filtering & Case Study graceful degradation", async ({
    page,
  }) => {
    await page.goto("/projects");

    // Verify all 16 projects displayed initially
    const articles = page.locator("article");
    await expect(articles).toHaveCount(16);

    // Filter by 'Computer Vision & AI'
    await page.click('button:has-text("Computer Vision & AI")');
    const filtered = page.locator("article");
    const count = await filtered.count();
    expect(count).toBe(5);

    // 1. Navigate to rich case study (Graduation Project)
    await page.click('a[href="/projects/real-time-object-detection"]');
    await page.waitForURL("**/projects/real-time-object-detection");

    await expect(page.locator("h1")).toContainText("Real-Time Object Detection");
    await expect(page.locator("text=The Problem & Engineering Context")).toBeVisible();
    await expect(page.locator('h2:has-text("Engineered Solution")')).toBeVisible();
    await expect(page.locator("text=Verified Results & Scope")).toBeVisible();

    // 2. Navigate to concise project profile (Basic Tier)
    await page.goto("/projects/pump-station-analytics");
    await expect(page.locator("h1")).toContainText("Pump Station Analytics");
    await expect(page.locator("text=Project Scope & Summary")).toBeVisible();
    await expect(page.locator("text=Verified Technologies")).toBeVisible();

    // Ensure NO empty sections or placeholders exist
    await expect(page.locator("text=The Problem & Engineering Context")).not.toBeVisible();
    await expect(page.locator("text=Engineering Role & Responsibility")).not.toBeVisible();
    await expect(page.locator("text=TBD")).not.toBeVisible();
    await expect(page.locator("text=Awaiting content")).not.toBeVisible();
  });

  test("TC-06: Capabilities Matrix filtering & verified repo link", async ({
    page,
  }) => {
    await page.goto("/capabilities");

    // Capabilities heading
    await expect(page.locator("h1")).toContainText(
      "Technical Capabilities & Engineering Matrix"
    );

    // Skills group cards exist
    await expect(page.locator("text=Programming & Frameworks")).toBeVisible();
    await expect(page.locator("text=Industrial Automation & IoT")).toBeVisible();

    // Verified Certificate repository button exists with correct target
    const repoBtn = page.locator('a[href*="github.com/a2sn2/certificates"]');
    await expect(repoBtn).toBeVisible();

    // Filter Certifications by 'AI & Data'
    await page.click('button:has-text("AI & Data")');
    await expect(page.locator("text=Automation & AI Agents")).toBeVisible();

    // Verify non-matching items hidden
    await expect(page.locator("h3:has-text('Programmable Logic Controllers (PLC)')")).not.toBeVisible();
  });

  test("TC-07: Contact page official CV downloads and direct channels", async ({
    page,
  }) => {
    await page.goto("/contact");

    // Direct contact cards
    await expect(page.locator("text=hassan1alshami6@gmail.com")).toBeVisible();
    await expect(page.locator("text=+967 772 765 120")).toBeVisible();

    // Verify all 6 official CV document download links
    const cvFiles = [
      "ALHassan_Baligh_ALShami_CV_English_Standard.pdf",
      "ALHassan_Baligh_ALShami_CV_English_ATS.pdf",
      "ALHassan_Baligh_ALShami_CV_German_Standard.pdf",
      "ALHassan_Baligh_ALShami_CV_German_ATS.pdf",
      "ALHassan_Baligh_ALShami_CV_Arabic_Standard.pdf",
      "ALHassan_Baligh_ALShami_CV_Arabic_ATS.pdf",
    ];

    for (const file of cvFiles) {
      const link = page.locator(`a[href="/cv/${file}"]`);
      await expect(link).toBeVisible();
    }
  });

  test("TC-08: Mobile navigation drawer interactions on multi-page routes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    // Mobile drawer trigger visible
    const menuBtn = page.locator('button[aria-controls="mobile-nav-drawer"]');
    await expect(menuBtn).toBeVisible();

    // Open drawer
    await menuBtn.click();
    const nav = page.locator("nav[aria-label='Mobile Navigation Links']");
    await expect(nav).toBeVisible();

    // Navigate to /about via drawer
    const aboutLink = nav.locator('a[href="/about"]');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    await page.waitForURL("**/about");
    await expect(page.locator("h1")).toContainText(
      "Engineering from Academic Foundations to Production Systems"
    );
  });

  test("TC-09: Multi-viewport responsive sanity (zero horizontal overflow across all routes)", async ({
    page,
  }) => {
    const viewports = [
      { name: "Desktop 1440", width: 1440, height: 900 },
      { name: "Laptop 1280", width: 1280, height: 800 },
      { name: "Tablet 768", width: 768, height: 1024 },
      { name: "Mobile 390", width: 390, height: 844 },
      { name: "Narrow 320", width: 320, height: 568 },
    ];

    const routes = [
      "/",
      "/about",
      "/experience",
      "/projects",
      "/projects/real-time-object-detection",
      "/projects/pump-station-analytics",
      "/capabilities",
      "/contact",
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const route of routes) {
        await page.goto(route);

        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });

        expect(
          hasHorizontalOverflow,
          `Horizontal scroll detected on ${vp.name} (${vp.width}px) at ${route}`
        ).toBe(false);
      }
    }
  });

  test("TC-10: Automated WCAG 2.1 AA accessibility audit across all primary routes", async ({
    page,
  }) => {
    const routes = [
      "/",
      "/about",
      "/experience",
      "/projects",
      "/projects/real-time-object-detection",
      "/capabilities",
      "/contact",
    ];

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .disableRules(["color-contrast"])
        .analyze();

      expect(
        accessibilityScanResults.violations,
        `Accessibility violations found on route: ${route}`
      ).toEqual([]);
    }
  });

  test("TC-11: Theme toggle persists preference across multi-page navigation", async ({
    page,
  }) => {
    await page.goto("/");
    const toggle = page.locator('button[aria-label*="Switch to"]').first();

    // Toggle theme
    await toggle.click();
    const newTheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );

    // Navigate to another page
    await page.goto("/about");
    const persistedTheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(persistedTheme).toBe(newTheme);
  });

  test("TC-12: Content Integrity & Ground Truth Fact Guard", async ({ page }) => {
    // 1. Verify CV files exist on disk
    const cvFiles = [
      "ALHassan_Baligh_ALShami_CV_English_Standard.pdf",
      "ALHassan_Baligh_ALShami_CV_English_ATS.pdf",
      "ALHassan_Baligh_ALShami_CV_German_Standard.pdf",
      "ALHassan_Baligh_ALShami_CV_German_ATS.pdf",
      "ALHassan_Baligh_ALShami_CV_Arabic_Standard.pdf",
      "ALHassan_Baligh_ALShami_CV_Arabic_ATS.pdf",
    ];

    for (const file of cvFiles) {
      const filePath = path.join(process.cwd(), "public", "cv", file);
      expect(fs.existsSync(filePath), `Missing public CV file: ${file}`).toBe(true);
      const stat = fs.statSync(filePath);
      expect(stat.size, `Empty CV file: ${file}`).toBeGreaterThan(100000);
    }

    // 2. Check /about for verified language levels, practical solutions phrasing, and absence of GPA/honors
    await page.goto("/about");
    const aboutText = await page.innerText("body");
    expect(aboutText).toContain("B2");
    expect(aboutText).toContain("B1");
    expect(aboutText).toContain("turning theoretical concepts into practical, reliable digital solutions");
    expect(aboutText).not.toContain("turning theoretical concepts into robust, measurable digital products");
    // Ensure no unverified honors or GPA claims
    expect(aboutText).not.toContain("89.26");
    expect(aboutText).not.toContain("Graduated with honors");
    expect(aboutText).not.toContain("Grade: Excellent");

    // 3. Check /experience for verified roles and absence of fabricated metrics & stale roles
    await page.goto("/experience");
    const expText = await page.innerText("body");
    expect(expText).toContain("Co-Founder & Director of Quality Assurance");
    expect(expText).toContain("Deputy Development Manager");
    expect(expText).toContain("Control Engineer Trainee");
    expect(expText).toContain("Network Engineer Trainee");

    // Assert zero presence of banned unverified metrics, titles, and stale unsupported roles
    const bannedTerms = [
      "99.7% uptime",
      "34% reduction",
      "99.4% accuracy",
      "23ms inference",
      "15k+ daily",
      "500k+ events",
      "sub-50ms",
      "Senior AI Solutions Engineer",
      "Systems Automation Engineer",
      "Robotics Software Developer",
      "Google Cybersecurity",
      "Jetson Orin",
      "Project Developer — Freelance",
      "Assistant Supervisor",
      "TeleYemen",
      "International Youth Council",
      "backend REST microservices",
      "quality benchmarks for production releases",
      "low-latency visual tracking",
      "robust, measurable digital products",
    ];

    for (const term of bannedTerms) {
      expect(expText, `Found unverified banned term: ${term}`).not.toContain(term);
    }

    // 4. Check / for Core Focus neutral label and presence of 4 canonical focus pillars
    await page.goto("/");
    const homeText = await page.innerText("body");
    expect(homeText).toContain("CORE FOCUS");
    expect(homeText.toUpperCase()).not.toContain("VERIFIED FOCUS");
    expect(homeText).not.toContain("backend REST microservices");
    expect(homeText).not.toContain("quality benchmarks for production releases");
    expect(homeText).toContain("Software Systems & Integration");
    expect(homeText).toContain("Application Engineering");
    expect(homeText).toContain("Applied AI & Computer Vision");
    expect(homeText).toContain("Quality Assurance & Review Rigor");

    // 5. Check /contact for canonical email and zero presence of old outlook address
    await page.goto("/contact");
    const contactText = await page.innerText("body");
    expect(contactText).toContain("hassan1alshami6@gmail.com");
    expect(contactText).not.toContain("eng.al-hassan.al-shami@outlook.com");

    // 6. Check /projects/real-time-object-detection has conservative copy and no unsupported phrasing
    await page.goto("/projects/real-time-object-detection");
    const projectDetailText = await page.innerText("body");
    expect(projectDetailText).not.toContain("Lead Developer & Researcher");
    expect(projectDetailText).not.toContain("low-latency visual tracking");
    expect(projectDetailText).toContain("Real-time object detection on a live video stream.");
    expect(projectDetailText).toContain("Python/PyTorch + OpenCV pipeline for live object detection.");
    expect(projectDetailText).toContain("Live pipeline with real-time visual output.");
  });
});
