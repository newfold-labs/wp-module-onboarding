import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __( 'Configure your tax information', 'wp-module-onboarding' ),
		subheading: __(
			'Would you like to enable sales tax?',
			'wp-module-onboarding'
		),
		options: [
			{
				content: __( 'Yes, enable sales tax.', 'wp-module-onboarding' ),
				value: '1',
				data: {
					wc_connect_taxes_enabled: 'yes',
					woocommerce_calc_taxes: 'yes',
				},
			},
			{
				content: __(
					"No, don't enable sales tax.",
					'wp-module-onboarding'
				),
				value: '5',
				data: {
					woocommerce_no_sales_tax: true,
					woocommerce_calc_taxes: 'no',
					wc_connect_taxes_enabled: 'no',
				},
			},
		],
		buttonText: __( 'Continue Setup', 'wp-module-onboarding' ),
	};
};

export default getContents;
