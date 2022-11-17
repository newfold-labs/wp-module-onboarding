import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useNavigate, useLocation } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';

import { store as nfdOnboardingStore } from '../../../../store';
import CommonLayout from '../../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../../components/HeadingWithSubHeading';
import { useGlobalStylesOutput } from '../../../../utils/global-styles/use-global-styles-output';
import { getPatterns } from '../../../../utils/api/patterns';
import { getGlobalStyles } from '../../../../utils/api/themes';
import {
	VIEW_DESIGN_THEME_STYLES_MENU,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_NOT_ACTIVE,
} from '../../../../../constants';
import { DesignStateHandler } from '../../../../components/StateHandlers';
import { LivePreviewSelectableCard, LivePreviewSkeleton } from '../../../../components/LivePreview';

const StepDesignThemeStylesMenu = () => {
	const MAX_PREVIEWS_PER_ROW = 3;

	const location = useLocation();
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ pattern, setPattern ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState();
	const [ selectedStyle, setSelectedStyle ] = useState();

	const navigate = useNavigate();
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		currentStep,
		nextStep,
		currentData,
		storedPreviewSettings,
		themeStatus,
	} = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getStepFromPath(
				location.pathname
			),
			nextStep: select( nfdOnboardingStore ).getNextStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			storedPreviewSettings:
				select( nfdOnboardingStore ).getPreviewSettings(),
			themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
		};
	}, [] );

	const THEME_VARIATIONS 
		= window.nfdOnboarding?.themeStepData[currentStep?.patternId]?.previewCount;
				
	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		setIsDrawerSuppressed,
		updatePreviewSettings,
		setCurrentOnboardingData,
		updateThemeStatus,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_DESIGN_THEME_STYLES_MENU );
	}, [] );

	const getStylesAndPatterns = async () => {
		const patternsResponse = await getPatterns(
			currentStep.patternId,
			true
		);
		if ( patternsResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		const globalStylesResponse = await getGlobalStyles();
		if ( globalStylesResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		setPattern( patternsResponse?.body );
		setGlobalStyles( globalStylesResponse?.body );
		setSelectedStyle( currentData.data.theme.variation );
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded && themeStatus === THEME_STATUS_ACTIVE )
			getStylesAndPatterns();
	}, [ isLoaded, themeStatus ] );

	const handleClick = ( idx ) => {
		const selectedGlobalStyle = globalStyles[ idx ];
		updatePreviewSettings(
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);
		setSelectedStyle( selectedGlobalStyle.title );
		currentData.data.theme.variation = selectedGlobalStyle.title;
		setCurrentOnboardingData( currentData );
		navigate( nextStep.path );
	};

	const buildPreviews = () => {
		return globalStyles?.map( ( globalStyle, idx ) => {
			return (
				<LivePreviewSelectableCard
					key={ idx }
					className={ 'theme-styles-menu__list__item' }
					selected={ globalStyle.title === selectedStyle }
					blockGrammer={ pattern }
					viewportWidth={ 900 }
					styling={ 'custom' }
					previewSettings={ globalStyle }
					overlay={ true }
					onClick={ () => handleClick( idx ) }
				/>
			);
		} );
	};
	
	return (
		<DesignStateHandler>
			<CommonLayout>
				<div className="theme-styles-menu">
					<HeadingWithSubHeading
						title={ currentStep?.heading }
						subtitle={ currentStep?.subheading }
					/>
					<div className="theme-styles-menu__list">
						{!globalStyles && 
							<LivePreviewSkeleton count={Math.floor(THEME_VARIATIONS/2)}
							className={'theme-styles-menu__list__item'} viewportWidth={900}/>}
						{ globalStyles &&
							buildPreviews().slice( 0, MAX_PREVIEWS_PER_ROW )}
					</div>
					<div className="theme-styles-menu__list">
						{!globalStyles &&
							<LivePreviewSkeleton count={Math.floor(THEME_VARIATIONS/2)}
								className={'theme-styles-menu__list__item'} viewportWidth={900} />}
						{ globalStyles &&
							buildPreviews().slice(
								MAX_PREVIEWS_PER_ROW,
								globalStyles.length
							)}
					</div>
				</div>
			</CommonLayout>
		</DesignStateHandler>
	);
};

export default StepDesignThemeStylesMenu;
