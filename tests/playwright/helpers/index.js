/**
 * Onboarding Module Test Helpers for Playwright
 * 
 * - Plugin Helpers (re-exported)
 * - Constants
 * - Navigation Helpers
 * - Setup/Teardown Helpers
 */
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { createRequire } from 'module';
import { join, resolve } from 'path';
// ============================================================================
// PLUGIN HELPERS (re-exported from plugin-level helpers)
// ============================================================================

const moduleHelperDir = __dirname;

function pluginHelperRelativePath(pluginRoot) {
  const jsPath = join(pluginRoot, 'tests/playwright/helpers/index.js');
  if (existsSync(jsPath)) {
    return './tests/playwright/helpers/index.js';
  }
  return null;
}

function isBrandPluginRoot(dir) {
  if (!pluginHelperRelativePath(dir)) {
    return false;
  }
  return (
    existsSync(join(dir, 'playwright.config.mjs')) ||
    existsSync(join(dir, 'playwright.config.js'))
  );
}

function resolvePluginDir() {
  const candidates = [];
  if (process.env.PLUGIN_DIR) {
    candidates.push(process.env.PLUGIN_DIR);
  }
  // vendor/newfold-labs/wp-module-onboarding/tests/playwright/helpers → plugin root
  candidates.push(resolve(moduleHelperDir, '../../../../../..'));
  candidates.push(process.cwd());

  for (const dir of candidates) {
    if (isBrandPluginRoot(dir)) {
      return dir;
    }
  }

  return process.env.PLUGIN_DIR || process.cwd();
}

const pluginDir = resolvePluginDir();
const pluginHelperModule = isBrandPluginRoot(pluginDir)
  ? pluginHelperRelativePath(pluginDir)
  : null;
if (!pluginHelperModule) {
  throw new Error(
    `Plugin Playwright helpers not found under ${pluginDir}. Expected tests/playwright/helpers/index.js (or .mjs). Set PLUGIN_DIR to the brand plugin root.`
  );
}

/**
 * Run a bash snippet inside wp-env CLI (single container round-trip).
 * Avoids spawning one slow `wp-env run cli wp …` exec per WP-CLI command.
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
const requireFromPlugin = createRequire(join(pluginDir, 'package.json'));
const pluginHelpers = requireFromPlugin(pluginHelperModule);

export const { auth, wordpress, newfold, a11y, utils } = pluginHelpers;
export const clearInstallerQueues = newfold.clearInstallerQueues;

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

  onboardingPromptView: '[data-testid="onboarding-prompt-view"]',
  onboardingChatView: '[data-testid="onboarding-chat-view"]',
  onboardingMigrationView: '[data-testid="onboarding-migration-view"]',
  onboardingPromptInput: '[data-testid="onboarding-prompt-input"]',
  onboardingBuildNow: '[data-testid="onboarding-build-now"]',
  onboardingImportSite: '[data-testid="onboarding-import-site"]',
  onboardingMigrationTryAgain: '[data-testid="onboarding-migration-try-again"]',

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
  await page.reload({ waitUntil: 'domcontentloaded' });
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
 * Combined setup: login and open onboarding.
 * @param {import('@playwright/test').Page} page
 */
export async function setupAndNavigate(page) {
  await auth.loginToWordPress(page);
  await navigateToOnboarding(page);
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

const CAPABILITY_SETUP_RETRIES = 3;
const CAPABILITY_RETRY_DELAY_MS = 250;

function isWpCliError(output) {
  if (typeof output !== 'string') {
    return false;
  }
  return output.startsWith('Error:') || output.includes('Fatal error') || output.includes('Parse error');
}

async function readSiteCapabilitiesTransient() {
  const raw = await wordpress.wpCli('option get _transient_nfd_site_capabilities --format=json', {
    failOnNonZeroExit: false,
  });
  const output = typeof raw === 'string' ? raw : String(raw ?? '');
  if (isWpCliError(output)) {
    return { ok: false, reason: output, parsed: null };
  }
  try {
    return { ok: true, reason: '', parsed: JSON.parse(output) };
  } catch {
    return { ok: false, reason: `invalid JSON: ${output}`, parsed: null };
  }
}

async function verifyOnboardingCapabilities() {
  const { ok, reason, parsed } = await readSiteCapabilitiesTransient();
  if (!ok) {
    return { ok: false, reason };
  }
  for (const [key, expected] of Object.entries(ONBOARDING_CAPABILITIES)) {
    if (parsed?.[key] !== expected) {
      return {
        ok: false,
        reason: `capability mismatch for ${key} (expected: ${String(expected)}, actual: ${String(parsed?.[key])})`,
      };
    }
  }
  return { ok: true, reason: '' };
}

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
  utils.fancyLog('🔧 Batched onboarding test reset (WP-CLI)');

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
  let lastReason = '';
  for (let attempt = 1; attempt <= CAPABILITY_SETUP_RETRIES; attempt += 1) {
    await newfold.setCapability(ONBOARDING_CAPABILITIES);
    const verify = await verifyOnboardingCapabilities();
    if (verify.ok) {
      return;
    }
    lastReason = verify.reason;
    if (attempt < CAPABILITY_SETUP_RETRIES) {
      await new Promise((resolve) => setTimeout(resolve, CAPABILITY_RETRY_DELAY_MS));
    }
  }
  throw new Error(`Unable to set onboarding capabilities: ${lastReason}`);
}

/**
 * Clear installer work queued by onboarding app/start (PluginService::initialize).
 */
export async function clearOnboardingInstallerSideEffects() {
  await clearInstallerQueues();
  await wordpress.wpCli('option delete nfd_module_installer_plugin_deactivation_queue', {
    failOnNonZeroExit: false,
  });
}

/**
 * Reset htaccess module state to prevent corrupted rules
 * Clears saved state, disables cache, and clears optimization options
 */
export async function resetHtaccessState() {
  utils.fancyLog('🔧 Clearing htaccess module saved state (batched)');
  runWpEnvBash('wp option delete nfd_module_htaccess_saved_state >/dev/null 2>&1 || true');
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
