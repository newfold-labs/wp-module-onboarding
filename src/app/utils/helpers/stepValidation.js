import { select } from '@wordpress/data';
import { nfdOnboardingStore } from '../../data/store';

/**
 * Check if the required data is available for a specific step
 * @param {string} stepKey - The key of the step to validate
 * @return {boolean} - True if the step has required data, false otherwise
 */
export const hasRequiredDataForStep = ( stepKey ) => {
	switch ( stepKey ) {
		case 'fork':
			// Fork step doesn't require any specific data - it's the entry point
			return true;

		case 'intake':
			// Intake step doesn't require any previous data - it's where data collection starts
			return true;

		case 'logo': {
			// Logo step requires site title and prompt from intake
			const inputSlice = select( nfdOnboardingStore ).getInputSlice();
			return !! ( inputSlice.siteTitle && inputSlice.prompt );
		}

		case 'generating': {
			// Generating step requires site title and prompt
			const inputSlice = select( nfdOnboardingStore ).getInputSlice();
			return !! ( inputSlice.siteTitle && inputSlice.prompt );
		}

		case 'previews': {
			// Previews step requires homepages to be generated
			const sitegenSlice = select( nfdOnboardingStore ).getSiteGenSlice();
			return !! ( sitegenSlice.homepages && Object.keys( sitegenSlice.homepages ).length > 0 );
		}

		case 'design': {
			// Canvas step requires a selected homepage
			const sitegenSlice = select( nfdOnboardingStore ).getSiteGenSlice();
			return !! ( sitegenSlice.selectedHomepage && sitegenSlice.homepages && sitegenSlice.homepages[ sitegenSlice.selectedHomepage ] );
		}

		case 'migration':
			// Migration step is optional and doesn't require specific data
			return true;

		default:
			return true;
	}
};

/**
 * Check if a step should redirect due to missing data
 * @param {string} stepKey - The key of the step to check
 * @return {boolean} - True if should redirect, false otherwise
 */
export const shouldRedirectToFirstStep = ( stepKey ) => {
	// Don't redirect if we're already on the first step
	if ( stepKey === 'fork' ) {
		return false;
	}

	// Check if the step has required data
	return ! hasRequiredDataForStep( stepKey );
};
