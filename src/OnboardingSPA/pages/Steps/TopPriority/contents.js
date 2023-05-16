import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __( 'Tell us your top priority', 'wp-module-onboarding' ),
		subheading: __(
			"We'll prioritize getting you there.",
			'wp-module-onboarding'
		),
		options: [
			{
				icon: '--nfd-publish-icon',
				title: __( 'Publishing', 'wp-module-onboarding' ),
				desc: __(
					'From blogs, to newsletters, to podcasts and videos, we help the web find your content.',
					'wp-module-onboarding'
				),
			},
			{
				icon: '--nfd-selling-icon',
				title: __( 'Selling', 'wp-module-onboarding' ),
				desc: __(
					"Startup or seasoned business, drop-shipping or downloads, we've got ecommerce covered.",
					'wp-module-onboarding'
				),
			},
			{
				icon: '--nfd-design-icon',
				title: __( 'Designing', 'wp-module-onboarding' ),
				desc: __(
					'With smart style presets and powerful options, we help your site look and feel polished.',
					'wp-module-onboarding'
				),
			},
		],
	};
};

export default getContents;
