import { __, sprintf } from '@wordpress/i18n';

const getContents = ( characterCount ) => {
	return {
		characterCount: sprintf(
			/* translators: 1: characterCount */
			__( '%d Characters left', 'wp-module-onboarding' ),
			characterCount
		),
	};
};

export default getContents;
