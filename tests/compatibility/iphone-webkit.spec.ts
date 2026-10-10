import { test, expect } from "@playwright/test";

const locales = [
  { prefix: "", language: "en", direction: "ltr" },
  { prefix: "/ar", language: "ar", direction: "rtl" },
  { prefix: "/de", language: "de", direction: "ltr" },
] as const;

const primaryRoutes = [
  "",
  "/about",
  "/experience",
  "/projects",
  "/capabilities",
  "/contact",
] as const;

for (const locale of locales) {
  test(`WebKit mobile: primary layouts render without overflow (${locale.language})`, async ({ page: fixturePage }) => {
    // Use a fresh page per direct load so pending Next.js link prefetches
    // from a previous document do not contaminate the next route's errors.
    for (const route of primaryRoutes) {
      const page = await fixturePage.context().newPage();
      const pageErrors: string[] = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));

      const path = `${locale.prefix}${route}` || "/";
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `HTTP status on ${path}`).toBe(200);

      await expect(page.locator("main h1").first(), `Heading on ${path}`).toBeVisible();
      await expect(page.locator("header").first(), `Header on ${path}`).toBeVisible();
      await expect(page.locator("footer").first(), `Footer on ${path}`).toBeAttached();

      const metrics = await page.evaluate(() => {
        const viewport = document.documentElement.clientWidth;
        const heading = document.querySelector("main h1")?.getBoundingClientRect();
        return {
          viewport,
          htmlWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          headingLeft: heading?.left ?? null,
          headingRight: heading?.right ?? null,
        };
      });
      expect(metrics.htmlWidth, `Document overflow at ${path}`).toBeLessThanOrEqual(metrics.viewport + 2);
      expect(metrics.bodyWidth, `Body overflow at ${path}`).toBeLessThanOrEqual(metrics.viewport + 2);
      if (metrics.headingLeft !== null && metrics.headingRight !== null) {
        expect(metrics.headingLeft, `Clipped heading at ${path}`).toBeGreaterThanOrEqual(-3);
        expect(metrics.headingRight, `Clipped heading at ${path}`).toBeLessThanOrEqual(metrics.viewport + 3);
      }
      expect(await page.locator("html").getAttribute("lang")).toBe(locale.language);
      expect(await page.locator("html").getAttribute("dir")).toBe(locale.direction);
      expect(pageErrors, `WebKit runtime errors on ${path}`).toEqual([]);
      await page.close();
    }
  });

  test(`WebKit mobile: drawer occupies viewport and navigates (${locale.language})`, async ({ page }) => {
    const home = locale.prefix || "/";
    await page.goto(home);
    const toggle = page.locator('button[aria-controls="mobile-nav-drawer"]');
    await expect(toggle).toBeVisible();
    await toggle.tap();
    const drawer = page.locator("#mobile-nav-drawer");
    await expect(drawer).toBeVisible();

    const info = await drawer.evaluate((node) => ({
      isBodyChild: node.parentElement === document.body,
      top: node.getBoundingClientRect().top,
      width: node.getBoundingClientRect().width,
      height: node.getBoundingClientRect().height,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    }));
    expect(info.isBodyChild).toBe(true);
    expect(info.top).toBeGreaterThanOrEqual(55);
    expect(info.height).toBeGreaterThan(info.viewportHeight * 0.6);
    expect(info.width).toBeLessThanOrEqual(info.viewportWidth + 2);

    const aboutHref = `${locale.prefix}/about`;
    const aboutLink = drawer.locator(`a[href="${aboutHref}"]`);
    await expect(aboutLink).toBeVisible();
    await aboutLink.tap();
    await expect(page).toHaveURL(new RegExp(`${aboutHref}$`));
    await expect(page.locator("main h1").first()).toBeVisible();
    await expect(drawer).toBeHidden();
  });
  test(`WebKit mobile: dark case-study and chapter anchor (${locale.language})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    const route = `${locale.prefix}/projects/real-time-object-detection`;
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1").first()).toBeVisible();
    expect(await page.locator("html").getAttribute("data-theme")).toBe("dark");

    const width = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(width.scroll).toBeLessThanOrEqual(width.viewport + 2);

    const chapterLink = page.locator('a[href="#problem"]').first();
    await expect(chapterLink).toBeVisible();
    await chapterLink.tap();
    await expect(page).toHaveURL(/#problem$/);
    await expect(page.locator("#problem")).toBeAttached();
  });

}
