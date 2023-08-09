import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../utils/locales/translations';
import { typography } from '@wordpress/icons';

const getContents = ( techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'Typography', 'wp-module-onboarding' ),
			subheading: __(
				`Give tone and taste to your words using a curated set of great type treatments.`,
				'wp-module-onboarding'
			),
			icon: typography,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-design-typography-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Not just what we say, how we say it',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: %s: site */
						__(
							`Fonts help our ideas look creative and compelling, astute and articulate, refined and regal, modern and much more. Great font combinations help set the perfect tone for your %s and your story jump off the screen.`,
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
