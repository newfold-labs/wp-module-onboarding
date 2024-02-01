import { __ } from '@wordpress/i18n';

const getContents = () => {
	return {
		heading: __(
			'Do you have a logo you would like to use for this site?',
			'wp-module-onboarding'
		),
		imageUploader: {
			subHeading: __(
				'supports .jpg, .png, .svg',
				'wp-module-onboarding'
			),
		},
		buttons: {
			skip: __( 'Skip for now', 'wp-module-onboarding' ),
			next: __( 'Next', 'wp-module-onboarding' ),
		},
	};
};

export default getContents;
