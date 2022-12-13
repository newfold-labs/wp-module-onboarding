import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../../utils/locales/translations';
import { store } from '@wordpress/icons';

const getContents = ( brandName, techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'Street Address', 'wp-module-onboarding' ),
			subheading: __(
				'Whether this is where the magic happens or the mail goes, tell us where your business is located.'
			),
			icon: store,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-ecommerce-address-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Whether it’s a storefront or a PO Box, we’re proud to help you connect your real-world and online businesses',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: 1: Brand 2: Site */
						__(
							`We use this address to setup WooCommerce, your payment provider, Contact Page and more so you can start stocking the shelves of your %s Online %s.`,
							'wp-module-onboarding'
						),
						brandName,
						translations( 'Site' )
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
				link: fullServiceCreativeTeamLink,
			},
			support: {
				text: __( 'Technical Support', 'wp-module-onboarding' ),
				link: techSupportLink,
			},
		},
	};
};

export default getContents;
