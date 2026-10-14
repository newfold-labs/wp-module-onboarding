import { test, expect } from '@playwright/test';
import {
	auth,
	clearInstallerQueues,
	navigateToOnboarding,
	resetOnboardingState,
} from '../helpers/index.js';
import { installOnboardingAiMocks } from '../helpers/mock-ai-platform.js';
import { submitPromptAndWaitForPublishReady } from '../helpers/onboarding-flow.js';
import { PUBLISH_MARKER_TEXT } from '../fixtures/sitegen-sse.js';

const PROMPT = 'A bakery in Rome';

/**
 * Result: after mocked generation + publish, Site Editor opens with generated content.
 * @see docs/onboarding-and-editor-chat-tests.md (test #3)
 */
test.describe( 'Onboarding result', () => {
	test.describe.configure( { timeout: 180 * 1000 } );

	test.beforeAll( async () => {
		await resetOnboardingState();
	} );

	test.afterAll( async () => {
		await clearInstallerQueues();
	} );

	test.beforeEach( async ( { page } ) => {
		await installOnboardingAiMocks( page, { withPublishableHomePage: true } );
		await auth.loginToWordPress( page );
		await navigateToOnboarding( page );
	} );

	test( 'publishing redirects to Site Editor with generated content', async ( { page } ) => {
		await submitPromptAndWaitForPublishReady( page, PROMPT );

		await page.getByRole( 'button', { name: /Customize your site/i } ).click();

		await page.waitForURL( /site-editor\.php/, { timeout: 60_000 } );
		expect( page.url() ).toMatch( /canvas=edit/ );

		const canvasFrame = page.frameLocator( 'iframe[name="editor-canvas"]' );
		await expect( canvasFrame.getByText( PUBLISH_MARKER_TEXT ) ).toBeVisible( {
			timeout: 60_000,
		} );
	} );
} );
