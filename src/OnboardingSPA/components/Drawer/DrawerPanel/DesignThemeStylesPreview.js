import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import { LivePreviewSelectableCard } from '../../LivePreview';
import { store as nfdOnboardingStore } from '../../../store';
import { getPatterns } from '../../../utils/api/patterns';
import { getGlobalStyles } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';

const DesignThemeStylesPreview = () => {
	const MAX_PREVIEWS_PER_ROW = 3;
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ pattern, setPattern ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState();
	const [ selectedStyle, setSelectedStyle ] = useState( '' );

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

	const { updatePreviewSettings, setCurrentOnboardingData } =
		useDispatch( nfdOnboardingStore );

	const getStylesAndPatterns = async () => {
		const pattern = await getPatterns( currentStep.patternId, true );
		const globalStyles = await getGlobalStyles();
		setPattern( pattern?.body );
		setGlobalStyles( globalStyles?.body );
		setSelectedStyle( currentData.data.theme.variation );
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
		if ( ! isLoaded ) getStylesAndPatterns();
	}, [ isLoaded ] );

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
