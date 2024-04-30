import { __, sprintf } from '@wordpress/i18n';

const getContents = ( brandName ) => {
	return {
		loader: {
			title: sprintf(
				/* translators: %s: Brand */
				__( 'Preparing your %s design studio', 'wp-module-onboarding' ),
				brandName
			),
			subtitle: __(
				'Hang tight while we show you some of the best WordPress has to offer!',
				'wp-module-onboarding'
			),
		},
		errorState: {
			title: sprintf(
				/* translators: %s: Brand */
				__( 'Preparing your %s design studio', 'wp-module-onboarding' ),
				brandName
			),
			subtitle: __(
				'Hang tight while we show you some of the best WordPress has to offer!',
				'wp-module-onboarding'
			),
			error: __(
				'Uh-oh, something went wrong. Please contact support.',
				'wp-module-onboarding'
			),
		},
	};
};

export default getContents;
