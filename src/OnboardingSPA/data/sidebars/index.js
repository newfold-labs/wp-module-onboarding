import { lazy } from '@wordpress/element';

import { SIDEBAR_LEARN_MORE } from '../../../constants';

const LearnMoreMenu = lazy( () =>
	import( '../../components/Sidebar/components/LearnMore/Menu' )
);
const LearnMoreSidebar = lazy( () =>
	import( '../../components/Sidebar/components/LearnMore/Sidebar' )
);
const CustomizeMenu = lazy( () =>
	import( '../../components/Sidebar/components/Customize/Menu' )
);
const CustomizeSidebar = lazy( () =>
	import( '../../components/Sidebar/components/Customize/Sidebar' )
);

export const sidebars = [
	{
		id: SIDEBAR_LEARN_MORE,
		menu: LearnMoreMenu,
		sidebar: LearnMoreSidebar,
		enabled: true,
	},
	{
		id: 'Customize',
		menu: CustomizeMenu,
		sidebar: CustomizeSidebar,
		enabled: true,
	},
];
