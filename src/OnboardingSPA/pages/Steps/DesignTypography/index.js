import { useLocation } from 'react-router-dom';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { getPatterns } from '../../../utils/api/patterns';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import {
	SIDEBAR_LEARN_MORE,
	THEME_STATUS_NOT_ACTIVE,
	VIEW_DESIGN_TYPOGRAPHY,
} from '../../../../constants';
import { DesignStateHandler } from '../../../components/StateHandlers';
import {
	LivePreview,
	GlobalStylesProvider,
} from '../../../components/LivePreview';

const StepDesignTypography = () => {
	const location = useLocation();
	const [ pattern, setPattern ] = useState();
	const [ isLoaded, setIsLoaded ] = useState( false );

	const { currentStep } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getStepFromPath(
				location.pathname
			),
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
			currentStep.patternId,
			true
		);
		if ( patternsResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		setPattern( patternsResponse?.body );
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded ) getFontPatterns();
	}, [ isLoaded ] );

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
					<div className="theme-fonts-preview__live-preview-container">
						{ ! pattern && (
							<LivePreview
								blockGrammer={ '' }
								styling={ 'custom' }
								viewportWidth={ 1300 }
							/>
						) }
						{ pattern && (
							<LivePreview
								blockGrammer={ pattern }
								styling={ 'custom' }
								viewportWidth={ 1300 }
							/>
						) }
					</div>
				</CommonLayout>
			</GlobalStylesProvider>
		</DesignStateHandler>
	);
};

export default StepDesignTypography;
