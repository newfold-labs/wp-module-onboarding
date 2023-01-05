import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../utils/locales/translations';
import { home } from '@wordpress/icons';

const getContents = ( techSupportLink, fullServiceCreativeTeamLink ) => {	
	return {
		introduction: {
			heading: __( 'Home Page', 'wp-module-onboarding' ),
			subheading: __(
				`The home page is where you tell visitors your story. It helps users find what they came for.`,
				'wp-module-onboarding'
			),
			icon: home,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-design-homepage-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Welcome to your new home online',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: %s: site */
						__(
							`Like good curb appeal, a great home page design helps get users excited about your %s. Mixing media, headings, text and more, you can bring your ideas to live and your products & services to the forefront for visitors.`,
							'wp-module-onboarding'
						),
						translations( 'site' )
					),
				},
				{
					description: __(
						'Look for a Home Page Pattern design you think will help organize and elevate your ideas.',
						'wp-module-onboarding'
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
