import { test, expect } from '@playwright/test';
import {
	auth,
	clearInstallerQueues,
	ONBOARDING_BASE,
	SELECTORS,
	resetOnboardingState,
} from '../helpers/index.js';

/**
 * Migration SSO deep link: #migration opens MigrationView instead of PromptView.
 */
test.describe( 'Onboarding migration deep link', () => {
	test.describe.configure( { timeout: 75 * 1000 } );

	test.beforeAll( async () => {
		await resetOnboardingState();
	} );

	test.afterAll( async () => {
		await clearInstallerQueues();
	} );

	test.beforeEach( async ( { page } ) => {
		await page.route( '**/newfold-migration/**', ( route ) => {
			route.fulfill( {
				status: 500,
				contentType: 'application/json',
				body: JSON.stringify( { message: 'Playwright mock failure' } ),
			} );
		} );
		await auth.loginToWordPress( page );
	} );

	test( 'shows migration view when URL hash is migration', async ( { page } ) => {
		await page.goto( `${ ONBOARDING_BASE }#migration`, { waitUntil: 'domcontentloaded' } );

		await expect( page.locator( SELECTORS.onboardingApp ) ).toBeVisible();
		await expect( page.locator( SELECTORS.onboardingMigrationView ) ).toBeVisible();
		await expect( page.locator( SELECTORS.onboardingPromptView ) ).toHaveCount( 0 );
	} );
} );
