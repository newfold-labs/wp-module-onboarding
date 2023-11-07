import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'Tell me some details about the site you want created?',
			'wp-module-onboarding'
		),
		inputPlaceholder: __(
			'I want a site for my company that sells…',
			'wp-module-onboarding'
		),
		inputHint: __( 'The more detail the better', 'wp-module-onboarding' ),
	};
};

export default getContents;
