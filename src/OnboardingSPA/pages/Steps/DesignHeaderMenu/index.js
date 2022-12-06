import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

import { LivePreview } from '../../../components/LivePreview';
import CommonLayout from '../../../components/Layouts/Common';
import { GlobalStylesProvider } from '../../../components/LivePreview';
import { DesignStateHandler } from '../../../components/StateHandlers';


import { VIEW_DESIGN_HEADER_MENU } from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';

const StepDesignHeaderMenu = () => {
	const { 
		headerMenu,
	 } = useSelect(
		( select ) => {
			return {
				headerMenu: select( nfdOnboardingStore ).getHeaderMenuData(),
			};
		},
		[]
	);

	const [ pattern, setPattern ] = useState();
	const isLargeViewport = useViewportMatch( 'medium' );

	const { 
		setDrawerActiveView, 
		setIsDrawerOpened, 
		setIsDrawerSuppressed,
		setIsSidebarOpened,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setPattern( headerMenu );
	}, [ headerMenu ] );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_DESIGN_HEADER_MENU );
		setIsHeaderNavigationEnabled( true );
	}, [] );

	return (
		<DesignStateHandler>
			<GlobalStylesProvider>
				<CommonLayout className="theme-header-menu-preview">
					<div className="theme-header-menu-preview__title-bar">
						<div className="theme-header-menu-preview__title-bar__browser">
							<span className="theme-header-menu-preview__title-bar__browser__dot"></span>
							<span className="theme-header-menu-preview__title-bar__browser__dot"></span>
							<span className="theme-header-menu-preview__title-bar__browser__dot"></span>
						</div>
					</div>
					<div className="theme-header-menu-preview__live-preview-container">
						{ pattern && (
							<LivePreview
								blockGrammer={ pattern }
								styling={ 'custom' }
								viewportWidth={ 1300 }
							/>
						) }
					</div>
				</CommonLayout>
			</GlobalStylesProvider>
		</DesignStateHandler>
	);
};

export default StepDesignHeaderMenu;