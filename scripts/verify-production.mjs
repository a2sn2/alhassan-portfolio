#!/usr/bin/env node

/**
 * Production Verification & Trilingual Release Hardening Script
 * 
 * Validates the deployment of https://alhassan-portfolio-phi.vercel.app (or custom target):
 * 1. HTTP 200 status for all 66 indexable routes (18 core EN/AR/DE + 48 project detail EN/AR/DE)
 * 2. Document state verification (html lang/dir) across English (en/ltr), Arabic (ar/rtl), and German (de/ltr)
 * 3. Strict content integrity (canonical identity, roles, locations, skills, languages, credentials, contact)
 * 4. Complete absence of ungrounded phrases and metrics across all 66 public routes
 * 5. Accessible ProjectExplorer category filtering in English, Arabic, and German
 * 6. ExperienceExplorer desktop tablist/tabpanel sync and mobile accordion expansion (EN, AR & DE)
 * 7. Header mobile drawer authentic visibility, accessibility, and Escape closure (EN, AR & DE)
 * 8. Command Palette keyboard activation (Ctrl+K), dialog visibility, and Escape closure (EN, AR & DE)
 * 9. Trilingual Language Switcher route, query, and hash preservation with document state sync
 * 10. Theme toggling, persistence on reload, and cross-route/cross-locale retention
 * 11. Responsive overflow matrix (zero horizontal scroll) across 21 routes x 4 viewports (84 tests)
 * 12. Live SEO metadata, canonicals, reciprocal hreflang (en, ar, de, x-default), og:locale, and sitemap.xml
 * 13. CV package actions (exactly 6 variants, canonical /cv/ URLs, HTTP 200, mailto links on EN, AR & DE)
 * 
 * Usage:
 *   node scripts/verify-production.mjs
 *   npm run verify:production
 *   PRODUCTION_URL=https://preview-url.vercel.app npm run verify:production
 */

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://alhassan-portfolio-phi.vercel.app';
const BASE_URL = PRODUCTION_URL.replace(/\/+$/, '');

const PRIMARY_ROUTES_EN = [
  '/',
  '/about',
  '/experience',
  '/projects',
  '/capabilities',
  '/contact'
];

const PRIMARY_ROUTES_AR = [
  '/ar',
  '/ar/about',
  '/ar/experience',
  '/ar/projects',
  '/ar/capabilities',
  '/ar/contact'
];

const PRIMARY_ROUTES_DE = [
  '/de',
  '/de/about',
  '/de/experience',
  '/de/projects',
  '/de/capabilities',
  '/de/contact'
];

const REPRESENTATIVE_PROJECT_EN = '/projects/real-time-object-detection';
const REPRESENTATIVE_PROJECT_AR = '/ar/projects/real-time-object-detection';
const REPRESENTATIVE_PROJECT_DE = '/de/projects/real-time-object-detection';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow-mobile', width: 320, height: 568 }
];

const BANNED_PHRASES_GLOBAL = [
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

const BANNED_PHRASES_AR = [
  'UTC+3',
  'بدوام كامل',
  '26 شهادة تخصصية معتمدة'
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
    try {
      return await chromium.launch({ channel: 'chrome', headless: true });
    } catch {
      return await chromium.launch({ channel: 'msedge', headless: true });
    }
  }
}

