import { useLocation } from 'react-router-dom';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { getPatterns } from '../../../utils/api/patterns';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import {
	SIDEBAR_LEARN_MORE,
	THEME_STATUS_INIT,
	VIEW_DESIGN_TYPOGRAPHY,
	THEME_STATUS_ACTIVE,
} from '../../../../constants';
import { DesignStateHandler } from '../../../components/StateHandlers';
import {
	LivePreview,
	GlobalStylesProvider,
} from '../../../components/LivePreview';

const StepDesignTypography = () => {
	const location = useLocation();
	const [ pattern, setPattern ] = useState();

	const { currentStep, themeStatus, currentData } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getStepFromPath(
				location.pathname
			),
			themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	}, [] );

	const {
		updateThemeStatus,
		setDrawerActiveView,
		setSidebarActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setDrawerActiveView( VIEW_DESIGN_TYPOGRAPHY );

		// if the step was accessed directly then set the customDesign value to true
		// so that the checkbox on design preview appears checked
		if ( ! currentData.data.customDesign ) {
			currentData.data.customDesign = true;
			setCurrentOnboardingData( currentData );
		}
	}, [] );

	const getFontPatterns = async () => {
		const patternsResponse = await getPatterns(
			currentStep.patternId,
			true
		);
		if ( patternsResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setPattern( patternsResponse?.body );
	};

	useEffect( () => {
		if ( THEME_STATUS_ACTIVE === themeStatus ) {
			getFontPatterns();
		}
	}, [ themeStatus ] );

	return (
		<DesignStateHandler>
			<GlobalStylesProvider>
				<CommonLayout className="theme-fonts-preview">
					<div className="theme-fonts-preview__title-bar">
						<div className="theme-fonts-preview__title-bar__browser">
							<span className="theme-fonts-preview__title-bar__browser__dot"></span>
							<span className="theme-fonts-preview__title-bar__browser__dot"></span>
							<span className="theme-fonts-preview__title-bar__browser__dot"></span>
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

export default StepDesignTypography;
