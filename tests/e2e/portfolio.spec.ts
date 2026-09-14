import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
      { href: "/projects", heading: "Engineering Projects & Technical Case Studies" },
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

    // Open palette via keyboard
    await page.keyboard.press("Control+k");
    const dialog = page.locator('div[role="dialog"][aria-label="Portfolio Navigator & Command Palette"]');
    await expect(dialog).toBeVisible();

    // Type query to filter
    const searchInput = page.locator('div[role="dialog"] input[type="text"]');
    await searchInput.fill("Experience");

    // Filtered result is displayed
    const option = page.locator('li[role="option"]', { hasText: "Experience" }).first();
    await expect(option).toBeVisible();

    // Select and navigate
    await option.click();
    await page.waitForURL("**/experience");
    await expect(page.locator("h1")).toContainText("Professional Experience");

    // Verify Escape key closes palette
    await page.keyboard.press("Control+k");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("TC-04: Experience Explorer desktop split tabs & deep linking", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/experience");

    // Default active role is Asaas AI
    await expect(page.locator('#panel-asaas-ai-qa h2')).toContainText(
      "Co-Founder & Director of Quality Assurance"
    );

    // Switch to AHD Financial Services role
    const deputyTab = page.locator('button#tab-ahd-financial-deputy');
    await deputyTab.click();
    await expect(page.locator('#panel-ahd-financial-deputy h2')).toContainText(
      "Deputy Development Manager"
    );

    // Deep link directly via hash
    await page.goto("/experience#water-sanitation-corp");
    await expect(page.locator('#panel-water-sanitation-corp h2')).toContainText(
      "Control Engineer Trainee"
    );
  });

  test("TC-05: Project Explorer category filtering & Case Study detail route", async ({
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

    // Navigate to individual case study
    await page.click('a[href="/projects/real-time-object-detection"]');
    await page.waitForURL("**/projects/real-time-object-detection");

    // Verify case study story chapters
    await expect(page.locator("h1")).toContainText("Real-Time Object Detection");
    await expect(page.locator("text=The Problem & Engineering Context")).toBeVisible();
    await expect(page.locator("text=System Architecture & Data Flow")).toBeVisible();
    await expect(page.locator("text=Verified Results & Measurable Impact")).toBeVisible();
  });

  test("TC-06: Capabilities Matrix filtering & verified repo link", async ({
    page,
  }) => {
    await page.goto("/capabilities");

    // Verify certifications count
    await expect(page.locator("text=Certifications & Specialized Training (26)")).toBeVisible();

    // Filter certs by 'Engineering & Hardware'
    await page.click('button:has-text("Engineering & Hardware")');
    await expect(page.locator("text=Robotics Engineering")).toBeVisible();
    await expect(
      page.locator('h3:has-text("Programmable Logic Controllers (PLC)")')
    ).toBeVisible();

    // Verify certificate repository link
    const repoLink = page.locator('a[href="https://github.com/a2sn2/certificates"]');
    await expect(repoLink).toBeVisible();
  });

  test("TC-07: Contact page official CV downloads and direct channels", async ({
    page,
  }) => {
    await page.goto("/contact");

    // Verify direct channels
    await expect(page.locator('a[href="mailto:hassan1alshami6@gmail.com"]')).toBeVisible();
    await expect(page.locator('a[href="https://www.linkedin.com/in/a2sn4"]')).toBeVisible();

    // Verify all 6 official CV downloads exist
    await expect(page.locator("text=ALHassan_Baligh_ALShami_CV_English_Standard.pdf")).toBeVisible();
    await expect(page.locator("text=ALHassan_Baligh_ALShami_CV_English_ATS.pdf")).toBeVisible();
    await expect(page.locator("text=ALHassan_Baligh_ALShami_CV_German_Standard.pdf")).toBeVisible();
    await expect(page.locator("text=ALHassan_Baligh_ALShami_CV_German_ATS.pdf")).toBeVisible();
    await expect(page.locator("text=ALHassan_Baligh_ALShami_CV_Arabic_Standard.pdf")).toBeVisible();
    await expect(page.locator("text=ALHassan_Baligh_ALShami_CV_Arabic_ATS.pdf")).toBeVisible();

    // Final chapter index
    await expect(page.locator("text=CHAPTER 06 / 06")).toBeVisible();
  });

  test("TC-08: Mobile navigation drawer interactions on multi-page routes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggleButton = page.locator('button[aria-label="Open navigation menu"]');
    await expect(toggleButton).toBeVisible();

    // Open drawer
    await toggleButton.click();
    await expect(page.locator('nav[aria-label="Mobile Navigation Links"]')).toBeVisible();

    // Click 'About' link
    const aboutLink = page.locator('#mobile-nav-drawer a[href="/about"]');
    await aboutLink.click();
    await page.waitForURL("**/about");
    await expect(page.locator("h1")).toContainText("Engineering from Academic Foundations");

    // Drawer should auto-close
    await expect(page.locator('button[aria-label="Open navigation menu"]')).toBeVisible();
  });

  test("TC-09: Multi-viewport responsive sanity (zero horizontal overflow across all routes)", async ({
    page,
  }) => {
    const viewports = [
      { width: 1440, height: 900, name: "desktop-1440" },
      { width: 1280, height: 800, name: "laptop-1280" },
      { width: 768, height: 1024, name: "tablet-768" },
      { width: 390, height: 844, name: "mobile-390" },
      { width: 320, height: 640, name: "narrow-mobile-320" },
    ];

    const routes = ["/", "/about", "/experience", "/projects", "/capabilities", "/contact"];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const route of routes) {
        await page.goto(route);
        await page.waitForLoadState("domcontentloaded");

        const hasOverflow = await page.evaluate(() => {
          return (
            document.documentElement.scrollWidth > window.innerWidth ||
            document.body.scrollWidth > window.innerWidth
          );
        });

        expect(
          hasOverflow,
          `Route ${route} at Viewport ${vp.name} (${vp.width}px) has unwanted horizontal overflow`
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
});
