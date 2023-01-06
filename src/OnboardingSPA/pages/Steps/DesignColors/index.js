import { useLocation } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';
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
	THEME_STATUS_NOT_ACTIVE,
	VIEW_DESIGN_COLORS,
} from '../../../../constants';

const StepDesignColors = () => {
	const location = useLocation();
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ pattern, setPattern ] = useState();

	const isLargeViewport = useViewportMatch( 'medium' );
	const { currentStep } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getStepFromPath(
				location.pathname
			),
		};
	}, [] );

	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setSidebarActiveView,
		setIsDrawerSuppressed,
		setIsHeaderNavigationEnabled,
		updateThemeStatus,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_DESIGN_COLORS );
		setIsHeaderNavigationEnabled( true );
	}, [] );

	const getStylesAndPatterns = async () => {
		const pattern = await getPatterns( currentStep.patternId, true );
		if ( pattern?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		setPattern( pattern?.body );
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded ) getStylesAndPatterns();
	}, [ isLoaded ] );

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
					<div className="theme-colors-preview__live-preview-container">
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

export default StepDesignColors;
