import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../utils/locales/translations';
import { plugins } from '@wordpress/icons';

const getContents = (
	brandName,
	techSupportLink,
	fullServiceCreativeTeamLink
) => {
	return {
		introduction: {
			heading: __( 'Features', 'wp-module-onboarding' ),
			subheading: sprintf(
				/* translators: 1: Brand 2: site or store */
				__(
					`Easy-to-use features from our partner's WordPress Plugins and unique %1$s solutions to put your %2$s to work.`,
					'wp-module-onboarding'
				),
				brandName,
				translations( 'site' )
			),
			icon: plugins,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-site-features-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: sprintf(
						/* translators: %s: site or store */
						__(
							'We’ve assembled the best building blocks for a successful %s',
							'wp-module-onboarding'
						),
						translations( 'site' )
					),
					description: sprintf(
						/* translators: 1: Brand 2: Site or Store 3: Brand */
						__(
							`Put your %1$s %2$s to work for you using features that unlock the potential of WordPress with powerful solutions from %3$s and our partners.`,
							'wp-module-onboarding'
						),
						brandName,
						translations( 'Site' ),
						brandName
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
