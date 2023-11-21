import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'Do you want to include any content from Facebook?',
			'wp-module-onboarding'
		),
		facebookTitle: __(
			'Connect a Facebook Account',
			'wp-module-onboarding'
		),
		facebookDesc: __(
			'By connecting a Facebook profile, we can fetch relevant data to increase the accuracy of your Al generated site.',
			'wp-module-onboarding'
		),
		facebookButton: __( 'Connect Facebook', 'wp-module-onboarding' ),
		buttons: {
			skip: __( 'Skip for now', 'wp-module-onboarding' ),
		},
	};
};

export default getContents;
