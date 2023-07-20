import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __( 'Error 404', 'wp-module-onboarding' ),
		subheading: __( 'Please Check Again!', 'wp-module-onboarding' ),
	};
};

export default getContents;
