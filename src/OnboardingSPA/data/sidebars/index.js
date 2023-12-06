import { lazy } from '@wordpress/element';

import {
	SIDEBAR_LEARN_MORE,
	SIDEBAR_SITEGEN_EDITOR_PATTERNS,
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

export const sidebars = [
	{
		id: SIDEBAR_LEARN_MORE,
		menu: LearnMoreMenu,
		sidebar: LearnMoreSidebar,
		enabled: true,
	},
	{
		id: SIDEBAR_SITEGEN_EDITOR_PATTERNS,
		menu: SitegenEditorPatternsSidebar,
		sidebar: SitegenEditorPatternsSidebar,
		enabled: true,
	},
];
