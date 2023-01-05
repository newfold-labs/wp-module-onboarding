import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../utils/locales/translations';
import { copy } from '@wordpress/icons';

const getContents = ( techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'Pages', 'wp-module-onboarding' ),
			subheading: sprintf(
				/* translators: %s: site */
				__(
					`Use professionally-designed templates for common site pages to assemble a beautiful, high-quality %s.`,
					'wp-module-onboarding'
				),
				translations( 'site' )
			),
			icon: copy,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-pages-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Rapidly deliver ideas with templates primed for your content',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: 1: site 2: site */
						__(
							`We’ve baked everything we know about making great designs and content for common %s needs into ease-to-use templates. Pick templates and we’ll add them as Page drafts to your WordPress %s.`,
							'wp-module-onboarding'
						),
						translations( 'site' ),
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
