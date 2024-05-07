import { __, sprintf } from '@wordpress/i18n';

const getContents = ( currentBrandName ) => {
	return {
		heading: sprintf(
			/* translators: %s: to replace Brand name */
			__(
				"Let's migrate your existing site to %s",
				'wp-module-onboarding'
			),
			currentBrandName
		),
		description: __(
			'Please wait a few seconds while we get your new account ready to import your existing WordPress site. ',
			'wp-module-onboarding'
		),
		importText: __( 'Preparing your account', 'wp-module-onboarding' ),
	};
};

export default getContents;
