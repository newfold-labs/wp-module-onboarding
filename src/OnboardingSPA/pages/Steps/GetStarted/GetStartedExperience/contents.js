import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../utils/locales/translations';

const getContents = () => {
	return {
		heading: sprintf(
			/* translators: %s: website or store */
			__(
				'Help us tailor this setup to your %s',
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		subheading: __( 'ABOUT YOU', 'wp-module-onboarding' ),
		question: __(
			'What is your experience with WordPress?',
			'wp-module-onboarding'
		),
		buttonText: __( 'Continue Setup', 'wp-module-onboarding' ),
		options: [
			{
				label: __( 'Never used it', 'wp-module-onboarding' ),
				slug: 'novice',
				value: '1',
			},
			{
				label: __( 'Used it some', 'wp-module-onboarding' ),
				slug: 'intermediate',
				value: '3',
			},
			{
				label: __( "I'm an expert", 'wp-module-onboarding' ),
				slug: 'expert',
				value: '5',
			},
		],
	};
};

export default getContents;
