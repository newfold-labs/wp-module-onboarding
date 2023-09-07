import { __, sprintf } from '@wordpress/i18n';
import { translations } from '../../../../utils/locales/translations';

const getContents = ( brandName ) => {
	return {
		heading: __(
			'A great foundation to build from',
			'wp-module-onboarding'
		),
		subheading: sprintf(
			/* translators: Brand */
			__( 'with WordPress and %s', 'wp-module-onboarding' ),
			brandName
		),
		content: {
			heading: sprintf(
				/* translators: site or store */
				__(
					'Would you like to enter your WordPress Dashboard or continue setting up your %s',
					'wp-module-onboarding'
				),
				translations( 'site' )
			),
			question1: __(
				"You've made great progress! Would you like to keep going with the setup or take it from here?",
				'wp-module-onboarding'
			),
			question2: sprintf(
				/* translators: Brand */
				__(
					'You can continue from your %s home page in the Next steps list.',
					'wp-module-onboarding'
				),
				brandName
			),
			redirectMessage: __(
				'Taking you to WordPress in…',
				'wp-module-onboarding'
			),
		},
		buttons: {
			button1: {
				text: __( 'Enter WordPress', 'wp-module-onboarding' ),
			},
			button2: {
				text: __( 'Continue Setup', 'wp-module-onboarding' ),
			},
		},
	};
};

export default getContents;
