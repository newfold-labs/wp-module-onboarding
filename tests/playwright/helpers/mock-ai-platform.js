/**
 * In-browser stubs for onboarding handshake (apiFetch) and sitegen intake/generate (fetch).
 */
import { buildMockSitegenSseBody } from '../fixtures/sitegen-sse.js';

export const MOCK_SITE_ID = 'playwright-mock-site-id';

/**
 * @param {import('@playwright/test').Page} page
 * @param {{ withPublishableHomePage?: boolean, failGenerateOnce?: boolean }} [options]
 */
export async function installOnboardingAiMocks( page, options = {} ) {
	const { failGenerateOnce = false, ...sseOptions } = options;
	const sseBody = buildMockSitegenSseBody( sseOptions );
	const intakeBody = JSON.stringify( {
		understanding: 'A bakery in Rome offering fresh bread and pastries.',
		is_complete: true,
		question: null,
	} );

	await page.addInitScript(
		( { siteId, intakeJson, generateSse, failGenerateOnce } ) => {
			let generateAttempts = 0;
			const attachApiFetch = () => {
				if ( ! window.wp?.apiFetch ) {
					return false;
				}
				window.wp.apiFetch.use( ( options, next ) => {
					const url = String( options.url || options.path || '' );
					if ( url.includes( 'sitegen/handshake' ) ) {
						return Promise.resolve( { site_id: siteId } );
					}
					return next( options );
				} );
				return true;
			};

			const attachFetch = () => {
				const originalFetch = window.fetch.bind( window );
				window.fetch = async ( input, init ) => {
					const url = typeof input === 'string' ? input : input.url;
					if ( url.includes( '/api/v1/sitegen/intake' ) ) {
						return new Response( intakeJson, {
							status: 200,
							headers: { 'Content-Type': 'application/json' },
						} );
					}
					if ( url.includes( '/api/v1/sitegen/generate' ) ) {
						generateAttempts += 1;
						if ( failGenerateOnce && generateAttempts === 1 ) {
							return new Response( 'Mock sitegen failure', {
								status: 500,
								statusText: 'Internal Server Error',
							} );
						}
						return new Response( generateSse, {
							status: 200,
							headers: { 'Content-Type': 'text/event-stream' },
						} );
					}
					return originalFetch( input, init );
				};
			};

			const boot = () => {
				attachFetch();
				if ( ! attachApiFetch() ) {
					window.addEventListener( 'load', () => attachApiFetch(), { once: true } );
				}
			};

			if ( document.readyState === 'loading' ) {
				document.addEventListener( 'DOMContentLoaded', boot, { once: true } );
			} else {
				boot();
			}
		},
		{
			siteId: MOCK_SITE_ID,
			intakeJson: intakeBody,
			generateSse: sseBody,
			failGenerateOnce,
		}
	);
}
