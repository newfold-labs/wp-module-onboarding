import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'You have ideas, we have page templates',
			'wp-module-onboarding'
		),
		subheading: __(
			'Begin closer to the finish line than a blank canvas.',
			'wp-module-onboarding'
		),
	};
};

export default getContents;
