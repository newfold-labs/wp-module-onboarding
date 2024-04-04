import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			"Let's migrate your existing site to your new account",
			'wp-module-onboarding'
		),
		description: __(
			'Please wait a few seconds while we get your new account ready to import your existing WordPress site. ',
			'wp-module-onboarding'
		),
		importtext: __( 'Preparing your account', 'wp-module-onboarding' ),
	};
};

export default getContents;
