import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../utils/locales/translations';

const getContents = () => {
	return {
		heading: sprintf(
			/* translators: %s: site */
			__(
				'Help us tailor this setup to your %s',
				'wp-module-onboarding'
			),
			translations( 'site' )
		),
		subheading: sprintf(
			/* translators: %s: SITE */
			__( 'ABOUT YOUR %s', 'wp-module-onboarding' ),
			translations( 'SITE' )
		),
		question: sprintf(
			/* translators: %s: site */
			__( 'What type of %s is it?', 'wp-module-onboarding' ),
			translations( 'site' )
		),
		buttonText: __( 'Continue Setup', 'wp-module-onboarding' ),
		customInputPlaceholderText: sprintf(
			/* translators: %s: site */
			__( 'Enter to search your %s type', 'wp-module-onboarding' ),
			translations( 'site' )
		),
		customInputLabel: __( 'or tell us here:', 'wp-module-onboarding' ),
		categories: [
			{
				name: __( 'Business', 'wp-module-onboarding' ),
				icon: 'var(--business-icon)',
				iconWhite: 'var(--business-white-icon)',
				subCategories: [
					__(
						'Fashion, apparel and accessories',
						'wp-module-onboarding'
					),
					__( 'Health and beauty', 'wp-module-onboarding' ),
					__( 'Electronics and computers', 'wp-module-onboarding' ),
					__( 'Food and drink', 'wp-module-onboarding' ),
					__(
						'CBD and other hemp-derived products',
						'wp-module-onboarding'
					),
					__( 'Jewelry', 'wp-module-onboarding' ),
					__( 'Pets', 'wp-module-onboarding' ),
					__( 'Motherhood & Baby', 'wp-module-onboarding' ),
					__( 'Furniture & Home Decoration', 'wp-module-onboarding' ),
					__( 'Education & Learning', 'wp-module-onboarding' ),
				],
			},
		],
	};
};

export default getContents;
