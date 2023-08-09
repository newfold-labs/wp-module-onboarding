import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckboxControl } from '@wordpress/components';
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
import {
	injectInAllSteps,
	removeFromAllSteps,
} from '../../../../data/routes/allStepsHandler';
import { store as nfdOnboardingStore } from '../../../../store';
import { getPatterns } from '../../../../utils/api/patterns';
import { DesignStateHandler } from '../../../../components/StateHandlers';

const StepDesignThemeStylesPreview = () => {
	const content = getContents();
	const location = useLocation();
	const [ pattern, setPattern ] = useState();
	const [ customize, setCustomize ] = useState( false );
	const navigate = useNavigate();

	const { currentStep, currentData, allSteps, themeStatus } = useSelect(
		( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getStepFromPath(
					location.pathname
				),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				allSteps: select( nfdOnboardingStore ).getAllSteps(),
				themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			};
		},
		[]
	);

	const {
		setDrawerActiveView,
		setSidebarActiveView,
		setCurrentOnboardingData,
		updateThemeStatus,
		updateAllSteps,
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
		setCustomize( selected );

		if ( selected ) {
			const updates = injectInAllSteps( allSteps, conditionalSteps );
			updateAllSteps( updates.allSteps );
		} else {
			const updates = removeFromAllSteps( allSteps, conditionalSteps );
			updateAllSteps( updates.allSteps );
		}

		if ( updateOnboardingData ) {
			currentData.data.customDesign = selected;
			setCurrentOnboardingData( currentData );
		}

		if ( selected && 'click' === context ) {
			navigate( conditionalSteps[ 0 ].path );
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
