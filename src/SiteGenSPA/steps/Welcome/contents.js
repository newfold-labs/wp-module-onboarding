import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'Welcome to Wordpress',
			'wp-module-onboarding'
		),
		subheading: __(
			'Powered by bluehost',
			'wp-module-onboarding'
		),
		questionnaire: __(
			'Where would you like to start?',
			'wp-module-onboarding'
		),
		options: [ {
			title: __( 'Build it myself', 'wp-module-onboarding' ),
			subtitle: __(
				'We\'ll stay out of your way.',
				'wp-module-onboarding'
			),
		}, {
			title: __( ' Website Creator', 'wp-module-onboarding' ),
			subtitle: __(
				'Custom Al generated content & design.',
				'wp-module-onboarding'
			),
			span: __( 'AI', 'wp-module-onboarding'),
		}, {
			title: __( 'Hire a Pro', 'wp-module-onboarding' ),
			subtitle: __(
				'Leave it to our WordPress experts.',
				'wp-module-onboarding'
			),
		} ],
		importtext: __(
			'Already have a WordPress site you want to import?',
			'wp-module-onboarding'
		),
		importlink: __(
			'http://www.google.com',
			'wp-module-onboarding'
		),
	
	};
};

export default getContents;
