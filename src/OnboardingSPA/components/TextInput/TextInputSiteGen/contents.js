import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		characterCount: __( 'Characters left', 'wp-module-onboarding' ),
	};
};

export default getContents;
