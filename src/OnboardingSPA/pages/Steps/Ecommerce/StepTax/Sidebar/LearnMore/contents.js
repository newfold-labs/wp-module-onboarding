import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../../utils/locales/translations';
import { institution } from '@wordpress/icons';

const getContents = (
	brandName,
	techSupportLink,
	fullServiceCreativeTeamLink
) => {
	return {
		introduction: {
			heading: __( 'Tax Info', 'wp-module-onboarding' ),
			subheading: sprintf(
				/* translators: 1: Site 2: Brand 3: Site */
				__( 'A %s that does taxes in one click. That’s pretty novel.' ),
				translations( 'site' ),
				brandName,
				translations( 'Site' )
			),
			icon: institution,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-ecommerce-tax-info-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Let us crunch the tax rates and receipts, while you expand the business and the boldness',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: %s: Site */
						__(
							`We can take the frustration out of calculating taxes for purchases your visitors make! Let us auto-calculate taxes and worry about the math, you focus on your %s’s mission.`,
							'wp-module-onboarding'
						),
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
