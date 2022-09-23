import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { CheckboxControl } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { orderBy, filter } from 'lodash';

import { LivePreview } from '../../../../components/LivePreview';
import CommonLayout from '../../../../components/Layouts/Common';
import { VIEW_DESIGN_THEME_STYLES_PREVIEW } from '../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../store';
import { getPatterns } from '../../../../utils/api/patterns';
import { getGlobalStyles } from '../../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../../utils/global-styles/use-global-styles-output';
import { conditionalSteps } from '../../../../data/routes/';

const StepDesignThemeStylesPreview = () => {
	const location = useLocation();
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ pattern, setPattern ] = useState();
	const [ customize, setCustomize ] = useState( false );

	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		currentStep,
		currentData,
		storedPreviewSettings,
		routes,
		designSteps,
		allSteps,
	} = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getStepFromPath(
				location.pathname
			),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			storedPreviewSettings:
				select( nfdOnboardingStore ).getPreviewSettings(),
			routes: select( nfdOnboardingStore ).getRoutes(),
			allSteps: select( nfdOnboardingStore ).getAllSteps(),
			designSteps: select( nfdOnboardingStore ).getDesignSteps(),
		};
	}, [] );

	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		setIsDrawerSuppressed,
		updatePreviewSettings,
		updateRoutes,
		updateDesignSteps,
		updateAllSteps,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_DESIGN_THEME_STYLES_PREVIEW );
		handleCheckbox( currentData.data.customDesign, false );
	}, [] );

	const getStylesAndPatterns = async () => {
		const pattern = await getPatterns( currentStep.patternId, true );
		const globalStyles = await getGlobalStyles();
		let selectedGlobalStyle;
		if ( currentData.data.theme.variation ) {
			selectedGlobalStyle = globalStyles.body.filter(
				( globalStyle ) =>
					globalStyle.title === currentData.data.theme.variation
			)[ 0 ];
		} else {
			selectedGlobalStyle = globalStyles.body[ 0 ];
		}
		updatePreviewSettings(
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);
		setPattern( pattern?.body );
		setIsLoaded( true );
	};

	const addColorAndTypographyRoutes = () => {
		const steps = [
			conditionalSteps.designColors,
			conditionalSteps.designTypography,
		];
		return {
			routes: orderBy(
				routes.concat( steps ),
				[ 'priority' ],
				[ 'asc' ]
			),
			allSteps: orderBy(
				allSteps.concat( steps ),
				[ 'priority' ],
				[ 'asc' ]
			),
			designSteps: orderBy(
				designSteps.concat( steps ),
				[ 'priority' ],
				[ 'asc' ]
			),
		};
	};

	const removeColorAndTypographyRoutes = () => {
		return {
			routes: filter(
				routes,
				( route ) =>
					! route.path.includes(
						conditionalSteps.designColors.path
					) &&
					! route.path.includes(
						conditionalSteps.designTypography.path
					)
			),
			allSteps: filter(
				allSteps,
				( allStep ) =>
					! allStep.path.includes(
						conditionalSteps.designColors.path
					) &&
					! allStep.path.includes(
						conditionalSteps.designTypography.path
					)
			),
			designSteps: filter(
				designSteps,
				( designStep ) =>
					! designStep.path.includes(
						conditionalSteps.designColors.path
					) &&
					! designStep.path.includes(
						conditionalSteps.designTypography.path
					)
			),
		};
	};

	const handleCheckbox = ( customize, updateOnboardingData = true ) => {
		let updates;

		if ( customize ) {
			updates = addColorAndTypographyRoutes();
		} else {
			updates = removeColorAndTypographyRoutes();
		}

		updateRoutes( updates.routes );
		updateDesignSteps( updates.designSteps );
		updateAllSteps( updates.allSteps );
		setCustomize( customize );

		if ( updateOnboardingData ) {
			currentData.data.customDesign = customize;
			setCurrentOnboardingData( currentData );
		}
	};

	useEffect( () => {
		if ( ! isLoaded ) getStylesAndPatterns();
	}, [ isLoaded ] );

	return (
		<CommonLayout className="theme-styles-preview">
			<div className="theme-styles-preview__checkbox">
				<CheckboxControl
					label={
						<div className="theme-styles-preview__checkbox__label">
							<span className="theme-styles-preview__checkbox__label__question">
								{ __(
									'Customize Colors & Fonts?',
									'wp-module-onboarding'
								) }
								<span className="theme-styles-preview__checkbox__label__hint">
									{ __(
										'Check to customize in the next few steps (or leave empty and use the Site Editor later)',
										'wp-module-onboarding'
									) }
								</span>
							</span>
						</div>
					}
					checked={ customize }
					onChange={ () => handleCheckbox( ! customize ) }
				/>
			</div>
			<div className="theme-styles-preview__title-bar">
				<div className="theme-styles-preview__title-bar__browser">
					<span className="theme-styles-preview__title-bar__browser__dot"></span>
					<span className="theme-styles-preview__title-bar__browser__dot"></span>
					<span className="theme-styles-preview__title-bar__browser__dot"></span>
				</div>
			</div>
			<div className="theme-styles-preview__live-preview-container">
				{ pattern && (
					<LivePreview
						blockGrammer={ pattern }
						styling={ 'custom' }
						viewportWidth={ 1300 }
					/>
				) }
			</div>
		</CommonLayout>
	);
};

export default StepDesignThemeStylesPreview;
