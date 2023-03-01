import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { store as nfdOnboardingStore } from '../../../store';
import { getPatterns } from '../../../utils/api/patterns';
import { LivePreviewSkeleton, LivePreviewSelectableCard } from '../../../components/LivePreview';
import { wpSiteUrl } from '../../../../constants';

import {
	THEME_STATUS_ACTIVE,
	THEME_STATUS_INIT,
} from '../../../../constants';

const DesignHeaderMenu = () => {
	const headerMenuSlugs = [
		'yith-wonder/site-header-left-logo-navigation-inline',
		'yith-wonder/site-header-left-logo-navigation-below',
		'yith-wonder/site-header-centered',
		'yith-wonder/site-header-splitted-menu',
	];
	const headerMenuBodySlugs = [
		'yith-wonder/homepage-1',
		'yith-wonder/site-footer',
	];

	const defaultMenuItems = [ 'Home', 'About', 'Contact', 'News', 'Privacy', 'Careers' ];

	const [ patterns, setPatterns ] = useState();
	const [ headerMenuPreviewData, setHeaderMenuPreviewData ] = useState();
	const [ selectedPattern, setSelectedPattern ] = useState( '' );
	const location = useLocation();

	const { currentStep, currentData, themeStatus } = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getStepFromPath(
				location.pathname
			),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
		};
	}, [] );

	const { setCurrentOnboardingData, updateThemeStatus, setHeaderMenuData } = useDispatch( nfdOnboardingStore );

	const getPatternsData = async () => {

		const headerMenuPreviewResponse = await getPatterns(
			currentStep.patternId
		);
		if ( headerMenuPreviewResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setHeaderMenuPreviewData( headerMenuPreviewResponse.body );

		const headerMenuPatterns = [];
		headerMenuPreviewResponse.body.forEach( ( pageParts ) => {
			if ( headerMenuSlugs.includes( pageParts.slug ) ) {
				if( pageParts.slug.includes('split') ) {
					pageParts.content = replaceNavigationGrammar( pageParts.content );
				}
				headerMenuPatterns.push( pageParts );
			}
		} );
		setPatterns( headerMenuPatterns );

		if (
			! currentData.data.partHeader ||
			currentData.data.partHeader === ''
		) {
			currentData.data.partHeader = headerMenuSlugs[ 0 ];
			setCurrentOnboardingData( currentData );
		}
		setSelectedPattern( currentData.data.partHeader );

		let [ pageContent, headerContent, pagePreview ] = [ '', '', '' ];
		headerMenuPreviewResponse.body.forEach( ( pageParts ) => {
			if ( headerMenuBodySlugs.includes( pageParts.slug ) ) {
				pageContent += pageParts.content;
			}
			if ( pageParts.slug === currentData.data.partHeader ) {
				headerContent += pageParts.content;
			}
		} );
		pagePreview = headerContent + pageContent;
		setHeaderMenuData( pagePreview );
	};

	useEffect( () => {
		if ( themeStatus === THEME_STATUS_ACTIVE ) {
			getPatternsData();
		}
	}, [ themeStatus ] );

	const replaceNavigationGrammar = ( pageGrammar ) => {
		let menuGrammarDummy = '',
			menuNavigationGrammar = '<!-- wp:navigation-link {"isTopLevelLink":true} /-->';
		defaultMenuItems.map( ( item ) => {
			menuGrammarDummy = '<!-- wp:navigation-link {"isTopLevelLink":true, "label":"' + item + '", "title":"' + item + '", "url":"' + wpSiteUrl + '"} /-->';
			pageGrammar = pageGrammar.replace( menuNavigationGrammar, menuGrammarDummy);
		});
		return pageGrammar;
	}

	const handleClick = ( idx ) => {

		if ( document.getElementsByClassName( 'nfd-onboard-content' ) ) {
			document.getElementsByClassName( 'nfd-onboard-content' )[0]
				.scrollIntoView( {
					behavior: 'smooth',
				} );
		}

		const selectedPattern = patterns[ idx ];

		setSelectedPattern( selectedPattern.slug );
		currentData.data.partHeader = selectedPattern.slug;
		setCurrentOnboardingData( currentData );

		let newPagePattern = selectedPattern.content;
		headerMenuPreviewData.forEach( ( pageParts ) => {
			if ( headerMenuBodySlugs.includes( pageParts.slug ) ) {
				newPagePattern += pageParts.content;
			}
		} );
		setHeaderMenuData( newPagePattern );
	};

	const buildPreviews = () => {
		return patterns?.map( ( pattern, idx ) => {
			return (
				<LivePreviewSelectableCard
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
		<LivePreviewSkeleton
			count = { 4 }
			watch={ patterns }
			callback = { buildPreviews }
			className={ 'theme-header-menu-preview--drawer__list__item' }
			viewportWidth={ 900 }
		/>
	);
};

export default DesignHeaderMenu;
