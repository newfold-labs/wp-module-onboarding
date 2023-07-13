import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		subheading: __(
			'Begin closer to the finish line than a blank canvas.',
			'wp-module-onboarding'
		),
		description: __(
			"Pick a page, pick a layout and we'll focus on the basics so you focus on what's important and unique.",
			'wp-module-onboarding'
		),
	};
};

export default getContents;