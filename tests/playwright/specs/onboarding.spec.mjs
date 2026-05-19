import { test, expect } from '@playwright/test';
import {
  auth,
  SELECTORS,
  navigateToOnboarding,
  waitForOnboarding,
  resetOnboardingState,
  resetHtaccessState,
  installOnboardingAiStubs,
} from '../helpers/index.mjs';

test.describe('Onboarding Module', () => {
  test.describe.configure({ timeout: 120 * 1000 });

  test.beforeAll(async () => {
    await resetHtaccessState();
    await resetOnboardingState();
  });

  test.beforeEach(async ({ page }) => {
    await auth.loginToWordPress(page);
  });

  test.describe('Prompt screen', () => {
    test('displays onboarding shell and prompt UX', async ({ page }) => {
      await navigateToOnboarding(page);
      await waitForOnboarding(page);

      await expect(page.locator(SELECTORS.onboardingApp)).toBeVisible();
      await expect(page.locator(SELECTORS.onboardingPromptView)).toBeVisible();
      await expect(
        page.getByText(/Tell us what kind of website you want to build/i)
      ).toBeVisible();
      await expect(
        page.getByAltText(/Bluehost logo/i)
      ).toBeVisible();
      await expect(
        page.locator(SELECTORS.onboardingImportSite)
      ).toBeVisible();
      await expect(
        page.getByText(
          /AI-generated sites may need refinement/i
        )
      ).toBeVisible();
    });

    test('prompt Build now disables until textarea has content', async ({ page }) => {
      await navigateToOnboarding(page);
      await waitForOnboarding(page);

      const buildNow = page.locator(SELECTORS.onboardingBuildNow);
      await expect(buildNow).toBeDisabled();

      await page.locator(SELECTORS.onboardingPromptInput).fill('A small cafe site.');
      await expect(buildNow).toBeEnabled();
    });

    test('submitting prompt opens chat intake when AI APIs are stubbed', async ({ page }) => {
      await installOnboardingAiStubs(page);

      await navigateToOnboarding(page);
      await waitForOnboarding(page);

      await page.locator(SELECTORS.onboardingPromptInput).fill('A small cafe website.');
      await page.locator(SELECTORS.onboardingBuildNow).click();

      await expect(page.locator(SELECTORS.onboardingChatView)).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('A small cafe website.')).toBeVisible();
      await expect(
        page.getByText(/Sounds good.|Which city should we highlight first/i)
      ).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Import / migration', () => {
    test('opening import shows migration view', async ({ page }) => {
      await navigateToOnboarding(page);
      await waitForOnboarding(page);

      await page.locator(SELECTORS.onboardingImportSite).click();

      await expect(page.locator(SELECTORS.onboardingMigrationView)).toBeVisible({ timeout: 15000 });
      await expect(
        page.getByRole('heading', { name: /migrate your existing site/i })
      ).toBeVisible();
    });

    test('migration shows error when connect omits redirect and Try again returns to prompt', async ({ page }) => {
      await page.route(/migrate(?:\/|%2F)connect/i, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ body: {} }),
        });
      });

      await navigateToOnboarding(page);
      await waitForOnboarding(page);

      await page.locator(SELECTORS.onboardingImportSite).click();

      await expect(page.locator(SELECTORS.onboardingMigrationTryAgain)).toBeVisible({
        timeout: 15000,
      });
      await expect(page.getByText(/Something went wrong/i)).toBeVisible();

      await page.locator(SELECTORS.onboardingMigrationTryAgain).click();

      await expect(page.locator(SELECTORS.onboardingPromptView)).toBeVisible({ timeout: 15000 });
      await expect(page.locator(SELECTORS.onboardingMigrationView)).toBeHidden();
    });
  });
});
