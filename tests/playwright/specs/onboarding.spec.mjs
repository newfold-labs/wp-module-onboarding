import { test, expect } from '@playwright/test';
import { auth, SELECTORS, navigateToOnboarding, resetOnboardingState } from '../helpers/index.mjs';

/**
 * Lightweight smoke checks: onboarding bundle loads and the prompt UI renders.
 * Intentionally avoids submit flows / API keys (those belong in narrower integration tests).
 */
test.describe('Onboarding module UI', () => {
  // WP login (`beforeEach`) can exceed the repo default test timeout when wp-env/cli is cold.
  test.describe.configure({ timeout: 75 * 1000 });

  test.beforeAll(async () => {
    await resetOnboardingState();
  });

  test.beforeEach(async ({ page }) => {
    await auth.loginToWordPress(page);
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
