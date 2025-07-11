import { nfdOnboardingStore } from '@/data/store';
import { dispatch, select } from '@wordpress/data';
import { getHomepages } from '@/utils/api/onboarding';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ERROR_STATE_TRIGGERED } from '@/utils/analytics/hiive/constants';

/**
 * Generate the home pages for the site.
 *
 * @param {boolean} fallback - Whether to explicitly request fallback homepages.
 * @return {Promise<boolean>} True if successful, false otherwise.
 */
const generateHomePages = async ( fallback = false ) => {
	const prompt = select( nfdOnboardingStore ).getPrompt();
	const locale = select( nfdOnboardingStore ).getSelectedLocale();

	const response = await getHomepages( prompt, locale, fallback );

	if ( response.error ) {
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_ERROR_STATE_TRIGGERED,
				'homepages',
				{ source: 'quickstart' }
			)
		);

		// eslint-disable-next-line no-console
		console.error( 'Failed to generate home pages' );
		return false;
	}

	const homepages = response.body;
	if ( fallback ) {
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_ERROR_STATE_TRIGGERED,
				'homepages_fallback',
				{ source: 'quickstart' }
			)
		);

		dispatch( nfdOnboardingStore ).setFallbackHomepages( homepages );
		return false;
	}

	dispatch( nfdOnboardingStore ).setHomepages( homepages );
	return true;
};

export default generateHomePages;
