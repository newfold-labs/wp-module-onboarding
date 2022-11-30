import { useSelect, useDispatch, select } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import HeaderMenuPreview from '../../HeaderMenuPreview';
import { store as nfdOnboardingStore } from '../../../store';
import {
	getPatterns,
	getHeaderMenuPatterns,
	getDefaultHeaderMenu,
} from '../../../utils/api/patterns';
import { getGlobalStyles } from '../../../utils/api/themes';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import {
	THEME_STATUS_ACTIVE,
	THEME_STATUS_NOT_ACTIVE,
} from '../../../../constants';

const DesignHomepageMenu = () => {
	const headerMenuSlugs = [ 
		'site-header-left-logo-navigation-inline', 
		'site-header-left-logo-navigation-below',
		'site-header-centered',
		'site-header-centered-logo-split-menu'
	];
	const headerMenuBodySlugs = [ 'homepage-1', 'site-footer'];

	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ patterns, setPatterns ] = useState();
	const [ headerMenuPreviewData, setHeaderMenuPreviewData ] = useState();
	const [ globalStyles, setGlobalStyles ] = useState();
	const [ selectedPattern, setSelectedPattern ] = useState( '' );

	const { currentStep, currentData, storedPreviewSettings, themeStatus, headerMenu } =
		useSelect( ( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getCurrentStep(),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				storedPreviewSettings:
					select( nfdOnboardingStore ).getPreviewSettings(),
				themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
				headerMenu:  select( nfdOnboardingStore ).getHeaderMenuData(),
			};
		}, [] );

	const {
		updatePreviewSettings,
		setCurrentOnboardingData,
		updateThemeStatus,
		setHeaderMenuData,
	} = useDispatch( nfdOnboardingStore );

	const getPatternsData = async () => {
		const headerMenuPreviewResponse = await getPatterns( currentStep.patternId );
		if ( headerMenuPreviewResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		setHeaderMenuPreviewData(headerMenuPreviewResponse.body);

		// let headerMenuPatterns = [];
		// headerMenuPreviewResponse.body.forEach( ( pageParts ) => {
		// 	if(headerMenuSlugs.includes(pageParts.slug)){
		// 		console.log(pageParts.content);
		// 		headerMenuPatterns.push(pageParts.content);
		// 	}
		// });
		// console.log(headerMenuPatterns);

		const patternsResponse = await getHeaderMenuPatterns();
		if ( patternsResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		setPatterns( patternsResponse?.body );

		if ( ! currentData.data.partHeader || currentData.data.partHeader == "" ) {
			const defaultHeaderMenu = await getDefaultHeaderMenu();
			if ( defaultHeaderMenu?.error ) {
				return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
			}
			currentData.data.partHeader = defaultHeaderMenu.body;
			setCurrentOnboardingData( currentData );
		}
		setSelectedPattern( currentData.data.partHeader );
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded && themeStatus === THEME_STATUS_ACTIVE ) getPatternsData();
	}, [ isLoaded, themeStatus ] );

	const handleClick = ( idx ) => {
		const selectedPattern = patterns[ idx ];
		setSelectedPattern( selectedPattern.slug );
		currentData.data.partHeader = selectedPattern.slug;
		setCurrentOnboardingData( currentData );

		let newPagePattern = selectedPattern.content;
		headerMenuPreviewData.forEach( ( pageParts ) => {
			if(headerMenuBodySlugs.includes(pageParts.slug)){
				newPagePattern += pageParts.content;
			}
		});
		setHeaderMenuData( newPagePattern );
	};

	const buildPreviews = () => {
		return patterns?.map( ( pattern, idx ) => {
			return (
				<HeaderMenuPreview
					key={ idx }
					className={
						'theme-header-menu-preview--drawer__list__item'
					}
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
				{ patterns ? buildPreviews() : '' }
			</div>
		</div>
	);
};

export default DesignHomepageMenu;
