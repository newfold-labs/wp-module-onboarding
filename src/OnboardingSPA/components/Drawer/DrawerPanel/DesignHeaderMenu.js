import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { store as nfdOnboardingStore } from '../../../store';
import { getPatterns } from '../../../utils/api/patterns';
import {
	LivePreviewSkeleton,
	LivePreviewSelectableCard,
} from '../../../components/LivePreview';
import { setFlow } from '../../../utils/api/flow';

import { THEME_STATUS_ACTIVE, THEME_STATUS_INIT } from '../../../../constants';

const DesignHeaderMenu = () => {
	const [ patterns, setPatterns ] = useState();
	const [ headerMenuPreviewData, setHeaderMenuPreviewData ] = useState();
	const [ selectedPattern, setSelectedPattern ] = useState( '' );
	const location = useLocation();

	const { currentStep, currentData, themeStatus, storedPreviewSettings } =
		useSelect( ( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getStepFromPath(
					location.pathname
				),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
				storedPreviewSettings:
					select( nfdOnboardingStore ).getStepPreviewData(),
			};
		}, [] );

	const { setCurrentOnboardingData, updateThemeStatus, setHeaderMenuData } =
		useDispatch( nfdOnboardingStore );

	const getPatternsData = async () => {
		const headerMenuPreviewResponse = await getPatterns(
			currentStep.patternId
		);
		if ( headerMenuPreviewResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}

		const headerMenuPatterns = [];
		headerMenuPreviewResponse?.body.forEach( ( pageParts ) => {
			if ( pageParts.header ) {
				headerMenuPatterns.push( pageParts );
			}
		} );

		if (
			! currentData.data.partHeader ||
			currentData.data.partHeader === ''
		) {
			currentData.data.partHeader = headerMenuPatterns[ 0 ].slug;
			setCurrentOnboardingData( currentData );
		}
		setSelectedPattern( currentData.data.partHeader );
		setHeaderMenuPreviewData( headerMenuPreviewResponse.body );
		setPatterns( headerMenuPatterns );

		let [ pageContent, headerContent, pagePreview ] = [ '', '', '' ];
		headerMenuPreviewResponse.body.forEach( ( pageParts ) => {
			if ( ! pageParts.header ) {
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

	const handleClick = async ( idx ) => {
		if ( document.getElementsByClassName( 'nfd-onboard-content' ) ) {
			document
				.getElementsByClassName( 'nfd-onboard-content' )[ 0 ]
				.scrollIntoView( {
					behavior: 'smooth',
				} );
		}

		const chosenPattern = patterns[ idx ];

		if ( chosenPattern.slug === selectedPattern ) {
			return true;
		}

		setSelectedPattern( chosenPattern.slug );
		currentData.data.partHeader = chosenPattern.slug;
		setCurrentOnboardingData( currentData );

		let newPagePattern = chosenPattern.content;
		headerMenuPreviewData.forEach( ( pageParts ) => {
			if ( ! pageParts.header ) {
				newPagePattern += pageParts.content;
			}
		} );
		setHeaderMenuData( newPagePattern );
		// API call to make sure the DB is in sync with the store for the selected header menu
		const result = await setFlow( currentData );
		if ( result?.error === null ) {
			setCurrentOnboardingData( currentData );
		}
	};

	const buildPreviews = () => {
		return patterns?.map( ( pattern, idx ) => {
			return (
				<LivePreviewSelectableCard
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
		<LivePreviewSkeleton
			count={
				storedPreviewSettings[ currentStep?.patternId ]?.previewCount
			}
			watch={ patterns }
			callback={ buildPreviews }
			className={ 'theme-header-menu-preview--drawer__list__item' }
			viewportWidth={ 900 }
		/>
	);
};

export default DesignHeaderMenu;
