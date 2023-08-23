import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../../utils/locales/translations';
import { home } from '@wordpress/icons';

const getContents = ( brandName, expertsLink, techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'Start Setup', 'wp-module-onboarding' ),
			subheading: sprintf(
				/* translators: 1: Brand 2: website or store */
				__(
					`Lay the foundation for a successful %1$s %2$s using our WordPress Onboarding. `,
					'wp-module-onboarding'
				),
				brandName,
				translations( 'website' )
			),
			icon: home,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-get-started-welcome-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: sprintf(
						/* translators: %s: website or store */
						__(
							'WordPress is free %s software',
							'wp-module-onboarding'
						),
						translations( 'website' )
					),
					description: sprintf(
						/* translators: 1: website or store 2: website or store */
						__(
							`When you set up this new WordPress %1$s, you’re joining millions of website owners who publish their %2$s using the free, community-built software project we’re proud to support.`,
							'wp-module-onboarding'
						),
						translations( 'website' ),
						translations( 'website' ),
						translations( 'website' )
					),
				},
				{
					heading: sprintf(
						/* translators: 1: Brand 2: website or store */
						__( '%1$s is your %2$s partner', 'wp-module-onboarding' ),
						brandName,
						translations( 'website' )
					),
					description: sprintf(
						/* translators: 1: website or store 2: Brand 3. site or store */
						__(
							`A WordPress %1$s hosted by %2$s has tons of unique and proven solutions to help you get farther, faster with your WordPress. We put our expertise, partnerships and solutions to work on your %3$s.`,
							'wp-module-onboarding'
						),
						translations( 'website' ),
						brandName,
						translations( 'site' )
					),
				},
			],
		},
		help: {
			experts: {
				text: __(
					'1-1 Expert Solutions & Coaching',
					'wp-module-onboarding'
				),
				link: expertsLink,
			},
			fullService: {
				text: __(
					'Hire Our Full-Service Creative Team',
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
