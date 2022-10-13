import { __ } from '@wordpress/i18n';
import { useLocation } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { getPatterns } from '../../../utils/api/patterns';
import { store as nfdOnboardingStore } from '../../../store';
import { LivePreview } from '../../../components/LivePreview';
import CommonLayout from '../../../components/Layouts/Common';
import { VIEW_DESIGN_TYPOGRAPHY } from '../../../../constants';

const StepDesignTypography = () => {
	const location = useLocation();
	const [isLoaded, setIsLoaded] = useState(false);
	const [pattern, setPattern] = useState();

	const isLargeViewport = useViewportMatch('medium');
	const {
		currentStep,
	} = useSelect((select) => {
		return {
			currentStep: select(nfdOnboardingStore).getStepFromPath(
				location.pathname
			)
		};
	}, []);

	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		setIsDrawerSuppressed,
	} = useDispatch(nfdOnboardingStore);

	useEffect(() => {
		if (isLargeViewport) {
			setIsDrawerOpened(true);
		}
		setIsSidebarOpened(false);
		setIsDrawerSuppressed(false);
		setDrawerActiveView(VIEW_DESIGN_TYPOGRAPHY);
	}, []);

	const getFontPatterns = () => {
		console.log('Rann Once');
		const pattern = getPatterns(currentStep.patternId, true);
		setPattern(pattern?.body);
		setIsLoaded(true);
	};


	useEffect(() => {
		if (!isLoaded) getFontPatterns();
	}, [isLoaded]);

	return (
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
						skeletonLoadingTime={false}
					/>
				)}
			</div>
		</CommonLayout>
	);
};


export default StepDesignTypography;
