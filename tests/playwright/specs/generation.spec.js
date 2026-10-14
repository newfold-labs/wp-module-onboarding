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

/**
 * Generation: prompt submit → mocked intake + SSE → discovery and generation progress complete.
 * @see docs/onboarding-and-editor-chat-tests.md (test #2)
 */
test.describe( 'Onboarding generation', () => {
	test.describe.configure( { timeout: 120 * 1000 } );

	test.beforeAll( async () => {
		await resetOnboardingState();
	} );

	test.afterAll( async () => {
		await clearInstallerQueues();
	} );

	test.beforeEach( async ( { page } ) => {
		await installOnboardingAiMocks( page );
		await auth.loginToWordPress( page );
		await navigateToOnboarding( page );
	} );

	test( 'runs progress steps to completion with mocked AI responses', async ( { page } ) => {
		await page.locator( SELECTORS.onboardingPromptInput ).fill( PROMPT );
		await page.locator( SELECTORS.onboardingBuildNow ).click();

		await expect( page.locator( SELECTORS.onboardingChatView ) ).toBeVisible();
		await expect( page.getByText( PROMPT, { exact: true } ) ).toBeVisible();
		await expect(
			page.getByText( 'Failed to connect to AI platform' )
		).toHaveCount( 0 );

		await expect( page.getByText( 'Now building your site...' ) ).toBeVisible( {
			timeout: 30_000,
		} );

		await expect(
			page.getByRole( 'button', { name: /Site discovery — 4\/4 complete/ } )
		).toBeVisible( { timeout: 60_000 } );

		await expect(
			page.getByRole( 'button', { name: /Site generation — 7\/7 complete/ } )
		).toBeVisible( { timeout: 60_000 } );

		await expect( page.getByText( 'Your site is ready! Publishing now...' ) ).toBeVisible();
	} );
} );
