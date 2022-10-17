import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../../utils/locales/translations';
import { home } from '@wordpress/icons';

const getContents = () => {
	return {
		heading: __( 'WordPress Experience', 'wp-module-onboarding' ),
		subheading: sprintf(
			/* translators: %s: site */
			__(
				`Help us give you the best experience by telling us a little about your %s and your needs.`,
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		icon: home,
		illustration: {
			icon: 'nfd-onboarding-sidebar-learn-more-get-started-wp-experience-illustration',
		},
		headingWithDescriptions: [
			{
				heading: __(
					'Why we ask about your experience',
					'wp-module-onboarding'
				),
				description: __(
					`We use this to help offer the best WordPress configuration, streamline this setup and to suggest the best choices for you.`,
					'wp-module-onboarding'
				),
			},
		],
		fullService: {
			text: __(
				'Hire Our Full-Service Creative Studio',
				'wp-module-onboarding'
			),
		},
		support: {
			text: __( 'Technical Support', 'wp-module-onboarding' ),
		},
	};
};

export default getContents;
