import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../../utils/locales/translations';
import { home } from '@wordpress/icons';

const getContents = ( techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'WordPress Experience', 'wp-module-onboarding' ),
			subheading: __(
				`We want to offer the best default settings and guidance for someone with your WordPress experience.`,
				'wp-module-onboarding'
			),
			icon: home,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-get-started-wp-experience-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __( 'Why we ask', 'wp-module-onboarding' ),
					description: sprintf(
						/* translators: %s: site */
						__(
							`We want to help everyone get the most out of their WordPress %s and this setup, so we use this to help optimize for a great experience and periodically when we offer tips, reminders and recommendations.`,
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
