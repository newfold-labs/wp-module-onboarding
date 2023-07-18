import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'Confirm your business or store address',
			'wp-module-onboarding'
		),
		subheading: __(
			'We’ll use this information to help you setup your online store',
			'wp-module-onboarding'
		),
		countryInputLabel: __(
			'Where is your store based?',
			'wp-module-onboarding'
		),
		addressInputLabel: __( 'Address', 'wp-module-onboarding' ),
		cityInputLabel: __( 'City', 'wp-module-onboarding' ),
		stateInputLabel: __( 'State', 'wp-module-onboarding' ),
		postalCodeInputLabel: __( 'Postal Code', 'wp-module-onboarding' ),
		emailInputLabel: __( 'Email', 'wp-module-onboarding' ),
		currencyInputLabel: __(
			'What currency do you want to display in your store?',
			'wp-module-onboarding'
		),
		requiredText: __( '* required', 'wp-module-onboarding' ),
		buttonText: __( 'Continue Setup', 'wp-module-onboarding' ),
	};
};

export default getContents;
