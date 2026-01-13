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
  
  // Navigation
  nextButton: '[data-testid="next-button"], .navigation-buttons .nfd-nav-button--primary',
  backButton: '[data-testid="back-button"], .navigation-buttons .nfd-nav-button--secondary',
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
  await page.waitForLoadState('networkidle');
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
 * Reset onboarding state to allow re-running onboarding
 * Clears the onboarding completion status
 */
export async function resetOnboardingState() {
  await wordpress.wpCli('option delete nfd_module_onboarding_flow', { failOnNonZeroExit: false });
  await wordpress.wpCli('option delete nfd_module_onboarding_status', { failOnNonZeroExit: false });
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
  await nextButton.click();
  await page.waitForLoadState('networkidle');
}

/**
 * Click the back button in onboarding
 * @param {import('@playwright/test').Page} page
 */
export async function clickBack(page) {
  const backButton = page.locator(SELECTORS.backButton).first();
  await backButton.click();
  await page.waitForLoadState('networkidle');
}
