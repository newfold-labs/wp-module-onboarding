import { lazy } from '@wordpress/element';

import { FOOTER_SITEGEN } from '../../../constants';

const SiteGenFooter = lazy( () =>
	import( '../../components/Footer/components/SiteGenFooter' )
);

export const footers = [
	{
		id: FOOTER_SITEGEN,
		footer: SiteGenFooter,
		enabled: true,
	},
];
