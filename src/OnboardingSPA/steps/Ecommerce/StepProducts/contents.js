import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __( 'Tell us about your products', 'wp-module-onboarding' ),
		subheading: __(
			'What type of products will you be selling?',
			'wp-module-onboarding'
		),
		question: __(
			'How many products will you be selling?',
			'wp-module-onboarding'
		),
		typeOptions: [
			{
				content: __( 'Physical products', 'wp-module-onboarding' ),
				value: 'physical',
			},
			{
				content: __(
					'Digital / Downloadable products',
					'wp-module-onboarding'
				),
				value: 'downloads',
			},
			{
				content: __( 'Subscriptions', 'wp-module-onboarding' ),
				value: 'subscriptions',
			},
			{
				content: __(
					'Book rooms, houses or rent products',
					'wp-module-onboarding'
				),
				value: 'bookings',
			},
			{
				content: __( 'Membership', 'wp-module-onboarding' ),
				value: 'memberships',
			},
			{
				content: __( 'Customizable products', 'wp-module-onboarding' ),
				value: 'product-add-ons',
			},
			{
				content: __( 'Bundles of products', 'wp-module-onboarding' ),
				value: 'product-bundles',
			},
			{
				content: __(
					'Let your users ask a quote for your products',
					'wp-module-onboarding'
				),
				value: 'product-quotes',
			},
		],
		numberOptions: [
			{
				content: __( '0', 'wp-module-onboarding' ),
				value: '0',
			},
			{
				content: __( '1 - 10', 'wp-module-onboarding' ),
				value: '1-10',
			},
			{
				content: __( '11 - 100', 'wp-module-onboarding' ),
				value: '11-100',
			},
			{
				content: __( '101 - 1000', 'wp-module-onboarding' ),
				value: '101-1000',
			},
			{
				content: __( '1000 +', 'wp-module-onboarding' ),
				value: '1000+',
			},
		],
		buttonText: __( 'Continue Setup', 'wp-module-onboarding' ),
	};
};

export default getContents;
