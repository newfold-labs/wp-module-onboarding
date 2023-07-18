import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../utils/locales/translations';
import { header } from '@wordpress/icons';

const getContents = ( techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'Header & Menu', 'wp-module-onboarding' ),
			subheading: sprintf(
				/* translators: %s: site */
				__(
					`Surface key content in your %s -- who you are, what your about and where to find things.`,
					'wp-module-onboarding'
				),
				translations( 'site' )
			),
			icon: header,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-design-header-menu-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Putting your best foot forward',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: 1: site 2: Site */
						__(
							`Just like a %1$s putting a map of departments at the front door, a great %2$s Header & Menu help point visitors at the places you most want them to visit.`,
							'wp-module-onboarding'
						),
						translations( 'site' ),
						translations( 'Site' )
					),
				},
				{
					description: sprintf(
						/* translators: %s: website */
						__(
							'When picking a %s header, consider the number of menu items, character length of each item and how those will visually impact the Header Pattern design you choose.',
							'wp-module-onboarding'
						),
						translations( 'website' )
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
