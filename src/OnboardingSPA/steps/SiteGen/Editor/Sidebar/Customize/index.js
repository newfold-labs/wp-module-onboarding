import { useDispatch } from '@wordpress/data';
import { lazy, useEffect, useState } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../../../store';
import getContents from './contents';
import { getCustomizeSidebarData } from '../../../../../utils/api/siteGen';

const DesignFontsPanel = lazy( () =>
	import(
		'../../../../../components/Sidebar/components/Customize/DesignFontsPanel'
	)
);
const DesignColorsPanel = lazy( () =>
	import(
		'../../../../../components/Sidebar/components/Customize/DesignColorsPanel'
	)
);

const Customize = () => {
	const [loading, setLoading] = useState(true);
	const { updateCustomizeSidebarData } = useDispatch( nfdOnboardingStore );

	const loadData = async () => {
		const customizeSidebarData = await getCustomizeSidebarData();
		updateCustomizeSidebarData( customizeSidebarData?.body );
		setLoading(false);
	};

	useEffect( () => {
		loadData();
	}, [] );

	if (loading) {
		return <div>...</div>;
	  }

	const content = getContents();
	return (
		<div className="nfd-onboarding-sidebar-learn-more__design-colors">
			<DesignColorsPanel heading={ content.introduction.heading } />
			<DesignFontsPanel />
		</div>
	);
};

export default Customize;
