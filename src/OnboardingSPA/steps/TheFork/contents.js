import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __( 'Welcome to WordPress', 'wp-module-onboarding' ),
		subheading: __( 'powered by ', 'wp-module-onboarding' ),
		questionnaire: __(
			'Where would you like to start?',
			'wp-module-onboarding'
		),
		optionsself: {
			title: __( 'Build it myself', 'wp-module-onboarding' ),
			subtitle: __(
				"We'll stay out of your way.",
				'wp-module-onboarding'
			),
		},
		optionsai: {
			title: __( ' Website Creator', 'wp-module-onboarding' ),
			subtitle: __(
				'Custom Al generated content & design.',
				'wp-module-onboarding'
			),
		},
		optionspro: {
			title: __( 'Hire a Pro', 'wp-module-onboarding' ),
			subtitle: __(
				'Leave it to our WordPress experts.',
				'wp-module-onboarding'
			),
		},
		importtext: __(
			'Already have a WordPress site you want to import?',
			'wp-module-onboarding'
		),
		importlink: __( 'http://www.google.com', 'wp-module-onboarding' ),
	};
};

export default getContents;
