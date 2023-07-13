import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		subheading: __(
			'Pick a starter layout you can refine and remix with your content',
			'wp-module-onboarding'
		),
		description: __(
			'A well-organized homepage makes visitors feel smart.',
			'wp-module-onboarding'
		)
	};
};

export default getContents;