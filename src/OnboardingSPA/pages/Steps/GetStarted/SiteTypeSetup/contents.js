import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../utils/locales/translations';

const getContents = () => {
	return {
		cardHeading: __(
			'Help us tailor this setup to your site',
			'wp-module-onboarding'
		),
		subHeading: sprintf(
			/* translators: 1: site */
			__( 'ABOUT YOUR %s', 'wp-module-onboarding' ),
			translations( 'SITE' )
		),
		question: sprintf(
			/* translators: 1: site */
			__( 'What type of %s is it?', 'wp-module-onboarding' ),
			translations( 'site' )
		),
		buttonText: __( 'Continue Setup', 'wp-module-onboarding' ),
		placeholderSiteTypeInput: sprintf(
			/* translators: 1: site */
			__( 'Enter to search your %s type', 'wp-module-onboarding' ),
			translations( 'site' )
		),
		tellusHereText: __( 'or tell us here:', 'wp-module-onboarding' ),
	};
};

export default getContents;
