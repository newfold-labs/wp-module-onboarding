import { __, sprintf } from '@wordpress/i18n';

import { translations } from '../../../../../utils/locales/translations';
import { home } from '@wordpress/icons';

const getContents = () => {	
	return {
        heading: __(
			'Key features to supercharge your site',
			'wp-module-onboarding'
		),
		subheading: __(
			'Our toolbox of Plugins & Services is your toolbox.',
			'wp-module-onboarding'
		),
	};
};

export default getContents;