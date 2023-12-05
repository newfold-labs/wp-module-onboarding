import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'Tell me some details about the site you want created?',
			'wp-module-onboarding'
		),
		inputPlaceholder: __(
			'I want a site for my company that sells…',
			'wp-module-onboarding'
		),
		inputHint: __( 'The more detail the better', 'wp-module-onboarding' ),
		buttonText: __( 'Next', 'wp-module-onboarding' ),
		walkThroughText: __(
			'Not sure what to say? We can walk you through it.',
			'wp-module-onboarding'
		),
		businessName: __(
			'1. Do you have a business name or website title?',
			'wp-module-onboarding'
		),
		businessNamePromptText: __(
			'My business name is ',
			'wp-module-onboarding'
		),
		websiteType: __(
			'2. What type of website are you making?',
			'wp-module-onboarding'
		),
		websiteTypePromptText: __(
			'I am making a website type of ',
			'wp-module-onboarding'
		),
		websiteTypePlaceholder: __(
			'e.g. Graphic design portfolio',
			'wp-module-onboarding'
		),
		writeStyle: __(
			'3. Which writing style do you like better?',
			'wp-module-onboarding'
		),
		writeStylePromptText: __(
			'I like the wirting style ',
			'wp-module-onboarding'
		),
		writeStyleOption1: __(
			'We craft awesome goodies!',
			'wp-module-onboarding'
		),
		writeStyleOption2: __(
			'We manufacture quality products',
			'wp-module-onboarding'
		),
		uniqueBusiness: __(
			'4. Is there anything unique about your business or brand?',
			'wp-module-onboarding'
		),
		uniqueBusinessPlaceholder: __(
			'e.g. Unique product, amazing customer service, customizations, etc.',
			'wp-module-onboarding'
		),
		uniqueBusinessPromptText: __(
			'Unique about my business is',
			'wp-module-onboarding'
		),
	};
};

export default getContents;
