// eslint-disable-next-line import/no-extraneous-dependencies
import { forwardRef, useImperativeHandle, createRef } from 'react';
import { useDispatch } from '@wordpress/data';
import { lazy, useEffect, useState } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../../../store';
import getContents from './contents';
import { getCustomizeSidebarData } from '../../../../../utils/api/siteGen';
import classNames from 'classnames';
import { Spinner } from '@wordpress/components';

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

const Customize = forwardRef( ( props, ref ) => {
	const [ loading, setLoading ] = useState( true );
	const { updateCustomizeSidebarData } = useDispatch( nfdOnboardingStore );

	const loadData = async () => {
		const customizeSidebarData = await getCustomizeSidebarData();
		updateCustomizeSidebarData( customizeSidebarData?.body );
		setLoading( false );
	};

	const designColorPanelRef = createRef();
	const designFontsPanelRef = createRef();
	const resetCustomizationCallback = () => {
		designFontsPanelRef.current.resetToDefaultFonts();
		designColorPanelRef.current.resetToDefaultColors();
	};

	useImperativeHandle( ref, () => ( {
		resetCustomizationCallback,
	} ) );

	useEffect( () => {
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	// if ( loading ) {
	// 	return <div>...</div>;
	// }

	const content = getContents();
	return (
		<>
			{ loading ? (
				<div className={ classNames( 'center' ) }>
					<Spinner />
				</div>
			) : (
				<div className="nfd-onboarding-sidebar-learn-more__design-colors">
					<DesignColorsPanel
						heading={ content.introduction.heading }
						ref={ designColorPanelRef }
					/>
					<DesignFontsPanel ref={ designFontsPanelRef } />
				</div>
			) }
		</>
	);
} );

export default Customize;
