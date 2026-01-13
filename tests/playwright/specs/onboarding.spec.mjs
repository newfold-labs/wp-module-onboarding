import { test, expect } from '@playwright/test';
import {
  auth,
  SELECTORS,
  navigateToOnboarding,
  waitForOnboarding,
  resetOnboardingState,
} from '../helpers/index.mjs';

test.describe('Onboarding Module', () => {

  test.beforeAll(async () => {
    // Reset onboarding state to ensure fresh start
    await resetOnboardingState();
  });

  test.beforeEach(async ({ page }) => {
    await auth.loginToWordPress(page);
  });

  test('Onboarding app loads without errors', async ({ page }) => {
    await navigateToOnboarding(page);
    await waitForOnboarding(page);
    
    // Verify the onboarding app container is present
    await expect(page.locator(SELECTORS.onboardingApp)).toBeVisible();
    
    // Verify no fatal errors
    await expect(page.locator('body')).not.toContainText('Fatal error');
    await expect(page.locator('body')).not.toContainText('Error:');
  });

  test('Onboarding renders content', async ({ page }) => {
    await navigateToOnboarding(page);
    await waitForOnboarding(page);
    
    // Verify the app has rendered some content (not just an empty container)
    const appContent = page.locator(SELECTORS.onboardingApp);
    await expect(appContent).toBeVisible();
    
    // The app should have some interactive content
    const hasContent = await appContent.locator('button, a, input, h1, h2').count();
    expect(hasContent).toBeGreaterThan(0);
  });

  // Add more tests as needed
  // Examples:
  //
  // test.describe('Get Started Step', () => {
  //   test('Shows welcome message', async ({ page }) => {
  //     await navigateToStep(page, '/step/get-started');
  //     await waitForOnboarding(page);
  //     // Add assertions
  //   });
  // });
  //
  // test.describe('SiteGen Flow', () => {
  //   test('SiteGen welcome loads', async ({ page }) => {
  //     await navigateToStep(page, '/sitegen/step/welcome');
  //     await waitForOnboarding(page);
  //     // Add assertions
  //   });
  // });

});
