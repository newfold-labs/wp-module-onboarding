import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useNavigate, useLocation } from 'react-router-dom';
import { useViewportMatch } from '@wordpress/compose';

import { store as nfdOnboardingStore } from '../../../store';
import CommonLayout from '../../../components/Layouts/Common';
import { LivePreview, LivePreviewSelectableCard } from '../../../components/LivePreview';
import HeadingWithSubHeading from '../../../components/HeadingWithSubHeading';
import { useGlobalStylesOutput } from '../../../utils/global-styles/use-global-styles-output';
import { getPatterns } from '../../../utils/api/patterns';
import { getGlobalStyles } from '../../../utils/api/themes';
import {
	VIEW_NAV_PRIMARY,
	THEME_STATUS_ACTIVE,
	THEME_STATUS_NOT_ACTIVE,
} from '../../../../constants';
import { DesignStateHandler } from '../../../components/StateHandlers';
import SelectableCardWithTitleAndDescription from '../../../components/LivePreview/SelectableCardWithTitleAndDescription';

const StepSitePages = () => {
	const isLargeViewport = useViewportMatch( 'medium' );

	const MAX_PREVIEWS_PER_ROW = 2;

	const location = useLocation();
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ sitePages, setSitePages ] = useState();
	const [ globalStyle, setGlobalStyle ] = useState();

	const {
		currentStep,
		currentData,
		themeStatus,
		storedPreviewSettings
	} = useSelect( ( select ) => {
		return {
			storedPreviewSettings: select( nfdOnboardingStore ).getPreviewSettings(),
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
		updatePreviewSettings
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		if ( ! isLargeViewport ) {
			setIsDrawerOpened( false );
		}
		setIsSidebarOpened( false );
		setDrawerActiveView( VIEW_NAV_PRIMARY );
	}, [] );

	const getStylesAndPatterns = async () => {
		const sitePagesResponse = await getPatterns(
			currentStep.patternId,
		);
		if ( sitePagesResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		setSitePages( sitePagesResponse?.body );
		const globalStylesResponse = await getGlobalStyles();
		if ( globalStylesResponse?.error ) {
			return updateThemeStatus( THEME_STATUS_NOT_ACTIVE );
		}
		let selectedGlobalStyle;
		if ( currentData.data.theme.variation ) {
			selectedGlobalStyle = globalStylesResponse.body.filter(
				( globalStyle ) =>
					globalStyle.title === currentData.data.theme.variation
			)[ 0 ];
		} else {
			selectedGlobalStyle = globalStylesResponse.body[ 0 ];
		}
		updatePreviewSettings(
			useGlobalStylesOutput( selectedGlobalStyle, storedPreviewSettings )
		);
		if ( selectedGlobalStyle ) {
			setGlobalStyle( selectedGlobalStyle );
		}
		setIsLoaded( true );
	};

	const buildPreviews = () => {
		return sitePages?.map((sitePage, idx) => {
			return (
				<SelectableCardWithTitleAndDescription
				key={ idx }
				className={ 'site-pages__list__item' }
				blockGrammer={ sitePage.content }
				viewportWidth={ 1200 }
				styling={ 'custom' }
				overlay={ true } />
			)
		})
	}

	useEffect( () => {
		if ( ! isLoaded && themeStatus === THEME_STATUS_ACTIVE )
			getStylesAndPatterns();
	}, [ isLoaded, themeStatus ] );

	return (
		<DesignStateHandler>
			<CommonLayout>
				<div className='site-pages'>
					<HeadingWithSubHeading
					title={currentStep?.heading}
					subtitle={currentStep?.subheading}
					/>
				<div className='site-pages__list'>
					{ sitePages && buildPreviews().slice( 0, MAX_PREVIEWS_PER_ROW ) }
				</div>
				<div className='site-pages__list'>
				{ sitePages && buildPreviews().slice( MAX_PREVIEWS_PER_ROW, sitePages.length ) }
				</div>
				</div>
			</CommonLayout>
		</DesignStateHandler>
	);
};

export default StepSitePages;
