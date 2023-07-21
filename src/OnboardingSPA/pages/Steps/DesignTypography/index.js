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

	const { currentStep, themeStatus, designSteps } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getStepFromPath(
				location.pathname
			),
			themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			designSteps: select( nfdOnboardingStore ).getDesignSteps(),
		};
	}, [] );

	const { updateThemeStatus, setDrawerActiveView, setSidebarActiveView } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setDrawerActiveView( VIEW_DESIGN_TYPOGRAPHY );
	}, [] );

	const getFontPatterns = async () => {
		const patternsResponse = await getPatterns(
			currentStep?.patternId ?? designSteps[ 0 ].patternId,
			true
		);
		if ( patternsResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setPattern( patternsResponse?.body );
	};

	useEffect( () => {
		if ( THEME_STATUS_ACTIVE === themeStatus ) getFontPatterns();
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
