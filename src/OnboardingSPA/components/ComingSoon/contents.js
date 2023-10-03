import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../utils/locales/translations';

const getContents = () => {
	return {
		title: __( 'Coming Soon', 'wp-module-onboarding' ),
		subtitle: sprintf(
			/* translators: %s: site or store */
			__(
				'Keep your %s private until you click launch',
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		desc: sprintf(
			/* translators: %s: site or store */
			__(
				'Keep your %s private until you click launch',
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
	};
};

export default getContents;
