import { nfdOnboardingStore } from '@/data/store';
import { dispatch, select } from '@wordpress/data';
import { getHomepages } from '@/utils/api/onboarding';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_ERROR_STATE_TRIGGERED } from '@/utils/analytics/hiive/constants';

/**
 * Generate the home pages for the site.
 * @return {boolean} True if successful, false otherwise.
 */
const generateHomePages = async () => {
	const prompt = select( nfdOnboardingStore ).getPrompt();
	const locale = select( nfdOnboardingStore ).getSelectedLocale();
	const siteType = select( nfdOnboardingStore ).getSiteType();

	const response = await getHomepages( prompt, siteType, locale );
	if ( response.error ) {
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_ERROR_STATE_TRIGGERED,
				'homepages',
				{
					source: 'quickstart',
				}
			)
		);

		// eslint-disable-next-line no-console
		console.error( 'Failed to generate home pages' );

		return false;
	}
	const homepages = response.body;

	// Set the homepages in the store
	dispatch( nfdOnboardingStore ).setHomepages( homepages );

	return true;
};

export default generateHomePages;
