import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'There’s no place like a great home page',
			'wp-module-onboarding'
		),
		subheading: __(
			'Pick a starter layout you can refine and remix with your content',
			'wp-module-onboarding'
		),
	};
};

export default getContents;
