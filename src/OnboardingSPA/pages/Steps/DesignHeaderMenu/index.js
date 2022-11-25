import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';

import { LivePreview } from '../../../components/LivePreview';
import CommonLayout from '../../../components/Layouts/Common';
import { DesignStateHandler } from '../../../components/StateHandlers';


import {
	VIEW_DESIGN_HEADER_MENU,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_NOT_ACTIVE,
} from '../../../../constants';
import { store as nfdOnboardingStore } from '../../../store';
import { getPatterns } from '../../../utils/api/patterns';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';

const StepDesignHeaderMenu = () => {
	const location = useLocation();
	const { 
		currentStep,
		currentData,
		storedPreviewSettings,
		themeStatus,
	 } = useSelect(
		( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getStepFromPath(
					location.pathname
				),
				currentData: select( nfdOnboardingStore ).getCurrentOnboardingData(),
				storedPreviewSettings: select( nfdOnboardingStore ).getPreviewSettings(),
				themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
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
		setIsSidebarOpened 
	} = useDispatch( nfdOnboardingStore );

	const getCurrentPattern = async () => {
		const patternsResponse = await getPatterns(
			currentStep.patternId,
			true
		);

		// if ( patternsResponse?.error ) {
		// 	return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		// }
		// const globalStylesResponse = await getGlobalStyles();
		// if ( globalStylesResponse?.error ) {
		// 	return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		// }
		// let selectedGlobalStyle;
		// if ( currentData.data.theme.variation ) {
		// 	selectedGlobalStyle = globalStylesResponse.body.filter(
		// 		( globalStyle ) =>
		// 			globalStyle.title === currentData.data.theme.variation
		// 	)[ 0 ];
		// } else {
		// 	selectedGlobalStyle = globalStylesResponse.body[ 0 ];
		// }
		// updatePreviewSettings(
		// 	useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		// );
		setPattern( patternsResponse?.body );
		setIsLoaded( true );
	};

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
		</DesignStateHandler>
	);
};

export default StepDesignHeaderMenu;
