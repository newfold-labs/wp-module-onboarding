import { test, expect } from '@playwright/test';
import {
  auth,
  SELECTORS,
  navigateToOnboarding,
  navigateToStep,
  waitForOnboarding,
  resetOnboardingState,
  resetHtaccessState,
} from '../helpers/index.mjs';

test.describe('Onboarding Module', () => {

  test.beforeAll(async () => {
    // Reset htaccess state to prevent corrupted rules
    await resetHtaccessState();
    // Reset onboarding state to ensure fresh start
    await resetOnboardingState();
  });

  test.beforeEach(async ({ page }) => {
    await auth.loginToWordPress(page);
  });

  test('No fatal errors on welcome page', async ({ page }) => {
    await navigateToOnboarding(page);
    await waitForOnboarding(page);

    const bodyText = await page.locator('body').textContent();
    if (bodyText?.includes('Internal Server Error')) {
        throw new Error('Internal Server Error');
    }

    await expect(page.locator('body')).not.toContainText('Fatal error');
    await expect(page.locator('body')).not.toContainText('Error:');
  });

  test.describe('Welcome Screen', () => {

    test('Displays welcome page with expected elements', async ({ page }) => {
      await navigateToOnboarding(page);
      await waitForOnboarding(page);
      
      // Verify the onboarding app container is present
      await expect(page.locator(SELECTORS.onboardingApp)).toBeVisible();
      
      // Verify welcome heading
      await expect(page.getByRole('heading', { name: 'Welcome to WordPress', level: 1 })).toBeVisible();
      
      // Verify branding
      await expect(page.getByText('Powered by')).toBeVisible();
      
      // Verify start prompt
      await expect(page.getByRole('heading', { name: /how would you like to start/i })).toBeVisible();
      
      // Verify both start options are visible
      await expect(page.getByRole('button', { name: /site creator/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /import.*wordpress/i })).toBeVisible();
    });

  });

  test.describe('Site Creator Flow', () => {

    test('Clicking Site Creator navigates to intake page', async ({ page }) => {
      await navigateToOnboarding(page);
      await waitForOnboarding(page);
      
      // Click AI Site Generator / Site Creator button
      await page.getByRole('button', { name: /site creator/i }).click();
      await page.waitForLoadState('networkidle');
      
      // Verify URL changed to intake
      await expect(page).toHaveURL(/#\/intake/);
      
      // Verify intake page heading
      await expect(page.getByRole('heading', { name: /tell us about your site/i })).toBeVisible();
    });

    test('Intake page has required form fields', async ({ page }) => {
      await navigateToStep(page, '/intake');
      await waitForOnboarding(page);
      
      // Verify form heading
      await expect(page.getByRole('heading', { name: /tell us about your site/i })).toBeVisible();
      
      // Verify form labels are present (using label elements for specificity)
      await expect(page.locator('label').filter({ hasText: 'Site Title' })).toBeVisible();
      await expect(page.locator('label').filter({ hasText: 'Site Type' })).toBeVisible();
      await expect(page.locator('label').filter({ hasText: 'Describe your site' })).toBeVisible();
      
      // Verify back button is present
      await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
      
      // Verify next button is disabled when form is empty
      const nextButton = page.getByRole('button', { name: 'Next' });
      await expect(nextButton).toBeVisible();
      await expect(nextButton).toBeDisabled();
    });

    test('Site Type dropdown shows expected options', async ({ page }) => {
      await navigateToStep(page, '/intake');
      await waitForOnboarding(page);
      
      // Click the Site Type dropdown
      await page.getByRole('button', { name: /site type/i }).click();
      
      // Verify dropdown options
      await expect(page.getByRole('option', { name: 'Personal' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Business & Service' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Online Store' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Link in bio' })).toBeVisible();
    });

    test('Back button returns to welcome screen', async ({ page }) => {
      await navigateToStep(page, '/intake');
      await waitForOnboarding(page);
      
      // Click back
      await page.getByRole('button', { name: 'Back' }).click();
      await page.waitForLoadState('networkidle');
      
      // Should be back at welcome
      await expect(page.getByRole('heading', { name: 'Welcome to WordPress', level: 1 })).toBeVisible();
    });

  });

  test.describe('Import/Migration Flow', () => {

    test('Clicking Import navigates to migration page', async ({ page }) => {
      await navigateToOnboarding(page);
      await waitForOnboarding(page);
      
      // Click Import button
      await page.getByRole('button', { name: /import.*wordpress/i }).click();
      await page.waitForLoadState('networkidle');
      
      // Verify URL changed to migration
      await expect(page).toHaveURL(/#\/migration/);
    });

    test('Migration page shows preparing account message', async ({ page }) => {
      await navigateToOnboarding(page);
      await waitForOnboarding(page);
      
      // Click Import button to get to migration
      await page.getByRole('button', { name: /import.*wordpress/i }).click();
      await page.waitForLoadState('networkidle');
      
      // Verify migration content
      await expect(page.getByRole('heading', { name: /migrate/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /preparing your account/i })).toBeVisible();
    });

  });

  test.describe('Direct Navigation', () => {

    test('Direct navigation to intake step works', async ({ page }) => {
      await navigateToStep(page, '/intake');
      await waitForOnboarding(page);
      
      const bodyText = await page.locator('body').textContent();
      if (bodyText?.includes('Internal Server Error')) {
        throw new Error('Internal Server Error');
      }
      
      await expect(page.getByRole('heading', { name: /tell us about your site/i })).toBeVisible();
    });

  });

});
