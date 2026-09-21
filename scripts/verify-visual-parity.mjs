#!/usr/bin/env node

/**
 * Visual Parity Verifier
 * 
 * Performs deterministic pixel-level and DOM/geometry/typography comparisons
 * between Local (http://localhost:3000) and Production (https://alhassan-portfolio-phi.vercel.app).
 * 
 * Matrix:
 * - 14 Routes: 7 English (/, /about, /experience, /projects, /capabilities, /contact, /projects/real-time-object-detection)
 *              7 Arabic (/ar, /ar/about, /ar/experience, /ar/projects, /ar/capabilities, /ar/contact, /ar/projects/real-time-object-detection)
 * - 5 Viewports: 1440x900, 1280x800, 768x1024, 390x844, 320x700
 * - 2 Themes: light, dark
 * - 10 Interactive States: 5 English + 5 Arabic
 * Total: 140 static + 10 interactive = 150 visual comparison pairs
 * 
 * Normalization:
 * - Masks ONLY known dev-only artifacts (nextjs-portal, [data-nextjs-toast], #nextjs-dev-overlay, etc.)
 * - Disables CSS transitions/animations during capture for settled paint
 * - Waits for document.fonts.ready
 * - Identical browser engine, deviceScaleFactor, viewport, and scroll position
 * 
 * Output:
 * - test-results/visual-parity/screenshots/local/
 * - test-results/visual-parity/screenshots/production/
 * - test-results/visual-parity/diffs/
 * - test-results/visual-parity/visual-parity-results.json
 */

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const LOCAL_BASE = process.env.LOCAL_BASE || 'http://localhost:3000';
const PROD_BASE = process.env.PROD_BASE || 'https://alhassan-portfolio-phi.vercel.app';

const OUTPUT_DIR = path.resolve(process.cwd(), 'test-results', 'visual-parity');
const LOCAL_SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots', 'local');
const PROD_SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots', 'production');
const DIFFS_DIR = path.join(OUTPUT_DIR, 'diffs');

fs.mkdirSync(LOCAL_SCREENSHOTS_DIR, { recursive: true });
fs.mkdirSync(PROD_SCREENSHOTS_DIR, { recursive: true });
fs.mkdirSync(DIFFS_DIR, { recursive: true });

const ROUTES = [
  // English Routes (7)
  { id: 'en-home', path: '/' },
  { id: 'en-about', path: '/about' },
  { id: 'en-experience', path: '/experience' },
  { id: 'en-projects', path: '/projects' },
  { id: 'en-capabilities', path: '/capabilities' },
  { id: 'en-contact', path: '/contact' },
  { id: 'en-case-study', path: '/projects/real-time-object-detection' },

  // Arabic Routes (7)
  { id: 'ar-home', path: '/ar' },
  { id: 'ar-about', path: '/ar/about' },
  { id: 'ar-experience', path: '/ar/experience' },
  { id: 'ar-projects', path: '/ar/projects' },
  { id: 'ar-capabilities', path: '/ar/capabilities' },
  { id: 'ar-contact', path: '/ar/contact' },
  { id: 'ar-case-study', path: '/ar/projects/real-time-object-detection' }
];

const VIEWPORTS = [
  { id: '1440', width: 1440, height: 900 },
  { id: '1280', width: 1280, height: 800 },
  { id: '768', width: 768, height: 1024 },
  { id: '390', width: 390, height: 844 },
  { id: '320', width: 320, height: 700 }
];

const THEMES = ['light', 'dark'];

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: 'chrome', headless: true });
  } catch {
    return await chromium.launch({ headless: true });
  }
}

async function navigateWithRetry(page, url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      return;
    } catch (err) {
      if (attempt === retries) throw err;
      await page.waitForTimeout(500);
    }
  }
}

