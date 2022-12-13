import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../../../utils/locales/translations';
import { home } from '@wordpress/icons';

const getContents = () => {
	return {
		introduction: {
			heading: sprintf(
				/* translators: %s: Site */
				__( '%s Type', 'wp-module-onboarding' ),
				translations( 'Site' )
			),
			subheading: sprintf(
				/* translators: %s: site */
				__(
					`We can provide better suggestions if we know what kind of %s this is`,
					'wp-module-onboarding'
				),
				translations( 'site' )
			),
			icon: home,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-get-started-site-type-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: sprintf(
						/* translators: %s: site */
						__(
							'Why we ask what type of %s',
							'wp-module-onboarding'
						),
						translations( 'site' )
					),
					description: sprintf(
						/* translators: %s: site */
						__(
							`We chose the templates, features and best configuration we can for sites. You’re always in full control of your WordPress %s and we ask so we can be a good website partner.`,
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
				link: '#',
			},
			support: {
				text: __( 'Technical Support', 'wp-module-onboarding' ),
				link: '#',
			},
		},
	};
};

export default getContents;
