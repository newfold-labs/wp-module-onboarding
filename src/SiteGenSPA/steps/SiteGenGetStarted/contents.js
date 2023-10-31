import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'AI Website Creator for wordpress',
			'wp-module-onboarding'
		),
		subheading: __(
			'Tell our engine what kind of site to make',
			'wp-module-onboarding'
		),
	};
};

export default getContents;
