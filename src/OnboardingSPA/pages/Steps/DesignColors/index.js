import { __ } from '@wordpress/i18n';
import { useLocation } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { getPatterns } from '../../../utils/api/patterns';
import { getGlobalStyles } from '../../../utils/api/themes';
import { store as nfdOnboardingStore } from '../../../store';
import { LivePreview } from '../../../components/LivePreview';
import CommonLayout from '../../../components/Layouts/Common';
import { VIEW_DESIGN_COLORS } from '../../../../constants';
import { DesignStateHandler } from '../../../components/StateHandlers';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';

const StepDesignColors = () => {
	const location = useLocation();
	const [isLoaded, setIsLoaded] = useState(false);
	const [pattern, setPattern] = useState();

	const isLargeViewport = useViewportMatch('medium');
	const {
		currentStep,
		currentData,
		storedPreviewSettings,
	} = useSelect((select) => {
		return {
			currentStep: select(nfdOnboardingStore).getStepFromPath(
				location.pathname
			),
			currentData:
				select(nfdOnboardingStore).getCurrentOnboardingData(),
			storedPreviewSettings:
				select(nfdOnboardingStore).getPreviewSettings(),
		};
	}, []);

	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		setIsDrawerSuppressed,
		updatePreviewSettings,
	} = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
		setIsSidebarOpened(false);
		setIsDrawerSuppressed(false);
		setDrawerActiveView(VIEW_DESIGN_COLORS);
	}, []);

	const getStylesAndPatterns = async () => {
		const pattern = await getPatterns(currentStep.patternId, true);
		const globalStyles = await getGlobalStyles();
		let selectedGlobalStyle;
		if (currentData.data.theme.variation) {
			selectedGlobalStyle = globalStyles.body.filter(
				(globalStyle) =>
					globalStyle.title === currentData.data.theme.variation
			)[0];
		} else {
			selectedGlobalStyle = globalStyles.body[0];
		}
		setPattern(pattern?.body);
		setIsLoaded(true);
	};

	
	useEffect(() => {
		if (!isLoaded) getStylesAndPatterns();
	}, [isLoaded]);

	return (
		<DesignStateHandler>
			<CommonLayout className="theme-colors-preview">
				<div className="theme-colors-preview__title-bar">
					<div className="theme-colors-preview__title-bar__browser">
						<span className="theme-colors-preview__title-bar__browser__dot"></span>
						<span className="theme-colors-preview__title-bar__browser__dot"></span>
						<span className="theme-colors-preview__title-bar__browser__dot"></span>
					</div>
				</div>
				<div className="theme-colors-preview__live-preview-container">
					{pattern && (
						<LivePreview
							blockGrammer={pattern}
							styling={'custom'}
							viewportWidth={1300}
						/>
					)}
				</div>
			</CommonLayout>
		</DesignStateHandler>
	);
};

export default StepDesignColors;
