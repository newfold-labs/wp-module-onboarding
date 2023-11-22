import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		title: __( 'Building Website', 'wp-module-onboarding' ),
		status: [
			{
				title: __( 'Generating Website', 'wp-module-onboarding' ),
			},
			{
				title: __( 'Finding Font Pairings', 'wp-module-onboarding' ),
			},
			{
				title: __(
					'Building Custom Color Palettes',
					'wp-module-onboarding'
				),
			},
			{
				title: __( 'Populating Images', 'wp-module-onboarding' ),
			},
			{
				title: __( 'Finalizing Previews', 'wp-module-onboarding' ),
			},
			{
				title: __( 'Packaging Website', 'wp-module-onboarding' ),
			},
		],
	};
};

export default getContents;
