import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useNavigate, useLocation } from 'react-router-dom';

import getContents from '../contents';
import { store as nfdOnboardingStore } from '../../../../store';
import CommonLayout from '../../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../../components/HeadingWithSubHeading';
import { useGlobalStylesOutput } from '../../../../utils/global-styles/use-global-styles-output';
import { getPatterns } from '../../../../utils/api/patterns';
import { getGlobalStyles } from '../../../../utils/api/themes';
import { conditionalSteps } from '../../../../data/routes/';
import {
	VIEW_NAV_DESIGN,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_INIT,
	SIDEBAR_LEARN_MORE,
} from '../../../../../constants';
import { DesignStateHandler } from '../../../../components/StateHandlers';
import {
	LivePreviewSelectableCard,
	LivePreviewSkeleton,
} from '../../../../components/LivePreview';
import { addColorAndTypographyRoutes } from '../utils';
import { trackHiiveEvent } from '../../../../utils/analytics';

const StepDesignThemeStylesMenu = () => {
	const content = getContents();
	const location = useLocation();
	const [ pattern, setPattern ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState();
	const [ selectedStyle, setSelectedStyle ] = useState();

	const navigate = useNavigate();
	const {
		currentStep,
		nextStep,
		currentData,
		storedPreviewSettings,
		routes,
		allSteps,
		designSteps,
		themeStatus,
		themeVariations,
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
			routes: select( nfdOnboardingStore ).getRoutes(),
			allSteps: select( nfdOnboardingStore ).getAllSteps(),
			designSteps: select( nfdOnboardingStore ).getDesignSteps(),
			themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			themeVariations: select( nfdOnboardingStore ).getStepPreviewData(),
		};
	}, [] );

	const {
		setDrawerActiveView,
		setSidebarActiveView,
		updatePreviewSettings,
		setCurrentOnboardingData,
		updateThemeStatus,
		updateRoutes,
		updateDesignSteps,
		updateAllSteps,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setDrawerActiveView( VIEW_NAV_DESIGN );
	}, [] );

	const getStylesAndPatterns = async () => {
		const patternsResponse = await getPatterns(
			currentStep.patternId,
			true
		);
		if ( patternsResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}

		const globalStylesResponse = await getGlobalStyles( true );
		if ( globalStylesResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}

		setSelectedStyle( currentData.data.theme.variation );
		setPattern( patternsResponse?.body );
		setGlobalStyles( globalStylesResponse?.body );
		setSelectedStyle( currentData.data.theme.variation );
		if ( '' === currentData.data.theme.variation ) {
			trackHiiveEvent(
				'default-style',
				globalStylesResponse.body[ 0 ].title
			);
		}
	};

	useEffect( () => {
		if ( themeStatus === THEME_STATUS_ACTIVE ) {
			getStylesAndPatterns();
		}
	}, [ themeStatus ] );

	const handleClick = ( idx ) => {
		const selectedGlobalStyle = globalStyles[ idx ];
		updatePreviewSettings(
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);
		setSelectedStyle( selectedGlobalStyle.title );
		currentData.data.theme.variation = selectedGlobalStyle.title;
		setCurrentOnboardingData( currentData );
		navigate( nextStep.path );
		trackHiiveEvent( 'selected-style', selectedGlobalStyle.title );
	};

	const skiptoCustomPage = () => {
		// Add Custom Steps into the Flow
		const updates = addColorAndTypographyRoutes(
			routes,
			allSteps,
			designSteps
		);
		updateRoutes( updates.routes );
		updateDesignSteps( updates.designSteps );
		updateAllSteps( updates.allSteps );

		currentData.data.customDesign = true;
		setCurrentOnboardingData( currentData );
		trackHiiveEvent( 'customize-design', true );
		// Find the first Custom Conditional Step and navigate there
		navigate( conditionalSteps.designColors.path );
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
					<HeadingWithSubHeading title={ content.heading }>
						<h3 className="nfd-main-heading__subtitle">
							{ `${ content.subheading } ` }
							<button
								className="theme-styles-menu__custom-pages-link"
								onClick={ skiptoCustomPage }
							>
								{ content.subheading_link }
							</button>
						</h3>
					</HeadingWithSubHeading>
					<div className="theme-styles-menu__list">
						<LivePreviewSkeleton
							className={ 'theme-styles-menu__list__item' }
							count={
								themeVariations[ currentStep?.patternId ]
									?.previewCount
							}
							watch={ pattern && globalStyles }
							callback={ buildPreviews }
							viewportWidth={ 900 }
						/>
					</div>
				</div>
			</CommonLayout>
		</DesignStateHandler>
	);
};

export default StepDesignThemeStylesMenu;
