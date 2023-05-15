import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../utils/locales/translations';

const getContents = () => {
	return {
		defaultTitle: sprintf(
			/* translators: %s: Site */
			__( 'WordPress %s', 'wp-module-onboarding' ),
			translations( 'Site' )
		),
		defaultDesc: sprintf(
			/* translators: %s: Site */
			__( 'Just another WordPress %s', 'wp-module-onboarding' ),
			translations( 'Site' )
		),
		defaultUrl: 'https://bluehost.com',
	};
};

export default getContents;
