import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

import { LivePreview } from '../../../components/LivePreview';
import CommonLayout from '../../../components/Layouts/Common';
import { GlobalStylesProvider } from '../../../components/LivePreview';
import { DesignStateHandler } from '../../../components/StateHandlers';


import {
	VIEW_DESIGN_HEADER_MENU,
	THEME_STATUS_ACTIVE,
} from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';

const StepDesignHeaderMenu = () => {
	const { 
		themeStatus,
		headerMenu,
	 } = useSelect(
		( select ) => {
			return {
				themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
				headerMenu: select( nfdOnboardingStore ).getHeaderMenuData(),
			};
		},
		[]
	);

	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ pattern, setPattern ] = useState();
	const isLargeViewport = useViewportMatch( 'medium' );

	const { 
		setDrawerActiveView, 
		setIsDrawerOpened, 
		setIsDrawerSuppressed,
		setIsSidebarOpened,
	} = useDispatch( nfdOnboardingStore );

	const getCurrentPattern = async () => {
		setIsLoaded( true );
	};

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
	}, [] );

	useEffect( () => {
		if ( ! isLoaded && themeStatus === THEME_STATUS_ACTIVE )
			getCurrentPattern();
	}, [ isLoaded, themeStatus ] );

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