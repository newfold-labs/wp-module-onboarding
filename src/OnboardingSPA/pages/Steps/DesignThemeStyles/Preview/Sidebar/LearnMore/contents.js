import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../../utils/locales/translations';
import { brush } from '@wordpress/icons';

const getContents = ( brandName, techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'Theme Styles', 'wp-module-onboarding' ),
			subheading: __(
				`Professionally-designed website templates ready for their public debut featuring your great ideas.`,
				'wp-module-onboarding'
			),
			icon: brush,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-design-theme-styles-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Show the web you have style with modern colors and elevated fonts',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: 1: Brand 2: Site */
						__(
							`Pick one of these professionally-designed website styles to start your %s %s.`,
							'wp-module-onboarding'
						),
						brandName,
						translations( 'site' )
					),
				},
				{
					description: sprintf(
						/* translators: %s: website */
						__(
							'In the next steps and in the future, you can change the specific colors and fonts to fit your aesthetic vision for your %s.',
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
