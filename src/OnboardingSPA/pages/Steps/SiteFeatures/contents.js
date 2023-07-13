import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		subheading: __(
			'Our toolbox of Plugins & Services is your toolbox.',
			'wp-module-onboarding'
		),
		description: __(
			"Through Plugins, partners and unique $BRAND WordPress features, you've got tons of capabilities with $SITE.",
			'wp-module-onboarding'
		),
	};
};

export default getContents;