import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'Lets tailor your theme for the perfect fit',
			'wp-module-onboarding'
		),
		subheading: __(
			'Start with a style preset or',
			'wp-module-onboarding'
		),
		/* translators: build a custom design is a link, this would be concatenated with "Start with a style preset or" making it
		 "Start with a style preset or build a custom design."*/
		subheading_link: __( 'build a custom design.', 'wp-module-onboarding' ),
		checkbox_label: __(
			'Customize Colors & Fonts?',
			'wp-module-onboarding'
		),
		checkbox_hint: __(
			'Check to customize in the next few steps (or leave empty and use the Site Editor later)',
			'wp-module-onboarding'
		),
	};
};

export default getContents;
