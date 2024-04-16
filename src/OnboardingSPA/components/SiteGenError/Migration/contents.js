import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
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
	};
};

export default getContents;
