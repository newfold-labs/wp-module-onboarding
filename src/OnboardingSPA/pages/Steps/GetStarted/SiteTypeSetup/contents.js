import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../utils/locales/translations';

const getContents = () => {
	return {
		heading: sprintf(
			/* translators: %s: site */
			__(
				'Help us tailor this setup to your %s',
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		subheading: sprintf(
			/* translators: %s: SITE */
			__( 'ABOUT YOUR %s', 'wp-module-onboarding' ),
			translations( 'SITE' )
		),
		question: sprintf(
			/* translators: %s: site */
			__( 'What type of %s is it?', 'wp-module-onboarding' ),
			translations( 'site' )
		),
		buttonText: __( 'Continue Setup', 'wp-module-onboarding' ),
		customInputPlaceholderText: sprintf(
			/* translators: %s: site */
			__( 'Enter to search your %s type', 'wp-module-onboarding' ),
			translations( 'site' )
		),
		customInputLabel: __( 'or tell us here:', 'wp-module-onboarding' ),
	};
};

export default getContents;
