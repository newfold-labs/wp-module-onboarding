import { test, expect } from '@playwright/test';
import {
  auth,
  clearOnboardingInstallerSideEffects,
  SELECTORS,
  navigateToOnboarding,
  resetOnboardingState,
  ensureOnboardingCapabilities,
} from '../helpers/index.js';

/**
 * Lightweight smoke checks: onboarding bundle loads and the prompt UI renders.
 * Intentionally avoids submit flows / API keys (those belong in narrower integration tests).
 */
test.describe.skip('Onboarding module UI', () => {
  // WP login (`beforeEach`) can exceed the repo default test timeout when wp-env/cli is cold.
  test.describe.configure({ timeout: 75 * 1000 });

  test.beforeAll(async () => {
    await resetOnboardingState();
  });

  test.afterAll(async () => {
    await clearOnboardingInstallerSideEffects();
  });

  test.afterEach(async () => {
    await clearOnboardingInstallerSideEffects();
  });

  test.beforeEach(async ({ page }) => {
    await auth.loginToWordPress(page);
    await ensureOnboardingCapabilities();
  });

  test('loads the prompt screen shell', async ({ page }) => {
    await navigateToOnboarding(page);

    await expect(page.locator(SELECTORS.onboardingApp)).toBeVisible();
    await expect(page.locator(SELECTORS.onboardingPromptView)).toBeVisible();

    await expect(page.locator(SELECTORS.onboardingPromptInput)).toBeVisible();
    await expect(page.locator(SELECTORS.onboardingBuildNow)).toBeVisible();
    await expect(page.locator(SELECTORS.onboardingImportSite)).toBeVisible();

    await expect(
      page.getByText(/Tell us what kind of website you want to build/i)
    ).toBeVisible();

    await expect(
      page.getByText(/AI-generated sites may need refinement/i)
    ).toBeVisible();

    await expect(page.locator(SELECTORS.errorMessage)).toHaveCount(0);
    await expect(page.locator(SELECTORS.onboardingBuildNow)).toBeDisabled();
  });
});

/**
 * Always runs in the onboarding Playwright project (even when UI smoke is skipped).
 * Module CI runs this project before the full plugin suite; visiting onboarding queues
 * installer work via app/start — clear any stale queues so deactivation/migration specs
 * are not raced by cron on plugins.php.
 */
test('clears installer side effects for later Playwright projects', async () => {
  await clearOnboardingInstallerSideEffects();
});
