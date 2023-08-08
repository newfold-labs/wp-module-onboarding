import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import { store as nfdOnboardingStore } from '../../../store';
import { getPatterns } from '../../../utils/api/patterns';
import { getGlobalStyles } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import { THEME_STATUS_ACTIVE, THEME_STATUS_INIT } from '../../../../constants';
import {
	LivePreviewSelectableCard,
	LivePreviewSkeleton,
} from '../../LivePreview';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { ACTION_THEME_STYLE_SELECTED } from '../../../utils/analytics/hiive/constants';

const DesignThemeStylesPreview = () => {
	const [ pattern, setPattern ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState();
	const [ selectedStyle, setSelectedStyle ] = useState( '' );

	const {
		currentStep,
		currentData,
		storedPreviewSettings,
		themeStatus,
		themeVariations,
	} = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getCurrentStep(),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			storedPreviewSettings:
				select( nfdOnboardingStore ).getPreviewSettings(),
			themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			themeVariations: select( nfdOnboardingStore ).getStepPreviewData(),
		};
	}, [] );

	const {
		updatePreviewSettings,
		setCurrentOnboardingData,
		updateThemeStatus,
	} = useDispatch( nfdOnboardingStore );

	const scrollSelectionIntoView = () => {
		if (
			document.getElementsByClassName(
				'theme-styles-preview--drawer__list__item__title-bar--selected'
			) &&
			document.getElementsByClassName(
				'theme-styles-preview--drawer__list__item__title-bar--selected'
			)[ 0 ]
		) {
			document
				.getElementsByClassName(
					'theme-styles-preview--drawer__list__item__title-bar--selected'
				)[ 0 ]
				.scrollIntoView( {
					behavior: 'smooth',
					block: 'center',
				} );
		}
	};

	const getStylesAndPatterns = async () => {
		const globalStylesResponse = await getGlobalStyles( true );
		if ( globalStylesResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		let selectedGlobalStyle;
		if ( currentData.data.theme.variation ) {
			selectedGlobalStyle = currentData.data.theme.variation;
		} else {
			selectedGlobalStyle = globalStylesResponse.body[ 0 ].title;
			currentData.data.theme.variation = selectedGlobalStyle;
			setCurrentOnboardingData( currentData );
		}
		setSelectedStyle( selectedGlobalStyle );

		const patternResponse = await getPatterns(
			currentStep.patternId,
			true
		);
		if ( patternResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}

		setPattern( patternResponse?.body );
		setGlobalStyles( globalStylesResponse?.body );
		scrollSelectionIntoView();
	};

	useEffect( () => {
		if ( themeStatus === THEME_STATUS_ACTIVE ) {
			getStylesAndPatterns();
		}
	}, [ themeStatus ] );

	const handleClick = ( idx ) => {
		const selectedGlobalStyle = globalStyles[ idx ];
		if ( selectedStyle === selectedGlobalStyle.title ) {
			return true;
		}
		updatePreviewSettings(
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);
		setSelectedStyle( selectedGlobalStyle.title );
		currentData.data.theme.variation = selectedGlobalStyle.title;
		setCurrentOnboardingData( currentData );
		trackOnboardingEvent(
			new OnboardingEvent(
				ACTION_THEME_STYLE_SELECTED,
				selectedGlobalStyle.title
			)
		);
	};

	const buildPreviews = () => {
		return globalStyles?.map( ( globalStyle, idx ) => {
			return (
				<LivePreviewSelectableCard
					key={ idx }
					className={ 'theme-styles-preview--drawer__list__item' }
					selected={ globalStyle.title === selectedStyle }
					blockGrammer={ pattern }
					viewportWidth={ 900 }
					styling={ 'custom' }
					previewSettings={ globalStyle }
					overlay={ false }
					onClick={ () => handleClick( idx ) }
				/>
			);
		} );
	};

	return (
		<div className="theme-styles-preview--drawer">
			<div className="theme-styles-preview--drawer__list">
				<LivePreviewSkeleton
					className={ 'theme-styles-preview--drawer__list__item' }
					watch={ globalStyles && pattern }
					count={
						themeVariations[ currentStep?.patternId ]?.previewCount
					}
					callback={ buildPreviews }
					viewportWidth={ 900 }
				/>
			</div>
		</div>
	);
};

export default DesignThemeStylesPreview;
