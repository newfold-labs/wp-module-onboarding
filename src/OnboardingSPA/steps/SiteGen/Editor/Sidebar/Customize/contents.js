import { __ } from '@wordpress/i18n';

const getContents = ( techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'Colors', 'wp-module-onboarding' )
		}
	};
};

export default getContents;
