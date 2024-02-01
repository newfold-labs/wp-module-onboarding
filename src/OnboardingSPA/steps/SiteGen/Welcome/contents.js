import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __( 'Website Creator for WordPress', 'wp-module-onboarding' ),
		subHeading: __(
			'Tell our AI engine what kind of site you want to make and let it handle the content and design for you',
			'wp-module-onboarding'
		),
		buttonText: __( 'Get Started', 'wp-module-onboarding' ),
	};
};

export default getContents;
