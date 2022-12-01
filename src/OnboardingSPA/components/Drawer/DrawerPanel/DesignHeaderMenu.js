import { useSelect, useDispatch, select } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import HeaderMenuPreview from '../../HeaderMenuPreview';
import { store as nfdOnboardingStore } from '../../../store';
import { getHeaderMenuPatterns, getDefaultHeaderMenu } from '../../../utils/api/patterns';
import { getGlobalStyles } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import {
	THEME_STATUS_ACTIVE,
	THEME_STATUS_NOT_ACTIVE,
} from '../../../../constants';

const DesignHomepageMenu = () => {
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ patterns, setPatterns ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState();
	const [ selectedPattern, setSelectedPattern ] = useState( '' );

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

	const getPatterns = async () => {
		const patternsResponse = await getHeaderMenuPatterns();
		if ( patternsResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
        setPatterns( patternsResponse?.body );

		if(!currentData.data.partHeader) {
			const defaultHeaderMenu = await getDefaultHeaderMenu();
			if ( defaultHeaderMenu?.error ) {
				return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
			}
			currentData.data.partHeader = defaultHeaderMenu.body;
		}
		setSelectedPattern(currentData.data.partHeader);

        if (
			document.getElementsByClassName(
				'theme-header-menu-preview--drawer__list__item__title-bar--selected'
			)
		) {
			document.getElementsByClassName(
					'theme-header-menu-preview--drawer__list__item__title-bar--selected'
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
			getPatterns();
	}, [ isLoaded, themeStatus ] );

	const handleClick = ( idx ) => {
		const selectedPattern = patterns[ idx ];
		// updatePreviewSettings(
		// 	useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		// );
		setSelectedPattern( selectedPattern.slug );
		currentData.data.partHeader = selectedPattern.slug;
		setCurrentOnboardingData( currentData );
	};

	const buildPreviews = () => {
		console.log(selectedPattern);
		return patterns?.map( ( pattern, idx ) => {
			return (
				<HeaderMenuPreview
					key={ idx }
					className={ 'theme-header-menu-preview--drawer__list__item' }
					selected={ pattern.slug === selectedPattern }
					blockGrammer={ pattern.content }
					viewportWidth={ 900 }
					styling={ 'custom' }
					overlay={ false }
					onClick={ () => handleClick( idx ) }
				/>
			);
		} );
	};

	return (
		<div className="theme-header-menu-preview--drawer">
			<div className="theme-header-menu-preview--drawer__list">
				{ patterns ? buildPreviews(): '' }
			</div>
		</div>
	);
};

export default DesignHomepageMenu;