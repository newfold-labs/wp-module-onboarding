import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'Tell me some details about the site you want created?',
			'wp-module-onboarding'
		),
		inputPlaceholder: __(
			'Bean There Café - A cozy, sustainable coffee shop in Asheville, North Carolina, focused on fair-trade coffee and local pastries. Their site will feature their menu, special events, and a blog on coffee culture.',
			'wp-module-onboarding'
		),
		inputHint: __(
			"Who is this site for? What's the ideal design?",
			'wp-module-onboarding'
		),
		buttonText: __( 'Next', 'wp-module-onboarding' ),
		walkThroughText: __(
			'Not sure what to say? We can walk you through it.',
			'wp-module-onboarding'
		),
		walkThroughlink: __( 'click here', 'wp-module-onboarding' ),
	};
};

export default getContents;
