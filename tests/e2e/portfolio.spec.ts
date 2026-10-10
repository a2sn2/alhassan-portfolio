import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";
import path from "path";
import { projectItems } from "@/content/projects";
import { projectItemsDe } from "@/content/de/projects";

async function switchLanguage(
  page: Page,
  targetLang: "English" | "العربية" | "Deutsch"
) {
  const trigger = page.locator('header button[class*="langTrigger"], header button[aria-haspopup="menu"]').first();
  if (await trigger.isVisible()) {
    await trigger.click();
    const option = page.locator(`header [class*="langPopover"] a:has-text("${targetLang}"), header a[role="menuitem"]:has-text("${targetLang}")`).first();
    await expect(option).toBeVisible();
    await option.click();
  } else {
    const directLink = page.locator(`header a:has-text("${targetLang}")`).first();
    await expect(directLink).toBeVisible();
    await directLink.click();
  }
}

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
    await page.waitForLoadState("networkidle");

    // Open palette via header trigger button or shortcut
    const searchBtn = page.locator('button[aria-label*="command palette" i]').first();
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    const dialog = page.getByRole("dialog", {
      name: "Portfolio Navigator & Command Palette",
    });
    // In case click landed during hydration, trigger shortcut fallback
    if (!(await dialog.isVisible())) {
      await searchBtn.click();
    }
    if (!(await dialog.isVisible())) {
      await page.keyboard.press("Control+k");
    }
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
    await page.locator('button[aria-label*="command palette" i]').first().click();
    if (!(await dialog.isVisible())) {
      await page.keyboard.press("Control+k");
    }
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
    await page.click("#tab-ahd-financial-deputy");
    await expect(detailPanel.locator("h2", { hasText: "Deputy Development Manager" })).toBeVisible();

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

    // Verify all 17 projects displayed initially
    const articles = page.locator("article");
    await expect(articles).toHaveCount(17);

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
    const repoBtn = page.locator('a[href*="github.com/a2sn2/certificates"]').first();
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

    // A fixed drawer inside a backdrop-filter header can collapse to 0px
    // because the filter establishes a containing block for fixed children.
    // Require the drawer to be a viewport-fixed sibling of the header.
    const drawer = page.locator("#mobile-nav-drawer");
    expect(await drawer.evaluate((element) => element.parentElement === document.body)).toBe(true);
    const drawerBounds = await drawer.boundingBox();
    expect(drawerBounds).not.toBeNull();
    expect(drawerBounds!.height).toBeGreaterThan(600);
    expect(drawerBounds!.y).toBeGreaterThanOrEqual(60);


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
    expect(aboutText).toContain("turn theoretical ideas into tangible outcomes in engineering environments");
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

    // 7. Check /projects for absence of fabricated system status labels and flow arrows
    await page.goto("/projects");
    const projectsBody = await page.innerText("body");
    expect(projectsBody).not.toContain("SPECIFICATION ACTIVE");
    expect(projectsBody).not.toContain("VERIFIED PIPELINE");
    expect(projectsBody).not.toContain("SYS.REF");
    const connectorArrows = page.locator('span[class*="schematicConnector"]');
    await expect(connectorArrows).toHaveCount(0);
  });

  test("TC-13: Comprehensive high-level English CV coverage across public pages", async ({
    page,
  }) => {
    // 1. /about exposes official Profile, Education, Languages, and Interests
    await page.goto("/about");
    const aboutBody = await page.innerText("body");
    expect(aboutBody).toContain("Software engineer combining academic knowledge");
    expect(aboutBody).toContain("International University of Technology Twintech");
    expect(aboutBody).toContain("Object-Tracking Algorithm on Linux Using Python and OpenCV");
    expect(aboutBody.toLowerCase()).toContain("languages & communication");
    expect(aboutBody).toContain("Arabic");
    expect(aboutBody).toContain("English");
    expect(aboutBody).toContain("German");
    expect(aboutBody).toContain("Engineering Interests & Broader Pursuits");
    expect(aboutBody.toLowerCase()).toContain("community focus");
    expect(aboutBody.toLowerCase()).toContain("personal focus");
    expect(aboutBody.toLowerCase()).toContain("technical focus");
    expect(aboutBody).toContain("Open source");

    // 2. /experience exposes all verified organizations
    await page.goto("/experience");
    const expBody = await page.innerText("body");
    expect(expBody).toContain("Asaas AI");
    expect(expBody).toContain("AHD for Financial Services – Jaib Wallet");
    expect(expBody).toContain("Water & Sanitation Local Corporation");
    expect(expBody).toContain("Al-Rahma Foundation");
    expect(expBody).toContain("Private Project (Healthcare & Apparel)");
    expect(expBody).toContain("Glory of Civilization Schools");

    // 3. /capabilities exposes technical skills, certifications, and memberships
    await page.goto("/capabilities");
    const capBody = await page.innerText("body");
    expect(capBody).toContain("CYBERAI CLUB");
    expect(capBody).toContain("Society of Petroleum Engineers");
    expect(capBody).toContain("Al-Hamdi Foundation for Human Development");
    expect(capBody).toContain("Nastatee Charity Association");
    expect(capBody).toContain("Yemen Elite Bloc");
    expect(capBody).toContain("Automation & AI Agents");

    // 4. /contact exposes verified channels, socials, and protects references privacy
    await page.goto("/contact");
    const contactBody = await page.innerText("body");
    expect(contactBody).toContain("hassan1alshami6@gmail.com");
    expect(contactBody).toContain("+967 772 765 120");
    expect(contactBody).toContain("Haddah, Sana'a, Yemen");
    expect(contactBody).toContain("linkedin.com/in/a2sn4");
    expect(contactBody).toContain("github.com/a2sn2");
    expect(contactBody).toContain("@a2s.n4");
    expect(contactBody).toContain("References Policy");
    expect(contactBody).toContain("available upon request");
    // Ensure third-party private phone numbers are not published
    expect(contactBody).not.toContain("+967 774 760 761");
    expect(contactBody).not.toContain("+967 777 877 766");
  });

  // ============================================================
  // ARABIC PORTFOLIO PARITY & RTL USER EXPERIENCE TESTS
  // ============================================================

  test("TC-14: Arabic Homepage (/ar) loads with verified Arabic identity, RTL root, and focus pillars", async ({
    page,
  }) => {
    const response = await page.goto("/ar");
    expect(response?.status()).toBe(200);

    // Document lang and dir
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");

    // Canonical title in Arabic
    await expect(page).toHaveTitle(/الحسن بليغ الشامي/);

    // Hero h1 and verified name
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("الحسن");
    await expect(h1).toContainText("بليغ الشامي");

    // Availability and location
    await expect(page.locator("text=متاح للفرص الهندسية والتقنية")).toBeVisible();
    await expect(page.locator("main").locator("text=حدة – صنعاء – اليمن")).toBeVisible();

    // Featured Work and Experience snapshots exist on Arabic Homepage
    await expect(page.locator("text=أعمال هندسية مختارة")).toBeVisible();
    await expect(page.locator("text=أبرز المحطات التشغيلية والقيادية")).toBeVisible();

    // Chapter navigation indicates Chapter 01
    await expect(page.locator("text=الفصل 01 / 06")).toBeVisible();
  });

  test("TC-15: Bidirectional language switcher preserves exact route", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. From /about -> /ar/about
    await page.goto("/about");
    await switchLanguage(page, "العربية");
    await page.waitForURL("**/ar/about");
    await expect(page.locator("h1")).toContainText("الهندسة من الأسس الأكاديمية إلى الأنظمة الإنتاجية");

    // 2. From /ar/about -> /about
    // Use negative-lookahead regex: /^(?!.*\/ar\/).*\/about/ matches /about but NOT /ar/about
    await switchLanguage(page, "English");
    await page.waitForURL(/^(?!.*\/ar\/).*\/about/);
    await expect(page.locator("h1")).toContainText("Engineering from Academic Foundations to Production Systems");

    // 3. From project detail /projects/real-time-object-detection -> /ar/projects/real-time-object-detection
    await page.goto("/projects/real-time-object-detection");
    await switchLanguage(page, "العربية");
    await page.waitForURL(/\/ar\/projects\/real-time-object-detection/);
    await expect(page.locator("h1")).toContainText("كشف الأجسام بالزمن الحقيقي");

    // 4. From /ar/projects/real-time-object-detection -> /projects/real-time-object-detection
    await switchLanguage(page, "English");
    // Negative-lookahead: matches /projects/real-time-... but NOT /ar/projects/real-time-...
    await page.waitForURL(/^(?!.*\/ar\/).*\/projects\/real-time-object-detection/);
    await expect(page.locator("h1")).toContainText("Real-Time Object Detection");
  });

  test("TC-16: Arabic multi-page navigation links navigate to all 6 primary Arabic routes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ar");

    const routes = [
      { href: "/ar/about", heading: "الهندسة من الأسس الأكاديمية إلى الأنظمة الإنتاجية" },
      { href: "/ar/experience", heading: "الخبرات العملية والمسار التشغيلي" },
      { href: "/ar/projects", heading: "المشاريع عبر الأنظمة، والرؤية، والتطبيقات" },
      { href: "/ar/capabilities", heading: "القدرات التقنية ومصفوفة الهندسة" },
      { href: "/ar/contact", heading: "تواصل معي واحصل على المستندات الرسمية" },
    ];

    for (const r of routes) {
      await page.click(`header nav a[href="${r.href}"]`);
      await page.waitForURL(`**${r.href}`);
      await expect(page.locator("h1")).toContainText(r.heading);
      // Ensure RTL is maintained on every route
      const dir = await page.locator("html").getAttribute("dir");
      expect(dir).toBe("rtl");
    }
  });

  test("TC-17: Arabic Command Palette opens, searches in Arabic, and navigates", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ar");
    await page.waitForLoadState("networkidle");

    // Open palette via Arabic header trigger button ("تنقل")
    const searchBtn = page.locator('header button[aria-label*="لوحة الأوامر"]').first();
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    const dialog = page.getByRole("dialog", {
      name: "المستكشف ولوحة الأوامر",
    });
    if (!(await dialog.isVisible())) {
      await searchBtn.click();
    }
    if (!(await dialog.isVisible())) {
      await page.keyboard.press("Control+k");
    }
    await expect(dialog).toBeVisible();

    // Search input exists and receives focus
    const input = page.locator('input[placeholder*="ابحث"]');
    await expect(input).toBeFocused();

    // Type query to filter in Arabic
    await input.fill("الخبرات");
    const resultItem = dialog.locator('[role="option"]:has-text("الخبرات العملية")');
    await expect(resultItem).toBeVisible();

    // Navigate via click
    await resultItem.click();
    await page.waitForURL("**/ar/experience");
    await expect(page.locator("h1")).toContainText("الخبرات العملية والمسار التشغيلي");
  });

  test("TC-18: Arabic Experience Explorer and Project Explorer Case Study degradation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Experience Explorer in Arabic
    await page.goto("/ar/experience");
    const roleButtons = page.locator("button[role='tab']");
    await expect(roleButtons).toHaveCount(9);

    const detailPanel = page.locator('[role="tabpanel"]');
    await expect(detailPanel.locator("text=شركة أساس الذكاء الاصطناعي")).toBeVisible();
    await expect(
      detailPanel.locator("text=شريك مؤسس و مدير إدارة ضمان الجودة")
    ).toBeVisible();

    // Switch tab
    await page.click('button:has-text("المؤسسة المحلية للمياه والصرف الصحي")');
    await expect(detailPanel.locator("text=متدرب مهندس تحكّم")).toBeVisible();

    // 2. Project Explorer in Arabic
    await page.goto("/ar/projects");
    const articles = page.locator("article");
    await expect(articles).toHaveCount(17);

    // Filter by 'الرؤية الحاسوبية والذكاء الاصطناعي'
    await page.click('button:has-text("الرؤية الحاسوبية والذكاء الاصطناعي")');
    const filtered = page.locator("article");
    expect(await filtered.count()).toBe(5);

    // Navigate to rich case study
    await page.click('a[href="/ar/projects/real-time-object-detection"]');
    await page.waitForURL("**/ar/projects/real-time-object-detection");
    await expect(page.locator("h1")).toContainText("كشف الأجسام بالزمن الحقيقي");
    await expect(page.locator("text=المشكلة وسياق الهندسة").first()).toBeVisible();
    await expect(page.locator('h2:has-text("الحل الهندسي المنفّذ")')).toBeVisible();
    await expect(page.locator("text=النتائج المعتمدة ونطاق التسليم").first()).toBeVisible();

    // Backlink points to /ar/projects
    const backLink = page.locator('a:has-text("العودة إلى كافة المشاريع")');
    await expect(backLink).toBeVisible();
    expect(await backLink.getAttribute("href")).toBe("/ar/projects");

    // Navigate to concise project profile (Basic Tier)
    await page.goto("/ar/projects/pump-station-analytics");
    await expect(page.locator("h1")).toContainText("تحليلات محطة الضخ");
    await expect(page.locator("text=نطاق المشروع وملخصه")).toBeVisible();
    await expect(page.locator("text=التقنيات المعتمدة")).toBeVisible();
  });

  test("TC-19: Arabic Capabilities Matrix & Contact Official CV Downloads", async ({
    page,
  }) => {
    // 1. Capabilities
    await page.goto("/ar/capabilities");
    await expect(page.locator("h1")).toContainText(
      "القدرات التقنية ومصفوفة الهندسة"
    );
    await expect(page.locator("text=التخصصات والكفاءات الهندسية")).toBeVisible();
    await expect(page.locator("text=CYBERAI CLUB").first()).toBeVisible();
    await expect(page.locator("text=تكتل نخبة اليمن").first()).toBeVisible();
    const repoBtn = page.locator('a[href*="github.com/a2sn2/certificates"]').first();
    await expect(repoBtn).toBeVisible();

    // 2. Contact
    await page.goto("/ar/contact");
    await expect(page.locator("text=hassan1alshami6@gmail.com")).toBeVisible();
    await expect(page.locator("text=+967772765120")).toBeVisible();
    await expect(page.locator("text=سياسة المعرفين المهنيين")).toBeVisible();

    // Verify all 6 CV download links exist on Arabic contact page
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

  test("TC-20: Arabic responsive sanity (zero horizontal overflow across all Arabic routes)", async ({
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
      "/ar",
      "/ar/about",
      "/ar/experience",
      "/ar/projects",
      "/ar/projects/real-time-object-detection",
      "/ar/projects/pump-station-analytics",
      "/ar/capabilities",
      "/ar/contact",
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

  test("TC-21: Document Locale Sync on direct Arabic load and bidirectional transitions", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Direct load of Arabic URL
    await page.goto("/ar/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

    // Switch to English
    await switchLanguage(page, "English");
    await page.waitForURL(/^(?!.*\/ar\/).*\/about/);
    expect(page.url()).toContain("/about");
    expect(page.url()).not.toContain("/ar");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

    // Switch back to Arabic
    await switchLanguage(page, "العربية");
    await page.waitForURL(/\/ar\/about/);
    expect(page.url()).toContain("/ar/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("TC-22: Document Locale Sync on direct English load and transitions", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Direct load of English URL
    await page.goto("/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

    // Switch to Arabic
    await switchLanguage(page, "العربية");
    await page.waitForURL(/\/ar\/about/);
    expect(page.url()).toContain("/ar/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

    // Switch back to English
    await switchLanguage(page, "English");
    await page.waitForURL(/^(?!.*\/ar\/).*\/about/);
    expect(page.url()).toContain("/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  });

  test("TC-23: Language Switcher preserves query parameters and hash anchors", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Deep link hash preservation: /experience#ahd-financial-deputy -> /ar/experience#ahd-financial-deputy
    await page.goto("/experience#ahd-financial-deputy");
    await switchLanguage(page, "العربية");
    await page.waitForURL("**/ar/experience#ahd-financial-deputy");
    expect(page.url()).toContain("/ar/experience#ahd-financial-deputy");

    // Switch back from Arabic with hash
    await switchLanguage(page, "English");
    await page.waitForURL(/^(?!.*\/ar\/).*\/experience/);
    expect(page.url()).toContain("/experience#ahd-financial-deputy");
    expect(page.url()).not.toContain("/ar");

    // 2. Query parameter preservation: /projects?filter=systems -> /ar/projects?filter=systems
    await page.goto("/projects?filter=systems");
    await switchLanguage(page, "العربية");
    await page.waitForURL(/\/ar\/projects/);
    expect(page.url()).toContain("/ar/projects?filter=systems");

    await switchLanguage(page, "English");
    await page.waitForURL(/^(?!.*\/ar\/).*\/projects/);
    expect(page.url()).toContain("/projects?filter=systems");
    expect(page.url()).not.toContain("/ar");
  });

  test("TC-24: Metadata SEO hardening, reciprocal hreflang, and claim grounding", async ({
    page,
  }) => {
    // 1. Root / and /ar and /de hreflang reciprocal links
    await page.goto("/");
    const enCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(enCanonical).not.toContain("/ar/ar");
    const enAltEn = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute("href");
    const enAltAr = await page.locator('link[rel="alternate"][hreflang="ar"]').getAttribute("href");
    const enAltDe = await page.locator('link[rel="alternate"][hreflang="de"]').getAttribute("href");
    const enAltXDefault = await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute("href");
    expect(enAltEn).toBeTruthy();
    expect(enAltAr).toContain("/ar");
    expect(enAltDe).toContain("/de");
    expect(enAltXDefault).toBeTruthy();

    // 2. Arabic route metadata checks (no /ar/ar anywhere, locale = ar_YE)
    await page.goto("/ar/contact");
    const arContactCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(arContactCanonical).not.toContain("/ar/ar");
    expect(arContactCanonical).toContain("/ar/contact");
    const arContactXDefault = await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute("href");
    expect(arContactXDefault).toBeTruthy();
    expect(arContactXDefault).not.toContain("/ar");

    const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute("content");
    expect(ogLocale).toBe("ar_YE");

    // Contact notice card does NOT contain unapproved UTC+3 claim
    const noticeText = await page.locator('p:has-text("المقر: صنعاء، اليمن")').textContent();
    expect(noticeText).toContain("صنعاء، اليمن");
    expect(noticeText).not.toContain("UTC+3");
    expect(noticeText).not.toContain("بدوام كامل");

    // 3. Project detail metadata does NOT overclaim for basic tier project
    await page.goto("/ar/projects/pump-station-analytics");
    const arProjCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(arProjCanonical).not.toContain("/ar/ar");
    const metaDesc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(metaDesc).not.toContain("النطاق الهندسي المعتمد والبنية المعمارية والنتائج");

    // 4. Arabic Home certifications wording check
    await page.goto("/ar");
    await expect(page.locator("text=26 شهادة ودورة")).toBeVisible();
    await expect(page.locator("text=26 شهادة تخصصية معتمدة")).toHaveCount(0);
  });

  test("TC-25: German Homepage (/de) loads with verified German identity, LTR root, and focus pillars", async ({
    page,
  }) => {
    const response = await page.goto("/de");
    expect(response?.status()).toBe(200);

    // Root html attributes
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

    // Hero identity and verified German role
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("ALHassan");
    await expect(h1).toContainText("Baligh ALShami");

    // German role & location
    await expect(page.locator("text=Softwareentwickler").first()).toBeVisible();
    await expect(page.locator("text=Haddah, Sanaa, Jemen").first()).toBeVisible();
    await expect(page.locator("text=Verfügbar für Software- & Engineering-Projekte")).toBeVisible();

    // Featured Work and Experience snapshots exist on German Homepage
    await expect(page.locator("text=Ausgewählte Ingenieurarbeiten")).toBeVisible();
    await expect(page.locator("text=Operative & leitende Meilensteine")).toBeVisible();

    // Chapter navigation indicates Chapter 01 in German
    await expect(page.locator("text=KAPITEL 01 / 06")).toBeVisible();
  });

  test("TC-26: Trilingual language switcher navigates between EN, AR, and DE with full preservation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. From /about -> /de/about
    await page.goto("/about");
    await switchLanguage(page, "Deutsch");
    await page.waitForURL("**/de/about");
    expect(page.url()).toContain("/de/about");
    await expect(page.locator("h1")).toContainText("Vom akademischen Fundament zu produktiven Systemen");
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

    // 2. From /de/about -> /ar/about
    await switchLanguage(page, "العربية");
    await page.waitForURL("**/ar/about");
    expect(page.url()).toContain("/ar/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

    // 3. From /ar/about -> /about (English)
    await switchLanguage(page, "English");
    await page.waitForURL(/^(?!.*(\/ar\/|\/de\/)).*\/about/);
    expect(page.url()).toContain("/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

    // 4. Hash preservation into German: /experience#ahd-financial-deputy -> /de/experience#ahd-financial-deputy
    await page.goto("/experience#ahd-financial-deputy");
    await switchLanguage(page, "Deutsch");
    await page.waitForURL("**/de/experience#ahd-financial-deputy");
    expect(page.url()).toContain("/de/experience#ahd-financial-deputy");

    // 5. Query parameter preservation into German: /projects?filter=systems -> /de/projects?filter=systems
    await page.goto("/projects?filter=systems");
    await switchLanguage(page, "Deutsch");
    await page.waitForURL(/\/de\/projects/);
    expect(page.url()).toContain("/de/projects?filter=systems");
  });

  test("TC-27: German multi-page navigation links navigate to all 6 primary German routes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/de");

    const routes = [
      { href: "/de/about", heading: "Vom akademischen Fundament zu produktiven Systemen" },
      { href: "/de/experience", heading: "Berufserfahrung & Operative Praxis" },
      { href: "/de/projects", heading: "Entwicklungsprojekte in Systemen, Vision & Web" },
      { href: "/de/capabilities", heading: "Technische Kenntnisse & Kompetenzmatrix" },
      { href: "/de/contact", heading: "Kontakt aufnehmen & Offizielle Dokumente herunterladen" },
    ];

    for (const r of routes) {
      await page.click(`header nav a[href="${r.href}"]`);
      await page.waitForURL(`**${r.href}`);
      await expect(page.locator("h1")).toContainText(r.heading);
      await expect(page.locator("html")).toHaveAttribute("lang", "de");
      await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    }
  });

  test("TC-28: German Command Palette opens, searches in German, and navigates", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/de");
    await page.waitForLoadState("networkidle");

    // Open palette
    const searchBtn = page.locator('header button[aria-label*="Befehlspalette öffnen"]').first();
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    const dialog = page.getByRole("dialog", {
      name: "Portfolio-Navigator & Befehlspalette",
    });
    if (!(await dialog.isVisible())) {
      await searchBtn.click();
    }
    if (!(await dialog.isVisible())) {
      await page.keyboard.press("Control+k");
    }
    await expect(dialog).toBeVisible();

    // Type query to filter
    const input = dialog.locator('input[type="text"]');
    await expect(input).toBeFocused();
    await input.fill("Erfahrung");

    const resultItem = dialog.locator('[role="option"]:has-text("Berufserfahrung")');
    await expect(resultItem).toBeVisible();
    await resultItem.click();
    await page.waitForURL("**/de/experience");
    await expect(page.locator("h1")).toContainText("Berufserfahrung & Operative Praxis");
  });

  test("TC-29: German Experience Explorer and Project Detail Case Study", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Experience Explorer on German
    await page.goto("/de/experience");
    const roleButtons = page.locator('div[role="tablist"] button[role="tab"]');
    await expect(roleButtons).toHaveCount(9);
    await expect(page.locator("text=Asas AI").first()).toBeVisible();
    await expect(page.locator("text=Softwareentwickler").first()).toBeVisible();

    // 2. Project Detail on German
    await page.goto("/de/projects/real-time-object-detection");
    await expect(page.locator("h1")).toContainText("Echtzeit-Objekterkennung");
    await expect(page.locator("text=Computer-Vision-Pipeline")).toBeVisible();
    await expect(page.locator("text=Python").first()).toBeVisible();
    await expect(page.locator("text=PyTorch").first()).toBeVisible();
    await expect(page.locator("text=OpenCV").first()).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
  });

  test("TC-30: German Capabilities Matrix and Official CV Downloads", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Capabilities page
    await page.goto("/de/capabilities");
    await expect(page.locator("h1")).toContainText("Technische Kenntnisse & Kompetenzmatrix");
    await expect(page.locator("text=Zertifikate & Fachweiterbildungen (26)")).toBeVisible();
    await expect(page.locator("text=Offizielles Zertifikats-Repository")).toBeVisible();

    // Contact page
    await page.goto("/de/contact");
    await expect(page.locator("h1")).toContainText("Kontakt aufnehmen & Offizielle Dokumente herunterladen");
    await expect(page.locator('a[href="/cv/ALHassan_Baligh_ALShami_CV_German_Standard.pdf"]')).toBeVisible();
    await expect(page.locator('a[href="/cv/ALHassan_Baligh_ALShami_CV_German_ATS.pdf"]')).toBeVisible();
    await expect(page.locator("text=Herunterladen").first()).toBeVisible();
    await expect(page.locator("text=Akademische und berufliche Referenzen sind auf Anfrage verfügbar.")).toBeVisible();
  });

  test("TC-31: German responsive sanity (zero horizontal overflow across all German routes)", async ({
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
      "/de",
      "/de/about",
      "/de/experience",
      "/de/projects",
      "/de/projects/real-time-object-detection",
      "/de/projects/pump-station-analytics",
      "/de/capabilities",
      "/de/contact",
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

  test("TC-32: German Hero and Focus Rail localization", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/de");

    // English CTAs must not appear
    expect(await page.locator("text=Explore Selected Work").count()).toBe(0);
    expect(await page.locator("text=Read Profile & Principles").count()).toBe(0);
    expect(await page.locator("text=opens the Portfolio Navigator from anywhere").count()).toBe(0);

    // German CTAs and routes
    const primaryCta = page.locator('a[href="/de/projects"]:has-text("Ausgewählte Arbeiten erkunden")');
    await expect(primaryCta).toBeVisible();

    const secondaryCta = page.locator('a[href="/de/about"]:has-text("Profil & Prinzipien lesen")');
    await expect(secondaryCta).toBeVisible();

    // Command hint in German
    await expect(page.locator("text=öffnet den Portfolio-Navigator von überall")).toBeVisible();

    // Section aria-label
    const heroSection = page.locator('section[aria-label="Einleitung"]');
    await expect(heroSection).toBeVisible();

    // Mobile Focus Rail: no English "Software Systems", German titles visible
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.locator("text=Software Systems").count()).toBe(0);
    expect(await page.locator("text=Quality Engineering").count()).toBe(0);

    await expect(page.locator("text=Softwaresysteme & Integration").first()).toBeVisible();
    await expect(page.locator("text=Anwendungsentwicklung").first()).toBeVisible();
    await expect(page.locator("text=Angewandte KI & Computer Vision").first()).toBeVisible();
    await expect(page.locator("text=Qualitätssicherung & Prüfstandards").first()).toBeVisible();
  });

  test("TC-33: German About page language presentation & CV fidelity", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/de/about");

    // Sourced directly from official German CV: Arabisch — Muttersprache, Englisch — B2, Deutsch — B1
    const main = page.locator("main");
    await expect(main.locator("text=Arabisch").first()).toBeVisible();
    await expect(main.locator("text=Muttersprache").first()).toBeVisible();
    await expect(main.locator("text=Englisch").first()).toBeVisible();
    await expect(main.locator("text=B2").first()).toBeVisible();
    await expect(main.locator("text=Deutsch").first()).toBeVisible();
    await expect(main.locator("text=B1").first()).toBeVisible();

    // No Arabic explanatory script leak inside German UI
    expect(await main.locator("text=لغة أم").count()).toBe(0);

    // No unsolicited proficiency claims
    expect(await page.locator("text=Professional working proficiency").count()).toBe(0);
    expect(await page.locator("text=Selbstständige Sprachverwendung").count()).toBe(0);
  });

  test("TC-34: German Capabilities wording & laufend status", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/de/capabilities");

    // Neutral lead wording without overclaiming completion
    await expect(
      page.locator("text=Zertifikate, Kurse und Programme aus Universitätsfakultäten, technischen Instituten und Fachorganisationen.")
    ).toBeVisible();

    // No overclaim "absolviert" or "offiziellen Abschlüsse"
    expect(await page.locator("text=absolviert").count()).toBe(0);
    expect(await page.locator("text=offiziellen Abschlüsse").count()).toBe(0);

    // Explicit laufend status where CV indicates ongoing
    const laufendBadges = page.locator("text=laufend");
    expect(await laufendBadges.count()).toBeGreaterThanOrEqual(1);
  });

  test("TC-35: Project hierarchy and technology parity EN <-> DE", async () => {
    // Assert 1:1 structural and evidence parity between English and German project sets
    expect(projectItemsDe.length).toBe(17);
    expect(projectItems.length).toBe(17);

    const expectedGermanTechnologies: Record<string, string[]> = {
      "foundationkit-dotnet": [".NET 10", "C#", "ASP.NET Core", "Blazor WebAssembly", "Entity Framework Core", "SQL Server", "OpenAPI", "xUnit"],
      "real-time-object-detection": ["Python", "PyTorch", "OpenCV"],
      "robocam-controller": ["Flutter", "Dart", "Android"],
      "pump-station-analytics": ["Vorausschauende Wartung"],
      "real-time-image-classification-api": ["Python", "Flask", "API"],
      "urbanmindos": ["Konzeptdesign", "Urbane Luftmobilität"],
      "mikrotik-hotspot-portal": ["MikroTik RouterOS", "Dual-WAN", "PPPoE", "Hotspot Portal", "RADIUS"],
      "arduino-traffic-light": ["Arduino"],
      "obstacle-avoidance": ["TensorFlow", "Tiefenschätzung"],
      "ai-tic-tac-toe": ["Python", "Pygame", "Minimax-KI"],
      "pacman-pygame": ["Python", "Pygame", "Kollisionserkennung"],
      "text-summarizer": ["Desktop-Anwendung", "Extraktive Zusammenfassung"],
      "user-role-manager": ["Oracle Forms 6i", "PL/SQL"],
      "inventory-sales-manager": ["Webanwendung", "CRUD"],
      "student-evaluation-system": ["C#", "Desktop", "PHP", "Web"],
      "cafe-pos-system": ["Java Swing", "JDBC"],
      "omnifood-landing-page": ["Responsive Web"],
    };

    for (let i = 0; i < projectItems.length; i++) {
      const en = projectItems[i];
      const de = projectItemsDe[i];

      expect(de.slug).toBe(en.slug);
      expect(de.presentationTier).toBe(en.presentationTier);
      expect(de.featured).toBe(en.featured);
      expect(de.category).toBe(en.category);
      expect(de.evidenceDepth).toBe(en.evidenceDepth);
      expect(Boolean(de.githubUrl)).toBe(Boolean(en.githubUrl));

      // Technology evidence scope matches 1:1 in count
      expect(
        de.technologies.length,
        `Technology count mismatch for slug "${en.slug}": EN=[${en.technologies.join(", ")}], DE=[${de.technologies.join(", ")}]`
      ).toBe(en.technologies.length);

      // Technology evidence matches approved German baseline exactly
      expect(
        de.technologies,
        `Technology exact array mismatch for slug "${en.slug}"`
      ).toEqual(expectedGermanTechnologies[en.slug]);
    }
  });

  test("TC-36: German Accessibility controls (ThemeToggle and SkipLink)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. German route
    await page.goto("/de");
    const skipLinkDe = page.locator('a[href="#main-content"]');
    await expect(skipLinkDe).toHaveText("Zum Hauptinhalt springen");

    const themeToggleDe = page.locator('header button[aria-label*="Design wechseln"]');
    await expect(themeToggleDe.first()).toBeVisible();

    // 2. Arabic route
    await page.goto("/ar");
    const skipLinkAr = page.locator('a[href="#main-content"]');
    await expect(skipLinkAr).toHaveText("الانتقال إلى المحتوى الرئيسي");

    const themeToggleAr = page.locator('header button[aria-label*="التبديل إلى المظهر"]');
    await expect(themeToggleAr.first()).toBeVisible();

    // 3. English route
    await page.goto("/");
    const skipLinkEn = page.locator('a[href="#main-content"]');
    await expect(skipLinkEn).toHaveText("Skip to main content");

    const themeToggleEn = page.locator('header button[aria-label*="Switch to"]');
    await expect(themeToggleEn.first()).toBeVisible();
  });

  test("TC-37: German Category and Badge localization in UI", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/de/projects");

    // Localized category filter buttons
    await expect(page.locator('button:has-text("Alle")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Computer Vision & KI")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Full-Stack & Web")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Systeme & Robotik")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Eingebettete Systeme & IoT")').first()).toBeVisible();

    // Localized project badge
    await expect(page.locator("text=Computer-Vision-Pipeline").first()).toBeVisible();
  });

  test("TC-38: Profile Photography Integration — Studio & Formal Portraits across EN, AR, DE", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const homeCases = [
      { route: "/", alt: "Professional studio portrait" },
      { route: "/ar", alt: "صورة شخصية احترافية في الاستوديو" },
      { route: "/de", alt: "Professionelles Studio-Porträt" },
    ];

    for (const c of homeCases) {
      await page.goto(c.route);
      const studioImg = page.locator(`img[alt="${c.alt}"]`);
      await expect(studioImg).toBeVisible();
      const box = await studioImg.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(0);
      expect(box!.height).toBeGreaterThan(0);
      const src = await studioImg.getAttribute("src");
      expect(src).toContain("alhassan-studio.png");
    }

    const aboutCases = [
      { route: "/about", alt: "Formal professional portrait" },
      { route: "/ar/about", alt: "صورة شخصية رسمية" },
      { route: "/de/about", alt: "Formelles professionelles Porträt" },
    ];

    for (const c of aboutCases) {
      await page.goto(c.route);
      const formalImg = page.locator(`img[alt="${c.alt}"]`);
      await expect(formalImg).toBeVisible();
      const box = await formalImg.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(0);
      expect(box!.height).toBeGreaterThan(0);
      const src = await formalImg.getAttribute("src");
      expect(src).toContain("alhassan-formal.jpeg");
    }
  });

  test("TC-39: Responsive Visual Verification at 320px Viewport — Zero Horizontal Overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 });

    const routesToCheck = ["/", "/ar", "/de", "/about", "/ar/about", "/de/about"];

    for (const route of routesToCheck) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll, `Horizontal overflow detected on ${route} at 320px`).toBe(false);
    }
  });

  test("TC-40: Project with dedicated GitHub repo renders direct source URL", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");

    // Real-Time Object Detection has dedicated standalone repo: a2sn2/yolo-object-detection
    const yoloLink = page.locator('a[href="https://github.com/a2sn2/yolo-object-detection"]');
    await expect(yoloLink.first()).toBeVisible();
    await expect(yoloLink.first()).toContainText("SOURCE · GitHub");

    // Check project detail page renders dedicated repo in Project Record
    await page.goto("/projects/real-time-object-detection");
    await page.waitForLoadState("networkidle");
    const detailRepoLink = page.locator('a[href="https://github.com/a2sn2/yolo-object-detection"]');
    await expect(detailRepoLink.first()).toBeVisible();
    await expect(detailRepoLink.first()).toContainText("a2sn2 / yolo-object-detection");
  });

  test("TC-41: Project with Portfolio source archive renders evidence link", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");

    // AI Tic-Tac-Toe has portfolio source archive: docs/evidence/projects/ai-tic-tac-toe
    const ticTacToeArchiveUrl =
      "https://github.com/a2sn2/alhassan-portfolio/tree/main/docs/evidence/projects/ai-tic-tac-toe";
    const archiveLink = page.locator(`a[href="${ticTacToeArchiveUrl}"]`);
    await expect(archiveLink.first()).toBeVisible();
    await expect(archiveLink.first()).toContainText("ARCHIVE · Evidence");

    // Check project detail page renders archive link in Project Record
    await page.goto("/projects/ai-tic-tac-toe");
    await page.waitForLoadState("networkidle");
    const detailArchiveLink = page.locator(`a[href="${ticTacToeArchiveUrl}"]`);
    await expect(detailArchiveLink.first()).toBeVisible();
    await expect(detailArchiveLink.first()).toContainText("ai-tic-tac-toe");
  });

  test("TC-42: Project with missing evidence does not render fake source action", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");

    // MikroTik Hotspot Portal has evidenceStatus = "missing"
    const mikrotikCard = page.locator('article:has(a[href="/projects/mikrotik-hotspot-portal"])');
    await expect(mikrotikCard).toBeVisible();
    // It must NOT have a sourceSignalLink
    await expect(mikrotikCard.locator('a[class*="sourceSignalLink"]')).toHaveCount(0);

    // On detail page, check Project Record is NOT rendered and NO internal Missing label is exposed
    await page.goto("/projects/mikrotik-hotspot-portal");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("text=Missing (No Code Preserved)")).toHaveCount(0);
    const recordSection = page.locator('section[class*="projectRecord"]');
    await expect(recordSection).toHaveCount(0);
    const primaryBtn = page.locator('a[class*="btnPrimary"]');
    await expect(primaryBtn).toHaveCount(0);
  });

  test("TC-43: Certificate with verified public PDF renders localized View Certificate CTA", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // EN: View Certificate
    await page.goto("/capabilities");
    await page.waitForLoadState("networkidle");
    const enCertLink = page.locator('a[href*="docs/evidence/certifications/cert-su-dl-cv-2025/certificate.pdf"]');
    await expect(enCertLink.first()).toBeVisible();
    await expect(enCertLink.first()).toContainText("View Certificate");

    // MATLAB verified certificate
    const matlabLink = page.locator('a[href*="docs/evidence/certifications/cert-su-matlab-2025/certificate.pdf"]');
    await expect(matlabLink.first()).toBeVisible();
    await expect(matlabLink.first()).toContainText("View Certificate");

    // SPHERE verified grouped document link
    const sphereLink = page.locator('a[href*="AlHamdi_TrainingPrograms_2023_2024.pdf"]');
    await expect(sphereLink.first()).toBeVisible();
    await expect(sphereLink.first()).toContainText("View Certificate");

    // AR: عرض الشهادة
    await page.goto("/ar/capabilities");
    await page.waitForLoadState("networkidle");
    const arCertLink = page.locator('a[href*="docs/evidence/certifications/cert-su-dl-cv-2025/certificate.pdf"]');
    await expect(arCertLink.first()).toBeVisible();
    await expect(arCertLink.first()).toContainText("عرض الشهادة");

    // DE: Zertifikat ansehen
    await page.goto("/de/capabilities");
    await page.waitForLoadState("networkidle");
    const deCertLink = page.locator('a[href*="docs/evidence/certifications/cert-su-dl-cv-2025/certificate.pdf"]');
    await expect(deCertLink.first()).toBeVisible();
    await expect(deCertLink.first()).toContainText("Zertifikat ansehen");
  });

  test("TC-44: Ongoing and missing certificates display status without fake certificate action", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Ongoing certs: cert-yeb-ai-2025, cert-yeb-frontend-2025, cert-nh-design-2025
    await page.goto("/capabilities");
    await page.waitForLoadState("networkidle");

    const ongoingRow = page.locator('article[class*="ledgerRow"]:has-text("Artificial Intelligence Program")');
    await expect(ongoingRow).toBeVisible();
    // Must show Ongoing status badge
    await expect(ongoingRow.locator('span[class*="certStatusBadge"]')).toContainText("Ongoing");
    // Must NOT have View Certificate link
    await expect(ongoingRow.locator('a[class*="certActionLink"]')).toHaveCount(0);

    // Missing cert: cert-cyberai-2026
    const cyberAiRow = page.locator('article[class*="ledgerRow"]:has-text("Automation & AI Agents")');
    await expect(cyberAiRow).toBeVisible();
    await expect(cyberAiRow.locator('a[class*="certActionLink"]')).toHaveCount(0);

    // AR
    await page.goto("/ar/capabilities");
    await page.waitForLoadState("networkidle");
    const arOngoingRow = page.locator('article[class*="ledgerRow"]:has-text("برنامج الذكاء الاصطناعي")');
    await expect(arOngoingRow).toBeVisible();
    await expect(arOngoingRow.locator('span[class*="certStatusBadge"]')).toContainText("قيد المتابعة");
    await expect(arOngoingRow.locator('a[class*="certActionLink"]')).toHaveCount(0);

    // DE
    await page.goto("/de/capabilities");
    await page.waitForLoadState("networkidle");
    const deOngoingRow = page.locator('article[class*="ledgerRow"]:has-text("KI-Programm")');
    await expect(deOngoingRow).toBeVisible();
    await expect(deOngoingRow.locator('span[class*="certStatusBadge"]')).toContainText("laufend");
    await expect(deOngoingRow.locator('a[class*="certActionLink"]')).toHaveCount(0);
  });

  test("TC-45: Credential category filters correctly filter Credential Ledger items", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/capabilities");
    await page.waitForLoadState("networkidle");

    // All: 26 items
    const allRows = page.locator('article[class*="ledgerRow"]');
    await expect(allRows).toHaveCount(26);

    // Click "AI & Data" filter
    const aiFilterBtn = page.locator('button[class*="filterBtn"]:has-text("AI & Data")');
    await expect(aiFilterBtn).toBeVisible();
    await aiFilterBtn.click();

    // Verify filtered count matches
    const filteredRows = page.locator('article[class*="ledgerRow"]');
    const filteredCount = await filteredRows.count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThan(26);

    // Click "All" filter to reset
    const allFilterBtn = page.locator('button[class*="filterBtn"]:has-text("All (26)")');
    await allFilterBtn.click();
    await expect(allRows).toHaveCount(26);
  });

  test("TC-46: Arabic evidence UI RTL and German long-label rendering integrity", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // AR Projects RTL
    await page.goto("/ar/projects");
    await page.waitForLoadState("networkidle");
    const htmlDir = await page.getAttribute("html", "dir");
    expect(htmlDir).toBe("rtl");

    const arSourceLink = page.locator('a[class*="sourceSignalLink"]').first();
    await expect(arSourceLink).toBeVisible();
    const arSourceText = await arSourceLink.textContent();
    expect(arSourceText).toMatch(/المصدر · GitHub|الأرشيف · التوثيق/);

    // DE Projects
    await page.goto("/de/projects");
    await page.waitForLoadState("networkidle");
    const deSourceLink = page.locator('a[class*="sourceSignalLink"]').first();
    await expect(deSourceLink).toBeVisible();
    const deSourceText = await deSourceLink.textContent();
    expect(deSourceText).toMatch(/QUELLCODE · GitHub|ARCHIV · Nachweis/);

    // DE Capabilities Ledger Action
    await page.goto("/de/capabilities");
    await page.waitForLoadState("networkidle");
    const deCertAction = page.locator('a[class*="certActionLink"]').first();
    await expect(deCertAction).toBeVisible();
    await expect(deCertAction).toContainText("Zertifikat ansehen");
  });

  test("TC-47: 320px responsive integrity across Projects, Capabilities, and Evidence UI", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 });

    const evidenceRoutes = [
      "/projects",
      "/ar/projects",
      "/de/projects",
      "/capabilities",
      "/ar/capabilities",
      "/de/capabilities",
      "/projects/real-time-object-detection",
      "/ar/projects/real-time-object-detection",
      "/de/projects/real-time-object-detection",
      "/projects/ai-tic-tac-toe",
      "/projects/mikrotik-hotspot-portal",
    ];

    for (const route of evidenceRoutes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll, `Horizontal overflow detected on ${route} at 320px`).toBe(false);
    }
  });

  test("TC-48: Homepage Proof section renders verified proof entries and zero placeholder copy", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const locales = [
      {
        route: "/",
        heading: "Deterministic Engineering Evidence",
        projectMetric: "13 Verified Project Sources",
        certMetric: "22 Verified Certificates",
        count: 4,
        expectedTargets: [
          "/projects",
          "/capabilities",
          "/about",
          "/contact",
        ],
      },
      {
        route: "/ar",
        heading: "التوثيق والإثباتات الهندسية",
        projectMetric: "13 مصدر مشروع موثّق",
        certMetric: "22 شهادة معتمدة",
        count: 4,
        expectedTargets: [
          "/ar/projects",
          "/ar/capabilities",
          "/ar/about",
          "/ar/contact",
        ],
      },
      {
        route: "/de",
        heading: "Deterministische Ingenieurnachweise",
        projectMetric: "13 verifizierte Projektquellen",
        certMetric: "22 verifizierte Zertifikate",
        count: 4,
        expectedTargets: [
          "/de/projects",
          "/de/capabilities",
          "/de/about",
          "/de/contact",
        ],
      },
    ];

    for (const loc of locales) {
      await page.goto(loc.route);
      await page.waitForLoadState("networkidle");

      const proofSection = page.locator("#proof");
      await expect(proofSection).toBeVisible();

      // Ensure no placeholder box or notice appears
      await expect(proofSection.locator('[class*="placeholderBox"]')).toHaveCount(0);
      await expect(proofSection.locator("text=Placeholder")).toHaveCount(0);

      // Verify exact proof metrics
      await expect(proofSection.locator(`text=${loc.projectMetric}`).first()).toBeVisible();
      await expect(proofSection.locator(`text=${loc.certMetric}`).first()).toBeVisible();

      // Ensure no overclaim of 14 projects
      const proofText = await proofSection.textContent();
      expect(proofText).not.toContain("14 of 16");
      expect(proofText).not.toContain("14 / 16");
      expect(proofText).not.toContain("14 von 16");
      expect(proofText).not.toContain("14 من أصل 16");

      // Verify proof cards count and action links (zero duplicate locale prefixes)
      const cards = proofSection.locator('article[class*="proofCard"]');
      await expect(cards).toHaveCount(loc.count);

      const actionLinks = proofSection.locator('a[class*="proofLink"]');
      await expect(actionLinks).toHaveCount(loc.expectedTargets.length);

      for (let i = 0; i < loc.expectedTargets.length; i++) {
        const expectedHref = loc.expectedTargets[i];
        const href = await actionLinks.nth(i).getAttribute("href");
        expect(href).toBe(expectedHref);

        // Verify destination returns HTTP 200
        const targetRes = await page.request.get(expectedHref);
        expect(targetRes.status()).toBe(200);
      }

      // Regression guard: verify rendered page contains zero duplicate locale prefixes
      const pageHtml = await page.content();
      expect(pageHtml).not.toContain("/ar/ar/");
      expect(pageHtml).not.toContain("/de/de/");
    }
  });

  test("TC-49: Public UI contains zero generic GitHub profile links as project source CTAs", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const projectPages = [
      "/projects",
      "/ar/projects",
      "/de/projects",
      "/projects/real-time-object-detection",
      "/ar/projects/real-time-object-detection",
      "/de/projects/real-time-object-detection",
      "/projects/pump-station-analytics",
      "/projects/ai-tic-tac-toe",
    ];

    for (const route of projectPages) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      // Check all links in project explorer cards and project records
      const genericCtas = await page.evaluate(() => {
        const sourceLinks = Array.from(
          document.querySelectorAll('a[class*="sourceSignalLink"], a[class*="recordLink"]')
        );
        return sourceLinks
          .map((a) => a.getAttribute("href"))
          .filter((href) => href === "https://github.com/a2sn2" || href === "https://github.com/a2sn2/");
      });

      expect(genericCtas, `Found generic profile link on ${route}`).toHaveLength(0);
    }
  });

  test("TC-50: Student Evaluation System: canonical facts preserved, zero conflict copy, zero source CTA", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const locales = [
      { route: "/projects/student-evaluation-system", backText: "Explore more engineering projects" },
      { route: "/ar/projects/student-evaluation-system", backText: "استكشاف المزيد من المشاريع الهندسية" },
      { route: "/de/projects/student-evaluation-system", backText: "Weitere Ingenieurprojekte erkunden" },
    ];

    for (const loc of locales) {
      const resp = await page.goto(loc.route);
      expect(resp?.status()).toBe(200);
      await page.waitForLoadState("networkidle");

      // Verify canonical CV facts are preserved (C#, Desktop, PHP, etc.)
      const pageText = await page.textContent("body");
      expect(pageText).toContain("C#");
      expect(pageText).toContain("PHP");

      // Verify NO internal conflict or QA labels are exposed publicly
      expect(pageText).not.toContain("Owner Review Required");
      expect(pageText).not.toContain("Source Conflict");
      expect(pageText).not.toContain("Quellkonflikt");
      expect(pageText).not.toContain("تعارض مصدري");
      expect(pageText).not.toContain("مراجعة المالك");

      // Verify zero project record section and zero source CTAs
      await expect(page.locator('section[class*="projectRecord"]')).toHaveCount(0);
      await expect(page.locator('a[class*="btnPrimary"]')).toHaveCount(0);

      // Verify clean back link exists
      const backLink = page.locator('a[class*="backLink"]').last();
      await expect(backLink).toBeVisible();
      await expect(backLink).toContainText(loc.backText);
    }
  });

  test("TC-51: User & Role Manager: partial source archive copy rendered, never claims verified", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Projects Explorer card shows Selected Source Archive
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");
    const userRoleCard = page.locator('article:has(a[href="/projects/user-role-manager"])');
    await expect(userRoleCard).toBeVisible();
    const sourceSignal = userRoleCard.locator('a[class*="sourceSignalLink"]');
    await expect(sourceSignal).toBeVisible();
    await expect(sourceSignal).toContainText("Selected Source Archive");
    await expect(sourceSignal).not.toContainText("Verified");

    // 2. Detail page renders Project Record with restrained partial copy
    await page.goto("/projects/user-role-manager");
    await page.waitForLoadState("networkidle");
    const record = page.locator('section[class*="projectRecord"]');
    await expect(record).toBeVisible();
    await expect(record).toContainText("Selected Source Archive");
    await expect(record).not.toContainText("Verified");
    await expect(record).not.toContainText("Source-backed");

    // 3. Primary CTA button renders Selected Source Archive
    const primaryBtn = page.locator('a[class*="btnPrimary"]');
    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toContainText("Selected Source Archive");

    // 4. AR locale
    await page.goto("/ar/projects/user-role-manager");
    await page.waitForLoadState("networkidle");
    const arRecord = page.locator('section[class*="projectRecord"]');
    await expect(arRecord).toBeVisible();
    await expect(arRecord).toContainText("أرشيف مصدري جزئي");
    await expect(arRecord).not.toContainText("موثّق");

    // 5. DE locale
    await page.goto("/de/projects/user-role-manager");
    await page.waitForLoadState("networkidle");
    const deRecord = page.locator('section[class*="projectRecord"]');
    await expect(deRecord).toBeVisible();
    await expect(deRecord).toContainText("Ausgewähltes Quellarchiv");
    await expect(deRecord).not.toContainText("Verifiziert");
  });

  test("TC-52: MikroTik and Arduino prototypes: zero source CTAs, zero internal Missing copy", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const missingSlugs = ["mikrotik-hotspot-portal", "arduino-traffic-light"];

    for (const slug of missingSlugs) {
      // Check Project Explorer card
      await page.goto("/projects");
      await page.waitForLoadState("networkidle");
      const card = page.locator(`article:has(a[href="/projects/${slug}"])`);
      await expect(card).toBeVisible();
      await expect(card.locator('a[class*="sourceSignalLink"]')).toHaveCount(0);

      // Check detail page
      await page.goto(`/projects/${slug}`);
      await page.waitForLoadState("networkidle");
      const pageText = await page.textContent("body");
      expect(pageText).not.toContain("Missing (No Code Preserved)");
      expect(pageText).not.toContain("Nicht vorhanden");
      expect(pageText).not.toContain("غير متوفر");
      await expect(page.locator('section[class*="projectRecord"]')).toHaveCount(0);
      await expect(page.locator('a[class*="btnPrimary"]')).toHaveCount(0);
    }
  });

  test("TC-53: Homepage verified project metric matches exact verified count (13) across EN, AR, DE", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. EN Homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const enProof = page.locator("#proof");
    await expect(enProof).toBeVisible();
    await expect(enProof).toContainText("13 Verified Project Sources");
    await expect(enProof).toContainText(
      "Verified source repositories and curated code archives covering 13 canonical engineering projects."
    );
    await expect(enProof).not.toContainText("14 of 16");
    await expect(enProof).not.toContainText("conflict");
    await expect(enProof).not.toContainText("missing");

    // 2. AR Homepage
    await page.goto("/ar");
    await page.waitForLoadState("networkidle");
    const arProof = page.locator("#proof");
    await expect(arProof).toBeVisible();
    await expect(arProof).toContainText("13 مصدر مشروع موثّق");
    await expect(arProof).not.toContainText("14 من 16");

    // 3. DE Homepage
    await page.goto("/de");
    await page.waitForLoadState("networkidle");
    const deProof = page.locator("#proof");
    await expect(deProof).toBeVisible();
    await expect(deProof).toContainText("13 verifizierte Projektquellen");
    await expect(deProof).not.toContainText("14 von 16");
  });

  test("TC-54: Credential source CTAs: MATLAB verified, SPHERE verified, CYBERAI missing (no CTA)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. EN Capabilities
    await page.goto("/capabilities");
    await page.waitForLoadState("networkidle");

    // MATLAB (cert-su-matlab-2025): must have View Certificate CTA
    const matlabCard = page.locator('article:has-text("MATLAB")').first();
    await expect(matlabCard).toBeVisible();
    const matlabCta = matlabCard.locator('a:has-text("View Certificate")');
    await expect(matlabCta).toBeVisible();
    await expect(matlabCta).toHaveAttribute("href", /cert-su-matlab-2025\/certificate\.pdf/);

    // SPHERE (cert-sphere-2023): must have View Certificate CTA
    const sphereCard = page.locator('article:has-text("Emergency Humanitarian Response — SPHERE Standards")');
    await expect(sphereCard).toBeVisible();
    const sphereCta = sphereCard.locator('a:has-text("View Certificate")');
    await expect(sphereCta).toBeVisible();
    await expect(sphereCta).toHaveAttribute(
      "href",
      "https://github.com/a2sn2/certificates/blob/main/al-hamdi/AlHamdi_TrainingPrograms_2023_2024.pdf"
    );

    // CYBERAI (cert-cyberai-2026): card exists, but must NOT have View Certificate CTA
    const cyberaiCard = page.locator('article:has-text("Automation & AI Agents")').first();
    await expect(cyberaiCard).toBeVisible();
    const cyberaiCta = cyberaiCard.locator('a:has-text("View Certificate")');
    await expect(cyberaiCta).toHaveCount(0);
  });

  test("TC-55: HeroPortraitStage rendered with custom structural frame on /, /ar, /de", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const heroRoutes = [
      { route: "/", alt: "Professional studio portrait" },
      { route: "/ar", alt: "صورة شخصية احترافية في الاستوديو" },
      { route: "/de", alt: "Professionelles Studio-Porträt" },
    ];

    for (const { route, alt } of heroRoutes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const stage = page.locator('[data-testid="hero-portrait-stage"]');
      await expect(stage).toBeVisible();

      const image = stage.locator("img");
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute("alt", alt);
    }
  });

  test("TC-56: ProfileIdentityMark rendered in About and Contact headers across all locales", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const pagesWithMark = [
      "/about",
      "/ar/about",
      "/de/about",
      "/contact",
      "/ar/contact",
      "/de/contact",
    ];

    for (const route of pagesWithMark) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const mark = page.locator('[data-testid="profile-identity-mark"]');
      await expect(mark).toBeVisible();

      const image = mark.locator("img");
      await expect(image).toBeVisible();
    }
  });

  test("TC-57: Home page renders unified Jaib progression feature instead of independent cards across EN, AR, DE", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const homeRoutes = [
      {
        url: "/",
        progressionTitle: "Career Progression",
        company: "AHD for Financial Services – Jaib Wallet",
        roles: [
          "Customer Service Trainee",
          "Development Trainee",
          "Developer, Development Dept.",
          "Deputy Development Manager",
        ],
        ctaText: "Explore progression",
        ctaHref: "/experience#ahd-financial-deputy",
      },
      {
        url: "/ar",
        progressionTitle: "مسار التطور المهني",
        company: "عهد للخدمات المالية - محفظة جيب",
        roles: [
          "متدرب في خدمة العملاء",
          "متدرب في قسم التطوير",
          "مُطوِّر في قسم التطوير",
          "نائب إدارة التطوير",
        ],
        ctaText: "استكشف المسار",
        ctaHref: "/ar/experience#ahd-financial-deputy",
      },
      {
        url: "/de",
        progressionTitle: "Berufliche Entwicklung",
        company: "AHD Financial Services – Jaib Wallet",
        roles: [
          "Trainee im Kundenservice",
          "Trainee, Entwicklungsabteilung",
          "Entwickler, Entwicklungsabteilung",
          "Stellv. Entwicklungsleiter",
        ],
        ctaText: "Entwicklung ansehen",
        ctaHref: "/de/experience#ahd-financial-deputy",
      },
    ];

    for (const route of homeRoutes) {
      await page.goto(route.url);
      await page.waitForLoadState("networkidle");

      // Verify exactly 3 experience cards exist in the snapshot section
      const expSection = page.locator('section[aria-labelledby="heading-experience-snapshot"]');
      await expect(expSection).toBeVisible();

      // The 3 cards: Asaas AI, Jaib Progression Feature, and Water & Sanitation
      const cards = expSection.locator("[class*='experienceCards'] > *");
      await expect(cards).toHaveCount(3);

      // Verify the unified Jaib progression card exists
      const progressionCard = expSection.locator("[class*='progressionHighlightCard']");
      await expect(progressionCard).toBeVisible();
      await expect(progressionCard).toContainText(route.company);
      await expect(progressionCard).toContainText(route.progressionTitle);

      // Verify all 4 roles are contained inside this single progression component
      for (const roleTitle of route.roles) {
        await expect(progressionCard).toContainText(roleTitle);
      }

      // Verify CTA link
      const ctaLink = progressionCard.locator(`a[href="${route.ctaHref}"]`);
      await expect(ctaLink).toBeVisible();
      await expect(ctaLink).toContainText(route.ctaText);
    }
  });

  test("TC-58: Experience Explorer desktop career progression grouping, stages, selection, and current role emphasis", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/experience");
    await page.waitForLoadState("networkidle");

    // 1. Desktop Jaib is rendered as one organization progression group
    const progressionBlock = page.locator("#progression-ahd-jaib");
    await expect(progressionBlock).toBeVisible();
    await expect(progressionBlock).toContainText("AHD for Financial Services – Jaib Wallet");
    await expect(progressionBlock).toContainText("Career Progression");

    // 2. Group has exactly 4 stages
    const stageButtons = progressionBlock.locator("button[role='tab']");
    await expect(stageButtons).toHaveCount(4);

    // 3. Stages appear oldest -> newest
    const stageTexts = await stageButtons.allInnerTexts();
    expect(stageTexts[0]).toContain("Customer Service Trainee");
    expect(stageTexts[1]).toContain("Development Trainee");
    expect(stageTexts[2]).toContain("Developer, Development Dept.");
    expect(stageTexts[3]).toContain("Deputy Development Manager");

    // 4. Current state is attached only to Deputy stage
    await expect(stageButtons.nth(3)).toContainText("Current Role");
    await expect(stageButtons.nth(0)).not.toContainText("Current Role");
    await expect(stageButtons.nth(1)).not.toContainText("Current Role");
    await expect(stageButtons.nth(2)).not.toContainText("Current Role");

    // 5. Click Developer: detail panel becomes Developer
    await stageButtons.nth(2).click();
    const detailPanel = page.locator('[role="tabpanel"]');
    await expect(detailPanel.locator("h2")).toHaveText("Developer, Development Dept.");
    // Detail panel includes contextual strip showing Stage 03 / 04
    await expect(detailPanel.locator("[class*='contextualStrip']")).toBeVisible();
    await expect(detailPanel.locator("[class*='contextualSubtitle']")).toContainText("Stage 03 / 04");

    // 6. Click Deputy: detail panel becomes Deputy Development Manager
    await stageButtons.nth(3).click();
    await expect(detailPanel.locator("h2")).toHaveText("Deputy Development Manager");
    await expect(detailPanel.locator("[class*='contextualSubtitle']")).toContainText("Stage 04 / 04");
  });

  test("TC-59: Experience Explorer deep-linking, old alias hash resolution, and mobile journey accordion", async ({
    page,
  }) => {
    // 7. Deep-link #ahd-financial-developer selects Developer
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/experience#ahd-financial-developer");
    await page.waitForLoadState("networkidle");
    const detailPanel = page.locator('[role="tabpanel"]');
    await expect(detailPanel.locator("h2")).toHaveText("Developer, Development Dept.");

    // 8. Old alias #ahd-financial-support-trainee resolves correctly in English
    await page.goto("/experience#ahd-financial-support-trainee");
    await page.waitForLoadState("networkidle");
    await expect(detailPanel.locator("h2")).toHaveText("Customer Service Trainee");
    expect(page.url()).toContain("#ahd-financial-cs-trainee");

    // 9. Mobile: exactly one Jaib accordion group exists, not four independent organization accordions
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/experience");
    await page.waitForLoadState("networkidle");

    const mobileLayout = page.locator("[class*='mobileLayout']");
    await expect(mobileLayout).toBeVisible();

    const jaibMobileAccordions = mobileLayout.locator("#ahd-jaib");
    await expect(jaibMobileAccordions).toHaveCount(1);

    // 10. Selecting mobile stage updates role detail
    const jaibAccordionTrigger = jaibMobileAccordions.locator("button[aria-controls='mobile-body-ahd-jaib']");
    await jaibAccordionTrigger.click();

    // Verify 4 stages inside mobile stepper
    const mobileStageBtns = jaibMobileAccordions.locator("[class*='mobileStageBtn']");
    await expect(mobileStageBtns).toHaveCount(4);

    // Click Developer stage on mobile
    await mobileStageBtns.nth(2).click();
    const mobileActiveRole = jaibMobileAccordions.locator("[class*='mobileActiveRole']");
    await expect(mobileActiveRole).toHaveText("Developer, Development Dept.");
  });

  test("TC-60: Trilingual parity, RTL logical layout, and reduced motion responsiveness in career progression", async ({
    page,
  }) => {
    // 11. Arabic progression is RTL-correct
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ar/experience");
    await page.waitForLoadState("networkidle");

    const htmlDir = await page.getAttribute("html", "dir");
    expect(htmlDir).toBe("rtl");

    const arProgressionBlock = page.locator("#progression-ahd-jaib");
    await expect(arProgressionBlock).toContainText("عهد للخدمات المالية - محفظة جيب");
    await expect(arProgressionBlock).toContainText("مسار التطور المهني");

    // Click third stage in Arabic
    const arStages = arProgressionBlock.locator("button[role='tab']");
    await arStages.nth(2).click();
    const arDetail = page.locator('[role="tabpanel"]');
    await expect(arDetail.locator("h2")).toHaveText("مُطوِّر في قسم التطوير");
    await expect(arDetail.locator("[class*='contextualSubtitle']")).toContainText("المرحلة 03 / 04");

    // 12. German long labels do not overflow
    await page.goto("/de/experience");
    await page.waitForLoadState("networkidle");

    const deProgressionBlock = page.locator("#progression-ahd-jaib");
    await expect(deProgressionBlock).toContainText("AHD Financial Services – Jaib Wallet");
    await expect(deProgressionBlock).toContainText("Berufliche Entwicklung");

    const deStages = deProgressionBlock.locator("button[role='tab']");
    await deStages.nth(3).click();
    const deDetail = page.locator('[role="tabpanel"]');
    await expect(deDetail.locator("h2")).toHaveText("Stellv. Entwicklungsleiter");
    await expect(deDetail.locator("[class*='contextualSubtitle']")).toContainText("Phase 04 / 04");

    const isOverflowing = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(isOverflowing).toBe(false);

    // 13. Reduced motion removes connector/detail animation
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/experience");
    await page.waitForLoadState("networkidle");

    const connectorTransition = await page.locator("[class*='stepperFill']").evaluate((el) => {
      return window.getComputedStyle(el).transition;
    });
    expect(connectorTransition).toMatch(/none|all 0s/);
  });

  test("TC-61: Brand favicon and icon set delivery on fresh browser context", async ({
    browser,
  }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // 1. Icon declarations exist in head
    const faviconLink = page.locator('link[rel="icon"][href*="favicon.ico"]');
    const iconPngLink = page.locator('link[rel="icon"][href*="icon.png"]');
    const appleIconLink = page.locator('link[rel="apple-touch-icon"]');

    await expect(faviconLink).toHaveCount(1);
    await expect(iconPngLink).toHaveCount(1);
    await expect(appleIconLink).toHaveCount(1);

    const faviconHref = await faviconLink.getAttribute("href");
    const iconPngHref = await iconPngLink.getAttribute("href");
    const appleIconHref = await appleIconLink.getAttribute("href");

    expect(faviconHref).toBeTruthy();
    expect(iconPngHref).toBeTruthy();
    expect(appleIconHref).toBeTruthy();

    // 2. URLs return HTTP 200
    const faviconRes = await context.request.get(faviconHref!);
    expect(faviconRes.status()).toBe(200);

    const iconPngRes = await context.request.get(iconPngHref!);
    expect(iconPngRes.status()).toBe(200);

    const appleIconRes = await context.request.get(appleIconHref!);
    expect(appleIconRes.status()).toBe(200);

    // Root icon paths return HTTP 200
    const rootFaviconRes = await context.request.get("/favicon.ico");
    expect(rootFaviconRes.status()).toBe(200);

    const rootIconPngRes = await context.request.get("/icon.png");
    expect(rootIconPngRes.status()).toBe(200);

    const rootAppleIconRes = await context.request.get("/apple-icon.png");
    expect(rootAppleIconRes.status()).toBe(200);

    // 3. Icon content is not the old generic asset (25931 bytes) nor FacePic asset (6783 bytes)
    const faviconBody = await faviconRes.body();
    expect(faviconBody.length).not.toBe(25931);
    expect(faviconBody.length).not.toBe(6783);
    expect(faviconBody.length).toBeGreaterThan(0);

    // 4. Verify icon image dimensions >= 180 for high-res icon in page context
    const iconDimensions = await page.evaluate(async (url) => {
      return new Promise<{ width: number; height: number }>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => reject(new Error("Failed to load icon image"));
        img.src = url;
      });
    }, iconPngHref!);

    expect(iconDimensions.width).toBeGreaterThanOrEqual(180);
    expect(iconDimensions.height).toBeGreaterThanOrEqual(180);
    expect(iconDimensions.width).toBe(512);
    expect(iconDimensions.height).toBe(512);

    await context.close();
  });

  test("TC-62: Custom domain canonical, sitemap, robots, and JSON-LD resolution", async ({
    page,
    request,
  }) => {
    // 1. English Homepage: canonical starts with https://www.engalhassanalshami.com
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const enCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(enCanonical).toBe("https://www.engalhassanalshami.com");
    expect(enCanonical).not.toContain("vercel.app");

    // Reciprocal hreflangs
    const hreflangEn = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute("href");
    const hreflangAr = await page.locator('link[rel="alternate"][hreflang="ar"]').getAttribute("href");
    const hreflangDe = await page.locator('link[rel="alternate"][hreflang="de"]').getAttribute("href");
    const hreflangDef = await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute("href");
    expect(hreflangEn).toBe("https://www.engalhassanalshami.com");
    expect(hreflangAr).toBe("https://www.engalhassanalshami.com/ar");
    expect(hreflangDe).toBe("https://www.engalhassanalshami.com/de");
    expect(hreflangDef).toBe("https://www.engalhassanalshami.com");

    // 2. Arabic route canonical & hreflang
    await page.goto("/ar");
    await page.waitForLoadState("domcontentloaded");
    const arCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(arCanonical).toBe("https://www.engalhassanalshami.com/ar");
    expect(arCanonical).not.toContain("vercel.app");

    // 3. German route canonical & hreflang
    await page.goto("/de");
    await page.waitForLoadState("domcontentloaded");
    const deCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(deCanonical).toBe("https://www.engalhassanalshami.com/de");
    expect(deCanonical).not.toContain("vercel.app");

    // 4. JSON-LD Person and WebSite
    await page.goto("/");
    const jsonLdContent = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLdContent).toBeTruthy();
    const jsonLd = JSON.parse(jsonLdContent!);
    const person = jsonLd["@graph"].find((node: { "@type": string }) => node["@type"] === "Person");
    const website = jsonLd["@graph"].find((node: { "@type": string }) => node["@type"] === "WebSite");
    expect(person["@id"]).toBe("https://www.engalhassanalshami.com/#person");
    expect(person.url).toBe("https://www.engalhassanalshami.com");
    expect(website["@id"]).toBe("https://www.engalhassanalshami.com/#website");
    expect(website.url).toBe("https://www.engalhassanalshami.com");

    // 5. Sitemap uses only www custom domain
    const sitemapRes = await request.get("/sitemap.xml");
    expect(sitemapRes.status()).toBe(200);
    const sitemapText = await sitemapRes.text();
    expect(sitemapText).toContain("<loc>https://www.engalhassanalshami.com");
    expect(sitemapText).not.toContain("alhassan-portfolio-phi.vercel.app");

    // 6. Robots sitemap points to custom domain
    const robotsRes = await request.get("/robots.txt");
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText).toContain("Sitemap: https://www.engalhassanalshami.com/sitemap.xml");
    expect(robotsText).not.toContain("alhassan-portfolio-phi.vercel.app");
  });

  test("TC-63: Vercel Web Analytics and Speed Insights instrumentation on /, /ar, and /de", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text();
        const url = msg.location()?.url || "";
        // In local environments (next dev / next start), Vercel edge endpoints (/_vercel/...)
        // are not present; ignore benign platform endpoint 404 / mime-type messages.
        if (
          url.includes("_vercel/") ||
          url.includes("va.vercel-scripts") ||
          text.includes("_vercel/") ||
          text.includes("va.vercel-scripts") ||
          text.includes("Failed to load resource")
        ) {
          return;
        }
        consoleErrors.push(text);
      }
    });

    const routes = ["/", "/ar", "/de"];

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForTimeout(300);

      // 1. Verify Vercel Web Analytics and Speed Insights client functions/queues are initialized
      const analyticsState = await page.evaluate(() => {
        const hasVa = typeof (window as unknown as { va?: unknown }).va === "function";
        const hasSi = typeof (window as unknown as { si?: unknown }).si === "function";
        const analyticsScripts = Array.from(document.querySelectorAll("script")).filter(
          (s) =>
            (s.src.includes("insights/script") || s.src.includes("va.vercel-scripts.com/v1/script")) &&
            !s.src.includes("speed-insights")
        );
        const speedInsightsScripts = Array.from(document.querySelectorAll("script")).filter((s) =>
          s.src.includes("speed-insights")
        );
        return {
          hasVa,
          hasSi,
          analyticsScriptCount: analyticsScripts.length,
          speedInsightsScriptCount: speedInsightsScripts.length,
        };
      });

      expect(analyticsState.hasVa, `window.va initialized on ${route}`).toBe(true);
      expect(analyticsState.hasSi, `window.si initialized on ${route}`).toBe(true);
      expect(analyticsState.analyticsScriptCount, `Expected exactly 1 analytics script tag on ${route}`).toBe(1);
      expect(analyticsState.speedInsightsScriptCount, `Expected exactly 1 speed insights script tag on ${route}`).toBe(1);

      // 2. Verify no visible DOM elements or layout shifts caused by analytics
      const nonScriptAfterFooter = await page.evaluate(() => {
        const footer = document.querySelector("footer");
        if (!footer) return 0;
        let count = 0;
        let sibling = footer.nextElementSibling;
        while (sibling) {
          if (sibling.tagName !== "SCRIPT" && sibling.tagName !== "NEXT-ROUTE-ANNOUNCER") {
            count++;
          }
          sibling = sibling.nextElementSibling;
        }
        return count;
      });
      expect(nonScriptAfterFooter, `No unexpected UI elements rendered after footer on ${route}`).toBe(0);
    }

    // 3. Zero page exceptions and zero unhandled console runtime errors
    expect(pageErrors, "Page runtime exceptions detected during analytics initialization").toHaveLength(0);
    expect(consoleErrors, "Console runtime errors detected during analytics initialization").toHaveLength(0);
  });

  test("TC-64: Navigation transition system, route progress indicator, and anchor arrival feedback", async ({
    page,
  }) => {
    const pageErrors: Error[] = [];
    const consoleErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text();
        const url = msg.location()?.url || "";
        if (
          url.includes("_vercel/") ||
          url.includes("va.vercel-scripts") ||
          text.includes("_vercel/") ||
          text.includes("va.vercel-scripts") ||
          text.includes("Failed to load resource")
        ) {
          return;
        }
        consoleErrors.push(text);
      }
    });

    // 1. Initial homepage load - verify navigation shell and data-scroll-behavior
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const htmlScrollBehavior = await page.getAttribute("html", "data-scroll-behavior");
    expect(htmlScrollBehavior).toBe("smooth");

    const transitionContainer = page.locator("[data-navigation-state]");
    await expect(transitionContainer).toBeVisible();

    // Verify initial load bypass: first mount does NOT get .pageEnter animation class
    const initialEnterCount = await page.evaluate(() => {
      const el = document.querySelector('[class*="pageEnter"]');
      return el ? 1 : 0;
    });
    expect(initialEnterCount).toBe(0);

    // A. Normal Next.js internal navigation to /about: client-side route change, render, container mount
    await page.click('header nav a[href="/about"]');
    await page.waitForURL("**/about");
    await expect(page.locator("h1")).toContainText(
      "Engineering from Academic Foundations to Production Systems"
    );
    await expect(transitionContainer).toBeVisible();
    await expect(transitionContainer).toHaveAttribute("data-navigation-state", "idle");

    // B. Real same-page anchor navigation: in-page rail link on project case study
    await page.goto("/projects/real-time-object-detection");
    await page.waitForLoadState("domcontentloaded");

    const railLink = page.locator('a[href="#problem"]').first();
    await expect(railLink).toBeVisible();
    await railLink.click();

    // Verify anchor navigation without full route transition
    await expect(transitionContainer).toHaveAttribute("data-navigation-state", "idle");
    expect(page.url()).toContain("#problem");

    // Verify target clearance below sticky header (92px clearance from reset.css)
    const problemSection = page.locator("#problem");
    await expect(problemSection).toBeVisible();
    const scrollMargin = await page.evaluate(() => {
      const el = document.getElementById("problem");
      return el ? window.getComputedStyle(el).scrollMarginTop : "";
    });
    expect(scrollMargin).toMatch(/(92px|6rem|96px)/);

    // Wait for smooth scroll and assert target is positioned below sticky header
    await page.waitForTimeout(400);
    const problemBox = await problemSection.boundingBox();
    expect(problemBox).not.toBeNull();
    expect(problemBox!.y).toBeGreaterThanOrEqual(50);

    // C. Query-only route navigation: recognized transition without abrupt state
    await page.goto("/projects");
    await page.waitForLoadState("domcontentloaded");

    await page.evaluate(() => {
      const link = document.createElement("a");
      link.href = "/projects?category=Systems";
      link.id = "test-query-transition-link";
      document.body.appendChild(link);
      link.click();
    });
    await page.waitForURL("**/projects?category=Systems");
    await expect(transitionContainer).toHaveAttribute("data-navigation-state", "idle");

    // D. Real cross-page hash link: homepage progression CTA to /experience#ahd-financial-deputy
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const realCrossLink = page.locator('a[href="/experience#ahd-financial-deputy"]').first();
    await expect(realCrossLink).toBeVisible();
    await realCrossLink.click();

    await page.waitForURL("**/experience#ahd-financial-deputy");
    await expect(page.locator("h1")).toContainText(
      "Professional Experience & Operational Journey"
    );
    await page.waitForTimeout(400);
    const expScrollY = await page.evaluate(() => window.scrollY);
    expect(expScrollY).toBeGreaterThan(100);

    // E. Back / Forward navigation: history integrity, no stuck progress, no stale retries
    await page.goBack();
    await page.waitForURL((url) => !url.href.includes("/experience"));
    expect(page.url()).not.toContain("/experience");
    await expect(transitionContainer).toHaveAttribute("data-navigation-state", "idle");

    const isBarStuckBack = await page.evaluate(() => {
      return Boolean(document.querySelector('[class*="barLoading"]'));
    });
    expect(isBarStuckBack).toBe(false);

    await page.goForward();
    await page.waitForURL("**/experience#ahd-financial-deputy");
    await expect(transitionContainer).toHaveAttribute("data-navigation-state", "idle");

    const isBarStuckFwd = await page.evaluate(() => {
      return Boolean(document.querySelector('[class*="barLoading"]'));
    });
    expect(isBarStuckFwd).toBe(false);

    // Verify zero page runtime errors throughout test execution
    expect(pageErrors, "No page runtime exceptions during navigation suite").toHaveLength(0);
    expect(consoleErrors, "No console errors during navigation suite").toHaveLength(0);
  });
});



