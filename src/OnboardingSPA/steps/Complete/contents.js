import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../utils/locales/translations';

const getContents = ( brandName ) => {
	return {
		loader: {
			title: sprintf(
				/* translators: 1: Brand 2: site or store */
				__(
					'Hang tight, we’re building your %1$s %2$s',
					'wp-module-onboarding'
				),
				<div
					style={ {
						width: '36px',
						height: '36px',
						backgroundImage: 'var(--nfd-onboarding-icon)',
						backgroundSize: 'contain',
					} }
				/>,
				translations( 'site' )
			),
			subtitle: __(
				'We’re assembling your unique design and installing useful tools',
				'wp-module-onboarding'
			),
		},
		errorState: {
			title: sprintf(
				/* translators: 1: Brand 2: site or store */
				__(
					'Hang tight, we’re building your %1$s %2$s',
					'wp-module-onboarding'
				),
				brandName,
				translations( 'site' )
			),
			subtitle: __(
				'We’re assembling your unique design and installing useful tools',
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
