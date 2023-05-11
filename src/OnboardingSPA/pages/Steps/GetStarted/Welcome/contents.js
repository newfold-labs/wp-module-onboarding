import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../utils/locales/translations';

const getContents = ( brandName ) => {
	return {
		heading: sprintf(
			/* translators: %s: website or store */
			__( 'Make your %s dreams a reality!', 'wp-module-onboarding' ),
			translations( 'website' )
		),
		subheading: sprintf(
			/* translators: %s: Brand */
			__( 'with WordPress and %s.', 'wp-module-onboarding' ),
			brandName
		),
		buttonText: __( 'Start Setup', 'wp-module-onboarding' ),
		tabs: [
			{
				name: 'tab1',
				title: __( 'YOUR CONTENT', 'wp-module-onboarding' ),
				subtitle: __(
					'Publish boldly with WordPress Blocks.',
					'wp-module-onboarding'
				),
				text: sprintf(
					/* translators: %s: Site */
					__(
						'Build a beautiful %s using a visual builder. Block Patterns accelerate telling your story or tending your store with professional designs.',
						'wp-module-onboarding'
					),
					translations( 'site' )
				),
				imgType: 'content-img',
				animationName: 'fade-in-right',
			},
			{
				name: 'tab2',
				title: __( 'POWERFUL FEATURES', 'wp-module-onboarding' ),
				subtitle: __(
					'Proven, easy-to-use solutions.',
					'wp-module-onboarding'
				),
				text: sprintf(
					/* translators: %s: Site */
					__(
						'Reach for your %1$s goals using proven WordPress Plugins & %2$s solutions. Send a newsletter, host a podcast, book clients, take payments and more.',
						'wp-module-onboarding'
					),
					translations( 'site' ),
					brandName
				),
				imgType: 'features-img',
				animationName: 'fade-in-up',
			},
			{
				name: 'tab3',
				title: __( 'MODERN DESIGN', 'wp-module-onboarding' ),
				subtitle: __(
					'Paint trim. Move walls. No sweat.',
					'wp-module-onboarding'
				),
				text: sprintf(
					/* translators: %s: site */
					__(
						"Establish your %s's unique design. Use the WordPress Editor to refine over time with professionally-designed patterns, parts, templates, colors and type.",
						'wp-module-onboarding'
					),
					translations( 'site' )
				),
				imgType: 'design-img',
				animationName: 'fade-in-left',
			},
		],
	};
};

export default getContents;
