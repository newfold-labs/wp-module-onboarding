import { translations } from '../../../utils/locales/translations';
import { __, sprintf } from '@wordpress/i18n';

const getContents = ( brandName ) => {
	return {
		heading: __(
			'Nice work: Your site is ready 🎉',
			'wp-module-onboarding'
		),
		subheading: __(
			"Move-in day begins! Let us know if you'd like a hand.",
			'wp-module-onboarding'
		),
		buttonText: __( 'Complete Setup', 'wp-module-onboarding' ),
		tabs: [
			{
				name: __( 'tab1', 'wp-module-onboarding' ),
				title: __( 'WHATS NEXT', 'wp-module-onboarding' ),
				subtitle: __(
					'Add content, organize your menu and launch.',
					'wp-module-onboarding'
				),
				text: sprintf(
					/* translators: %s: Brand */
					__(
						"✅ Theme created, features added and Coming Soon mode activated. Thank you for building your site with %s, we're always here to help!",
						'wp-module-onboarding'
					),
					brandName
				),
				imgType: 'img-1',
				animationName: 'fade-in-right',
			},
			{
				name: __( 'tab2', 'wp-module-onboarding' ),
				title: __( 'HELP & RESOURCES', 'wp-module-onboarding' ),
				subtitle: __(
					"Next step or next level, we're your partner.",
					'wp-module-onboarding'
				),
				text: sprintf(
					/* translators: %s: Site */
					__(
						'WordPress make it easy to grow your %s. Send a newsletter, broadcast a podcast, create courses and trainings. Dream it, build it.',
						'wp-module-onboarding'
					),
					translations( 'site' )
				),
				imgType: 'img-2',
				animationName: 'fade-in-up',
			},
			{
				name: __( 'tab3', 'wp-module-onboarding' ),
				title: __( 'HIRE OUR EXPERTS', 'wp-module-onboarding' ),
				subtitle: __(
					'Make our great people your people.',
					'wp-module-onboarding'
				),
				text: __(
					'Looking for personalized WordPress assistance, or someone to take-over from here? Go beyond support with our professional services.',
					'wp-module-onboarding'
				),
				imgType: 'img-3',
				animationName: 'fade-in-left',
			},
		],
	};
};

export default getContents;
