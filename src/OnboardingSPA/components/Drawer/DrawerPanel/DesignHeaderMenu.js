import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import HeaderMenuPreview from '../../HeaderMenuPreview';
import { store as nfdOnboardingStore } from '../../../store';
import { getPatterns } from '../../../utils/api/patterns';
import { GlobalStylesProvider, LivePreviewSkeleton } from '../../../components/LivePreview';
import { store as coreStore } from '@wordpress/core-data';
import { wpSiteUrl } from '../../../../constants';
import { filter } from 'lodash';

import {
	THEME_STATUS_ACTIVE,
	THEME_STATUS_NOT_ACTIVE,
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
	let pageList = [];

	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ patterns, setPatterns ] = useState();
	const [ headerMenuPreviewData, setHeaderMenuPreviewData ] = useState();
	const [ selectedPattern, setSelectedPattern ] = useState( '' );
	const location = useLocation();

	const { editEntityRecord, getEntityRecords } = useSelect( ( select ) => {
		return select( coreStore );
	}, [] );

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

	const filteredPageList = () => {
		return filter(
			getEntityRecords( 'postType', 'page' ),
			( page, idx ) => idx < 6
		);
	};

	const getPatternsData = async () => {
		pageList = filteredPageList();
		console.log('pagelist = ' + pageList.length);

		const headerMenuPreviewResponse = await getPatterns(
			currentStep.patternId
		);
		if ( headerMenuPreviewResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		setHeaderMenuPreviewData( headerMenuPreviewResponse.body );

		const headerMenuPatterns = [];
		headerMenuPreviewResponse.body.forEach( ( pageParts ) => {
			if ( headerMenuSlugs.includes( pageParts.slug ) ) {
				pageParts.content = replaceNavigationGrammar( pageParts.content, pageParts.slug );
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
		setIsLoaded( true );
	};

	useEffect( () => {
		if ( ! isLoaded && themeStatus === THEME_STATUS_ACTIVE )
			// pageList = getEntityRecords( 'postType', 'page' );
			getPatternsData();
		}, [ isLoaded, themeStatus ] );

	const updatePageEntityData = ( ) => {
		pageList.map( ( page, idx ) => {
			editEntityRecord( 'postType', 'page',
				page.id,
				{ title: defaultMenuItems[idx] }
			);
		});
	};

	const replaceNavigationGrammar = ( pageGrammar, headerSlug ) => {
		if( headerSlug.includes('split') ) {
			let menuGrammarDummy = '',
				menuNavigationGrammar = '<!-- wp:navigation-link {"isTopLevelLink":true} /-->';
			defaultMenuItems.map( ( item, idx ) => {
				menuGrammarDummy = '<!-- wp:navigation-link {"isTopLevelLink":true, "label":"' + item + '", "title":"' + item + '", "url":"' + wpSiteUrl + '"} /-->';
				pageGrammar = pageGrammar.replace( menuNavigationGrammar, menuGrammarDummy);
			});
		}
		return pageGrammar;
	}

	const handleClick = ( idx ) => {

		updatePageEntityData();

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
		const headerMenuPreviews = [];

		patterns?.map( ( pattern, idx ) => {
			headerMenuPreviews.push(
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

		return headerMenuPreviews;
	};

	return (
		<GlobalStylesProvider>
			<div className="theme-header-menu-preview--drawer">
				<div className="theme-header-menu-preview--drawer__list">
					{ buildPreviews() }
					{/* { <LivePreviewSkeleton 
						className={ 'theme-styles-preview--drawer__list__item' }
						watch={patterns}
						count = {4}
						callback = {buildPreviews}
						viewportWidth={ 900 }
					/> } */}
				</div>
			</div>
		</GlobalStylesProvider>
	);
};

export default DesignHeaderMenu;
