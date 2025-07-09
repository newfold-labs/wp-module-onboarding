/* eslint-disable jsdoc/require-returns-check */
import { dispatch, select } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { nfdOnboardingStore } from '@/data/store';
import { getSiteMetaForIdentifier } from '@/utils/api/onboarding';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ERROR_STATE_TRIGGERED } from '@/utils/analytics/hiive/constants';

const handleFetch = async ( identifier, siteInfo, siteType, locale ) => {
	let response;
	const maxRetries = 3;
	let retryCount = 0;

	const delay = ( ms ) => new Promise( ( resolve ) => setTimeout( resolve, ms ) );

	while ( retryCount < maxRetries ) {
		retryCount++;

		response = await getSiteMetaForIdentifier( identifier, siteInfo, siteType, locale );
		if ( response.error ) {
			// Exponential backoff
			await delay( 500 * retryCount );
			// Retry
			continue;
		}

		break;
	}

	return response;
};

const setSiteTitle = async ( title ) => {
	dispatch( coreStore ).editEntityRecord( 'root', 'site', undefined, {
		title,
	} );
	dispatch( coreStore ).saveEditedEntityRecord( 'root', 'site' );
};

const setSiteTagline = async ( tagline ) => {
	dispatch( coreStore ).editEntityRecord( 'root', 'site', undefined, {
		description: tagline,
	} );
	dispatch( coreStore ).saveEditedEntityRecord( 'root', 'site' );
};

/**
 * Generate the site meta for the site.
 * @return {boolean} True if successful, false otherwise.
 */
const generateSiteMeta = async () => {
	const identifiers = select( nfdOnboardingStore ).getSiteGenIdentifiers();
	const prompt = select( nfdOnboardingStore ).getPrompt();
	const locale = select( nfdOnboardingStore ).getSelectedLocale();
	const siteType = select( nfdOnboardingStore ).getSiteType();
	/**
	 * Todo: the site meta api expects an object, but the prompt is a string.
	 * In the future, we should change the api to accept a string, but for now,
	 * we will convert the prompt to an object.
	 */
	const siteInfo = {
		site_description: prompt,
	};

	try {
		const siteMetaCalls = identifiers.map( async ( identifier ) => {
			const response = await handleFetch( identifier, siteInfo, siteType, locale );
			if ( response.error ) {
				trackOnboardingEvent(
					new OnboardingEvent(
						ACTION_ERROR_STATE_TRIGGERED,
						identifier,
						{ source: 'quickstart' }
					)
				);

				throw new Error( `Failed to generate site meta for ${ identifier }` );
			}

			// Set the site title and tagline if the identifier is site_config
			if ( identifier === 'site_config' ) {
				if ( response?.body?.site_title ) {
					setSiteTitle( response.body.site_title );
				}
				if ( response?.body?.tagline ) {
					setSiteTagline( response.body.tagline );
				}
			}
		} );

		await Promise.all( siteMetaCalls );
		return true;
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( error );
		return false;
	}
};

export default generateSiteMeta;