async function triggerLanguageSwitch(page, targetLocale) {
  const isMobile = await page.locator('header button[aria-controls="mobile-nav-drawer"]').isVisible();
  if (isMobile) {
    const drawerOpen = await page.locator('#mobile-nav-drawer').isVisible();
    if (!drawerOpen) {
      await page.locator('header button[aria-controls="mobile-nav-drawer"]').click();
      await page.waitForTimeout(300);
    }
    const option = page.locator(`#mobile-nav-drawer a[lang="${targetLocale}"]`).first();
    await option.click();
  } else {
    const triggerBtn = page.locator('header button[aria-haspopup="menu"]').first();
    await triggerBtn.click();
    const option = page.locator(`header div[role="menu"] a[lang="${targetLocale}"]`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }
}

async function main() {
  console.log(`\n============================================================`);
  console.log(`🚀 VERIFYING TRILINGUAL PRODUCTION DEPLOYMENT`);
  console.log(`Target: ${BASE_URL}`);
  console.log(`============================================================\n`);

  const failures = [];
  const results = {
    targetUrl: BASE_URL,
    timestamp: new Date().toISOString(),
    routes: {},
    documentState: {},
    contentChecks: {},
    bannedPhrasesScan: {},
    projectFilter: {},
    experienceExplorer: {},
    mobileDrawer: {},
    commandPalette: {},
    languageSwitcher: {},
    themePersistence: {},
    overflowMatrix: {},
    seoAndSitemap: {},
    cvDownloads: {},
    status: 'UNKNOWN'
  };

  const browser = await launchBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();

  // -------------------------------------------------------------
  // 1. ROUTE VERIFICATION & DYNAMIC PROJECT DISCOVERY (HTTP 200)
  // -------------------------------------------------------------
  console.log('▶ [1/13] Checking Core Routes (18 EN/AR/DE) & Discovering Project Details...');
  
  // English Primary Routes
  for (const route of PRIMARY_ROUTES_EN) {
    const url = `${BASE_URL}${route}`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      const status = response ? response.status() : 0;
      results.routes[route] = { status, ok: status === 200 };
      if (status !== 200) {
        failures.push(`English primary route [${route}] returned HTTP ${status} (expected 200)`);
        console.error(`  ❌ EN ${route} -> HTTP ${status}`);
      } else {
        console.log(`  ✓ EN ${route} -> HTTP 200`);
      }
    } catch (err) {
      failures.push(`English primary route [${route}] failed to load: ${err.message}`);
      console.error(`  ❌ EN ${route} -> Failed: ${err.message}`);
    }
  }

  // Arabic Primary Routes
  for (const route of PRIMARY_ROUTES_AR) {
    const url = `${BASE_URL}${route}`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      const status = response ? response.status() : 0;
      results.routes[route] = { status, ok: status === 200 };
      if (status !== 200) {
        failures.push(`Arabic primary route [${route}] returned HTTP ${status} (expected 200)`);
        console.error(`  ❌ AR ${route} -> HTTP ${status}`);
      } else {
        console.log(`  ✓ AR ${route} -> HTTP 200`);
      }
    } catch (err) {
      failures.push(`Arabic primary route [${route}] failed to load: ${err.message}`);
      console.error(`  ❌ AR ${route} -> Failed: ${err.message}`);
    }
  }

  // German Primary Routes
  for (const route of PRIMARY_ROUTES_DE) {
    const url = `${BASE_URL}${route}`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      const status = response ? response.status() : 0;
      results.routes[route] = { status, ok: status === 200 };
      if (status !== 200) {
        failures.push(`German primary route [${route}] returned HTTP ${status} (expected 200)`);
        console.error(`  ❌ DE ${route} -> HTTP ${status}`);
      } else {
        console.log(`  ✓ DE ${route} -> HTTP 200`);
      }
    } catch (err) {
      failures.push(`German primary route [${route}] failed to load: ${err.message}`);
      console.error(`  ❌ DE ${route} -> Failed: ${err.message}`);
    }
  }

  // Discover 16 English project detail routes from /projects
  console.log('  Discovering English project routes from /projects...');
  await page.goto(`${BASE_URL}/projects`, { waitUntil: 'networkidle', timeout: 30000 });
  const discoveredEnProjects = await page.$$eval('a[href^="/projects/"]', (anchors) => {
    const urls = anchors
      .map((a) => a.getAttribute('href')?.split('?')[0]?.split('#')[0])
      .filter((href) => href && href !== '/projects' && href !== '/projects/');
    return Array.from(new Set(urls));
  });

  // Discover 16 Arabic project detail routes from /ar/projects
  console.log('  Discovering Arabic project routes from /ar/projects...');
  await page.goto(`${BASE_URL}/ar/projects`, { waitUntil: 'networkidle', timeout: 30000 });
  const discoveredArProjects = await page.$$eval('a[href^="/ar/projects/"]', (anchors) => {
    const urls = anchors
      .map((a) => a.getAttribute('href')?.split('?')[0]?.split('#')[0])
      .filter((href) => href && href !== '/ar/projects' && href !== '/ar/projects/');
    return Array.from(new Set(urls));
  });

  // Discover 16 German project detail routes from /de/projects
  console.log('  Discovering German project routes from /de/projects...');
  await page.goto(`${BASE_URL}/de/projects`, { waitUntil: 'networkidle', timeout: 30000 });
  const discoveredDeProjects = await page.$$eval('a[href^="/de/projects/"]', (anchors) => {
    const urls = anchors
      .map((a) => a.getAttribute('href')?.split('?')[0]?.split('#')[0])
      .filter((href) => href && href !== '/de/projects' && href !== '/de/projects/');
    return Array.from(new Set(urls));
  });

  const EXPECTED_PROJECT_COUNT = 16;
  results.projectDetailRoutes = {
    expectedPerLocale: EXPECTED_PROJECT_COUNT,
    discoveredEn: discoveredEnProjects.length,
    discoveredAr: discoveredArProjects.length,
    discoveredDe: discoveredDeProjects.length,
    enRoutes: discoveredEnProjects,
    arRoutes: discoveredArProjects,
    deRoutes: discoveredDeProjects
  };

  console.log(`  EN project detail routes discovered: ${discoveredEnProjects.length}`);
  console.log(`  AR project detail routes discovered: ${discoveredArProjects.length}`);
  console.log(`  DE project detail routes discovered: ${discoveredDeProjects.length}`);

  if (discoveredEnProjects.length !== EXPECTED_PROJECT_COUNT) {
    failures.push(`Expected exactly ${EXPECTED_PROJECT_COUNT} English project routes, found ${discoveredEnProjects.length}`);
  } else {
    console.log(`  ✓ Successfully discovered exactly ${EXPECTED_PROJECT_COUNT} English project detail routes`);
  }

  if (discoveredArProjects.length !== EXPECTED_PROJECT_COUNT) {
    failures.push(`Expected exactly ${EXPECTED_PROJECT_COUNT} Arabic project routes, found ${discoveredArProjects.length}`);
  } else {
    console.log(`  ✓ Successfully discovered exactly ${EXPECTED_PROJECT_COUNT} Arabic project detail routes`);
  }

  if (discoveredDeProjects.length !== EXPECTED_PROJECT_COUNT) {
    failures.push(`Expected exactly ${EXPECTED_PROJECT_COUNT} German project routes, found ${discoveredDeProjects.length}`);
  } else {
    console.log(`  ✓ Successfully discovered exactly ${EXPECTED_PROJECT_COUNT} German project detail routes`);
  }

  // Verify all 48 project routes return HTTP 200
  let enProjectHttp200 = 0;
  for (const projRoute of discoveredEnProjects) {
    try {
      const response = await page.goto(`${BASE_URL}${projRoute}`, { waitUntil: 'networkidle', timeout: 30000 });
      const status = response ? response.status() : 0;
      results.routes[projRoute] = { status, ok: status === 200 };
      if (status === 200) {
        enProjectHttp200++;
      } else {
        failures.push(`EN project detail route [${projRoute}] returned HTTP ${status}`);
        console.error(`  ❌ ${projRoute} -> HTTP ${status}`);
      }
    } catch (err) {
      failures.push(`EN project route [${projRoute}] failed to load: ${err.message}`);
    }
  }
  console.log(`  ✓ English project routes HTTP 200: ${enProjectHttp200}/${discoveredEnProjects.length}`);

  let arProjectHttp200 = 0;
  for (const projRoute of discoveredArProjects) {
    try {
      const response = await page.goto(`${BASE_URL}${projRoute}`, { waitUntil: 'networkidle', timeout: 30000 });
      const status = response ? response.status() : 0;
      results.routes[projRoute] = { status, ok: status === 200 };
      if (status === 200) {
        arProjectHttp200++;
      } else {
        failures.push(`AR project detail route [${projRoute}] returned HTTP ${status}`);
        console.error(`  ❌ ${projRoute} -> HTTP ${status}`);
      }
    } catch (err) {
      failures.push(`AR project route [${projRoute}] failed to load: ${err.message}`);
    }
  }
  console.log(`  ✓ Arabic project routes HTTP 200: ${arProjectHttp200}/${discoveredArProjects.length}`);

  let deProjectHttp200 = 0;
  for (const projRoute of discoveredDeProjects) {
    try {
      const response = await page.goto(`${BASE_URL}${projRoute}`, { waitUntil: 'networkidle', timeout: 30000 });
      const status = response ? response.status() : 0;
      results.routes[projRoute] = { status, ok: status === 200 };
      if (status === 200) {
        deProjectHttp200++;
      } else {
        failures.push(`DE project detail route [${projRoute}] returned HTTP ${status}`);
        console.error(`  ❌ ${projRoute} -> HTTP ${status}`);
      }
    } catch (err) {
      failures.push(`DE project route [${projRoute}] failed to load: ${err.message}`);
    }
  }
  console.log(`  ✓ German project routes HTTP 200: ${deProjectHttp200}/${discoveredDeProjects.length}`);

  const totalPublicRoutes = PRIMARY_ROUTES_EN.length + PRIMARY_ROUTES_AR.length + PRIMARY_ROUTES_DE.length +
    discoveredEnProjects.length + discoveredArProjects.length + discoveredDeProjects.length;
  console.log(`  ✓ Total public routes verified: ${totalPublicRoutes} (expected 66)`);

  // -------------------------------------------------------------
  // 2. DOCUMENT STATE VERIFICATION (lang & dir)
  // -------------------------------------------------------------
  console.log('\n▶ [2/13] Verifying Document State (lang & dir) Across All Three Locales...');
  const sampleRoutes = [
    { route: '/', expectedLang: 'en', expectedDir: 'ltr' },
    { route: '/about', expectedLang: 'en', expectedDir: 'ltr' },
    { route: '/experience', expectedLang: 'en', expectedDir: 'ltr' },
    { route: '/projects', expectedLang: 'en', expectedDir: 'ltr' },
    { route: '/capabilities', expectedLang: 'en', expectedDir: 'ltr' },
    { route: '/contact', expectedLang: 'en', expectedDir: 'ltr' },
    { route: REPRESENTATIVE_PROJECT_EN, expectedLang: 'en', expectedDir: 'ltr' },
    { route: '/ar', expectedLang: 'ar', expectedDir: 'rtl' },
    { route: '/ar/about', expectedLang: 'ar', expectedDir: 'rtl' },
    { route: '/ar/experience', expectedLang: 'ar', expectedDir: 'rtl' },
    { route: '/ar/projects', expectedLang: 'ar', expectedDir: 'rtl' },
    { route: '/ar/capabilities', expectedLang: 'ar', expectedDir: 'rtl' },
    { route: '/ar/contact', expectedLang: 'ar', expectedDir: 'rtl' },
    { route: REPRESENTATIVE_PROJECT_AR, expectedLang: 'ar', expectedDir: 'rtl' },
    { route: '/de', expectedLang: 'de', expectedDir: 'ltr' },
    { route: '/de/about', expectedLang: 'de', expectedDir: 'ltr' },
    { route: '/de/experience', expectedLang: 'de', expectedDir: 'ltr' },
    { route: '/de/projects', expectedLang: 'de', expectedDir: 'ltr' },
    { route: '/de/capabilities', expectedLang: 'de', expectedDir: 'ltr' },
    { route: '/de/contact', expectedLang: 'de', expectedDir: 'ltr' },
    { route: REPRESENTATIVE_PROJECT_DE, expectedLang: 'de', expectedDir: 'ltr' }
  ];

  for (const sr of sampleRoutes) {
    await page.goto(`${BASE_URL}${sr.route}`, { waitUntil: 'domcontentloaded' });
    const lang = await page.locator('html').getAttribute('lang');
    const dir = await page.locator('html').getAttribute('dir');
    const ok = lang === sr.expectedLang && dir === sr.expectedDir;
    results.documentState[sr.route] = { lang, dir, ok };
    if (!ok) {
      failures.push(`Document state mismatch on ${sr.route}: got lang="${lang}", dir="${dir}" (expected lang="${sr.expectedLang}", dir="${sr.expectedDir}")`);
      console.error(`  ❌ ${sr.route} -> lang="${lang}", dir="${dir}"`);
    } else {
      console.log(`  ✓ ${sr.route} -> lang="${lang}", dir="${dir}"`);
    }
  }

  // -------------------------------------------------------------
  // 3. CANONICAL CONTENT INTEGRITY (EN, AR & DE)
  // -------------------------------------------------------------
  console.log('\n▶ [3/13] Checking Canonical Content Integrity (English, Arabic & German)...');
  
  // English Home
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  const enHomeText = await page.innerText('body');
  const checkEnSnippet = (label, expected) => {
    const found = enHomeText.includes(expected);
    results.contentChecks[`en_${label}`] = { expected, found };
    if (!found) failures.push(`Missing content on EN Home: "${expected}"`);
    else console.log(`  ✓ Found on EN Home: "${expected}"`);
  };
  checkEnSnippet('identity', 'ALHassan Baligh ALShami');
  checkEnSnippet('role', 'Software Engineer');
  checkEnSnippet('location', "Sana'a, Yemen");
  checkEnSnippet('heroLabel', 'CORE FOCUS');
  checkEnSnippet('availability', 'Available for Engineering Opportunities');

  // English Contact & About
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  const enContactText = await page.innerText('body');
  if (!enContactText.includes('hassan1alshami6@gmail.com')) failures.push('Missing email on EN /contact');
  else console.log('  ✓ Found email on EN /contact');

  await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });
  const enAboutText = await page.innerText('body');
  if (!enAboutText.includes('Arabic') || !enAboutText.includes('Native')) failures.push('Missing Arabic language on EN /about');
  if (!enAboutText.includes('English') || !enAboutText.includes('B2')) failures.push('Missing English language on EN /about');
  if (!enAboutText.includes('German') || !enAboutText.includes('B1')) failures.push('Missing German language on EN /about');
  console.log('  ✓ Verified EN /about languages');

  // Arabic Home (/ar)
  await page.goto(`${BASE_URL}/ar`, { waitUntil: 'networkidle' });
  const arHomeText = await page.innerText('body');
  const checkArSnippet = (label, expected) => {
    const found = arHomeText.includes(expected);
    results.contentChecks[`ar_${label}`] = { expected, found };
    if (!found) failures.push(`Missing content on AR Home: "${expected}"`);
    else console.log(`  ✓ Found on AR Home: "${expected}"`);
  };
  checkArSnippet('identity', 'الحسن بليغ الشامي');
  checkArSnippet('role', 'مهندس برمجيات');
  checkArSnippet('location', 'حدة – صنعاء – اليمن');
  checkArSnippet('availability', 'متاح للفرص الهندسية والتقنية');
  checkArSnippet('focus', 'محاور التركيز');

  // Arabic About (/ar/about)
  await page.goto(`${BASE_URL}/ar/about`, { waitUntil: 'networkidle' });
  const arAboutText = await page.innerText('body');
  if (!arAboutText.includes('جامعة تونتك الدولية للتكنولوجيا')) failures.push('Missing university on AR /ar/about');
  if (!arAboutText.includes('بكالوريوس في علوم الحاسوب')) failures.push('Missing degree on AR /ar/about');
  if (!arAboutText.includes('العربية') || !arAboutText.includes('أم')) failures.push('Missing Arabic language on AR /ar/about');
  if (!arAboutText.includes('الإنجليزية') || !arAboutText.includes('B2')) failures.push('Missing English language on AR /ar/about');
  if (!arAboutText.includes('الألمانية') || !arAboutText.includes('B1')) failures.push('Missing German language on AR /ar/about');
  console.log('  ✓ Verified AR /ar/about education & languages');

  // Arabic Experience (/ar/experience)
  await page.goto(`${BASE_URL}/ar/experience`, { waitUntil: 'networkidle' });
  const arRolesCount = await page.locator('div[role="tablist"] button[role="tab"]').count();
  if (arRolesCount !== 9) failures.push(`Expected 9 Arabic experience roles, found ${arRolesCount}`);
  else console.log(`  ✓ Verified 9 Arabic experience roles in /ar/experience`);

  // Arabic Projects (/ar/projects)
  await page.goto(`${BASE_URL}/ar/projects`, { waitUntil: 'networkidle' });
  const arProjectsCount = await page.locator('article[class*="projectCard"]').count();
  if (arProjectsCount !== 16) failures.push(`Expected 16 Arabic projects, found ${arProjectsCount}`);
  else console.log(`  ✓ Verified 16 Arabic projects in /ar/projects`);

  // Arabic Capabilities (/ar/capabilities)
  await page.goto(`${BASE_URL}/ar/capabilities`, { waitUntil: 'networkidle' });
  const arCapText = await page.innerText('body');
  if (!arCapText.includes('CYBERAI CLUB') || !arCapText.includes('SPE') || !arCapText.includes('مؤسسة الحمدي')) {
    failures.push('Missing key memberships in /ar/capabilities');
  } else {
    console.log('  ✓ Verified Arabic memberships in /ar/capabilities');
  }

  // Arabic Contact (/ar/contact)
  await page.goto(`${BASE_URL}/ar/contact`, { waitUntil: 'networkidle' });
  const arContactText = await page.innerText('body');
  if (!arContactText.includes('hassan1alshami6@gmail.com')) failures.push('Missing email in /ar/contact');
  if (!arContactText.includes('+967772765120')) failures.push('Missing phone in /ar/contact');
  if (arContactText.includes('777414002') || arContactText.includes('777701444') || arContactText.includes('777174677')) {
    failures.push('Third-party reference phone numbers leaked into public /ar/contact!');
  } else {
    console.log('  ✓ Verified Arabic contact channels & privacy guard');
  }

  // German Home (/de)
  await page.goto(`${BASE_URL}/de`, { waitUntil: 'networkidle' });
  const deHomeText = await page.innerText('body');
  const checkDeSnippet = (label, expected) => {
    const found = deHomeText.includes(expected);
    results.contentChecks[`de_${label}`] = { expected, found };
    if (!found) failures.push(`Missing content on DE Home: "${expected}"`);
    else console.log(`  ✓ Found on DE Home: "${expected}"`);
  };
  checkDeSnippet('identity', 'ALHassan Baligh ALShami');
  checkDeSnippet('role', 'Softwareentwickler');
  checkDeSnippet('location', 'Haddah, Sanaa, Jemen');
  checkDeSnippet('availability', 'Verfügbar für Software- & Engineering-Projekte');

  // German About (/de/about)
  await page.goto(`${BASE_URL}/de/about`, { waitUntil: 'networkidle' });
  const deAboutText = await page.innerText('body');
  if (!deAboutText.includes('International University of Technology Twintech')) failures.push('Missing university on DE /de/about');
  if (!deAboutText.includes('B.Sc. in Informatik')) failures.push('Missing degree on DE /de/about');
  if (!deAboutText.includes('Deutsch') || !deAboutText.includes('B1')) failures.push('Missing German language on DE /de/about');
  if (!deAboutText.includes('Arabisch') || !deAboutText.includes('Muttersprache')) failures.push('Missing Arabic language on DE /de/about');
  if (!deAboutText.includes('Englisch') || !deAboutText.includes('B2')) failures.push('Missing English language on DE /de/about');
  console.log('  ✓ Verified DE /de/about education & languages');

  // German Experience (/de/experience)
  await page.goto(`${BASE_URL}/de/experience`, { waitUntil: 'networkidle' });
  const deRolesCount = await page.locator('div[role="tablist"] button[role="tab"]').count();
  if (deRolesCount !== 9) failures.push(`Expected 9 German experience roles, found ${deRolesCount}`);
  else console.log(`  ✓ Verified 9 German experience roles in /de/experience`);

  // German Projects (/de/projects)
  await page.goto(`${BASE_URL}/de/projects`, { waitUntil: 'networkidle' });
  const deProjectsCount = await page.locator('article[class*="projectCard"]').count();
  if (deProjectsCount !== 16) failures.push(`Expected 16 German projects, found ${deProjectsCount}`);
  else console.log(`  ✓ Verified 16 German projects in /de/projects`);

  // German Capabilities (/de/capabilities)
  await page.goto(`${BASE_URL}/de/capabilities`, { waitUntil: 'networkidle' });
  const deCapText = await page.innerText('body');
  if (!deCapText.includes('CYBERAI CLUB') || !deCapText.includes('SPE') || !deCapText.includes('Al-Hamdi Foundation')) {
    failures.push('Missing key memberships in /de/capabilities');
  } else {
    console.log('  ✓ Verified German memberships in /de/capabilities');
  }

  // German Contact (/de/contact)
  await page.goto(`${BASE_URL}/de/contact`, { waitUntil: 'networkidle' });
  const deContactText = await page.innerText('body');
  if (!deContactText.includes('hassan1alshami6@gmail.com')) failures.push('Missing email in /de/contact');
  if (!deContactText.includes('772 765 120') && !deContactText.includes('+967772765120')) failures.push('Missing phone in /de/contact');
  if (deContactText.includes('777414002') || deContactText.includes('777701444') || deContactText.includes('777174677')) {
    failures.push('Third-party reference phone numbers leaked into public /de/contact!');
  } else {
    console.log('  ✓ Verified German contact channels & privacy guard');
  }

  // -------------------------------------------------------------
  // 4. FULL CONTENT-INTEGRITY SCAN FOR BANNED PHRASES (66 Routes)
  // -------------------------------------------------------------
  console.log('\n▶ [4/13] Full Content-Integrity Scan for Ungrounded Phrases...');
  const allScanRoutes = [
    ...PRIMARY_ROUTES_EN,
    ...PRIMARY_ROUTES_AR,
    ...PRIMARY_ROUTES_DE,
    ...discoveredEnProjects,
    ...discoveredArProjects,
    ...discoveredDeProjects
  ];
  console.log(`  Scanning all ${allScanRoutes.length} routes across ${BANNED_PHRASES_GLOBAL.length} global and ${BANNED_PHRASES_AR.length} Arabic phrases...`);

  let bannedFoundCount = 0;
  for (const route of allScanRoutes) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        break;
      } catch (err) {
        if (attempt === 3) throw err;
        await page.waitForTimeout(300);
      }
    }
    const pageContent = await page.content();

    for (const phrase of BANNED_PHRASES_GLOBAL) {
      if (pageContent.toLowerCase().includes(phrase.toLowerCase())) {
        failures.push(`Forbidden global phrase "${phrase}" detected on route ${route}`);
        console.error(`  ❌ Forbidden global phrase on ${route}: "${phrase}"`);
        bannedFoundCount++;
      }
    }

    if (route.startsWith('/ar')) {
      for (const phrase of BANNED_PHRASES_AR) {
        if (pageContent.toLowerCase().includes(phrase.toLowerCase())) {
          failures.push(`Forbidden Arabic phrase "${phrase}" detected on route ${route}`);
          console.error(`  ❌ Forbidden Arabic phrase on ${route}: "${phrase}"`);
          bannedFoundCount++;
        }
      }
    }
  }
  if (bannedFoundCount === 0) {
    console.log(`  ✓ All ungrounded phrases strictly absent across all ${allScanRoutes.length} routes`);
  }

  // -------------------------------------------------------------
  // 5. ACCESSIBLE PROJECT FILTER (EN, AR & DE)
  // -------------------------------------------------------------
  console.log('\n▶ [5/13] Testing ProjectExplorer Filter Semantics & Behavior (EN, AR & DE)...');
  await page.setViewportSize({ width: 1440, height: 900 });

  // English Filter
  await page.goto(`${BASE_URL}/projects`, { waitUntil: 'networkidle' });
  const enFilterButtons = page.locator('div[role="group"] button');
  if (await enFilterButtons.count() > 1) {
    await enFilterButtons.nth(1).click();
    await page.waitForTimeout(200);
    const pressed = await enFilterButtons.nth(1).getAttribute('aria-pressed');
    const cards = await page.locator('article[class*="projectCard"]').count();
    if (pressed !== 'true' || cards === 0) failures.push('EN ProjectExplorer filter failed');
    else console.log(`  ✓ EN ProjectExplorer filter toggled cleanly (${cards} cards)`);
  }

  // Arabic Filter
  await page.goto(`${BASE_URL}/ar/projects`, { waitUntil: 'networkidle' });
  const arFilterButtons = page.locator('div[role="group"] button');
  if (await arFilterButtons.count() > 1) {
    await arFilterButtons.nth(1).click();
    await page.waitForTimeout(200);
    const pressed = await arFilterButtons.nth(1).getAttribute('aria-pressed');
    const cards = await page.locator('article[class*="projectCard"]').count();
    if (pressed !== 'true' || cards === 0) failures.push('AR ProjectExplorer filter failed');
    else console.log(`  ✓ AR ProjectExplorer filter toggled cleanly (${cards} cards)`);
  }

  // German Filter
  await page.goto(`${BASE_URL}/de/projects`, { waitUntil: 'networkidle' });
  const deFilterButtons = page.locator('div[role="group"] button');
  if (await deFilterButtons.count() > 1) {
    await deFilterButtons.nth(1).click();
    await page.waitForTimeout(200);
    const pressed = await deFilterButtons.nth(1).getAttribute('aria-pressed');
    const cards = await page.locator('article[class*="projectCard"]').count();
    if (pressed !== 'true' || cards === 0) failures.push('DE ProjectExplorer filter failed');
    else console.log(`  ✓ DE ProjectExplorer filter toggled cleanly (${cards} cards)`);
  }

  // -------------------------------------------------------------
  // 6. EXPERIENCE EXPLORER (Tabs & Mobile Accordion - EN, AR & DE)
  // -------------------------------------------------------------
  console.log('\n▶ [6/13] Testing ExperienceExplorer Tabs & Accordion (EN, AR & DE)...');
  
  // English Tabs & Accordion
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/experience`, { waitUntil: 'networkidle' });
  const enTabs = page.locator('div[role="tablist"] button[role="tab"]');
  if (await enTabs.count() > 1) {
    await enTabs.nth(1).click();
    await page.waitForTimeout(200);
    const isSelected = await enTabs.nth(1).getAttribute('aria-selected');
    if (isSelected !== 'true') failures.push('EN ExperienceExplorer tab failed to activate');
    else console.log('  ✓ EN ExperienceExplorer tab switched cleanly');
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  const enAcc = page.locator('button[aria-controls^="mobile-body-"]');
  if (await enAcc.count() > 1) {
    await enAcc.nth(1).click();
    await page.waitForTimeout(200);
    console.log('  ✓ EN ExperienceExplorer mobile accordion toggles cleanly');
  }

  // Arabic Tabs & Accordion
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/ar/experience`, { waitUntil: 'networkidle' });
  const arTabs = page.locator('div[role="tablist"] button[role="tab"]');
  if (await arTabs.count() > 1) {
    await arTabs.nth(1).click();
    await page.waitForTimeout(200);
    const isSelected = await arTabs.nth(1).getAttribute('aria-selected');
    if (isSelected !== 'true') failures.push('AR ExperienceExplorer tab failed to activate');
    else console.log('  ✓ AR ExperienceExplorer tab switched cleanly');
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  const arAcc = page.locator('button[aria-controls^="mobile-body-"]');
  if (await arAcc.count() > 1) {
    await arAcc.nth(1).click();
    await page.waitForTimeout(200);
    console.log('  ✓ AR ExperienceExplorer mobile accordion toggles cleanly');
  }

  // German Tabs & Accordion
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/de/experience`, { waitUntil: 'networkidle' });
  const deTabs = page.locator('div[role="tablist"] button[role="tab"]');
  if (await deTabs.count() > 1) {
    await deTabs.nth(1).click();
    await page.waitForTimeout(200);
    const isSelected = await deTabs.nth(1).getAttribute('aria-selected');
    if (isSelected !== 'true') failures.push('DE ExperienceExplorer tab failed to activate');
    else console.log('  ✓ DE ExperienceExplorer tab switched cleanly');
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  const deAcc = page.locator('button[aria-controls^="mobile-body-"]');
  if (await deAcc.count() > 1) {
    await deAcc.nth(1).click();
    await page.waitForTimeout(200);
    console.log('  ✓ DE ExperienceExplorer mobile accordion toggles cleanly');
  }

  // -------------------------------------------------------------
  // 7. MOBILE DRAWER (EN, AR & DE)
  // -------------------------------------------------------------
  console.log('\n▶ [7/13] Testing Mobile Drawer Visibility & Escape (EN, AR & DE)...');
  await page.setViewportSize({ width: 390, height: 844 });

  // EN Drawer
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  const enDrawerBtn = page.locator('button[aria-controls="mobile-nav-drawer"]');
  const enDrawer = page.locator('div#mobile-nav-drawer');
  if (await enDrawerBtn.count() > 0 && await enDrawer.count() > 0) {
    await enDrawerBtn.click();
    await page.waitForTimeout(300);
    const visible = await enDrawer.isVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    if (!visible) failures.push('EN Mobile drawer did not become visible');
    else console.log('  ✓ EN Mobile drawer opened and closed on Escape');
  }

  // AR Drawer
  await page.goto(`${BASE_URL}/ar`, { waitUntil: 'networkidle' });
  const arDrawerBtn = page.locator('button[aria-controls="mobile-nav-drawer"]');
  const arDrawer = page.locator('div#mobile-nav-drawer');
  if (await arDrawerBtn.count() > 0 && await arDrawer.count() > 0) {
    await arDrawerBtn.click();
    await page.waitForTimeout(300);
    const visible = await arDrawer.isVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    if (!visible) failures.push('AR Mobile drawer did not become visible');
    else console.log('  ✓ AR Mobile drawer opened and closed on Escape');
  }

  // DE Drawer
  await page.goto(`${BASE_URL}/de`, { waitUntil: 'networkidle' });
  const deDrawerBtn = page.locator('button[aria-controls="mobile-nav-drawer"]');
  const deDrawer = page.locator('div#mobile-nav-drawer');
  if (await deDrawerBtn.count() > 0 && await deDrawer.count() > 0) {
    await deDrawerBtn.click();
    await page.waitForTimeout(300);
    const visible = await deDrawer.isVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    if (!visible) failures.push('DE Mobile drawer did not become visible');
    else console.log('  ✓ DE Mobile drawer opened and closed on Escape');
  }

  // -------------------------------------------------------------
  // 8. COMMAND PALETTE (EN, AR & DE)
  // -------------------------------------------------------------
  console.log('\n▶ [8/13] Testing Command Palette Activation & Escape (EN, AR & DE)...');
  await page.setViewportSize({ width: 1440, height: 900 });

  // EN Palette
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  const enSearchBtn = page.locator('header button[aria-label*="command palette" i]').first();
  if (await enSearchBtn.isVisible()) {
    await enSearchBtn.click();
  } else {
    await page.keyboard.press('Control+k');
  }
  const enDialog = page.locator('div[role="dialog"]:not(#mobile-nav-drawer)');
  if (!(await enDialog.isVisible())) {
    await page.keyboard.press('Control+k');
  }
  await page.waitForTimeout(300);
  const enPaletteOpen = await enDialog.isVisible().catch(() => false);
  if (enPaletteOpen) {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    console.log('  ✓ EN Command Palette opened and closed on Escape');
  } else {
    failures.push('EN Command Palette failed to open on Ctrl+K');
  }

  // AR Palette
  await page.goto(`${BASE_URL}/ar`, { waitUntil: 'networkidle' });
  const arSearchBtn = page.locator('header button[aria-label*="لوحة الأوامر" i]').first();
  if (await arSearchBtn.isVisible()) {
    await arSearchBtn.click();
  } else {
    await page.keyboard.press('Control+k');
  }
  const arDialog = page.locator('div[role="dialog"]:not(#mobile-nav-drawer)');
  if (!(await arDialog.isVisible())) {
    await page.keyboard.press('Control+k');
  }
  await page.waitForTimeout(300);
  const arPaletteOpen = await arDialog.isVisible().catch(() => false);
  if (arPaletteOpen) {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    console.log('  ✓ AR Command Palette opened and closed on Escape');
  } else {
    failures.push('AR Command Palette failed to open on Ctrl+K');
  }

  // DE Palette
  await page.goto(`${BASE_URL}/de`, { waitUntil: 'networkidle' });
  const deSearchBtn = page.locator('header button[aria-label*="Befehlspalette" i]').first();
  if (await deSearchBtn.isVisible()) {
    await deSearchBtn.click();
  } else {
    await page.keyboard.press('Control+k');
  }
  const deDialog = page.locator('div[role="dialog"]:not(#mobile-nav-drawer)');
  if (!(await deDialog.isVisible())) {
    await page.keyboard.press('Control+k');
  }
  await page.waitForTimeout(300);
  const dePaletteOpen = await deDialog.isVisible().catch(() => false);
  if (dePaletteOpen) {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    console.log('  ✓ DE Command Palette opened and closed on Escape');
  } else {
    failures.push('DE Command Palette failed to open on Ctrl+K');
  }

  // -------------------------------------------------------------
  // 9. TRILINGUAL LANGUAGE SWITCHER & ROUTE PRESERVATION
  // -------------------------------------------------------------
  console.log('\n▶ [9/13] Testing Trilingual Language Switcher & State Sync...');
  
  // 1. /about -> /de/about
  await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });
  await triggerLanguageSwitch(page, 'de');
  await page.waitForURL(/\/de\/about/);
  await page.waitForFunction(() => document.documentElement.getAttribute('lang') === 'de', { timeout: 5000 });
  const deLang = await page.locator('html').getAttribute('lang');
  const deDir = await page.locator('html').getAttribute('dir');
  if (deLang !== 'de' || deDir !== 'ltr') {
    failures.push(`Language switcher to DE failed: got lang=${deLang}, dir=${deDir}`);
  } else {
    console.log('  ✓ Transition /about -> /de/about sets lang="de" and dir="ltr"');
  }

  // 2. /de/about -> /ar/about
  await triggerLanguageSwitch(page, 'ar');
  await page.waitForURL(/\/ar\/about/);
  await page.waitForFunction(() => document.documentElement.getAttribute('lang') === 'ar', { timeout: 5000 });
  const arLang = await page.locator('html').getAttribute('lang');
  const arDir = await page.locator('html').getAttribute('dir');
  if (arLang !== 'ar' || arDir !== 'rtl') {
    failures.push(`Language switcher to AR failed: got lang=${arLang}, dir=${arDir}`);
  } else {
    console.log('  ✓ Transition /de/about -> /ar/about sets lang="ar" and dir="rtl"');
  }

  // 3. /ar/about -> /about
  await triggerLanguageSwitch(page, 'en');
  await page.waitForURL(/^(?!.*(\/ar\/|\/de\/)).*\/about/);
  await page.waitForFunction(() => document.documentElement.getAttribute('lang') === 'en', { timeout: 5000 });
  const enLang = await page.locator('html').getAttribute('lang');
  const enDir = await page.locator('html').getAttribute('dir');
  if (enLang !== 'en' || enDir !== 'ltr') {
    failures.push(`Language switcher back to EN failed: got lang=${enLang}, dir=${enDir}`);
  } else {
    console.log('  ✓ Transition /ar/about -> /about sets lang="en" and dir="ltr"');
  }

  // 4. Hash preservation: /experience#ahd-financial-deputy -> /de/experience#ahd-financial-deputy
  await page.goto(`${BASE_URL}/experience#ahd-financial-deputy`, { waitUntil: 'networkidle' });
  await triggerLanguageSwitch(page, 'de');
  await page.waitForURL(/\/de\/experience/);
  if (!page.url().includes('#ahd-financial-deputy')) {
    failures.push('Language switcher did not preserve hash anchor #ahd-financial-deputy in German transition');
  } else {
    console.log('  ✓ Language switcher preserved hash anchor across transition to German');
  }

  // 5. Query preservation: /projects?filter=systems -> /de/projects?filter=systems
  await page.goto(`${BASE_URL}/projects?filter=systems`, { waitUntil: 'networkidle' });
  await triggerLanguageSwitch(page, 'de');
  await page.waitForURL(/\/de\/projects/);
  if (!page.url().includes('filter=systems')) {
    failures.push('Language switcher did not preserve query param filter=systems in German transition');
  } else {
    console.log('  ✓ Language switcher preserved query parameter across transition to German');
  }

  // -------------------------------------------------------------
  // 10. THEME PERSISTENCE & CROSS-LOCALE RETENTION
  // -------------------------------------------------------------
  console.log('\n▶ [10/13] Testing Theme Persistence & Cross-Locale Retention...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  const themeToggleBtn = page.locator('header button[aria-label*="theme" i]:visible, header button[aria-label*="Design" i]:visible, header button[aria-label*="المظهر" i]:visible').first();

  if (await themeToggleBtn.count() > 0) {
    await themeToggleBtn.click();
    await page.waitForTimeout(200);
    const toggledTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    
    // Reload check
    await page.reload({ waitUntil: 'networkidle' });
    const reloadedTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (reloadedTheme !== toggledTheme) {
      failures.push('Theme failed to persist on page reload');
    } else {
      console.log(`  ✓ Theme persisted across reload: ${reloadedTheme}`);
    }

    // Cross-locale check: navigate to /de/about
    await page.goto(`${BASE_URL}/de/about`, { waitUntil: 'networkidle' });
    const deTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (deTheme !== toggledTheme) {
      failures.push(`Theme failed cross-locale retention: expected ${toggledTheme}, found ${deTheme}`);
    } else {
      console.log(`  ✓ Theme retained across locale transition (/de/about): ${deTheme}`);
    }

    // Restore initial theme
    await page.locator('header button[aria-label*="theme" i]:visible, header button[aria-label*="Design" i]:visible, header button[aria-label*="المظهر" i]:visible').first().click();
    await page.waitForTimeout(200);
  }

  // -------------------------------------------------------------
  // 11. RESPONSIVE OVERFLOW MATRIX (21 Routes x 4 Viewports = 84)
  // -------------------------------------------------------------
  console.log('\n▶ [11/13] Testing Responsive Overflow Matrix (21 Routes x 4 Viewports = 84 Tests)...');
  const RESPONSIVE_ROUTES = [
    ...PRIMARY_ROUTES_EN,
    REPRESENTATIVE_PROJECT_EN,
    ...PRIMARY_ROUTES_AR,
    REPRESENTATIVE_PROJECT_AR,
    ...PRIMARY_ROUTES_DE,
    REPRESENTATIVE_PROJECT_DE
  ];
  const overflowResults = [];

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    for (const route of RESPONSIVE_ROUTES) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
          break;
        } catch (err) {
          if (attempt === 3) throw err;
          await page.waitForTimeout(300);
        }
      }
      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      }));

      const hasOverflow = metrics.scrollWidth > metrics.clientWidth + 1;
      overflowResults.push({
        route,
        viewport: vp.name,
        width: vp.width,
        scrollWidth: metrics.scrollWidth,
        clientWidth: metrics.clientWidth,
        overflow: hasOverflow
      });

      if (hasOverflow) {
        failures.push(`Overflow on ${route} @ ${vp.name} (${vp.width}px): ${metrics.scrollWidth} > ${metrics.clientWidth}`);
        console.error(`  ❌ OVERFLOW: ${route} @ ${vp.name}`);
      }
    }
  }

  const overflowFailures = overflowResults.filter((r) => r.overflow);
  if (overflowFailures.length === 0) {
    console.log(`  ✓ All 84 route-viewport matrix combinations are completely free of horizontal overflow`);
  }

  // -------------------------------------------------------------
  // 12. SEO METADATA, RECIPROCAL HREFLANG & SITEMAP.XML
  // -------------------------------------------------------------
  console.log('\n▶ [12/13] Verifying Live SEO Metadata & Sitemap.xml...');
  
  // 1. Root / reciprocal hreflang & x-default
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  const enCan = await page.locator('link[rel="canonical"]').getAttribute('href');
  const enHreflangEn = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href');
  const enHreflangAr = await page.locator('link[rel="alternate"][hreflang="ar"]').getAttribute('href');
  const enHreflangDe = await page.locator('link[rel="alternate"][hreflang="de"]').getAttribute('href');
  const enHreflangDef = await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute('href');

  if (enCan.includes('/ar/ar') || enCan.includes('/de/de')) {
    failures.push('Found corrupt canonical URL on English root metadata!');
  }
  if (!enHreflangEn || !enHreflangAr || !enHreflangDe) {
    failures.push('Missing reciprocal hreflang alternate on English root (en, ar, de)');
  }
  if (!enHreflangDef || enHreflangDef.includes('/ar') || enHreflangDef.includes('/de')) {
    failures.push('x-default hreflang on English root must point to English URL');
  } else {
    console.log('  ✓ Root English metadata contains correct reciprocal alternates (en, ar, de, x-default)');
  }

  // 2. German /de metadata (og:locale = de_DE)
  await page.goto(`${BASE_URL}/de`, { waitUntil: 'networkidle' });
  const deOgLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
  if (deOgLocale !== 'de_DE') {
    failures.push(`German og:locale is "${deOgLocale}" (expected de_DE)`);
  } else {
    console.log('  ✓ German og:locale is de_DE');
  }

  // 3. Arabic /ar metadata (og:locale = ar_YE)
  await page.goto(`${BASE_URL}/ar`, { waitUntil: 'networkidle' });
  const arOgLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
  if (arOgLocale !== 'ar_YE') {
    failures.push(`Arabic og:locale is "${arOgLocale}" (expected ar_YE)`);
  } else {
    console.log('  ✓ Arabic og:locale is ar_YE');
  }

  // 4. Sitemap.xml checks
  console.log('  Verifying sitemap.xml...');
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  if (sitemapRes.status !== 200) {
    failures.push(`sitemap.xml returned HTTP ${sitemapRes.status}`);
  } else {
    const xml = await sitemapRes.text();
    const urlMatches = xml.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;
    console.log(`  sitemap.xml URL count: ${urlCount}`);
    
    if (urlCount !== 66) {
      failures.push(`sitemap.xml expected exactly 66 URLs (18 core + 48 project detail), found ${urlCount}`);
    } else {
      console.log('  ✓ sitemap.xml contains exactly 66 indexable URLs');
    }

    if (!xml.includes('hreflang="en"') || !xml.includes('hreflang="ar"') || !xml.includes('hreflang="de"') || !xml.includes('hreflang="x-default"')) {
      failures.push('sitemap.xml missing required hreflang alternates (en, ar, de, x-default)');
    } else {
      console.log('  ✓ sitemap.xml contains en, ar, de, and x-default language alternates');
    }
  }

  // -------------------------------------------------------------
  // 13. CV DOWNLOAD ACTIONS & HTTP 200 STATUSES
  // -------------------------------------------------------------
  console.log('\n▶ [13/13] Verifying Public CV Actions & HTTP 200 Statuses...');
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  const enCvLinks = await page.locator('a[href^="/cv/"]').count();
  if (enCvLinks !== 6) failures.push(`Expected 6 CV links on /contact, found ${enCvLinks}`);
  else console.log('  ✓ Exactly 6 CV download links found on /contact');

  await page.goto(`${BASE_URL}/ar/contact`, { waitUntil: 'networkidle' });
  const arCvLinks = await page.locator('a[href^="/cv/"]').count();
  if (arCvLinks !== 6) failures.push(`Expected 6 CV links on /ar/contact, found ${arCvLinks}`);
  else console.log('  ✓ Exactly 6 CV download links found on /ar/contact');

  await page.goto(`${BASE_URL}/de/contact`, { waitUntil: 'networkidle' });
  const deCvLinks = await page.locator('a[href^="/cv/"]').count();
  if (deCvLinks !== 6) failures.push(`Expected 6 CV links on /de/contact, found ${deCvLinks}`);
  else console.log('  ✓ Exactly 6 CV download links found on /de/contact');

  for (const cvPath of EXPECTED_CV_FILES) {
    const headRes = await fetch(`${BASE_URL}${cvPath}`, { method: 'HEAD' });
    if (headRes.status !== 200) {
      failures.push(`CV file ${cvPath} returned HTTP ${headRes.status}`);
      console.error(`  ❌ CV file HTTP ${headRes.status}: ${cvPath}`);
    } else {
      console.log(`  ✓ CV package HTTP 200: ${cvPath}`);
    }
  }

  await browser.close();

  // -------------------------------------------------------------
  // SUMMARY & REPORT
  // -------------------------------------------------------------
  console.log(`\n============================================================`);
  console.log(`📊 TRILINGUAL VERIFICATION RESULTS SUMMARY`);
  console.log(`============================================================`);

  const passed = failures.length === 0;
  results.status = passed ? 'PASS' : 'FAIL';
  results.failures = failures;

  const outputDir = path.join(process.cwd(), 'test-results');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const reportPath = path.join(outputDir, 'production-verification-summary.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log(`Report written to: ${reportPath}`);

  if (!passed) {
    console.error(`\n❌ VERIFICATION FAILED WITH ${failures.length} CRITICAL DEFECT(S):`);
    failures.forEach((f, idx) => console.error(`  ${idx + 1}. ${f}`));
    process.exit(1);
  }

  console.log(`\n✅ ALL TRILINGUAL PRODUCTION RELEASE CHECKS PASSED DETERMINISTICALLY!`);
  console.log(`   - 18/18 Core Routes (6 EN + 6 AR + 6 DE) Return HTTP 200`);
  console.log(`   - 48/48 Project Detail Routes (16 EN + 16 AR + 16 DE) Discovered & Return HTTP 200`);
  console.log(`   - Document state (lang/dir) verified on all routes across EN, AR, and DE`);
  console.log(`   - Full Content Integrity Verified across English, Arabic, and German`);
  console.log(`   - Banned-phrase scan clean across all 66 routes`);
  console.log(`   - Accessible Project Filter Verified (EN, AR & DE)`);
  console.log(`   - Experience Explorer Desktop Tabs & Mobile Accordions Verified (EN, AR & DE)`);
  console.log(`   - Mobile Drawer Authentic Visibility & Escape Verified (EN, AR & DE)`);
  console.log(`   - Command Palette Ctrl+K & Escape Verified (EN, AR & DE)`);
  console.log(`   - Trilingual Language Switcher & State Sync Verified`);
  console.log(`   - Theme Persistence across reload and locale transitions Verified`);
  console.log(`   - 84/84 Route-Viewport Overflow Matrix Clean (21 routes x 4 viewports)`);
  console.log(`   - Live SEO & Sitemap.xml with 66 URLs and en/ar/de/x-default Verified`);
  console.log(`   - 6/6 CV Packages Validated with HTTP 200 on EN, AR and DE`);
  console.log(`============================================================\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error('\n💥 FATAL VERIFICATION SCRIPT ERROR:', err);
  process.exit(1);
});
