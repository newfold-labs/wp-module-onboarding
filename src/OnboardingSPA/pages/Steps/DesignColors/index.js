import { useLocation } from 'react-router-dom';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { getPatterns } from '../../../utils/api/patterns';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import { DesignStateHandler } from '../../../components/StateHandlers';
import {
	LivePreview,
	GlobalStylesProvider,
} from '../../../components/LivePreview';
import {
	SIDEBAR_LEARN_MORE,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_INIT,
	VIEW_DESIGN_COLORS,
} from '../../../../constants';

const StepDesignColors = () => {
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

	const { setDrawerActiveView, setSidebarActiveView, updateThemeStatus } =
		useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setDrawerActiveView( VIEW_DESIGN_COLORS );
	}, [] );

	const getStylesAndPatterns = async () => {
		const patternResponse = await getPatterns(
			currentStep?.patternId ?? designSteps[ 0 ].patternId,
			true
		);
		if ( patternResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setPattern( patternResponse?.body );
	};

	useEffect( () => {
		if ( THEME_STATUS_ACTIVE === themeStatus ) getStylesAndPatterns();
	}, [ themeStatus ] );

	return (
		<DesignStateHandler>
			<GlobalStylesProvider>
				<CommonLayout className="theme-colors-preview">
					<div className="theme-colors-preview__title-bar">
						<div className="theme-colors-preview__title-bar__browser">
							<span className="theme-colors-preview__title-bar__browser__dot"></span>
							<span className="theme-colors-preview__title-bar__browser__dot"></span>
							<span className="theme-colors-preview__title-bar__browser__dot"></span>
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

export default StepDesignColors;
