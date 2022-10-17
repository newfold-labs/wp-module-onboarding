import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../../../utils/locales/translations';
import { home } from '@wordpress/icons';

const getContents = () => {
	return {
		heading: sprintf(
			/* translators: %s: Site */
			__( '%s Type', 'wp-module-onboarding' ),
			translations( 'Site' )
		),
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
			icon: 'nfd-onboarding-sidebar-learn-more-get-started-site-type-illustration',
		},
		headingWithDescriptions: [
			{
				heading: sprintf(
					/* translators: %s: site */
					__( 'Why we ask what type of %s', 'wp-module-onboarding' ),
					translations( 'site' )
				),
				description: sprintf(
					/* translators: %s: site */
					__(
						`We use this to chose the templates, features and best configuration. You’re always in full control of your WordPress %s and we try to understand your needs so we can help you be successful.`,
						'wp-module-onboarding'
					),
					translations( 'site' )
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
