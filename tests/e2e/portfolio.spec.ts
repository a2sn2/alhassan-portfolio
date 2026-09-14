import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Portfolio Core User Experience & Technical Quality", () => {
  test("TC-01: Homepage loads successfully with canonical title and identity", async ({
    page,
  }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // Verify canonical title contains name
    await expect(page).toHaveTitle(/ALHassan Baligh ALShami/);

    // Verify main landmark and h1 presence
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("ALHassan Baligh ALShami");

    // Verify status badge
    await expect(page.locator("text=Software Engineer Portfolio")).toBeVisible();
  });

  test("TC-02: Desktop navigation anchors resolve to legitimate sections", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const expectedSections = [
      "about",
      "experience",
      "projects",
      "skills",
      "proof",
      "contact",
    ];

    for (const sectionId of expectedSections) {
      const section = page.locator(`section#${sectionId}`);
      await expect(section).toBeAttached();

      const navLink = page.locator(`nav a[href="#${sectionId}"]`).first();
      await expect(navLink).toBeVisible();
    }
  });

  test("TC-03: Mobile navigation drawer interactions & keyboard control", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggleButton = page.locator('button[aria-label="Open navigation menu"]');
    await expect(toggleButton).toBeVisible();

    // Open drawer
    await toggleButton.click();
    await expect(page.locator('button[aria-label="Close navigation menu"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Mobile Navigation Links"]')).toBeVisible();

    // Verify Escape key closes drawer
    await page.keyboard.press("Escape");
    await expect(page.locator('button[aria-label="Open navigation menu"]')).toBeVisible();

    // Open again and click a link to verify auto-closing
    await toggleButton.click();
    const aboutLink = page.locator('#mobile-nav-drawer a[href="#about"]');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page.locator('button[aria-label="Open navigation menu"]')).toBeVisible();
  });

  test("TC-04: Multi-viewport responsive sanity (zero horizontal overflow)", async ({
    page,
  }) => {
    const viewports = [
      { width: 1440, height: 900, name: "desktop-1440" },
      { width: 1280, height: 800, name: "laptop-1280" },
      { width: 768, height: 1024, name: "tablet-768" },
      { width: 390, height: 844, name: "mobile-390" },
      { width: 320, height: 640, name: "narrow-mobile-320" },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await page.waitForLoadState("domcontentloaded");

      const hasOverflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth > window.innerWidth ||
          document.body.scrollWidth > window.innerWidth
        );
      });

      expect(
        hasOverflow,
        `Viewport ${vp.name} (${vp.width}px) has unwanted horizontal overflow`
      ).toBe(false);
    }
  });

  test("TC-05: Skip link and keyboard accessibility", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute("href", "#main-content");

    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
  });

  test("TC-06: Outbound links enforce rel=noopener noreferrer security", async ({
    page,
  }) => {
    await page.goto("/");
    const outboundLinks = page.locator('a[target="_blank"]');
    const count = await outboundLinks.count();

    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const link = outboundLinks.nth(i);
      const rel = await link.getAttribute("rel");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });

  test("TC-07: Automated WCAG 2.1 AA accessibility audit (Axe-Core)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"]) // Evaluated separately in visual inspection
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("TC-08: Dual-theme toggle updates data-theme attribute and persists preference", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const toggle = page.locator('button[aria-label*="Switch to"]').first();
    await expect(toggle).toBeVisible();

    const initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );

    // Click toggle to flip theme
    await toggle.click();

    const newTheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(newTheme).not.toBe(initialTheme);
    expect(["light", "dark"]).toContain(newTheme);

    // Verify localStorage persistence
    const storedTheme = await page.evaluate(() => localStorage.getItem("theme"));
    expect(storedTheme).toBe(newTheme);
  });
});

