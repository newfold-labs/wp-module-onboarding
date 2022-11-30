import { __, sprintf } from '@wordpress/i18n';
import { translations } from '../../../utils/locales/translations';

const getContents = ( brandName ) => {
	return {
		loader: {
			title: sprintf(
				/* translators: 1: Brand 2: Site */
				__(
					`Making the keys to your %s Online %s`,
					'wp-module-onboarding'
				),
				brandName,
				translations( 'Site' )
			),
			subtitle: __(
				'We’re installing WooCommerce for you to fill with your amazing products & services!',
				'wp-module-onboarding'
			),
		},
		errorState: {
			title: sprintf(
				/* translators: 1: Brand 2: Site */
				__(
					`Making the keys to your %s Online %s`,
					'wp-module-onboarding'
				),
				brandName,
				translations( 'Site' )
			),
			subtitle: __(
				'We’re installing WooCommerce for you to fill with your amazing products & services!',
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
