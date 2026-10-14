import { test, expect } from '@playwright/test';
import {
  auth,
  clearInstallerQueues,
  SELECTORS,
  navigateToOnboarding,
  resetOnboardingState,
} from '../helpers/index.js';

/**
 * Initial screen: after login the onboarding page loads, the prompt is visible,
 * and Build Now stays disabled until the field has text.
 */
test.describe('Onboarding initial screen', () => {
  // WP login (`beforeEach`) can exceed the repo default test timeout when wp-env/cli is cold.
  test.describe.configure({ timeout: 75 * 1000 });

  test.beforeAll(async () => {
    await resetOnboardingState();
  });

  test.afterAll(async () => {
    await clearInstallerQueues();
  });

  test.beforeEach(async ({ page }) => {
    await auth.loginToWordPress(page);
    await navigateToOnboarding(page);
  });

  test('loads the onboarding page with the prompt visible', async ({ page }) => {
    await expect(page.locator(SELECTORS.onboardingApp)).toBeVisible();
    await expect(page.locator(SELECTORS.onboardingPromptView)).toBeVisible();
    await expect(page.locator(SELECTORS.onboardingPromptInput)).toBeVisible();
    await expect(page.locator(SELECTORS.onboardingBuildNow)).toBeVisible();
    await expect(page.locator(SELECTORS.errorMessage)).toHaveCount(0);
  });

  test('keeps Build Now disabled until the field has text', async ({ page }) => {
    const input = page.locator(SELECTORS.onboardingPromptInput);
    const buildNow = page.locator(SELECTORS.onboardingBuildNow);

    await expect(buildNow).toBeDisabled();

    // Whitespace only does not count as text.
    await input.fill('   ');
    await expect(buildNow).toBeDisabled();

    await input.fill('A bakery in Rome');
    await expect(buildNow).toBeEnabled();

    await input.fill('');
    await expect(buildNow).toBeDisabled();
  });
});
