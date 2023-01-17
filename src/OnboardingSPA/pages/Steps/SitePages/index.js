import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';

import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import { getPatterns } from '../../../utils/api/patterns';
import {
	THEME_STATUS_ACTIVE,
	THEME_STATUS_NOT_ACTIVE,
	SIDEBAR_LEARN_MORE,
	VIEW_NAV_DESIGN,
} from '../../../../constants';
import { DesignStateHandler } from '../../../components/StateHandlers';
import {
	GlobalStylesProvider,
	LivePreviewSelectableCardWithInfo,
} from '../../../components/LivePreview';
import LivePreviewSkeleton from '../../../components/LivePreview/LivePreviewSkeleton';

const StepSitePages = () => {
	const location = useLocation();
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ sitePages, setSitePages ] = useState();
	const [ checkedPages, setCheckedPages ] = useState( [] );

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
		updateThemeStatus,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setSidebarActiveView( SIDEBAR_LEARN_MORE );
		setDrawerActiveView( VIEW_NAV_DESIGN );
	}, [] );

	const getSitePages = async () => {
		const sitePagesResponse = await getPatterns( currentStep.patternId );
		if ( sitePagesResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		if ( sitePagesResponse?.body ) {
			setSitePages( sitePagesResponse.body );
			if ( currentData.data.sitePages?.other ) {
				if ( currentData.data.sitePages.other === false ) {
					setCheckedPages( [] );
				} else if ( currentData.data.sitePages.other.length !== 0 ) {
					setCheckedPages(
						flowDataToState( currentData.data.sitePages.other )
					);
				} else {
					const checkedPages = sitePagesResponse.body.reduce(
						( checkedPages, sitePage ) => {
							return sitePage?.selected && sitePage.selected
								? checkedPages.concat( sitePage.slug )
								: checkedPages;
						},
						[]
					);
					handleCheckedPages( checkedPages, sitePagesResponse.body );
				}
			}
		}
		setIsLoaded( true );
	};

	const stateToFlowData = ( selectedPages, sitePages ) => {
		return sitePages !== false
			? sitePages?.reduce( ( newSitePages, sitePage ) => {
					return selectedPages.includes( sitePage.slug )
						? newSitePages.concat( {
								slug: sitePage.slug,
								title: sitePage.title,
						  } )
						: newSitePages;
			  }, [] )
			: undefined;
	};

	const flowDataToState = ( selectedPages ) => {
		return selectedPages.map( ( selectedPage ) => {
			return selectedPage.slug;
		} );
	};

	const handleCheckedPages = ( selectedPages, sitePages = false ) => {
		setCheckedPages( selectedPages );
		currentData.data.sitePages.other =
			selectedPages.length !== 0
				? stateToFlowData( selectedPages, sitePages )
				: false;
		setCurrentOnboardingData( currentData );
	};

	const handleClick = ( isChecked, slug ) => {
		if ( isChecked === true && ! checkedPages.includes( slug ) ) {
			handleCheckedPages( checkedPages.concat( slug ), sitePages );
		} else if ( isChecked === false ) {
			handleCheckedPages(
				checkedPages.filter( ( selectedPage ) => {
					return selectedPage !== slug;
				} ),
				sitePages
			);
		}
	};

	const buildPreviews = () => {
		return (
			checkedPages &&
			sitePages?.map( ( sitePage, idx ) => {
				return (
					<LivePreviewSelectableCardWithInfo
						key={ idx }
						className={ 'site-pages__list__item' }
						blockGrammer={ sitePage.content }
						viewportWidth={ 1200 }
						styling={ 'custom' }
						overlay={ true }
						title={ sitePage?.title }
						slug={ sitePage.slug }
						selected={ checkedPages.includes( sitePage.slug ) }
						onClick={ handleClick }
						description={ sitePage?.description }
					/>
				);
			} )
		);
	};

	useEffect( () => {
		if ( ! isLoaded && themeStatus === THEME_STATUS_ACTIVE ) getSitePages();
	}, [ isLoaded, themeStatus ] );

	return (
		<DesignStateHandler>
			<GlobalStylesProvider>
				<CommonLayout>
					<div className="site-pages">
						<HeadingWithSubHeading
							title={ currentStep?.heading }
							subtitle={ currentStep?.subheading }
						/>
						<div className="site-pages__list">
							<LivePreviewSkeleton
								className={ 'site-pages__list__item' }
								count={
									themeVariations[ currentStep?.patternId ]
										?.previewCount
								}
								watch={ sitePages }
								isWithCard={ true }
								callback={ buildPreviews }
								viewportWidth={ 1200 }
							/>
						</div>
					</div>
				</CommonLayout>
			</GlobalStylesProvider>
		</DesignStateHandler>
	);
};

export default StepSitePages;
