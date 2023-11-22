import { __, sprintf } from '@wordpress/i18n';

const getContents = ( charactersLeft ) => {
	return {
		charactersLeftPrompt: {
			text: sprintf(
				/* translators: %d: Character count */
				__( '(%d characters left)', 'wp-module-onboarding' ),
				charactersLeft
			),
		},
	};
};

export default getContents;
