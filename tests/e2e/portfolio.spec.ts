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

    // Open palette via header trigger button or shortcut
    const searchBtn = page.locator('button[aria-label*="command palette" i]').first();
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    const dialog = page.getByRole("dialog", {
      name: "Portfolio Navigator & Command Palette",
    });
    // In case click landed during hydration, trigger shortcut fallback
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
    await page.click('button:has-text("AHD for Financial Services – Jaib Wallet")');
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

    // Open palette via Arabic header trigger button ("تنقل")
    const searchBtn = page.locator('header button[aria-label*="لوحة الأوامر"]').first();
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    const dialog = page.getByRole("dialog", {
      name: "المستكشف ولوحة الأوامر",
    });
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
    await expect(articles).toHaveCount(16);

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
    const repoBtn = page.locator('a[href*="github.com/a2sn2/certificates"]');
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

    // Open palette
    const searchBtn = page.locator('header button[aria-label*="Befehlspalette öffnen"]').first();
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    const dialog = page.getByRole("dialog", {
      name: "Portfolio-Navigator & Befehlspalette",
    });
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
    expect(projectItemsDe.length).toBe(16);
    expect(projectItems.length).toBe(16);

    const expectedGermanTechnologies: Record<string, string[]> = {
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
});

