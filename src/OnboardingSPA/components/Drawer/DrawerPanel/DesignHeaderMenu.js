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
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import { ACTION_HEADER_SELECTED } from '../../../utils/analytics/hiive/constants';

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
			currentStep?.data?.patternId
		);
		if ( headerMenuPreviewResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}

		const headerMenuPatterns = headerMenuPreviewResponse?.body.pageHeaders;
		const footerPattern = headerMenuPreviewResponse?.body.pageFooter;
		const pageContent = headerMenuPreviewResponse?.body.pageBody;

		if (
			( ! currentData.data.partHeader ||
				currentData.data.partHeader === '' ) &&
			headerMenuPatterns?.length > 0
		) {
			currentData.data.partHeader = headerMenuPatterns[ 0 ].slug;
			setCurrentOnboardingData( currentData );
		}

		if (
			( ! currentData.data?.partFooter ||
				currentData.data?.partFooter === '' ) &&
			footerPattern?.length > 0
		) {
			currentData.data.partFooter = footerPattern.slug;
			setCurrentOnboardingData( currentData );
		}
		setSelectedPattern( currentData.data.partHeader );
		setHeaderMenuPreviewData( headerMenuPreviewResponse.body );
		setPatterns( headerMenuPatterns );

		// read the header menu array to get the selected header pattern and combine it with body content
		let [ headerContent, pagePreview ] = [ '', '' ];
		headerMenuPatterns?.forEach( ( headerMenu ) => {
			if ( headerMenu.slug === currentData.data.partHeader ) {
				headerContent = headerMenu.content;
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

	useEffect( () => {
		/* choose the first pattern if the fallback pattern is replaced with priamry/secondary type */
		if (
			patterns?.length > 0 &&
			! patterns.some( ( pattern ) => pattern.slug === selectedPattern )
		) {
			updateSelectedPattern( patterns[ 0 ] );
		}
	}, [ patterns, selectedPattern ] );

	const updateSelectedPattern = ( pattern ) => {
		setSelectedPattern( pattern.slug );
		currentData.data.partHeader = pattern.slug;
		setCurrentOnboardingData( currentData );

		const newPagePattern = pattern.content + headerMenuPreviewData.pageBody;
		setHeaderMenuData( newPagePattern );

		setFlow( currentData ).then( ( result ) => {
			if ( ! result?.error ) {
				setCurrentOnboardingData( currentData );
			}
		} );
	};

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

		updateSelectedPattern( chosenPattern );
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_HEADER_SELECTED, chosenPattern )
		);
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
				storedPreviewSettings[ currentStep?.data?.patternId ]
					?.previewCount
			}
			watch={ patterns }
			callback={ buildPreviews }
			className={ 'theme-header-menu-preview--drawer__list__item' }
			viewportWidth={ 900 }
		/>
	);
};

export default DesignHeaderMenu;
