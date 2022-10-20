import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../../utils/locales/translations';
import { box } from '@wordpress/icons';

const getContents = ( brandName ) => {
	return {
		introduction: {
			heading: __( 'Products Info', 'wp-module-onboarding' ),
			subheading: __(
				'Whether you call it a menu, catalog, portfolio or project, we’d love to hear more about your offerings.'
			),
			icon: box,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-ecommerce-products-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Go from multiple sizes to multiple locations to multiple online channels',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: 1: Brand 2: Website */
						__(
							`Tell us a little about how and what you’re planning to sell and we’ll bring the power of WooCommerce and unique %s %s solutions to elevate your business and enhance your capabilities.`,
							'wp-module-onboarding'
						),
						brandName,
						translations( 'site' )
					),
				},
			],
		},
		help: {
			fullService: {
				text: __(
					'Hire Our Full-Service Creative Studio',
					'wp-module-onboarding'
				),
				link: '#',
			},
			support: {
				text: __( 'Technical Support', 'wp-module-onboarding' ),
				link: '#',
			},
		},
	};
};

export default getContents;