async function preparePage(page, theme, isLocal = false) {
  // Inject settled styles (disable transitions/animations during capture)
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        animation-duration: 0s !important;
        animation-delay: 0s !important;
      }
      ${isLocal ? `
        nextjs-portal,
        [data-nextjs-toast],
        #nextjs-dev-overlay,
        next-route-announcer,
        [data-next-badge-root] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      ` : ''}
    `
  }).catch(() => {});

  // Wait for all web fonts to settle
  await page.evaluate(async () => {
    if (document.fonts) {
      await document.fonts.ready;
    }
    window.scrollTo(0, 0);
  });

  await page.waitForTimeout(200);
}

async function extractGeometryAndTypography(page) {
  return await page.evaluate(() => {
    const getRect = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        width: Math.round(r.width),
        height: Math.round(r.height)
      };
    };

    const getTypography = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color
      };
    };

    return {
      geometry: {
        header: getRect('header'),
        mainH1: getRect('h1'),
        heroCtas: getRect('div[class*="ctaGroup"], div[class*="heroCtas"]'),
        coreFocus: getRect('div[class*="coreFocus"], div[class*="focusRail"], div[class*="focusMap"]'),
        selectedWorkSection: getRect('section[aria-labelledby*="featured"], section[class*="selectedSection"], div[class*="selectedSection"]'),
        firstSelectedItem: getRect('article[class*="selectedCard"], article[class*="projectCard"]'),
        footer: getRect('footer')
      },
      typography: {
        h1: getTypography('h1'),
        h2: getTypography('h2'),
        bodyCopy: getTypography('p'),
        navigation: getTypography('header nav a, header nav button'),
        primaryCta: getTypography('a[class*="btnPrimary"], button[class*="btnPrimary"], a[class*="ctaPrimary"]'),
        projectTitle: getTypography('article h3, article h2')
      }
    };
  });
}

async function diffScreenshots(localPath, prodPath, diffPath) {
  const [localRaw, prodRaw] = await Promise.all([
    sharp(localPath).raw().toBuffer({ resolveWithObject: true }),
    sharp(prodPath).raw().toBuffer({ resolveWithObject: true })
  ]);

  const width = localRaw.info.width;
  const height = localRaw.info.height;
  const prodWidth = prodRaw.info.width;
  const prodHeight = prodRaw.info.height;

  if (width !== prodWidth || height !== prodHeight) {
    return {
      dimensionMismatch: true,
      localDimensions: { width, height },
      prodDimensions: { width: prodWidth, height: prodHeight },
      totalPixels: width * height,
      changedPixels: width * height,
      changedPercentage: 100,
      maxChannelDelta: 255,
      diffPath: null
    };
  }

  const totalPixels = width * height;
  const channels = localRaw.info.channels;
  const localData = localRaw.data;
  const prodData = prodRaw.data;

  let changedPixels = 0;
  let maxChannelDelta = 0;
  let minX = width;
  let maxX = -1;
  let minY = height;
  let maxY = -1;

  // 4 channels RGBA for diff buffer
  const diffBuffer = Buffer.alloc(totalPixels * 4);

  for (let i = 0; i < totalPixels; i++) {
    const offset = i * channels;
    const diffOffset = i * 4;

    const r1 = localData[offset];
    const g1 = localData[offset + 1];
    const b1 = localData[offset + 2];
    const a1 = channels === 4 ? localData[offset + 3] : 255;

    const r2 = prodData[offset];
    const g2 = prodData[offset + 1];
    const b2 = prodData[offset + 2];
    const a2 = channels === 4 ? prodData[offset + 3] : 255;

    const dr = Math.abs(r1 - r2);
    const dg = Math.abs(g1 - g2);
    const db = Math.abs(b1 - b2);
    const da = Math.abs(a1 - a2);

    const delta = Math.max(dr, dg, db, da);

    if (delta > 0) {
      changedPixels++;
      if (delta > maxChannelDelta) {
        maxChannelDelta = delta;
      }

      const x = i % width;
      const y = Math.floor(i / width);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      // Highlight in bright magenta/brand red
      diffBuffer[diffOffset] = 228;
      diffBuffer[diffOffset + 1] = 18;
      diffBuffer[diffOffset + 2] = 45;
      diffBuffer[diffOffset + 3] = 255;
    } else {
      // Dimmed grayscale background for context
      const gray = Math.round(0.299 * r1 + 0.587 * g1 + 0.114 * b1);
      diffBuffer[diffOffset] = Math.round(gray * 0.3);
      diffBuffer[diffOffset + 1] = Math.round(gray * 0.3);
      diffBuffer[diffOffset + 2] = Math.round(gray * 0.3);
      diffBuffer[diffOffset + 3] = 255;
    }
  }

  const changedPercentage = (changedPixels / totalPixels) * 100;
  let savedDiffPath = null;

  if (changedPixels > 0) {
    await sharp(diffBuffer, {
      raw: { width, height, channels: 4 }
    }).png().toFile(diffPath);
    savedDiffPath = diffPath;
  }

  const boundingBox = changedPixels > 0 ? {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  } : null;

  return {
    dimensionMismatch: false,
    dimensions: { width, height },
    totalPixels,
    changedPixels,
    changedPercentage: Number(changedPercentage.toFixed(4)),
    maxChannelDelta,
    boundingBox,
    diffPath: savedDiffPath
  };
}

async function run() {
  console.log(`============================================================`);
  console.log(`🔍 VISUAL PARITY VERIFIER HARDENING`);
  console.log(`Local:      ${LOCAL_BASE}`);
  console.log(`Production: ${PROD_BASE}`);
  console.log(`============================================================\n`);

  const browser = await launchBrowser();
  const results = {
    metadata: {
      startedAt: new Date().toISOString(),
      localBase: LOCAL_BASE,
      prodBase: PROD_BASE,
      totalPairsExpected: ROUTES.length * VIEWPORTS.length * THEMES.length + 5
    },
    pairs: [],
    geometryDeltas: [],
    typographyDeltas: [],
    summary: {
      totalPairs: 0,
      exactPixelMatchPairs: 0,
      pairsWithDifferences: 0,
      worstChangedPercentage: 0,
      worstPairId: null,
      geometryMismatches: 0,
      typographyMismatches: 0
    }
  };

  // -------------------------------------------------------------
  // 1. STATIC ROUTES MATRIX (7 Routes x 5 Viewports x 2 Themes)
  // -------------------------------------------------------------
  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      for (const theme of THEMES) {
        const pairId = `${route.id}-${vp.id}-${theme}`;
        process.stdout.write(`Evaluating [${pairId}]... `);

        const localContext = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: 1
        });
        await localContext.addInitScript((th) => {
          try {
            localStorage.setItem('theme', th);
            document.documentElement.setAttribute('data-theme', th);
          } catch {
            // ignore
          }
        }, theme);

        const prodContext = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: 1
        });
        await prodContext.addInitScript((th) => {
          try {
            localStorage.setItem('theme', th);
            document.documentElement.setAttribute('data-theme', th);
          } catch {
            // ignore
          }
        }, theme);

        const localPage = await localContext.newPage();
        const prodPage = await prodContext.newPage();

        await Promise.all([
          navigateWithRetry(localPage, `${LOCAL_BASE}${route.path}`),
          navigateWithRetry(prodPage, `${PROD_BASE}${route.path}`)
        ]);

        await Promise.all([
          preparePage(localPage, theme, true),
          preparePage(prodPage, theme, false)
        ]);

        const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
        const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
        const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

        await Promise.all([
          localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
          prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
        ]);

        // Geometry & Typography comparisons
        const [localMeta, prodMeta] = await Promise.all([
          extractGeometryAndTypography(localPage),
          extractGeometryAndTypography(prodPage)
        ]);

        // Compare Geometry
        for (const [elemKey, localRect] of Object.entries(localMeta.geometry)) {
          const prodRect = prodMeta.geometry[elemKey];
          if (localRect && prodRect) {
            const dx = Math.abs(localRect.x - prodRect.x);
            const dy = Math.abs(localRect.y - prodRect.y);
            const dw = Math.abs(localRect.width - prodRect.width);
            const dh = Math.abs(localRect.height - prodRect.height);

            if (dx > 0 || dy > 0 || dw > 0 || dh > 0) {
              results.geometryDeltas.push({
                pairId,
                element: elemKey,
                local: localRect,
                production: prodRect,
                delta: { dx, dy, dw, dh }
              });
            }
          }
        }

        // Compare Typography
        for (const [elemKey, localTypo] of Object.entries(localMeta.typography)) {
          const prodTypo = prodMeta.typography[elemKey];
          if (localTypo && prodTypo) {
            for (const [prop, localVal] of Object.entries(localTypo)) {
              const prodVal = prodTypo[prop];
              if (localVal !== prodVal) {
                results.typographyDeltas.push({
                  pairId,
                  element: elemKey,
                  property: prop,
                  local: localVal,
                  production: prodVal
                });
              }
            }
          }
        }

        // Pixel Diff
        const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);

        const pairRecord = {
          pairId,
          type: 'static',
          route: route.path,
          viewport: `${vp.width}x${vp.height}`,
          theme,
          localScreenshot: localScreenshotPath,
          prodScreenshot: prodScreenshotPath,
          ...diffReport
        };

        results.pairs.push(pairRecord);
        results.summary.totalPairs++;

        if (diffReport.changedPixels === 0) {
          results.summary.exactPixelMatchPairs++;
          console.log(`EXACT PIXEL MATCH (0 diff)`);
        } else {
          results.summary.pairsWithDifferences++;
          if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
            results.summary.worstChangedPercentage = diffReport.changedPercentage;
            results.summary.worstPairId = pairId;
          }
          console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%, maxDelta=${diffReport.maxChannelDelta})`);
        }

        await localPage.close();
        await localContext.close();
        await prodPage.close();
        await prodContext.close();
      }
    }
  }

  // -------------------------------------------------------------
  // 2. INTERACTIVE STATES MATRIX
  // -------------------------------------------------------------
  console.log(`\n--- Evaluating Interactive States ---`);

  // Interactive 1: Projects Filter Selected
  {
    const pairId = 'interactive-projects-filter';
    process.stdout.write(`Evaluating [${pairId}]... `);

    const localContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const prodContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const localPage = await localContext.newPage();
    const prodPage = await prodContext.newPage();

    await Promise.all([
      navigateWithRetry(localPage, `${LOCAL_BASE}/projects`),
      navigateWithRetry(prodPage, `${PROD_BASE}/projects`)
    ]);

    await Promise.all([
      preparePage(localPage, 'light', true),
      preparePage(prodPage, 'light', false)
    ]);

    // Click second filter button (Computer Vision & AI)
    await Promise.all([
      localPage.locator('div[role="group"] button').nth(1).click(),
      prodPage.locator('div[role="group"] button').nth(1).click()
    ]);
    await Promise.all([
      localPage.waitForTimeout(200),
      prodPage.waitForTimeout(200)
    ]);

    const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
    const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
    const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

    await Promise.all([
      localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
      prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
    ]);

    const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);
    results.pairs.push({
      pairId,
      type: 'interactive',
      description: 'Projects category filter selected (nth=1)',
      viewport: '1440x900',
      theme: 'light',
      ...diffReport
    });
    results.summary.totalPairs++;
    if (diffReport.changedPixels === 0) {
      results.summary.exactPixelMatchPairs++;
      console.log(`EXACT PIXEL MATCH (0 diff)`);
    } else {
      results.summary.pairsWithDifferences++;
      if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
        results.summary.worstChangedPercentage = diffReport.changedPercentage;
        results.summary.worstPairId = pairId;
      }
      console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%)`);
    }

    await localPage.close();
    await localContext.close();
    await prodPage.close();
    await prodContext.close();
  }

  // Interactive 2: Experience Role Selected
  {
    const pairId = 'interactive-experience-role';
    process.stdout.write(`Evaluating [${pairId}]... `);

    const localContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const prodContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const localPage = await localContext.newPage();
    const prodPage = await prodContext.newPage();

    await Promise.all([
      navigateWithRetry(localPage, `${LOCAL_BASE}/experience`),
      navigateWithRetry(prodPage, `${PROD_BASE}/experience`)
    ]);

    await Promise.all([
      preparePage(localPage, 'light', true),
      preparePage(prodPage, 'light', false)
    ]);

    // Click second role in desktop tablist
    await Promise.all([
      localPage.locator('div[role="tablist"] button').nth(1).click(),
      prodPage.locator('div[role="tablist"] button').nth(1).click()
    ]);
    await Promise.all([
      localPage.waitForTimeout(200),
      prodPage.waitForTimeout(200)
    ]);

    const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
    const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
    const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

    await Promise.all([
      localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
      prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
    ]);

    const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);
    results.pairs.push({
      pairId,
      type: 'interactive',
      description: 'Experience role tab selected (nth=1)',
      viewport: '1440x900',
      theme: 'light',
      ...diffReport
    });
    results.summary.totalPairs++;
    if (diffReport.changedPixels === 0) {
      results.summary.exactPixelMatchPairs++;
      console.log(`EXACT PIXEL MATCH (0 diff)`);
    } else {
      results.summary.pairsWithDifferences++;
      if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
        results.summary.worstChangedPercentage = diffReport.changedPercentage;
        results.summary.worstPairId = pairId;
      }
      console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%)`);
    }

    await localPage.close();
    await localContext.close();
    await prodPage.close();
    await prodContext.close();
  }

  // Interactive 3: Mobile Drawer Open
  {
    const pairId = 'interactive-mobile-drawer';
    process.stdout.write(`Evaluating [${pairId}]... `);

    const localContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const prodContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const localPage = await localContext.newPage();
    const prodPage = await prodContext.newPage();

    await Promise.all([
      navigateWithRetry(localPage, `${LOCAL_BASE}/`),
      navigateWithRetry(prodPage, `${PROD_BASE}/`)
    ]);

    await Promise.all([
      preparePage(localPage, 'light', true),
      preparePage(prodPage, 'light', false)
    ]);

    // Click mobile drawer button
    await Promise.all([
      localPage.locator('button[aria-controls="mobile-nav-drawer"]').click(),
      prodPage.locator('button[aria-controls="mobile-nav-drawer"]').click()
    ]);
    await Promise.all([
      localPage.waitForTimeout(300),
      prodPage.waitForTimeout(300)
    ]);

    const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
    const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
    const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

    await Promise.all([
      localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
      prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
    ]);

    const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);
    results.pairs.push({
      pairId,
      type: 'interactive',
      description: 'Mobile navigation drawer opened',
      viewport: '390x844',
      theme: 'light',
      ...diffReport
    });
    results.summary.totalPairs++;
    if (diffReport.changedPixels === 0) {
      results.summary.exactPixelMatchPairs++;
      console.log(`EXACT PIXEL MATCH (0 diff)`);
    } else {
      results.summary.pairsWithDifferences++;
      if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
        results.summary.worstChangedPercentage = diffReport.changedPercentage;
        results.summary.worstPairId = pairId;
      }
      console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%)`);
    }

    await localPage.close();
    await localContext.close();
    await prodPage.close();
    await prodContext.close();
  }

  // Interactive 4: Command Palette Open
  {
    const pairId = 'interactive-command-palette';
    process.stdout.write(`Evaluating [${pairId}]... `);

    const localContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const prodContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const localPage = await localContext.newPage();
    const prodPage = await prodContext.newPage();

    await Promise.all([
      navigateWithRetry(localPage, `${LOCAL_BASE}/`),
      navigateWithRetry(prodPage, `${PROD_BASE}/`)
    ]);

    await Promise.all([
      preparePage(localPage, 'light', true),
      preparePage(prodPage, 'light', false)
    ]);

    // Open command palette
    await Promise.all([
      localPage.keyboard.press('Control+k'),
      prodPage.keyboard.press('Control+k')
    ]);
    await Promise.all([
      localPage.waitForTimeout(400),
      prodPage.waitForTimeout(400)
    ]);

    const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
    const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
    const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

    await Promise.all([
      localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
      prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
    ]);

    const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);
    results.pairs.push({
      pairId,
      type: 'interactive',
      description: 'Command Palette opened via Ctrl+K',
      viewport: '1440x900',
      theme: 'light',
      ...diffReport
    });
    results.summary.totalPairs++;
    if (diffReport.changedPixels === 0) {
      results.summary.exactPixelMatchPairs++;
      console.log(`EXACT PIXEL MATCH (0 diff)`);
    } else {
      results.summary.pairsWithDifferences++;
      if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
        results.summary.worstChangedPercentage = diffReport.changedPercentage;
        results.summary.worstPairId = pairId;
      }
      console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%)`);
    }

    await localPage.close();
    await localContext.close();
    await prodPage.close();
    await prodContext.close();
  }

  // Interactive 5: Theme Toggled State
  {
    const pairId = 'interactive-theme-toggled';
    process.stdout.write(`Evaluating [${pairId}]... `);

    const localContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const prodContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const localPage = await localContext.newPage();
    const prodPage = await prodContext.newPage();

    await Promise.all([
      navigateWithRetry(localPage, `${LOCAL_BASE}/`),
      navigateWithRetry(prodPage, `${PROD_BASE}/`)
    ]);

    await Promise.all([
      preparePage(localPage, 'light', true),
      preparePage(prodPage, 'light', false)
    ]);

    // Click theme toggle button
    const toggleSelector = 'button[aria-label*="theme" i], button[aria-label*="dark" i], button[aria-label*="light" i]';
    await Promise.all([
      localPage.click(toggleSelector),
      prodPage.click(toggleSelector)
    ]);
    await Promise.all([
      localPage.waitForTimeout(300),
      prodPage.waitForTimeout(300)
    ]);

    const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
    const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
    const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

    await Promise.all([
      localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
      prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
    ]);

    const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);
    results.pairs.push({
      pairId,
      type: 'interactive',
      description: 'Theme toggled from light to dark',
      viewport: '1440x900',
      theme: 'toggled',
      ...diffReport
    });
    results.summary.totalPairs++;
    if (diffReport.changedPixels === 0) {
      results.summary.exactPixelMatchPairs++;
      console.log(`EXACT PIXEL MATCH (0 diff)`);
    } else {
      results.summary.pairsWithDifferences++;
      if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
        results.summary.worstChangedPercentage = diffReport.changedPercentage;
        results.summary.worstPairId = pairId;
      }
      console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%)`);
    }

    await localPage.close();
    await localContext.close();
    await prodPage.close();
    await prodContext.close();
  }

  // Interactive 6: Arabic Projects Filter Selected
  {
    const pairId = 'interactive-ar-projects-filter';
    process.stdout.write(`Evaluating [${pairId}]... `);

    const localContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const prodContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const localPage = await localContext.newPage();
    const prodPage = await prodContext.newPage();

    await Promise.all([
      navigateWithRetry(localPage, `${LOCAL_BASE}/ar/projects`),
      navigateWithRetry(prodPage, `${PROD_BASE}/ar/projects`)
    ]);

    await Promise.all([
      preparePage(localPage, 'light', true),
      preparePage(prodPage, 'light', false)
    ]);

    // Click second filter button (Computer Vision & AI)
    await Promise.all([
      localPage.locator('div[role="group"] button').nth(1).click(),
      prodPage.locator('div[role="group"] button').nth(1).click()
    ]);
    await Promise.all([
      localPage.waitForTimeout(200),
      prodPage.waitForTimeout(200)
    ]);

    const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
    const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
    const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

    await Promise.all([
      localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
      prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
    ]);

    const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);
    results.pairs.push({
      pairId,
      type: 'interactive',
      description: 'Arabic Projects category filter selected (nth=1)',
      viewport: '1440x900',
      theme: 'light',
      ...diffReport
    });
    results.summary.totalPairs++;
    if (diffReport.changedPixels === 0) {
      results.summary.exactPixelMatchPairs++;
      console.log(`EXACT PIXEL MATCH (0 diff)`);
    } else {
      results.summary.pairsWithDifferences++;
      if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
        results.summary.worstChangedPercentage = diffReport.changedPercentage;
        results.summary.worstPairId = pairId;
      }
      console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%)`);
    }

    await localPage.close();
    await localContext.close();
    await prodPage.close();
    await prodContext.close();
  }

  // Interactive 7: Arabic Experience Role Selected
  {
    const pairId = 'interactive-ar-experience-role';
    process.stdout.write(`Evaluating [${pairId}]... `);

    const localContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const prodContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const localPage = await localContext.newPage();
    const prodPage = await prodContext.newPage();

    await Promise.all([
      navigateWithRetry(localPage, `${LOCAL_BASE}/ar/experience`),
      navigateWithRetry(prodPage, `${PROD_BASE}/ar/experience`)
    ]);

    await Promise.all([
      preparePage(localPage, 'light', true),
      preparePage(prodPage, 'light', false)
    ]);

    // Click second role in desktop tablist
    await Promise.all([
      localPage.locator('div[role="tablist"] button').nth(1).click(),
      prodPage.locator('div[role="tablist"] button').nth(1).click()
    ]);
    await Promise.all([
      localPage.waitForTimeout(200),
      prodPage.waitForTimeout(200)
    ]);

    const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
    const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
    const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

    await Promise.all([
      localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
      prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
    ]);

    const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);
    results.pairs.push({
      pairId,
      type: 'interactive',
      description: 'Arabic Experience role tab selected (nth=1)',
      viewport: '1440x900',
      theme: 'light',
      ...diffReport
    });
    results.summary.totalPairs++;
    if (diffReport.changedPixels === 0) {
      results.summary.exactPixelMatchPairs++;
      console.log(`EXACT PIXEL MATCH (0 diff)`);
    } else {
      results.summary.pairsWithDifferences++;
      if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
        results.summary.worstChangedPercentage = diffReport.changedPercentage;
        results.summary.worstPairId = pairId;
      }
      console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%)`);
    }

    await localPage.close();
    await localContext.close();
    await prodPage.close();
    await prodContext.close();
  }

  // Interactive 8: Arabic Mobile Drawer Open
  {
    const pairId = 'interactive-ar-mobile-drawer';
    process.stdout.write(`Evaluating [${pairId}]... `);

    const localContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const prodContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const localPage = await localContext.newPage();
    const prodPage = await prodContext.newPage();

    await Promise.all([
      navigateWithRetry(localPage, `${LOCAL_BASE}/ar`),
      navigateWithRetry(prodPage, `${PROD_BASE}/ar`)
    ]);

    await Promise.all([
      preparePage(localPage, 'light', true),
      preparePage(prodPage, 'light', false)
    ]);

    // Click mobile drawer button
    await Promise.all([
      localPage.locator('button[aria-controls="mobile-nav-drawer"]').click(),
      prodPage.locator('button[aria-controls="mobile-nav-drawer"]').click()
    ]);
    await Promise.all([
      localPage.waitForTimeout(300),
      prodPage.waitForTimeout(300)
    ]);

    const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
    const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
    const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

    await Promise.all([
      localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
      prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
    ]);

    const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);
    results.pairs.push({
      pairId,
      type: 'interactive',
      description: 'Arabic Mobile navigation drawer opened',
      viewport: '390x844',
      theme: 'light',
      ...diffReport
    });
    results.summary.totalPairs++;
    if (diffReport.changedPixels === 0) {
      results.summary.exactPixelMatchPairs++;
      console.log(`EXACT PIXEL MATCH (0 diff)`);
    } else {
      results.summary.pairsWithDifferences++;
      if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
        results.summary.worstChangedPercentage = diffReport.changedPercentage;
        results.summary.worstPairId = pairId;
      }
      console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%)`);
    }

    await localPage.close();
    await localContext.close();
    await prodPage.close();
    await prodContext.close();
  }

  // Interactive 9: Arabic Command Palette Open
  {
    const pairId = 'interactive-ar-command-palette';
    process.stdout.write(`Evaluating [${pairId}]... `);

    const localContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const prodContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const localPage = await localContext.newPage();
    const prodPage = await prodContext.newPage();

    await Promise.all([
      navigateWithRetry(localPage, `${LOCAL_BASE}/ar`),
      navigateWithRetry(prodPage, `${PROD_BASE}/ar`)
    ]);

    await Promise.all([
      preparePage(localPage, 'light', true),
      preparePage(prodPage, 'light', false)
    ]);

    // Open command palette
    await Promise.all([
      localPage.keyboard.press('Control+k'),
      prodPage.keyboard.press('Control+k')
    ]);
    await Promise.all([
      localPage.waitForTimeout(400),
      prodPage.waitForTimeout(400)
    ]);

    const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
    const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
    const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

    await Promise.all([
      localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
      prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
    ]);

    const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);
    results.pairs.push({
      pairId,
      type: 'interactive',
      description: 'Arabic Command Palette opened via Ctrl+K',
      viewport: '1440x900',
      theme: 'light',
      ...diffReport
    });
    results.summary.totalPairs++;
    if (diffReport.changedPixels === 0) {
      results.summary.exactPixelMatchPairs++;
      console.log(`EXACT PIXEL MATCH (0 diff)`);
    } else {
      results.summary.pairsWithDifferences++;
      if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
        results.summary.worstChangedPercentage = diffReport.changedPercentage;
        results.summary.worstPairId = pairId;
      }
      console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%)`);
    }

    await localPage.close();
    await localContext.close();
    await prodPage.close();
    await prodContext.close();
  }

  // Interactive 10: Arabic Theme Toggled State
  {
    const pairId = 'interactive-ar-theme-toggled';
    process.stdout.write(`Evaluating [${pairId}]... `);

    const localContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const prodContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const localPage = await localContext.newPage();
    const prodPage = await prodContext.newPage();

    await Promise.all([
      navigateWithRetry(localPage, `${LOCAL_BASE}/ar`),
      navigateWithRetry(prodPage, `${PROD_BASE}/ar`)
    ]);

    await Promise.all([
      preparePage(localPage, 'light', true),
      preparePage(prodPage, 'light', false)
    ]);

    // Click theme toggle button
    const toggleSelector = 'button[aria-label*="theme" i], button[aria-label*="dark" i], button[aria-label*="light" i], button[aria-label*="سمة" i], button[aria-label*="الوضع" i]';
    await Promise.all([
      localPage.click(toggleSelector),
      prodPage.click(toggleSelector)
    ]);
    await Promise.all([
      localPage.waitForTimeout(300),
      prodPage.waitForTimeout(300)
    ]);

    const localScreenshotPath = path.join(LOCAL_SCREENSHOTS_DIR, `${pairId}.png`);
    const prodScreenshotPath = path.join(PROD_SCREENSHOTS_DIR, `${pairId}.png`);
    const diffPath = path.join(DIFFS_DIR, `${pairId}-diff.png`);

    await Promise.all([
      localPage.screenshot({ path: localScreenshotPath, fullPage: false }),
      prodPage.screenshot({ path: prodScreenshotPath, fullPage: false })
    ]);

    const diffReport = await diffScreenshots(localScreenshotPath, prodScreenshotPath, diffPath);
    results.pairs.push({
      pairId,
      type: 'interactive',
      description: 'Arabic Theme toggled from light to dark',
      viewport: '1440x900',
      theme: 'toggled',
      ...diffReport
    });
    results.summary.totalPairs++;
    if (diffReport.changedPixels === 0) {
      results.summary.exactPixelMatchPairs++;
      console.log(`EXACT PIXEL MATCH (0 diff)`);
    } else {
      results.summary.pairsWithDifferences++;
      if (diffReport.changedPercentage > results.summary.worstChangedPercentage) {
        results.summary.worstChangedPercentage = diffReport.changedPercentage;
        results.summary.worstPairId = pairId;
      }
      console.log(`DIFF: ${diffReport.changedPixels}px (${diffReport.changedPercentage}%)`);
    }

    await localPage.close();
    await localContext.close();
    await prodPage.close();
    await prodContext.close();
  }

  await browser.close();

  results.summary.geometryMismatches = results.geometryDeltas.length;
  results.summary.typographyMismatches = results.typographyDeltas.length;
  results.metadata.completedAt = new Date().toISOString();

  const resultsJsonPath = path.join(OUTPUT_DIR, 'visual-parity-results.json');
  fs.writeFileSync(resultsJsonPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`\n============================================================`);
  console.log(`📊 FINAL VISUAL DIFF AUDIT SUMMARY`);
  console.log(`============================================================`);
  console.log(`Total Screenshot Pairs Tested:  ${results.summary.totalPairs}`);
  console.log(`Exact 0-Pixel Match Pairs:       ${results.summary.exactPixelMatchPairs}`);
  console.log(`Pairs with Differences:          ${results.summary.pairsWithDifferences}`);
  console.log(`Worst Changed-Pixel Percentage:  ${results.summary.worstChangedPercentage}% (${results.summary.worstPairId || 'none'})`);
  console.log(`Geometry Mismatches:             ${results.summary.geometryMismatches}`);
  console.log(`Typography Mismatches:           ${results.summary.typographyMismatches}`);
  console.log(`Results JSON saved to:           ${resultsJsonPath}`);
  console.log(`============================================================\n`);
}

run().catch((err) => {
  console.error('Fatal error during visual parity verifier execution:', err);
  process.exit(1);
});
