import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../utils/locales/translations';

const getContents = () => {
	return {
		heading: sprintf(
			/* translators: %s: website or store */
			__( 'Introduce us to this %s', 'wp-module-onboarding' ),
			translations( 'website' )
		),
		subheading: __(
			'So we can introduce it to the web',
			'wp-module-onboarding'
		),
		siteTitle: {
			title: sprintf(
				/* translators: %s: Site */
				__( '%s Title', 'wp-module-onboarding' ),
				translations( 'Site' )
			),
			placeholder: sprintf(
				/* translators: %s: Site or Store */
				__( 'WordPress %s', 'wp-module-onboarding' ),
				translations( 'Site' )
			),
			hint: __(
				'Shown to visitors, search engine and social media posts.',
				'wp-module-onboarding'
			),
			maxCharacters: __( '80', 'wp-module-onboarding' ),
		},
		siteDesc: {
			title: sprintf(
				/* translators: %s: Site or Store */
				__( '%s Description', 'wp-module-onboarding' ),
				translations( 'Site' )
			),
			placeholder: sprintf(
				/* translators: %s: Site or Store */
				__( 'Just another WordPress %s.', 'wp-module-onboarding' ),
				translations( 'Site' )
			),
			hint: sprintf(
				/* translators: %s: site or store */
				__(
					'Tell people who you are, what you sell and why they should visit your %s.',
					'wp-module-onboarding'
				),
				translations( 'site' )
			),
			maxCharacters: __( '160', 'wp-module-onboarding' ),
		},
		error: {
			title: __(
				'Error Saving Data, Try Again!',
				'wp-module-onboarding'
			),
		},
	};
};

export default getContents;
