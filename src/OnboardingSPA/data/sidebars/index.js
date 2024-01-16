import { lazy } from '@wordpress/element';

import {
	SIDEBAR_LEARN_MORE,
	SIDEBAR_SITEGEN_EDITOR_PATTERNS,
	SIDEBAR_CUSTOMIZE,
} from '../../../constants';

const LearnMoreMenu = lazy( () =>
	import( '../../components/Sidebar/components/LearnMore/Menu' )
);
const LearnMoreSidebar = lazy( () =>
	import( '../../components/Sidebar/components/LearnMore/Sidebar' )
);

const SitegenEditorPatternsSidebar = lazy( () =>
	import(
		'../../components/Sidebar/components/SitegenEditorPatterns/Sidebar'
	)
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
		id: SIDEBAR_SITEGEN_EDITOR_PATTERNS,
		sidebar: SitegenEditorPatternsSidebar,
		enabled: true,
	},
	{
		id: SIDEBAR_CUSTOMIZE,
		menu: CustomizeMenu,
		sidebar: CustomizeSidebar,
		enabled: true,
	},
];
