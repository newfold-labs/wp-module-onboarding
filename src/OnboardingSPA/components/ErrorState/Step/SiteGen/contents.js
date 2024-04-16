// WordPress
import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			"Sorry, we're having trouble communicating with our AI service.",
			'wp-module-onboarding'
		),
		subHeading: __(
			'Do you keep getting this error?',
			'wp-module-onboarding'
		),
		message: __(
			'If you continue to get this error, you may either continue creating your site without using our AI assistant, or you can ',
			'wp-module-onboarding'
		),
		buttonText: __( 'Try again', 'wp-module-onboarding' ),
		buttonSkip: __( 'Continue without AI', 'wp-module-onboarding' ),
		buttonExit: __( 'exit to WordPress', 'wp-module-onboarding' ),
		migrationHeading: __(
			"Sorry, we're having trouble starting the site transfer process.",
			'wp-module-onboarding'
		),
	};
};

export default getContents;
