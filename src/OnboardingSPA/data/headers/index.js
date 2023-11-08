import { lazy } from '@wordpress/element';

import { HEADER_SITEBUILD, HEADER_SITEGEN } from '../../../constants';

const SiteGenHeader = lazy( () =>
	import( '../../components/Header/components/SiteGenHeader' )
);

const SiteBuildHeader = lazy( () =>
	import( '../../components/Header/components/SiteBuildHeader' )
);

export const headers = [
	{
		id: HEADER_SITEGEN,
		header: SiteGenHeader,
		enabled: true,
	},
	{
		id: HEADER_SITEBUILD,
		header: SiteBuildHeader,
		enabled: true,
	},
];
