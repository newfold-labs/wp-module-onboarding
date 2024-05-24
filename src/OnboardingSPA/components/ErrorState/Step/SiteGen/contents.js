// WordPress
import { __ } from '@wordpress/i18n';

const getContents = ( type ) => {
	const content = {
		siteGenErrorContent: {
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
		},
		siteMigrationErrorContent: {
			heading: __(
				"Sorry, we're having trouble starting the site transfer process.",
				'wp-module-onboarding'
			),
			subHeading: __(
				'Do you keep getting this error?',
				'wp-module-onboarding'
			),
			message: __(
				'If you continue to get this error, please contact our support team at 1-888-401-4678.',
				'wp-module-onboarding'
			),
			buttonText: __( 'Try again', 'wp-module-onboarding' ),
			buttonExit: __( 'Go back', 'wp-module-onboarding' ),
		},
	};

	return content[ type ] || {};
};

export default getContents;
