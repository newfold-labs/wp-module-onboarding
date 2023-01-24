import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../utils/locales/translations';
import { info } from '@wordpress/icons';

const getContents = ( brandName, techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'Basic Info', 'wp-module-onboarding' ),
			subheading: sprintf(
				/* translators: %s: site */
				__(
					`Setup how your %s will present in visitors' browsers and search results.`,
					'wp-module-onboarding'
				),
				translations( 'site' )
			),
			icon: info,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-basic-info-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Present in tip-top shape to web browsers and search engine results',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: 1: Brand 2: Site */
						__(
							`Loading your site details, logo and social graph helps not just launch your site but have it found looking great in feeds.`,
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
