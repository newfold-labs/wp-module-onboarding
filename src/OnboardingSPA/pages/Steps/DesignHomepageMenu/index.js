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

const StepDesignHomepageMenu = () => {
	const location = useLocation();
	const [ homepagePattern, setHomepagePattern ] = useState();
	const [ homepagePatternList, setHomepagePatternList ] = useState( [] );
	const [ selectedHomepage, setSelectedHomepage ] = useState( 0 );

	const {
		currentStep,
		currentData,
		storedPreviewSettings,
		themeStatus,
		themeVariations,
	} = useSelect( ( select ) => {
		return {
			currentStep: select( nfdOnboardingStore ).getStepFromPath(
				location.pathname
			),
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			storedPreviewSettings:
				select( nfdOnboardingStore ).getPreviewSettings(),
			themeStatus: select( nfdOnboardingStore ).getThemeStatus(),
			themeVariations: select( nfdOnboardingStore ).getStepPreviewData(),
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
		const homepageSlugs = {};

		for ( let idx = 0; idx < homepagePatternDataResp.length; idx++ ) {
			homepageSlugs[ homepagePatternDataResp[ idx ].slug ] = idx;
		}

		homepagePatternDataResp.forEach( ( homepagePatternData ) => {
			if ( homepagePatternData.slug.includes( 'homepage' ) ) {
				const homepagePatterns = homepagePatternData?.list;
				if (
					currentData.data.partHeader ||
					currentData.data.partHeader !== ''
				) {
					homepagePatterns[ 0 ] = currentData.data.partHeader;
				}
				let patternData = '';
				homepagePatterns.forEach( ( partSlug ) => {
					patternData +=
						homepagePatternDataResp[ homepageSlugs[ partSlug ] ]
							?.content;
				} );
				makeHomepagePattern.push( patternData );
			}
		} );

		return makeHomepagePattern;
	}

	async function getHomepagePatternsData() {
		const homepagePatternDataTemp = await getPatterns(
			currentStep.patternId
		);
		const homepagePatternSlugList = [];

		if ( homepagePatternDataTemp?.error ) {
			return updateThemeStatus( THEME_STATUS_INIT );
		}
		setHomepagePattern( refactorPatterns( homepagePatternDataTemp?.body ) );

		homepagePatternDataTemp?.body.forEach( ( homepagePatternData ) => {
			if ( homepagePatternData.slug.includes( 'homepage' ) ) {
				homepagePatternSlugList.push( homepagePatternData.slug );
			}
		} );
		setHomepagePatternList( homepagePatternSlugList );

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
		currentData.data.sitePages = {
			...currentData.data.sitePages,
			homepage: homepagePatternList[ idx ],
		};
		setCurrentOnboardingData( currentData );
	}

	useEffect( () => {
		if ( themeStatus === THEME_STATUS_ACTIVE ) {
			getHomepagePatternsData();
		}
	}, [ themeStatus ] );

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
						previewSettings={ storedPreviewSettings }
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
							title={ currentStep?.heading }
							subtitle={ currentStep?.subheading }
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
