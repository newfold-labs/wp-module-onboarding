/**
 * Onboarding Module Test Helpers for Playwright
 *
 * - Plugin Helpers (re-exported)
 * - Constants
 * - Navigation Helpers
 * - Setup/Teardown Helpers
 */
import { execSync } from 'child_process';
import { expect } from '@playwright/test';
import { existsSync } from 'fs';
import { createRequire } from 'module';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

// ============================================================================
// PLUGIN HELPERS (re-exported from plugin-level helpers)
// ============================================================================

const moduleHelpersPath = fileURLToPath(import.meta.url);

/**
 * Brand plugin root (where playwright.config.mjs lives).
 * Playwright workers may not inherit PLUGIN_DIR from playwright.config.mjs; cwd may be under vendor/.
 */
function resolvePluginRoot() {
  if (process.env.PLUGIN_DIR) {
    return resolve(process.env.PLUGIN_DIR);
  }
  let dir = process.cwd();
	while (true) {
		if (existsSync(join(dir, 'playwright.config.mjs'))) {
			return dir;
		}
		const parent = dirname(dir);
		if (parent === dir) {
			break;
		}
		dir = parent;
	}
  throw new Error(
    'Could not resolve brand plugin root: set PLUGIN_DIR or run Playwright from the plugin repo (playwright.config.mjs not found).'
  );
}

const pluginDir = resolvePluginRoot();
const pluginHelpersPath = resolve(pluginDir, 'tests/playwright/helpers/index.mjs');

if (pluginHelpersPath === moduleHelpersPath) {
  throw new Error(
    'Plugin helpers path matches module helpers. PLUGIN_DIR must point at the brand plugin root, not the module directory.'
  );
}

// Load via require (same as main): a top-level dynamic import() of the plugin's
// .mjs helpers breaks under Playwright's loader ("./utils.mjs does not provide
// an export named 'default'").
const requireFromPlugin = createRequire(join(pluginDir, 'package.json'));
const pluginHelpers = requireFromPlugin(pluginHelpersPath);

export const { auth, wordpress, newfold, a11y, utils } = pluginHelpers;
export const clearInstallerQueues = newfold.clearInstallerQueues;

/**
 * Run a bash snippet inside wp-env CLI (single container round-trip).
 *
 * @param {string} bashScript Bash script lines (newline-separated).
 */
function runWpEnvBash(bashScript) {
  execSync(`npx wp-env run cli bash -lc ${JSON.stringify(bashScript)}`, {
    cwd: pluginDir,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
}

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
  await expect(page.getByRole('heading', heading)).toBeVisible({ timeout: 20000 });
}

/**
 * Wait for onboarding app to be ready.
 * Waits for the React shell, then for step-specific content inferred from the URL hash.
 * @param {import('@playwright/test').Page} page
 */
export async function waitForOnboarding(page) {
  // PHP renders the container before React mounts.
  await page.waitForSelector(SELECTORS.onboardingApp, { timeout: 15000 });
  await page
    .waitForFunction(() => typeof window.nfdOnboarding !== 'undefined', { timeout: 15000 })
    .catch(() => {});
  await page.waitForSelector(SELECTORS.onboardingBody, { timeout: 20000 });

  const step = getOnboardingStepFromUrl(page.url());
  if (step) {
    await waitForOnboardingStep(page, step);
  }
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
  if (utils?.fancyLog) {
    utils.fancyLog('Batched onboarding test reset (WP-CLI)');
  }

  const optionsToClear = [
    'nfd_module_htaccess_saved_state',
    'nfd_module_onboarding_status',
    'nfd_module_onboarding_flow',
    'nfd_module_onboarding_settings_initialized',
    'nfd_module_onboarding_state_input',
    'nfd_module_onboarding_state_sitegen',
    'nfd_module_onboarding_state_logogen',
    'nfd_module_onboarding_state_blueprints',
    'nfd_module_onboarding_sitegen_site_id',
    'nfd_module_onboarding_sitegen_current_id',
    'nfd_module_onboarding_start_time',
    'nfd_module_onboarding_completed_time',
    'nfd_module_onboarding_start_date',
    'nfd_module_onboarding_can_restart',
    'nfd_module_onboarding_should_redirect',
  ];

  const deletes = optionsToClear
    .map((name) => `wp option delete ${name} >/dev/null 2>&1 || true`)
    .join('; ');

  runWpEnvBash(`set +e; ${deletes}`);

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
  if (utils?.fancyLog) {
    utils.fancyLog('Clearing htaccess module saved state (batched)');
  }
  runWpEnvBash(
    'wp option delete nfd_module_htaccess_saved_state >/dev/null 2>&1 || true'
  );
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
