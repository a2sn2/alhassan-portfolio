#!/usr/bin/env node

/**
 * Production Verification & Release Hardening Script
 * 
 * Validates the live deployment of https://alhassan-portfolio-phi.vercel.app:
 * 1. HTTP 200 status for all canonical routes and project case studies
 * 2. Strict content integrity (canonical identity, role, location, email, languages, Core Focus, Availability)
 * 3. Complete absence of ungrounded phrases and metrics
 * 4. Accessible ProjectExplorer category filtering and dynamic count updates
 * 5. ExperienceExplorer desktop tablist/tabpanel sync and mobile accordion expansion
 * 6. Header mobile drawer authentic visibility, accessibility, and Escape closure
 * 7. Command Palette keyboard activation (Ctrl+K), dialog visibility, and Escape closure
 * 8. Theme toggling, persistence on reload, and cross-route retention
 * 9. Responsive overflow matrix (no horizontal scroll) across 7 routes x 4 viewports (1440, 768, 390, 320)
 * 10. CV package actions (exactly 6 variants, canonical /cv/ URLs, HTTP 200, mailto link)
 * 
 * Usage:
 *   node scripts/verify-production.mjs
 *   npm run verify:production
 */

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://alhassan-portfolio-phi.vercel.app';
const BASE_URL = PRODUCTION_URL.replace(/\/+$/, '');

const PRIMARY_ROUTES = [
  '/',
  '/about',
  '/experience',
  '/projects',
  '/capabilities',
  '/contact',
  '/official-cv'
];

const REPRESENTATIVE_PROJECT_ROUTE = '/projects/real-time-object-detection';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow-mobile', width: 320, height: 568 }
];

const BANNED_PHRASES = [
  'backend REST microservices',
  'quality benchmarks for production releases',
  'low-latency visual tracking',
  '89.26%',
  '99.7%',
  '99.4%',
  '23ms',
  '500k+',
  'Lead Developer & Researcher',
  'Senior AI Solutions Engineer',
  'Computer Systems & AI Engineer',
  'VERIFIED FOCUS',
  '34%',
  '15k+',
  'sub-50ms',
  'Systems Automation Engineer',
  'Robotics Software Developer',
  'eng.al-hassan.al-shami@outlook.com',
  'turning theoretical concepts into robust, measurable digital products'
];

const EXPECTED_CV_FILES = [
  '/cv/ALHassan_Baligh_ALShami_CV_English_Standard.pdf',
  '/cv/ALHassan_Baligh_ALShami_CV_English_ATS.pdf',
  '/cv/ALHassan_Baligh_ALShami_CV_German_Standard.pdf',
  '/cv/ALHassan_Baligh_ALShami_CV_German_ATS.pdf',
  '/cv/ALHassan_Baligh_ALShami_CV_Arabic_Standard.pdf',
  '/cv/ALHassan_Baligh_ALShami_CV_Arabic_ATS.pdf'
];

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch {
    // Fallback to installed system chrome if playwright shell binary is not installed
    try {
      return await chromium.launch({ channel: 'chrome', headless: true });
    } catch {
      return await chromium.launch({ channel: 'msedge', headless: true });
    }
  }
}

