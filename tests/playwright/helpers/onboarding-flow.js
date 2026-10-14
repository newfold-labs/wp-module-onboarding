import { expect } from '@playwright/test';
import { SELECTORS } from './index.js';

/**
 * Submit the prompt and wait until publish finished (Customize button visible).
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} prompt
 */
export async function submitPromptAndWaitForPublishReady( page, prompt ) {
	await page.locator( SELECTORS.onboardingPromptInput ).fill( prompt );
	await page.locator( SELECTORS.onboardingBuildNow ).click();

	await expect( page.locator( SELECTORS.onboardingChatView ) ).toBeVisible();
	await expect( page.getByText( prompt, { exact: true } ) ).toBeVisible();
	await expect(
		page.getByText( 'Failed to connect to AI platform' )
	).toHaveCount( 0 );

	await expect(
		page.getByRole( 'button', { name: /Site generation — 7\/7 complete/ } )
	).toBeVisible( { timeout: 90_000 } );

	await expect(
		page.getByRole( 'button', { name: /Customize your site/i } )
	).toBeVisible( { timeout: 90_000 } );
}
