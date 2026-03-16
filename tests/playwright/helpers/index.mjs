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

/** Common selectors for onboarding module */
export const SELECTORS = {
  // Main containers
  onboardingApp: '#nfd-onboarding',
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
  await page.goto(ONBOARDING_BASE);
}

/**
 * Navigate to a specific onboarding step
 * @param {import('@playwright/test').Page} page
 * @param {string} stepPath - Step path (e.g., '/step/get-started', '/sitegen/step/welcome')
 */
export async function navigateToStep(page, stepPath) {
  await page.goto(`${ONBOARDING_BASE}#${stepPath}`);
}

/**
 * Wait for onboarding app to be ready
 * @param {import('@playwright/test').Page} page
 */
export async function waitForOnboarding(page) {
  // Wait for the onboarding app container to be present
  await page.waitForSelector(SELECTORS.onboardingApp, { timeout: 15000 });
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
  hasAISiteGen: true,
  canMigrateSite: true,
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
  // Use PHP eval to set transient with proper array format
  const phpArray = Object.entries(ONBOARDING_CAPABILITIES)
    .map(([key, value]) => {
      const phpValue = typeof value === 'boolean' ? value.toString() : `'${value}'`;
      return `'${key}' => ${phpValue}`;
    })
    .join(', ');

  const command = `eval "set_transient('nfd_site_capabilities', array(${phpArray}));"`;
  await wordpress.wpCli(command, { failOnNonZeroExit: false });
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

/**
 * Set site capabilities for onboarding
 * @param {Object} capabilities - Capabilities object
 */
export async function setSiteCapabilities(capabilities) {
  const stringified = JSON.stringify(capabilities).replace(/"/g, '\\"');
  await wordpress.wpCli(`option update _transient_nfd_site_capabilities "${stringified}" --format=json`);
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
