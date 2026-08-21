/**
 * Onboarding Module Test Helpers for Playwright
 * 
 * - Plugin Helpers (re-exported)
 * - Constants
 * - Navigation Helpers
 * - Setup/Teardown Helpers
 */
import { expect } from '@playwright/test';
import { join } from 'path';
import { pathToFileURL } from 'url';

// ============================================================================
// PLUGIN HELPERS (re-exported from plugin-level helpers)
// ============================================================================

const pluginDir = process.env.PLUGIN_DIR || process.cwd();
const finalHelpersPath = join(pluginDir, 'tests/playwright/helpers/index.mjs');
const helpersUrl = pathToFileURL(finalHelpersPath).href;
const pluginHelpers = await import(helpersUrl);

export const { auth, wordpress, newfold, a11y, utils } = pluginHelpers;

// ============================================================================
// CONSTANTS
// ============================================================================

/** Plugin ID from environment */
export const pluginId = process.env.PLUGIN_ID || 'bluehost';

/** Onboarding page base URL */
export const ONBOARDING_BASE = '/wp-admin/index.php?page=nfd-onboarding';

/** Headings used to detect when a step has finished rendering */
export const STEP_HEADINGS = {
  welcome: { name: 'Welcome to WordPress', level: 1 },
  intake: { name: /tell us about your site/i },
};

/** Common selectors for onboarding module */
export const SELECTORS = {
  // Main containers
  onboardingApp: '#nfd-onboarding',
  onboardingBody: '.nfd-onboarding-body',
  onboardingContent: '.nfd-onboarding-content',
  mainContent: '#nfd-onboarding main',

  // Navigation buttons
  nextButton: 'button:has-text("Next")',
  backButton: 'button:has-text("Back")',
  skipButton: '[data-testid="skip-button"]',

  // Common elements
  loadingSpinner: '.nfd-onboarding-loading',
  errorMessage: '.nfd-onboarding-error',
};

// ============================================================================
// NAVIGATION HELPERS
// ============================================================================

/**
 * Navigate to onboarding start page
 * @param {import('@playwright/test').Page} page
 */
export async function navigateToOnboarding(page) {
  await page.goto(ONBOARDING_BASE, { waitUntil: 'domcontentloaded' });
}

/**
 * Navigate to a specific onboarding step
 * @param {import('@playwright/test').Page} page
 * @param {string} stepPath - Step path (e.g., '/step/get-started', '/sitegen/step/welcome')
 */
export async function navigateToStep(page, stepPath) {
  await page.goto(`${ONBOARDING_BASE}#${stepPath}`, { waitUntil: 'domcontentloaded' });
}

/**
 * Resolve which onboarding step the page URL points at.
 * @param {string} url
 * @returns {'welcome'|'intake'|null}
 */
