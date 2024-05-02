import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../utils/locales/translations';

const getContents = () => {
	return {
		heading: __( 'Preview', 'wp-module-onboarding' ),
		defaultTitle: sprintf(
			/* translators: %s: Site or Store */
			__( 'WordPress %s', 'wp-module-onboarding' ),
			translations( 'Site' )
		),
		defaultDesc: sprintf(
			/* translators: %s: Site */
			__( 'Just another WordPress %s', 'wp-module-onboarding' ),
			translations( 'Site' )
		),
	};
};

export default getContents;
