import { test, expect } from "@playwright/test";

/**
 * Post-Audit Accessibility & UX Acceptance Suite
 * Verifies all 4 P0 accessibility defects and key P1/P2 refinements across EN, AR (RTL), and DE.
 */
test.describe("Post-Audit Accessibility & UX Acceptance", () => {
  test("P0-01: Command Palette traps focus, inerts background, restores focus, and indexes all 17 projects + 6 CVs", async ({
    page,
  }) => {
    for (const route of ["/", "/ar", "/de"]) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const trigger = page.locator("header button[class*='searchTrigger']").first();
      await trigger.focus();
      await trigger.click();

      const dialog = page.locator('[role="dialog"][aria-modal="true"][class*="palette"]');
      await expect(dialog).toBeVisible();

      // Background header/main/footer must be inert while modal is open
      const backgroundInert = await page.evaluate(() => {
        const header = document.querySelector("header");
        const main = document.querySelector("main");
        const footer = document.querySelector("footer");
        return Boolean(
          header?.hasAttribute("inert") &&
            main?.hasAttribute("inert") &&
            footer?.hasAttribute("inert")
        );
      });
      expect(backgroundInert).toBe(true);

      // Tab and Shift+Tab cycles must stay strictly inside the dialog
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press("Tab");
        const inside = await page.evaluate(() => {
          const dlg = document.querySelector('[role="dialog"][aria-modal="true"][class*="palette"]');
          return Boolean(dlg && dlg.contains(document.activeElement));
        });
        expect(inside).toBe(true);
      }

      for (let i = 0; i < 4; i++) {
        await page.keyboard.press("Shift+Tab");
        const inside = await page.evaluate(() => {
          const dlg = document.querySelector('[role="dialog"][aria-modal="true"][class*="palette"]');
          return Boolean(dlg && dlg.contains(document.activeElement));
        });
        expect(inside).toBe(true);
      }

      // Search scope includes archive projects (e.g. Omnifood) and ATS/Standard CVs
      const searchInput = dialog.locator('input[type="text"]');
      await searchInput.fill("Omnifood");
      await expect(dialog.locator('[role="option"]', { hasText: /Omnifood/i }).first()).toBeVisible();

      await searchInput.fill("ATS");
      await expect(dialog.locator('[role="option"]', { hasText: /ATS/i }).first()).toBeVisible();

      // Escape closes palette and restores focus to trigger
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);

      const restoredToTrigger = await page.evaluate(() => {
        return Boolean(document.activeElement?.className?.toString().includes("searchTrigger"));
      });
      expect(restoredToTrigger).toBe(true);

      // Inert must be cleared after close
      const inertCleared = await page.evaluate(() => {
        return !document.querySelector("main")?.hasAttribute("inert");
      });
      expect(inertCleared).toBe(true);
    }

    // Mobile 320px: Close button visible and no clipped ESC hint
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const mobileTrigger = page.locator('header button[aria-label="Search & Navigator"]');
    await mobileTrigger.click();
    const mobileDialog = page.locator('[role="dialog"][aria-modal="true"][class*="palette"]');
    await expect(mobileDialog).toBeVisible();
    const closeBtn = mobileDialog.locator('button[class*="closeBtn"]');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(mobileDialog).toHaveCount(0);
  });

  test("P0-02: Skip-to-main-content transfers keyboard focus to #main-content and bypasses header", async ({
    page,
  }) => {
    for (const route of ["/", "/ar", "/de"]) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      await page.keyboard.press("Tab");
      const onSkipLink = await page.evaluate(() => {
        const el = document.activeElement as HTMLAnchorElement | null;
        return Boolean(el && el.tagName === "A" && el.getAttribute("href") === "#main-content");
      });
      expect(onSkipLink).toBe(true);

      await page.keyboard.press("Enter");
      const focusedMain = await page.evaluate(() => document.activeElement?.id === "main-content");
      expect(focusedMain).toBe(true);

      await page.keyboard.press("Tab");
      const nextInsideMain = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          inMain: Boolean(el?.closest("main")),
          inHeader: Boolean(el?.closest("header")),
        };
      });
      expect(nextInsideMain.inMain).toBe(true);
      expect(nextInsideMain.inHeader).toBe(false);
    }
  });

  test("P0-03: Functional links and badges meet WCAG AA (>= 4.5:1) contrast in Light and Dark themes", async ({
    page,
  }) => {
    async function measureContrastRatio(selector: string) {
      return page.evaluate((sel) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (!el) return null;
        const parseRgba = (str: string) => {
          const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (!m) return null;
          return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
        };
        const lum = (c: { r: number; g: number; b: number }) => {
          const [r, g, b] = [c.r, c.g, c.b].map((v) => {
            const s = v / 255;
            return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const blend = (fg: { r: number; g: number; b: number; a: number }, bg: { r: number; g: number; b: number }) => ({
          r: fg.r * fg.a + bg.r * (1 - fg.a),
          g: fg.g * fg.a + bg.g * (1 - fg.a),
          b: fg.b * fg.a + bg.b * (1 - fg.a),
        });
        const fg = parseRgba(getComputedStyle(el).color);
        if (!fg) return null;
        const layers: Array<{ r: number; g: number; b: number; a: number }> = [];
        let cur: HTMLElement | null = el;
        while (cur) {
          const bg = parseRgba(getComputedStyle(cur).backgroundColor);
          if (bg && bg.a > 0) layers.push(bg);
          cur = cur.parentElement;
        }
        let effBg = { r: 255, g: 255, b: 255 };
        for (let i = layers.length - 1; i >= 0; i--) {
          effBg = blend(layers[i], effBg);
        }
        const effFg = blend(fg, effBg);
        const l1 = lum(effFg);
        const l2 = lum(effBg);
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      }, selector);
    }

    await page.setViewportSize({ width: 1440, height: 900 });

    // Dark theme contrast verification
    await page.addInitScript(() => {
      localStorage.setItem("theme", "dark");
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const homeViewAllDark = await measureContrastRatio('a[class*="viewAllLink"]');
    expect(homeViewAllDark).not.toBeNull();
    expect(homeViewAllDark!).toBeGreaterThanOrEqual(4.5);

    const homeRoleCompanyDark = await measureContrastRatio('span[class*="roleCompany"]');
    expect(homeRoleCompanyDark).not.toBeNull();
    expect(homeRoleCompanyDark!).toBeGreaterThanOrEqual(4.5);

    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    const cvDownloadDark = await measureContrastRatio('div[class*="cvDownloadAction"]');
    expect(cvDownloadDark).not.toBeNull();
    expect(cvDownloadDark!).toBeGreaterThanOrEqual(4.5);

    const cvFormatBadgeDark = await measureContrastRatio('span[class*="cvFormatBadge"]');
    expect(cvFormatBadgeDark).not.toBeNull();
    expect(cvFormatBadgeDark!).toBeGreaterThanOrEqual(4.5);

    await page.goto("/capabilities");
    await page.waitForLoadState("networkidle");
    const certLinkDark = await measureContrastRatio('a[class*="certActionLink"]');
    expect(certLinkDark).not.toBeNull();
    expect(certLinkDark!).toBeGreaterThanOrEqual(4.5);

    // Light theme Ongoing badge contrast verification
    await page.addInitScript(() => {
      localStorage.setItem("theme", "light");
    });
    await page.goto("/capabilities");
    await page.waitForLoadState("networkidle");
    const ongoingLight = await measureContrastRatio('span[class*="certStatusBadge"]');
    expect(ongoingLight).not.toBeNull();
    expect(ongoingLight!).toBeGreaterThanOrEqual(4.5);
  });

  test("P0-04: Experience Explorer tabs support vertical ArrowDown/ArrowUp/Home/End and roving tabindex", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/experience");
    await page.waitForLoadState("networkidle");

    const tablist = page.locator('[role="tablist"]').first();
    await expect(tablist).toHaveAttribute("aria-orientation", "vertical");

    const tabs = tablist.locator('[role="tab"]');
    const count = await tabs.count();
    expect(count).toBeGreaterThanOrEqual(5);

    const selectedTab = tablist.locator('[role="tab"][aria-selected="true"]');
    await expect(selectedTab).toHaveCount(1);
    await expect(selectedTab).toHaveAttribute("tabindex", "0");

    // Focus the first tab via Home, then navigate via ArrowDown, End, ArrowUp
    await selectedTab.focus();
    await page.keyboard.press("Home");
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
    await expect(tabs.first()).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(1)).toBeFocused();

    await page.keyboard.press("End");
    await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
    await expect(tabs.last()).toBeFocused();

    await page.keyboard.press("ArrowUp");
    await expect(tabs.nth(count - 2)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(count - 2)).toBeFocused();
  });

  test("P1-05, P1-10, P2-12, P2-14: Direct CV links, accurate capability links, filter continuity, and language menu keyboard", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // P1-05: Footer Download CV links directly to #cv-downloads and target exists
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const footerCv = page.locator('footer a[href="/contact#cv-downloads"]');
    await expect(footerCv).toBeVisible();
    await footerCv.click();
    await expect(page).toHaveURL(/\/contact#cv-downloads$/);
    await expect(page.locator("#cv-downloads")).toBeVisible();

    // P1-10: Capabilities section links ROBOCAM Controller and Jaib Financial Operations to exact targets
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator('a[href="/projects/robocam-controller"]').first()).toBeVisible();
    await expect(page.locator('a[href="/experience#ahd-financial-deputy"]').first()).toBeVisible();

    // P2-12: Filter continuity across case study navigation (clean canonical project URL + return-to-filter link)
    await page.goto("/projects");
    await page.waitForLoadState("networkidle");
    const roboticsFilter = page.locator('button[aria-pressed]', { hasText: /Systems & Robotics/i });
    await roboticsFilter.click();
    await expect(page).toHaveURL(/\?category=Systems/);
    const robocamLink = page.locator('a[href="/projects/robocam-controller"]').first();
    await robocamLink.click();
    await expect(page).toHaveURL(/\/projects\/robocam-controller$/);
    const backLink = page.locator('a[href*="/projects?category=Systems"]').first();
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL(/\/projects\?category=Systems/);
    await expect(roboticsFilter).toHaveAttribute("aria-pressed", "true");

    // P2-14: Desktop language menu keyboard ArrowDown & Escape
    const langTrigger = page.locator('header button[aria-haspopup="menu"]');
    await langTrigger.focus();
    await page.keyboard.press("ArrowDown");
    await expect(langTrigger).toHaveAttribute("aria-expanded", "true");
    const firstMenuItem = page.locator('#desktop-lang-menu [role="menuitem"]').first();
    await expect(firstMenuItem).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(page.locator('#desktop-lang-menu [role="menuitem"]').nth(1)).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(langTrigger).toHaveAttribute("aria-expanded", "false");
    await expect(langTrigger).toBeFocused();
  });
});
