import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __( 'Presto, here are 3 versions', 'wp-module-onboarding' ),
		subheading: __(
			"We've created 3 unique website designs for you to start with, preview click around or start over.",
			'wp-module-onboarding'
		),
		favouriteNote: __(
			'Favorite a generated version to find and use again in the future.',
			'wp-module-onboarding'
		),
		generating: __( 'Generating Site', 'wp-module-onboarding' ),
		regenerating: __( 'Regenerating Site', 'wp-module-onboarding' ),
	};
};

export default getContents;
