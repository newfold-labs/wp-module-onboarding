import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../utils/locales/translations';
import { moveTo } from '@wordpress/icons';

const getContents = ( brandName, techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'What’s Next', 'wp-module-onboarding' ),
			subheading: sprintf(
				/* translators: 1: website 2: website */
				__(
					`The beginning of your %s journey is complete. We’re here to support your next steps and %s goals!`,
					'wp-module-onboarding'
				),
				translations( 'website' ),
				translations( 'website' )
			),
			icon: moveTo,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-what-next-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Add, adjust and launch!',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: 1: site 2: Brand 3: site */
						__(
							`Now that you’ve setup the basics, use WordPress to edit your pages, %s design and explore the unlimited destinations you can chart for your %s %s.`,
							'wp-module-onboarding'
						),
						translations( 'site' ),
						brandName,
						translations( 'site' )
					),
				},
				{
					description: sprintf(
						/* translators: %s: website */
						__(
							'Our support team, %s experts and professional designers are always just a chat or call away if you ever need directions.',
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
