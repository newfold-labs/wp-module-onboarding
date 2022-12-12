import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../utils/locales/translations';
import { info } from '@wordpress/icons';

const getContents = ( brandName, techSupportLink, fullServiceCreativeTeamLink ) => {
	return {
		introduction: {
			heading: __( 'Basic Info', 'wp-module-onboarding' ),
			subheading: sprintf(
				/* translators: %s: site */
				__(
					`Setup how your %s will present to the public, search engines and visitors’ web browsers.`,
					'wp-module-onboarding'
				),
				translations( 'site' )
			),
			icon: info,
		},
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-basic-info-illustration',
		},
		information: {
			headingWithDescriptions: [
				{
					heading: __(
						'Present in tip-top shape to web browsers and search engine results',
						'wp-module-onboarding'
					),
					description: sprintf(
						/* translators: 1: Brand 2: Site */
						__(
							`Enter the best way for WordPress, web browsers and search engines to identify your %s %s by entering your Title, Description and Logo.`,
							'wp-module-onboarding'
						),
						brandName,
						translations( 'Site' )
					),
				},
				{
					description: sprintf(
						/* translators: %s: website */
						__(
							'Tell us your social media accounts, and we’ll make sure visitors can find them and tell search engines these accounts are related to this %s.',
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
