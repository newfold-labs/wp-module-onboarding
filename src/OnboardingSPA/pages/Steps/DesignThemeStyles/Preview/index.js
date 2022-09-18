import CommonLayout from '../../../../components/Layouts/Common';
import { VIEW_DESIGN_THEME_STYLES_PREVIEW } from '../../../../../constants';
import { store as nfdOnboardingStore } from '../../../../store';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import LivePreview from '../../../../components/LivePreview';

import { CheckboxControl } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { getPatterns } from '../../../../utils/api/patterns';
import { getGlobalStyles } from '../../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../../utils/global-styles/use-global-styles-output';

const StepDesignThemeStylesPreview = () => {
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ pattern, setPattern ] = useState();

	const isLargeViewport = useViewportMatch( 'medium' );
	const { currentStep, currentData, storedPreviewSettings } = useSelect(
		( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				storedPreviewSettings:
					select( nfdOnboardingStore ).getPreviewSettings(),
			};
		},
		[]
	);

	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		setIsDrawerSuppressed,
		updatePreviewSettings,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( isLargeViewport ) {
			setIsDrawerOpened( true );
		}
		setIsSidebarOpened( false );
		setIsDrawerSuppressed( false );
		setDrawerActiveView( VIEW_DESIGN_THEME_STYLES_PREVIEW );
	}, [] );

	const getStylesAndPatterns = async () => {
		const pattern = await getPatterns( currentStep.patternId, true );
		const globalStyles = await getGlobalStyles();
		const selectedGlobalStyle = globalStyles.body.filter(
			( globalStyle ) =>
				globalStyle.title == currentData.data.theme.variation
		)[ 0 ];
		updatePreviewSettings(
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);
		setPattern( pattern?.body );
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded ) getStylesAndPatterns();
	}, [ isLoaded ] );

	return (
		<CommonLayout className="theme-styles-preview">
			<div className="theme-styles-preview__checkbox">
				<CheckboxControl
					label={
						<div className="theme-styles-preview__checkbox__label">
							<span className="theme-styles-preview__checkbox__label__question">
								Customize Colors &amp; Fonts?
								<span className="theme-styles-preview__checkbox__label__hint">
									Check to customize in the next few steps (or
									leave empty and use the site editor later.)
								</span>
							</span>
							<div className="theme-styles-preview__checkbox__label__hint"></div>
						</div>
					}
				/>
			</div>
			<div className="theme-styles-preview__title-bar">
				<div className="theme-styles-preview__title-bar__browser">
					<span
						className="theme-styles-preview__title-bar__browser__dot"
						style={ { background: '#989EA7' } }
					></span>
					<span
						className="theme-styles-preview__title-bar__browser__dot"
						style={ { background: '#989EA7' } }
					></span>
					<span
						className="theme-styles-preview__title-bar__browser__dot"
						style={ { background: '#989EA7' } }
					></span>
				</div>
			</div>
			<div className="theme-styles-preview__live-preview-container">
				{ pattern && (
					<LivePreview
						blockGrammer={ pattern }
						styling={ 'custom' }
						viewportWidth={ 1300 }
					/>
				) }
			</div>
		</CommonLayout>
	);
};

export default StepDesignThemeStylesPreview;