function getOnboardingStepFromUrl(url) {
  const hash = new URL(url).hash.replace(/^#\/?/, '');

  if (!hash || hash === '/') {
    return 'welcome';
  }

  if (hash.startsWith('intake')) {
    return 'intake';
  }

  return null;
}

/**
 * Wait for a specific onboarding step to finish rendering.
 * @param {import('@playwright/test').Page} page
 * @param {'welcome'|'intake'} step
 */
export async function waitForOnboardingStep(page, step) {
  const heading = STEP_HEADINGS[step];
  // CI can be slow to download and hydrate the onboarding bundle after the PHP shell appears.
  await expect(page.getByRole('heading', heading)).toBeVisible({ timeout: 45000 });
}

/**
 * Wait for onboarding app to be ready.
 * Waits for the app container, then for step-specific content inferred from the URL hash.
 * @param {import('@playwright/test').Page} page
 */
export async function waitForOnboarding(page) {
  // PHP renders #nfd-onboarding (with loading skeleton) before React mounts.
  await page.waitForSelector(SELECTORS.onboardingApp, { timeout: 15000 });

  const step = getOnboardingStepFromUrl(page.url());
  if (step) {
    await waitForOnboardingStep(page, step);
    return;
  }

  // Fallback for routes without a mapped step heading (e.g. migration).
  await page.waitForSelector(SELECTORS.onboardingBody, { timeout: 45000 });
}

/**
 * Combined setup: login, navigate to onboarding, and wait for it to load
 * @param {import('@playwright/test').Page} page
 */
export async function setupAndNavigate(page) {
  await auth.loginToWordPress(page);
  await navigateToOnboarding(page);
  await waitForOnboarding(page);
}

// ============================================================================
// SETUP / TEARDOWN HELPERS
// ============================================================================

/**
 * Required capabilities for onboarding to function
 * hasAISiteGen is required - without it, onboarding shows "wrong turn" error
 */
export const ONBOARDING_CAPABILITIES = {
  canAccessAI: true,
  hasAISiteGen: true,
  canMigrateSite: true,
  hasForkABExperiment: false,
};

/**
 * Reset onboarding state to allow re-running onboarding.
 * Clears completion status, flow data, and related state options.
 * Also ensures required capabilities are set.
 * 
 * Key options that affect onboarding access:
 * - nfd_module_onboarding_status: If 'completed', blocks access with "wrong turn" error
 * - nfd_module_onboarding_flow: Contains flow state including hasExited/isComplete flags
 * - nfd_module_onboarding_settings_initialized: Tracks if settings were initialized
 * - nfd_module_onboarding_state_*: Redux state persistence options
 * - _transient_nfd_site_capabilities: Must include hasAISiteGen: true
 */
export async function resetOnboardingState() {
  // Core status options - these directly affect access checks
  await wordpress.wpCli('option delete nfd_module_onboarding_status', { failOnNonZeroExit: false });
  await wordpress.wpCli('option delete nfd_module_onboarding_flow', { failOnNonZeroExit: false });

  // Settings initialization flag - allows onboarding to re-initialize settings
  await wordpress.wpCli('option delete nfd_module_onboarding_settings_initialized', { failOnNonZeroExit: false });

  // Redux state persistence - clears any saved UI state
  await wordpress.wpCli('option delete nfd_module_onboarding_state_input', { failOnNonZeroExit: false });
  await wordpress.wpCli('option delete nfd_module_onboarding_state_sitegen', { failOnNonZeroExit: false });
  await wordpress.wpCli('option delete nfd_module_onboarding_state_logogen', { failOnNonZeroExit: false });
  await wordpress.wpCli('option delete nfd_module_onboarding_state_blueprints', { failOnNonZeroExit: false });

  // Time tracking options
  await wordpress.wpCli('option delete nfd_module_onboarding_start_time', { failOnNonZeroExit: false });
  await wordpress.wpCli('option delete nfd_module_onboarding_completed_time', { failOnNonZeroExit: false });
  await wordpress.wpCli('option delete nfd_module_onboarding_start_date', { failOnNonZeroExit: false });

  // Restart eligibility flag
  await wordpress.wpCli('option delete nfd_module_onboarding_can_restart', { failOnNonZeroExit: false });

  // Redirect handling
  await wordpress.wpCli('option delete nfd_module_onboarding_should_redirect', { failOnNonZeroExit: false });

  // Ensure required capabilities are set (hasAISiteGen is required for onboarding access)
  await ensureOnboardingCapabilities();
}

/**
 * Ensure the site has the required capabilities for onboarding.
 * This sets hasAISiteGen which is checked by AppBody.js.
 * Other tests (like performance) may overwrite capabilities, so this ensures
 * onboarding can still function.
 */
export async function ensureOnboardingCapabilities() {
  await newfold.setCapability(ONBOARDING_CAPABILITIES);
}

/**
 * Reset htaccess module state to prevent corrupted rules
 * Clears saved state, disables cache, and clears optimization options
 */
export async function resetHtaccessState() {
  await wordpress.wpCli('option delete nfd_module_htaccess_saved_state', { failOnNonZeroExit: false });
  //   await wordpress.wpCli('option delete nfd_fonts_optimization', { failOnNonZeroExit: false });
  //   await wordpress.wpCli('option delete nfd_image_optimization', { failOnNonZeroExit: false });
  //   await wordpress.wpCli('option update newfold_cache_level 0', { failOnNonZeroExit: false });
}

/**
 * Set onboarding as completed
 */
export async function markOnboardingComplete() {
  await wordpress.wpCli('option update nfd_module_onboarding_status "complete"');
}

// ============================================================================
// INTERACTION HELPERS
// ============================================================================

/**
 * Click the next/continue button in onboarding
 * @param {import('@playwright/test').Page} page
 */
export async function clickNext(page) {
  const nextButton = page.locator(SELECTORS.nextButton).first();
  await nextButton.click({ timeout: 15000 });
}

/**
 * Click the back button in onboarding
 * @param {import('@playwright/test').Page} page
 */
export async function clickBack(page) {
  const backButton = page.locator(SELECTORS.backButton).first();
  await backButton.click({ timeout: 15000 });
}
