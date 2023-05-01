import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __( 'Configure your tax information', 'wp-module-onboarding' ),
		subheading: __(
			'Do you want to enable tax rates and calculations?',
			'wp-module-onboarding'
		),
		options: [
			{
				content: __(
					'Yes, enable tax rates and calculations',
					'wp-module-onboarding'
				),
				value: '1',
				data: {
					wc_connect_taxes_enabled: 'yes',
					woocommerce_calc_taxes: 'yes',
				},
			},
			{
				content: __(
					'I will configure my own tax information later',
					'wp-module-onboarding'
				),
				value: '3',
				data: {
					wc_connect_taxes_enabled: 'no',
					woocommerce_calc_taxes: 'yes',
				},
			},
			{
				content: __(
					"I don't charge sales tax",
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