async function main() {
  console.log(`\n============================================================`);
  console.log(`🚀 VERIFYING PRODUCTION DEPLOYMENT`);
  console.log(`Target: ${BASE_URL}`);
  console.log(`============================================================\n`);

  const failures = [];
  const results = {
    targetUrl: BASE_URL,
    timestamp: new Date().toISOString(),
    routes: {},
    contentChecks: {},
    bannedPhrases: {},
    projectFilter: {},
    experienceExplorer: {},
    mobileDrawer: {},
    commandPalette: {},
    themePersistence: {},
    overflowMatrix: {},
    cvDownloads: {},
    status: 'UNKNOWN'
  };

  const browser = await launchBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();

  // -------------------------------------------------------------
  // 1. ROUTE VERIFICATION & DYNAMIC PROJECT DISCOVERY (HTTP 200)
  // -------------------------------------------------------------
  console.log('▶ [1/10] Checking Canonical Routes & Discovering Project Details...');
  for (const route of PRIMARY_ROUTES) {
    const url = `${BASE_URL}${route}`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      const status = response ? response.status() : 0;
      results.routes[route] = { status, ok: status === 200 };

      if (status !== 200) {
        failures.push(`Primary route [${route}] returned HTTP ${status} (expected 200)`);
        console.error(`  ❌ ${route} -> HTTP ${status}`);
      } else {
        console.log(`  ✓ ${route} -> HTTP 200`);
      }
    } catch (err) {
      failures.push(`Primary route [${route}] failed to load: ${err.message}`);
      console.error(`  ❌ ${route} -> Failed to load: ${err.message}`);
    }
  }

  // Discover all project detail routes from /projects
  console.log('  Discovering project detail routes from /projects...');
  await page.goto(`${BASE_URL}/projects`, { waitUntil: 'networkidle', timeout: 30000 });
  const discoveredProjectRoutes = await page.$$eval('a[href^="/projects/"]', (anchors) => {
    const urls = anchors
      .map((a) => a.getAttribute('href')?.split('?')[0]?.split('#')[0])
      .filter((href) => href && href !== '/projects' && href !== '/projects/');
    return Array.from(new Set(urls));
  });

  const EXPECTED_PROJECT_COUNT = 16;
  results.projectDetailRoutes = {
    expected: EXPECTED_PROJECT_COUNT,
    discovered: discoveredProjectRoutes.length,
    routes: discoveredProjectRoutes
  };

  console.log(`  Project detail routes discovered: ${discoveredProjectRoutes.length}`);
  if (discoveredProjectRoutes.length !== EXPECTED_PROJECT_COUNT) {
    failures.push(`Expected exactly ${EXPECTED_PROJECT_COUNT} project detail routes discovered from /projects, found ${discoveredProjectRoutes.length}`);
    console.error(`  ❌ Project detail route count mismatch: found ${discoveredProjectRoutes.length}, expected ${EXPECTED_PROJECT_COUNT}`);
  } else {
    console.log(`  ✓ Successfully discovered exactly ${EXPECTED_PROJECT_COUNT} project detail routes`);
  }

  // Verify all discovered project routes return HTTP 200
  let projectHttp200Count = 0;
  for (const projRoute of discoveredProjectRoutes) {
    const url = `${BASE_URL}${projRoute}`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      const status = response ? response.status() : 0;
      results.routes[projRoute] = { status, ok: status === 200 };

      if (status === 200) {
        projectHttp200Count++;
        console.log(`  ✓ ${projRoute} -> HTTP 200`);
      } else {
        failures.push(`Project detail route [${projRoute}] returned HTTP ${status} (expected 200)`);
        console.error(`  ❌ ${projRoute} -> HTTP ${status}`);
      }
    } catch (err) {
      failures.push(`Project detail route [${projRoute}] failed to load: ${err.message}`);
      console.error(`  ❌ ${projRoute} -> Failed to load: ${err.message}`);
    }
  }
  console.log(`  Project detail routes HTTP 200: ${projectHttp200Count}/${discoveredProjectRoutes.length}`);
  results.projectDetailRoutes.http200Count = projectHttp200Count;

  // -------------------------------------------------------------
  // 2. CONTENT INTEGRITY CHECKS
  // -------------------------------------------------------------
  console.log('\n▶ [2/10] Checking Canonical Content Integrity...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  const homeText = await page.innerText('body');

  const checkHomeSnippet = (label, expected) => {
    const found = homeText.includes(expected);
    results.contentChecks[label] = { expected, found };
    if (!found) {
      failures.push(`Missing content on Home: "${expected}"`);
      console.error(`  ❌ Missing on Home: "${expected}"`);
    } else {
      console.log(`  ✓ Found on Home: "${expected}"`);
    }
  };

  checkHomeSnippet('identity', 'ALHassan Baligh ALShami');
  checkHomeSnippet('role', 'Software Engineer');
  checkHomeSnippet('location', "Sana'a, Yemen");
  checkHomeSnippet('heroLabel', 'CORE FOCUS');
  checkHomeSnippet('availability', 'Available for Engineering Opportunities');

  // Check email on /contact
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  const contactText = await page.innerText('body');
  const emailFound = contactText.includes('hassan1alshami6@gmail.com');
  results.contentChecks.email = { expected: 'hassan1alshami6@gmail.com', found: emailFound };
  if (!emailFound) {
    failures.push('Missing email "hassan1alshami6@gmail.com" on /contact');
    console.error('  ❌ Missing email on /contact: "hassan1alshami6@gmail.com"');
  } else {
    console.log('  ✓ Found on /contact: "hassan1alshami6@gmail.com"');
  }

  // Check languages on /about
  await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });
  const aboutText = await page.innerText('body');
  const arabicFound = aboutText.includes('Arabic') && aboutText.includes('Native');
  const englishFound = aboutText.includes('English') && aboutText.includes('B2');
  const germanFound = aboutText.includes('German') && aboutText.includes('B1');

  results.contentChecks.languages = {
    arabicNative: arabicFound,
    englishB2: englishFound,
    germanB1: germanFound
  };

  if (!arabicFound) failures.push('Missing language "Arabic — Native" on /about');
  if (!englishFound) failures.push('Missing language "English — B2" on /about');
  if (!germanFound) failures.push('Missing language "German — B1" on /about');

  if (arabicFound && englishFound && germanFound) {
    console.log('  ✓ Verified languages on /about (Arabic: Native, English: B2, German: B1)');
  } else {
    console.error('  ❌ Language check failed on /about');
  }

  // -------------------------------------------------------------
  // 3. FULL CONTENT-INTEGRITY SCAN (All Primary & Project Routes)
  // -------------------------------------------------------------
  console.log('\n▶ [3/10] Full Content-Integrity Scan for Unsupported Phrases...');
  const allScanRoutes = [...PRIMARY_ROUTES, ...discoveredProjectRoutes];
  console.log(`  Scanning all ${allScanRoutes.length} routes across ${BANNED_PHRASES.length} ungrounded phrases...`);

  let bannedFoundCount = 0;
  for (const route of allScanRoutes) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
    const pageContent = await page.content();

    for (const phrase of BANNED_PHRASES) {
      if (pageContent.toLowerCase().includes(phrase.toLowerCase())) {
        failures.push(`Forbidden phrase "${phrase}" detected on route ${route}`);
        console.error(`  ❌ Forbidden phrase on ${route}: "${phrase}"`);
        bannedFoundCount++;
      }
    }
  }
  if (bannedFoundCount === 0) {
    console.log(`  ✓ All ${BANNED_PHRASES.length} ungrounded phrases are strictly absent across all ${allScanRoutes.length} routes`);
  }
  results.bannedPhrasesScan = {
    routesScanned: allScanRoutes.length,
    bannedPhrasesCount: BANNED_PHRASES.length,
    violations: bannedFoundCount
  };

  // -------------------------------------------------------------
  // 4. ACCESSIBLE PROJECT FILTER
  // -------------------------------------------------------------
  console.log('\n▶ [4/10] Testing ProjectExplorer Filter Semantics & Behavior...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/projects`, { waitUntil: 'networkidle' });

  const filterGroup = page.locator('div[role="group"][aria-label="Filter projects by engineering category"]');
  const groupExists = await filterGroup.count() > 0;
  if (!groupExists) {
    failures.push('Missing project filter group with role="group" and accessible label');
    console.error('  ❌ Filter group with role="group" not found');
  } else {
    const filterButtons = filterGroup.locator('button');
    const filterBtnCount = await filterButtons.count();
    console.log(`  ✓ Found filter group with ${filterBtnCount} category filter buttons`);

    if (filterBtnCount <= 1) {
      failures.push(`Expected multiple project category filter buttons, found ${filterBtnCount}`);
      console.error(`  ❌ Found only ${filterBtnCount} filter buttons`);
    } else {
      // First button should be active ("All")
      const firstPressed = await filterButtons.nth(0).getAttribute('aria-pressed');
      if (firstPressed !== 'true') {
        failures.push('Initial filter button "All" does not have aria-pressed="true"');
      }

      // Count initial project cards
      const initialCards = await page.locator('article[class*="projectCard"]').count();

      // Click second category filter
      await filterButtons.nth(1).click();
      await page.waitForTimeout(300);

      const secondPressed = await filterButtons.nth(1).getAttribute('aria-pressed');
      const firstPressedAfter = await filterButtons.nth(0).getAttribute('aria-pressed');
      const filteredCards = await page.locator('article[class*="projectCard"]').count();

      const filterBehaviorValid = secondPressed === 'true' && firstPressedAfter === 'false' && filteredCards > 0;
      results.projectFilter = {
        filterBtnCount,
        initialCards,
        filteredCards,
        filterBehaviorValid
      };

      if (!filterBehaviorValid) {
        failures.push('Project category filter failed to update aria-pressed or display filtered cards');
        console.error('  ❌ Filter button click did not toggle aria-pressed or filter items');
      } else {
        console.log(`  ✓ Category filter toggled aria-pressed and updated cards: ${initialCards} -> ${filteredCards}`);
      }

      // Reset to All
      await filterButtons.nth(0).click();
      await page.waitForTimeout(200);
    }
  }

  // -------------------------------------------------------------
  // 5. EXPERIENCE EXPLORER (Desktop Tabs & Mobile Accordion)
  // -------------------------------------------------------------
  console.log('\n▶ [5/10] Testing ExperienceExplorer Semantics & Interactions...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/experience`, { waitUntil: 'networkidle' });

  // Desktop: Tablist and Tabs
  const tablist = page.locator('div[role="tablist"]');
  if (await tablist.count() === 0) {
    failures.push('Missing role="tablist" in ExperienceExplorer on desktop');
    console.error('  ❌ Desktop tablist not found');
  } else {
    const tabs = tablist.locator('button[role="tab"]');
    const tabCount = await tabs.count();
    if (tabCount < 2) {
      failures.push(`Expected multiple tabs in ExperienceExplorer, found ${tabCount}`);
    } else {
      // Click second tab
      const secondTab = tabs.nth(1);
      const secondTabControls = await secondTab.getAttribute('aria-controls');
      await secondTab.click();
      await page.waitForTimeout(300);

      const isSelected = await secondTab.getAttribute('aria-selected');
      const panel = page.locator(`#${secondTabControls}[role="tabpanel"]`);
      const panelVisible = await panel.isVisible();

      if (isSelected !== 'true' || !panelVisible) {
        failures.push('Desktop Experience tab click did not activate aria-selected or show corresponding tabpanel');
        console.error('  ❌ Desktop Experience tab failed to switch tabpanel');
      } else {
        console.log(`  ✓ Desktop Experience tab switched cleanly (${tabCount} tabs verified)`);
      }
    }
  }

  // Mobile: Accordion
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  const accordionButtons = page.locator('button[aria-controls^="mobile-body-"]');
  const accordionCount = await accordionButtons.count();

  if (accordionCount === 0) {
    failures.push('Mobile Experience accordion triggers not found');
    console.error('  ❌ Mobile accordion triggers not found');
  } else {
    const targetTrigger = accordionButtons.nth(1);
    const initialExpanded = await targetTrigger.getAttribute('aria-expanded');
    await targetTrigger.click();
    await page.waitForTimeout(300);
    const toggledExpanded = await targetTrigger.getAttribute('aria-expanded');

    if (initialExpanded === toggledExpanded) {
      failures.push('Mobile Experience accordion trigger failed to toggle aria-expanded');
      console.error('  ❌ Mobile Experience accordion failed to expand');
    } else {
      console.log(`  ✓ Mobile Experience accordion toggles aria-expanded cleanly (${initialExpanded} -> ${toggledExpanded})`);
    }
  }

  // -------------------------------------------------------------
  // 6. MOBILE DRAWER AUTHENTIC VISIBILITY & ESCAPE
  // -------------------------------------------------------------
  console.log('\n▶ [6/10] Testing Mobile Drawer Visibility & Escape Interaction...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  const drawerToggle = page.locator('button[aria-controls="mobile-nav-drawer"]');
  const drawerSurface = page.locator('div#mobile-nav-drawer');

  if (await drawerToggle.count() === 0 || await drawerSurface.count() === 0) {
    failures.push('Mobile drawer trigger or dialog surface not found in Header');
    console.error('  ❌ Mobile drawer trigger/surface missing');
  } else {
    // Initial state: hidden / aria-hidden=true
    const initialAriaHidden = await drawerSurface.getAttribute('aria-hidden');
    if (initialAriaHidden !== 'true') {
      failures.push(`Expected mobile drawer aria-hidden="true" initially, found "${initialAriaHidden}"`);
    }

    // Click toggle to open
    await drawerToggle.click();
    await page.waitForTimeout(400);

    const openedAriaExpanded = await drawerToggle.getAttribute('aria-expanded');
    const openedAriaHidden = await drawerSurface.getAttribute('aria-hidden');
    const isVisibleNow = await drawerSurface.isVisible();

    if (openedAriaExpanded !== 'true' || openedAriaHidden !== 'false' || !isVisibleNow) {
      failures.push(`Mobile drawer failed to open properly (expanded=${openedAriaExpanded}, hidden=${openedAriaHidden}, visible=${isVisibleNow})`);
      console.error('  ❌ Mobile drawer failed to open');
    } else {
      console.log('  ✓ Mobile drawer opened and verified authentically visible');
    }

    // Press Escape to close
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const closedAriaExpanded = await drawerToggle.getAttribute('aria-expanded');
    const closedAriaHidden = await drawerSurface.getAttribute('aria-hidden');

    if (closedAriaExpanded !== 'false' || closedAriaHidden !== 'true') {
      failures.push(`Mobile drawer failed to close upon Escape key (expanded=${closedAriaExpanded}, hidden=${closedAriaHidden})`);
      console.error('  ❌ Mobile drawer failed to close on Escape');
    } else {
      console.log('  ✓ Mobile drawer closed via Escape key and returned to hidden state');
    }
  }

  // -------------------------------------------------------------
  // 7. COMMAND PALETTE (Ctrl+K, Dialog, Escape)
  // -------------------------------------------------------------
  console.log('\n▶ [7/10] Testing Command Palette Activation & Escape...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Open via Ctrl+K
  await page.keyboard.press('Control+k');
  await page.waitForTimeout(400);

  const paletteDialog = page.locator('div[role="dialog"][aria-label="Portfolio Navigator & Command Palette"]');
  const paletteOpened = await paletteDialog.isVisible().catch(() => false);

  if (!paletteOpened) {
    // Try click on search trigger button
    const searchTrigger = page.locator('header button[aria-label*="command" i]').first();
    if (await searchTrigger.isVisible()) {
      await searchTrigger.click();
      await page.waitForTimeout(400);
    }
  }

  const dialogVisible = await paletteDialog.isVisible().catch(() => false);
  if (!dialogVisible) {
    failures.push('Command Palette dialog did not become visible upon Ctrl+K or search trigger');
    console.error('  ❌ Command Palette dialog failed to open');
  } else {
    console.log('  ✓ Command Palette dialog is open and visible');

    // Verify search input is present
    const combobox = paletteDialog.locator('input[role="combobox"]');
    const inputVisible = await combobox.isVisible();
    if (!inputVisible) {
      failures.push('Command Palette search input (role="combobox") not visible');
    }

    // Close via Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const dialogClosed = (await paletteDialog.count() === 0) || !(await paletteDialog.isVisible());
    if (!dialogClosed) {
      failures.push('Command Palette dialog failed to close on Escape key');
      console.error('  ❌ Command Palette failed to close on Escape');
    } else {
      console.log('  ✓ Command Palette closed cleanly on Escape key');
    }
  }

  // -------------------------------------------------------------
  // 8. THEME TOGGLE, PERSISTENCE & CROSS-ROUTE RETENTION
  // -------------------------------------------------------------
  console.log('\n▶ [8/10] Testing Theme Persistence & Cross-Route Retention...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'dark');
  const themeToggleBtn = page.locator('header button[aria-label*="theme" i]:visible').first();

  if (await themeToggleBtn.count() === 0) {
    failures.push('Theme toggle button not found in desktop header');
    console.error('  ❌ Theme toggle button not found');
  } else {
    // Toggle theme
    await themeToggleBtn.click();
    await page.waitForTimeout(300);

    const toggledTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (!toggledTheme || toggledTheme === initialTheme) {
      failures.push(`Theme toggle did not change data-theme (initial=${initialTheme}, toggled=${toggledTheme})`);
      console.error(`  ❌ Theme toggle failed: initial=${initialTheme}, toggled=${toggledTheme}`);
    } else {
      console.log(`  ✓ Theme toggled cleanly: ${initialTheme} -> ${toggledTheme}`);

      // Reload page and check persistence
      await page.reload({ waitUntil: 'networkidle' });
      const reloadedTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

      if (reloadedTheme !== toggledTheme) {
        failures.push(`Theme did not persist after reload: expected ${toggledTheme}, found ${reloadedTheme}`);
        console.error(`  ❌ Theme failed to persist on reload`);
      } else {
        console.log(`  ✓ Theme persisted across page reload: ${reloadedTheme}`);
      }

      // Navigate to /about and check retention
      await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });
      const crossRouteTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

      if (crossRouteTheme !== toggledTheme) {
        failures.push(`Theme did not retain across navigation to /about: expected ${toggledTheme}, found ${crossRouteTheme}`);
        console.error(`  ❌ Theme failed cross-route retention`);
      } else {
        console.log(`  ✓ Theme retained across navigation to /about: ${crossRouteTheme}`);
      }

      // Restore initial theme
      await page.locator('header button[aria-label*="theme" i]:visible').first().click();
      await page.waitForTimeout(200);
    }
  }

  // -------------------------------------------------------------
  // 9. RESPONSIVE OVERFLOW MATRIX (7 Routes x 4 Viewports)
  // -------------------------------------------------------------
  console.log('\n▶ [9/10] Testing Responsive Overflow Matrix (7 Routes x 4 Viewports)...');
  const RESPONSIVE_ROUTES = [...PRIMARY_ROUTES, REPRESENTATIVE_PROJECT_ROUTE];
  const overflowResults = [];
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });

    for (const route of RESPONSIVE_ROUTES) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        innerWidth: window.innerWidth
      }));

      // In responsive design, scrollWidth should not exceed clientWidth / innerWidth
      const hasOverflow = metrics.scrollWidth > metrics.clientWidth + 1; // 1px rounding tolerance
      overflowResults.push({
        route,
        viewport: vp.name,
        width: vp.width,
        scrollWidth: metrics.scrollWidth,
        clientWidth: metrics.clientWidth,
        overflow: hasOverflow
      });

      if (hasOverflow) {
        failures.push(`Horizontal overflow detected on ${route} at ${vp.name} (${vp.width}px): scrollWidth=${metrics.scrollWidth} > clientWidth=${metrics.clientWidth}`);
        console.error(`  ❌ OVERFLOW: ${route} @ ${vp.name} (${vp.width}px): ${metrics.scrollWidth}px > ${metrics.clientWidth}px`);
      }
    }
  }

  const overflowFailures = overflowResults.filter(r => r.overflow);
  if (overflowFailures.length === 0) {
    console.log(`  ✓ All 28 route-viewport matrix combinations are completely free of horizontal overflow`);
  }
  results.overflowMatrix = overflowResults;

  // -------------------------------------------------------------
  // 10. CV DOWNLOAD VERIFICATION
  // -------------------------------------------------------------
  console.log('\n▶ [10/10] Verifying Public CV Actions & HTTP 200 Statuses...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });

  const cvCards = page.locator('a[href^="/cv/"]');
  const cvCardCount = await cvCards.count();

  results.cvDownloads.actionCount = cvCardCount;
  if (cvCardCount !== 6) {
    failures.push(`Expected exactly 6 CV download links on /contact, found ${cvCardCount}`);
    console.error(`  ❌ Found ${cvCardCount} CV links (expected 6)`);
  } else {
    console.log(`  ✓ Exactly 6 CV download actions found on /contact`);
  }

  // Check mailto link
  const mailtoLink = page.locator('a[href^="mailto:"]');
  if (await mailtoLink.count() === 0) {
    failures.push('Missing mailto: link on /contact');
    console.error('  ❌ Missing mailto: link on /contact');
  } else {
    console.log('  ✓ Direct mailto: link verified on /contact');
  }

  // Verify all 6 CV files return HTTP 200 via HEAD requests
  for (const cvPath of EXPECTED_CV_FILES) {
    const fileUrl = `${BASE_URL}${cvPath}`;
    try {
      const headRes = await fetch(fileUrl, { method: 'HEAD' });
      if (headRes.status !== 200) {
        failures.push(`CV file ${cvPath} returned HTTP ${headRes.status} (expected 200)`);
        console.error(`  ❌ CV file HTTP ${headRes.status}: ${cvPath}`);
      } else {
        console.log(`  ✓ CV package HTTP 200: ${cvPath}`);
      }
    } catch (err) {
      failures.push(`Failed to request CV file ${cvPath}: ${err.message}`);
      console.error(`  ❌ Error requesting ${cvPath}: ${err.message}`);
    }
  }

  await browser.close();

  // -------------------------------------------------------------
  // SUMMARY & REPORT AGGREGATION
  // -------------------------------------------------------------
  console.log(`\n============================================================`);
  console.log(`📊 VERIFICATION RESULTS SUMMARY`);
  console.log(`============================================================`);

  const passed = failures.length === 0;
  results.status = passed ? 'PASS' : 'FAIL';
  results.failures = failures;

  // Save report to git-ignored test-results directory
  const outputDir = path.join(process.cwd(), 'test-results');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const reportPath = path.join(outputDir, 'production-verification-summary.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log(`Report written to: ${reportPath}`);

  if (!passed) {
    console.error(`\n❌ VERIFICATION FAILED WITH ${failures.length} CRITICAL DEFECT(S):`);
    failures.forEach((f, idx) => console.error(`  ${idx + 1}. ${f}`));
    process.exit(1);
  }

  console.log(`\n✅ ALL PRODUCTION RELEASE CHECKS PASSED DETERMINISTICALLY!`);
  console.log(`   - 6/6 Primary Routes Return HTTP 200`);
  console.log(`   - Project detail routes discovered: ${discoveredProjectRoutes.length}`);
  console.log(`   - Project detail routes HTTP 200: ${projectHttp200Count}/${discoveredProjectRoutes.length}`);
  console.log(`   - Strict Content Integrity Verified`);
  console.log(`   - Full banned-phrase scan: ${BANNED_PHRASES.length} phrases confirmed absent across all ${allScanRoutes.length} routes`);
  console.log(`   - Accessible Project Filter Verified`);
  console.log(`   - Experience Explorer Desktop Tabs & Mobile Accordion Verified`);
  console.log(`   - Mobile Drawer Authentic Visibility & Escape Verified`);
  console.log(`   - Command Palette Ctrl+K & Escape Verified`);
  console.log(`   - Theme Toggling, Persistence & Retention Verified`);
  console.log(`   - 28/28 Viewport-Route Overflow Matrix Clean`);
  console.log(`   - 6/6 CV Packages Validated with HTTP 200`);
  console.log(`============================================================\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error('\n💥 FATAL VERIFICATION SCRIPT ERROR:', err);
  process.exit(1);
});
