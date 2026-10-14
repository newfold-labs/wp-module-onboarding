import { test, expect } from '@playwright/test';
import {
	auth,
	clearInstallerQueues,
	SELECTORS,
	navigateToOnboarding,
	resetOnboardingState,
} from '../helpers/index.js';
import { installOnboardingAiMocks } from '../helpers/mock-ai-platform.js';

const PROMPT = 'A bakery in Rome';

const GENERATION_ERROR_MESSAGE =
	'Something went wrong during site generation. Please try again.';

/**
 * Error: failed generate API → error UI → Try again → recovery.
 * @see docs/onboarding-and-editor-chat-tests.md (test #4)
 */
test.describe( 'Onboarding error handling', () => {
	test.describe.configure( { timeout: 180 * 1000 } );

	test.beforeAll( async () => {
		await resetOnboardingState();
	} );

	test.afterAll( async () => {
		await clearInstallerQueues();
	} );

	test.beforeEach( async ( { page } ) => {
		await installOnboardingAiMocks( page, { failGenerateOnce: true } );
		await auth.loginToWordPress( page );
		await navigateToOnboarding( page );
	} );

	test( 'shows an error after a failed API call and recovers via Try again', async ( { page } ) => {
		await page.locator( SELECTORS.onboardingPromptInput ).fill( PROMPT );
		await page.locator( SELECTORS.onboardingBuildNow ).click();

		await expect( page.locator( SELECTORS.onboardingChatView ) ).toBeVisible();
		await expect( page.getByText( GENERATION_ERROR_MESSAGE ) ).toBeVisible( {
			timeout: 60_000,
		} );

		const tryAgain = page.getByRole( 'button', { name: 'Try again' } );
		await expect( tryAgain ).toBeVisible();
		await tryAgain.click();

		await expect(
			page.getByRole( 'button', { name: /Site generation — 7\/7 complete/ } )
		).toBeVisible( { timeout: 90_000 } );

		await expect(
			page.getByRole( 'button', { name: /Customize your site/i } )
		).toBeVisible( { timeout: 90_000 } );
	} );
} );
