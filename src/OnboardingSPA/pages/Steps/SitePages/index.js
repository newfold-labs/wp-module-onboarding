import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';

import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import { getPatterns } from '../../../utils/api/patterns';
import {
	VIEW_NAV_PRIMARY,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_NOT_ACTIVE,
} from '../../../../constants';
import { DesignStateHandler } from '../../../components/StateHandlers';
import {
	GlobalStylesProvider,
	LivePreviewSelectableCardWithInfo,
} from '../../../components/LivePreview';

const StepSitePages = () => {
	const isLargeViewport = useViewportMatch( 'medium' );

	const MAX_PREVIEWS_PER_ROW = 2;

	const location = useLocation();
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ sitePages, setSitePages ] = useState();
	const [ checkedPages, setCheckedPages ] = useState( [] );

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

	const {
		setDrawerActiveView,
		setIsDrawerOpened,
		setIsSidebarOpened,
		updateThemeStatus,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( ! isLargeViewport ) {
			setIsDrawerOpened( false );
		}
		setIsSidebarOpened( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
	}, [] );

	const getStyleAndPages = async () => {
		const sitePagesResponse = await getPatterns( currentStep.patternId );
		if ( sitePagesResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		if ( sitePagesResponse?.body ) {
			setSitePages( sitePagesResponse.body );
			if (
				currentData.data?.sitePages &&
				currentData.data.sitePages.length !== 0
			) {
				setCheckedPages( currentData.data.sitePages );
			} else {
				const checkedPages = sitePagesResponse.body
					.filter( ( sitePage ) => {
						return sitePage?.selected ? sitePage.selected : false;
					} )
					.map( ( checkedPage ) => {
						return checkedPage.slug;
					} );
				setCheckedPages( checkedPages );
			}
		}
		setIsLoaded( true );
	};

	const handleCheckedPages = ( selectedPages ) => {
		setCheckedPages( selectedPages );
		currentData.data.sitePages = selectedPages;
		setCurrentOnboardingData( currentData );
	};

	const handleClick = ( isChecked, slug ) => {
		if ( isChecked === true && ! checkedPages.includes( slug ) ) {
			return handleCheckedPages( checkedPages.concat( slug ) );
		}
		handleCheckedPages(
			checkedPages.filter( ( selectedPage ) => {
				return selectedPage !== slug;
			} )
		);
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
		if ( ! isLoaded && themeStatus === THEME_STATUS_ACTIVE )
			getStyleAndPages();
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
							{ sitePages &&
								buildPreviews().slice(
									0,
									MAX_PREVIEWS_PER_ROW
								) }
						</div>
						<div className="site-pages__list">
							{ sitePages &&
								buildPreviews().slice(
									MAX_PREVIEWS_PER_ROW,
									sitePages.length
								) }
						</div>
					</div>
				</CommonLayout>
			</GlobalStylesProvider>
		</DesignStateHandler>
	);
};

export default StepSitePages;
