import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __( 'Sorry, we\'re having trouble communicating with our AI service.', 'wp-module-onboarding' ),
		subHeading: __(
			'Do you keep getting this error?',
			'wp-module-onboarding'
		),
		message: __(
			'If you continue to get this error, you may either continue creating your site without using our AI assistant, or you can exit directly to WordPress',
			'wp-module-onboarding'
		),
		buttonText: __( 'Try again', 'wp-module-onboarding' ),
	};
};

export default getContents;
