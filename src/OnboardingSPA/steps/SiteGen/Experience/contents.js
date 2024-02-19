import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'How familiar are you with using WordPress?',
			'wp-module-onboarding'
		),
		options: [
			{
				key: 1,
				title: __( 'Beginner', 'wp-module-onboarding' ),
				desc: __(
					'First time building a website using WordPress',
					'wp-module-onboarding'
				),
			},
			{
				key: 2,
				title: __( 'Intermediate', 'wp-module-onboarding' ),
				desc: __(
					'I’ve built a few sites for myself or others',
					'wp-module-onboarding'
				),
			},
			{
				key: 3,
				title: __( 'Expert', 'wp-module-onboarding' ),
				desc: __( 'I do this frequently', 'wp-module-onboarding' ),
			},
		],
	};
};

export default getContents;
