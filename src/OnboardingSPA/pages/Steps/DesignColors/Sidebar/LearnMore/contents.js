import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../utils/locales/translations';
import { color } from '@wordpress/icons';

const getContents = ( techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'Colors', 'wp-module-onboarding' ),
			subheading: sprintf(
				/* translators: %s: site */
				__(
					`Whether your brand is vibrant, understated, elegant or edgy use color to delight your %s visitors.`,
					'wp-module-onboarding'
				),
				translations( 'site' )
			),
			icon: color,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-design-colors-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Let a splash of color make a splash with your visitors with your Global Site Colors.',
						'wp-module-onboarding'
					),
					description: __(
						`We had our designers mix up some palettes for striking websites for you to chose additional presets, or you can chose your own colors using the color pickers.`,
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
