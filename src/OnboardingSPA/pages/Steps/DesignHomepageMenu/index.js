import { useLocation } from 'react-router-dom';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

import { getPatterns } from '../../../utils/api/patterns';
import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import {
	VIEW_NAV_DESIGN,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_INIT,
	SIDEBAR_LEARN_MORE,
} from '../../../../constants';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import { DesignStateHandler } from '../../../components/StateHandlers';
import {
	LivePreviewSelectableCard,
	LivePreviewSkeleton,
	GlobalStylesProvider,
} from '../../../components/LivePreview';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';
import getContents from './contents';
import { ACTION_HOMEPAGE_LAYOUT_SELECTED } from '../../../utils/analytics/hiive/constants';

const StepDesignHomepageMenu = () => {
	const location = useLocation();
	const [ homepagePattern, setHomepagePattern ] = useState();
	const [ homepagePatternList, setHomepagePatternList ] = useState( [] );
	const [ selectedHomepage, setSelectedHomepage ] = useState( 0 );

	const { currentStep, currentData, themeStatus, themeVariations } =
		useSelect( ( select ) => {
			return {
				currentStep: select( nfdOnboardingStore ).getStepFromPath(
					location.pathname
				),
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
				themeVariations:
					select( nfdOnboardingStore ).getStepPreviewData(),
			};
		}, [] );

	const {
		setDrawerActiveView,
		setSidebarActiveView,
		setCurrentOnboardingData,
		updateThemeStatus,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setDrawerActiveView( VIEW_NAV_DESIGN );
	}, [] );

	function refactorPatterns( homepagePatternDataResp ) {
		const makeHomepagePattern = [];
		homepagePatternDataResp.forEach( ( homepagePatternData ) => {
			makeHomepagePattern.push( homepagePatternData.content );
			homepagePatternList.push( homepagePatternData.slug );
		} );
		setHomepagePatternList( homepagePatternList );
		return makeHomepagePattern;
	}

	async function getHomepagePatternsData() {
		const homepagePatternDataTemp = await getPatterns(
			currentStep.patternId
		);

		if ( homepagePatternDataTemp?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}

		setHomepagePattern( refactorPatterns( homepagePatternDataTemp?.body ) );

		if ( currentData?.data.sitePages.homepage !== '' ) {
			setSelectedHomepage(
				homepagePatternList?.indexOf(
					currentData?.data.sitePages.homepage
				)
			);
		} else {
			currentData.data.sitePages = {
				...currentData.data.sitePages,
				homepage: homepagePatternList[ 0 ],
			};
			setCurrentOnboardingData( currentData );
		}
	}

	function saveDataForHomepage( idx ) {
		setSelectedHomepage( idx );
		const homepage = homepagePatternList[ idx ];
		currentData.data.sitePages = {
			...currentData.data.sitePages,
			homepage,
		};
		setCurrentOnboardingData( currentData );
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_HOMEPAGE_LAYOUT_SELECTED, homepage )
		);
	}

	useEffect( () => {
		if ( themeStatus === THEME_STATUS_ACTIVE ) {
			getHomepagePatternsData();
		}
	}, [ themeStatus ] );

	const content = getContents();

	function buildHomepagePreviews() {
		return homepagePattern?.map( ( homepage, idx ) => {
			if ( homepage ) {
				return (
					<LivePreviewSelectableCard
						key={ idx }
						className={ 'homepage_preview__list__item' }
						selected={ idx === selectedHomepage }
						blockGrammer={ homepage }
						viewportWidth={ 1200 }
						styling={ 'custom' }
						overlay={ false }
						onClick={ () => saveDataForHomepage( idx ) }
					/>
				);
			}
			return null;
		} );
	}

	return (
		<DesignStateHandler>
			<GlobalStylesProvider>
				<CommonLayout>
					<div className="homepage_preview">
						<HeadingWithSubHeading
							title={ content.heading }
							subtitle={ content.subheading }
						/>
						<div className="homepage_preview__list">
							<LivePreviewSkeleton
								watch={ homepagePattern }
								count={
									themeVariations[ currentStep?.patternId ]
										?.previewCount
								}
								callback={ buildHomepagePreviews }
								className={ 'homepage_preview__list__item' }
								viewportWidth={ 1200 }
							/>
						</div>
					</div>
				</CommonLayout>
			</GlobalStylesProvider>
		</DesignStateHandler>
	);
};

export default StepDesignHomepageMenu;
