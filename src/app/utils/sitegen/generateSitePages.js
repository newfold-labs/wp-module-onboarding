import { dispatch, select } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { getSitePages } from '@/utils/api';
import { OnboardingEvent, trackOnboardingEvent } from '@/utils/analytics/hiive';
import { ACTION_SITE_PAGES_GENERATION_FAILED } from '@/utils/analytics/hiive/constants';

const generateSitePages = async () => {
	const prompt = select( nfdOnboardingStore ).getPrompt();
	const locale = select( nfdOnboardingStore ).getSelectedLocale();

	const response = await getSitePages( prompt, locale );
	if ( response.error ) {
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_SITE_PAGES_GENERATION_FAILED )
		);

		// eslint-disable-next-line no-console
		console.error( 'Failed to generate site pages' );

		return false;
	}

	// Flag that the site pages have been generated
	dispatch( nfdOnboardingStore ).setHasGeneratedSitePages( true );

	return true;
};

export default generateSitePages;
