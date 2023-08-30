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
	API_REQUEST,
} from '../../../../../constants';
import { DesignStateHandler } from '../../../../components/StateHandlers';
import {
	LivePreviewSelectableCard,
	LivePreviewSkeleton,
} from '../../../../components/LivePreview';
import { injectInAllSteps } from '../../../../data/routes/allStepsHandler';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../../utils/analytics/hiive';
import { ACTION_THEME_STYLE_SELECTED } from '../../../../utils/analytics/hiive/constants';
import { setFlow } from '../../../../utils/api/flow';

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
		allSteps,
		themeStatus,
		themeVariations,
		queueLength,
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
			allSteps: select( nfdOnboardingStore ).getAllSteps(),
			themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			themeVariations: select( nfdOnboardingStore ).getStepPreviewData(),
			queueLength: select( nfdOnboardingStore ).getQueueLength(),
		};
	}, [] );

	const {
		setDrawerActiveView,
		setSidebarActiveView,
		updatePreviewSettings,
		setCurrentOnboardingData,
		updateThemeStatus,
		updateAllSteps,
		flushQueue,
		enqueueRequest,
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
	};

	useEffect( () => {
		if ( themeStatus === THEME_STATUS_ACTIVE && 0 === queueLength ) {
			getStylesAndPatterns();
		} else {
			flushQueue();
		}
	}, [ themeStatus, queueLength ] );

	const handleClick = ( idx ) => {
		const selectedGlobalStyle = globalStyles[ idx ];
		updatePreviewSettings(
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);
		setSelectedStyle( selectedGlobalStyle.title );
		currentData.data.theme.variation = selectedGlobalStyle.title;
		setCurrentOnboardingData( currentData );

		// enqueueing the setflow API to save data to DB
		enqueueRequest( API_REQUEST.SET_FLOW, () => setFlow( currentData ) );

		navigate( nextStep.path );
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_THEME_STYLE_SELECTED,
				selectedGlobalStyle.title
			)
		);
	};

	const skiptoCustomPage = () => {
		// Add Custom Steps into the Flow
		const updates = injectInAllSteps( allSteps, conditionalSteps );
		updateAllSteps( updates.allSteps );

		currentData.data.customDesign = true;
		setCurrentOnboardingData( currentData );
		// Find the first Custom Conditional Step and navigate there
		navigate( conditionalSteps[ 0 ].path );
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
