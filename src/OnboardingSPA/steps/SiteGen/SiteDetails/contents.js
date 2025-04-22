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
		languageList: [
			[ __('English (US)', 'wp-module-onboarding'), 'en-US' ],
			[ __('English (UK)', 'wp-module-onboarding'), 'en-UK' ],
			[ __('Spanish', 'wp-module-onboarding'), 'es-ES' ],
			[ __('French', 'wp-module-onboarding'), 'fr-FR' ],
			[ __('Hindi', 'wp-module-onboarding'), 'hi-IN' ],
		],
		languageSelectionLabel: __( 'Choose your preferred site language:', 'wp-module-onboarding' )
	};
};

export default getContents;
