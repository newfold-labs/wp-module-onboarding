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
	const [ pagesRender, setPagesRender ] = useState( false );
	const [ headerMenuPreviewData, setHeaderMenuPreviewData ] = useState();
	const [ selectedPattern, setSelectedPattern ] = useState( '' );
	const location = useLocation();

	const { editEntityRecord } = useDispatch( coreStore );
	const { getEntityRecords, getEditedEntityRecord } = useSelect( ( select ) => {
		return select( coreStore );
	}, [] );

	const pages = useSelect(
		select =>
			select( coreStore ).getEntityRecords( 'postType', 'page' ),
		[]
	);

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
		console.log(pages);
		if( pages != null) {
			pageList = filteredPageList( pages );
			updatePageEntityData( pageList );
			setPagesRender( true );
		}
	}, [ pages ] );

	useEffect( () => {
		if ( ! isLoaded && themeStatus === THEME_STATUS_ACTIVE ) {
			getPatternsData();
		}
	}, [ isLoaded, themeStatus ] );

	const updatePageEntityData = ( pages ) => {
		pages?.map( ( page, idx ) => {
			console.log( page.id + ' = ' + JSON.stringify(page.title) );
			editEntityRecord( 'postType', 'page',
				page.id,
				{ title: defaultMenuItems[idx] }
			);
			getEditedEntityRecord( 'postType', 'page', page.id);
		});
	};

	const filteredPageList = ( pages ) => {
		return filter(
			pages,
			( page, idx ) => idx < 6
		);
	};

	const replaceNavigationGrammar = ( pageGrammar, headerSlug ) => {
		if( headerSlug.includes('split') ) {
			let menuGrammarDummy = '',
				menuNavigationGrammar = '<!-- wp:navigation-link {"isTopLevelLink":true} /-->';
			defaultMenuItems.map( ( item ) => {
				menuGrammarDummy = '<!-- wp:navigation-link {"isTopLevelLink":true, "label":"' + item + '", "title":"' + item + '", "url":"' + wpSiteUrl + '"} /-->';
				pageGrammar = pageGrammar.replace( menuNavigationGrammar, menuGrammarDummy);
			});
		}
		//  else {
		// 	let menuNavigationRegex = /<!-- wp:navigation (.*?)(\/)-->/ig,
		// 		menuNavigationGrammar = "<!-- wp:navigation $1-->",
		// 		menuDummyLinks = '';
		// 	defaultMenuItems.map( ( item ) => {
		// 		menuDummyLinks = '<!-- wp:navigation-link {"isTopLevelLink":true, "label":"' + item + '", "title":"' + item + '", "url":"' + wpSiteUrl + '"} /-->';
		// 		menuNavigationGrammar += menuDummyLinks;
		// 	});
		// 	menuNavigationGrammar += '<!-- /wp:navigation -->';
		// 	pageGrammar = pageGrammar.replace( menuNavigationRegex, menuNavigationGrammar);
		// }
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
					{ pagesRender && buildPreviews() }
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
