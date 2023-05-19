import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckboxControl } from '@wordpress/components';
import {
	addColorAndTypographyRoutes,
	removeColorAndTypographyRoutes,
} from '../utils';
import { conditionalSteps } from '../../../../data/routes';
import {
	LivePreview,
	GlobalStylesProvider,
} from '../../../../components/LivePreview';
import getContents from '../contents';
import CommonLayout from '../../../../components/Layouts/Common';
import {
	VIEW_DESIGN_THEME_STYLES_PREVIEW,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_INIT,
	SIDEBAR_LEARN_MORE,
} from '../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../store';
import { getPatterns } from '../../../../utils/api/patterns';
import { DesignStateHandler } from '../../../../components/StateHandlers';
import { trackHiiveEvent } from '../../../../utils/analytics';

const StepDesignThemeStylesPreview = () => {
	const content = getContents();
	const location = useLocation();
	const [ pattern, setPattern ] = useState();
	const [ customize, setCustomize ] = useState( false );
	const navigate = useNavigate();

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
		handleCheckbox( currentData.data.customDesign, false, 'flow' );
	}, [] );

	const getStylesAndPatterns = async () => {
		const patternsResponse = await getPatterns(
			currentStep.patternId,
			true
		);
		if ( patternsResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setPattern( patternsResponse?.body );
	};

	const handleCheckbox = (
		selected,
		updateOnboardingData = true,
		context = 'click'
	) => {
		let updates;
		if ( selected ) {
			updates = addColorAndTypographyRoutes(
				routes,
				allSteps,
				designSteps
			);
		} else {
			updates = removeColorAndTypographyRoutes(
				routes,
				allSteps,
				designSteps
			);
		}

		updateRoutes( updates.routes );
		updateDesignSteps( updates.designSteps );
		updateAllSteps( updates.allSteps );
		setCustomize( selected );

		if ( updateOnboardingData ) {
			currentData.data.customDesign = selected;
			setCurrentOnboardingData( currentData );
		}

		if ( selected && 'click' === context ) {
			trackHiiveEvent( 'customize-design', true );
			navigate( conditionalSteps.designColors.path );
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
										{ content.checkbox_label }
										<span className="theme-styles-preview__checkbox__label__hint">
											{ content.checkbox_hint }
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
