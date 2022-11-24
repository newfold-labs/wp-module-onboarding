import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import { LivePreviewSelectableCard } from '../../LivePreview';
import { store as nfdOnboardingStore } from '../../../store';
import { getPatterns } from '../../../utils/api/patterns';
import { getGlobalStyles } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import {
	THEME_STATUS_ACTIVE,
	THEME_STATUS_NOT_ACTIVE,
} from '../../../../constants';

const DesignThemeStylesPreview = () => {
	const MAX_PREVIEWS_PER_ROW = 3;
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ pattern, setPattern ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState();
	const [ selectedStyle, setSelectedStyle ] = useState( '' );

	const { currentStep, currentData, storedPreviewSettings, themeStatus } =
		useSelect( ( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				storedPreviewSettings:
					select( nfdOnboardingStore ).getPreviewSettings(),
				themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			};
		}, [] );

	const {
		updatePreviewSettings,
		setCurrentOnboardingData,
		updateThemeStatus,
	} = useDispatch( nfdOnboardingStore );

	const getStylesAndPatterns = async () => {
		const patternResponse = await getPatterns(
			currentStep.patternId,
			true
		);
		if ( patternResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		const globalStylesResponse = await getGlobalStyles( true );
		if ( globalStylesResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		setPattern( patternResponse?.body );
		setGlobalStyles( globalStylesResponse?.body );
		let selectedGlobalStyle;
		if ( currentData.data.theme.variation ) {
			selectedGlobalStyle = currentData.data.theme.variation;
		} else {
			selectedGlobalStyle = globalStylesResponse.body[ 0 ].title;
			currentData.data.theme.variation = selectedGlobalStyle;
			setCurrentOnboardingData( currentData );
		}
		setSelectedStyle( selectedGlobalStyle );
		if (
			document.getElementsByClassName(
				'theme-styles-preview--drawer__list__item__title-bar--selected'
			)
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
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded && themeStatus === THEME_STATUS_ACTIVE )
			getStylesAndPatterns();
	}, [ isLoaded, themeStatus ] );

	const handleClick = ( idx ) => {
		const selectedGlobalStyle = globalStyles[ idx ];
		updatePreviewSettings(
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);
		setSelectedStyle( selectedGlobalStyle.title );
		currentData.data.theme.variation = selectedGlobalStyle.title;
		setCurrentOnboardingData( currentData );
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
				{ globalStyles
					? buildPreviews().slice( 0, MAX_PREVIEWS_PER_ROW )
					: '' }
			</div>
			<div className="theme-styles-preview--drawer__list">
				{ globalStyles
					? buildPreviews().slice(
							MAX_PREVIEWS_PER_ROW,
							globalStyles.length
					  )
					: '' }
			</div>
		</div>
	);
};

export default DesignThemeStylesPreview;
