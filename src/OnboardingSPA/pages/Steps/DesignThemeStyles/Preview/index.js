import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
// eslint-disable-next-line import/no-extraneous-dependencies
import { orderBy, filter } from 'lodash';

import {
	LivePreview,
	GlobalStylesProvider,
} from '../../../../components/LivePreview';
import CommonLayout from '../../../../components/Layouts/Common';
import {
	VIEW_DESIGN_THEME_STYLES_PREVIEW,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_INIT,
	SIDEBAR_LEARN_MORE,
} from '../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../store';
import { getPatterns } from '../../../../utils/api/patterns';
import { conditionalSteps } from '../../../../data/routes/';
import { DesignStateHandler } from '../../../../components/StateHandlers';

const StepDesignThemeStylesPreview = () => {
	const location = useLocation();
	const [ pattern, setPattern ] = useState();
	const [ customize, setCustomize ] = useState( false );

	const {
		currentStep,
		currentData,
		routes,
		designSteps,
		allSteps,
		themeStatus,
	} = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getStepFromPath(
				location.pathname
			),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			routes: select( nfdOnboardingStore ).getRoutes(),
			allSteps: select( nfdOnboardingStore ).getAllSteps(),
			designSteps: select( nfdOnboardingStore ).getDesignSteps(),
			themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
		};
	}, [] );

	const {
		setDrawerActiveView,
		setSidebarActiveView,
		updateRoutes,
		updateDesignSteps,
		updateAllSteps,
		setCurrentOnboardingData,
		updateThemeStatus,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setDrawerActiveView( VIEW_DESIGN_THEME_STYLES_PREVIEW );
		handleCheckbox( currentData.data.customDesign, false );
	}, [] );

	const getStylesAndPatterns = async () => {
		const patternsResponse = await getPatterns(
			currentStep.patternId,
			true,
			currentData?.data?.partHeader ? currentData?.data?.partHeader.split( '/' )[ 1 ] : '',
		);
		if ( patternsResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setPattern( patternsResponse?.body );
	};

	const addColorAndTypographyRoutes = () => {
		const updates = removeColorAndTypographyRoutes();
		const steps = [
			conditionalSteps.designColors,
			conditionalSteps.designTypography,
		];
		return {
			routes: orderBy(
				updates.routes.concat( steps ),
				[ 'priority' ],
				[ 'asc' ]
			),
			allSteps: orderBy(
				updates.allSteps.concat( steps ),
				[ 'priority' ],
				[ 'asc' ]
			),
			designSteps: orderBy(
				updates.designSteps.concat( steps ),
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

	const handleCheckbox = ( customizationNeeded, updateOnboardingData = true ) => {
		let updates;

		if ( customizationNeeded ) {
			updates = addColorAndTypographyRoutes();
		} else {
			updates = removeColorAndTypographyRoutes();
		}

		updateRoutes( updates.routes );
		updateDesignSteps( updates.designSteps );
		updateAllSteps( updates.allSteps );
		setCustomize( customizationNeeded );

		if ( updateOnboardingData ) {
			currentData.data.customDesign = customizationNeeded;
			setCurrentOnboardingData( currentData );
		}
	};

	useEffect( () => {
		if ( themeStatus === THEME_STATUS_ACTIVE ) {
			getStylesAndPatterns();
		}
	}, [ themeStatus ] );

	return (
		<DesignStateHandler>
			<GlobalStylesProvider>
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
					{ ! pattern && (
						<LivePreview
							blockGrammer={ '' }
							styling={ 'large' }
							viewportWidth={ 1300 }
						/>
					) }
					{ pattern && (
						<LivePreview
							blockGrammer={ pattern }
							styling={ 'large' }
							viewportWidth={ 1300 }
						/>
					) }
				</CommonLayout>
			</GlobalStylesProvider>
		</DesignStateHandler>
	);
};

export default StepDesignThemeStylesPreview;
