// WordPress
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

// Third-party
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep, isEmpty } from 'lodash';

// Classes and functions
import getContents from './contents';
import { getHomepages, regenerateHomepage } from '../../../utils/api/siteGen';
import { getGlobalStyles } from '../../../utils/api/themes';
import {
	OnboardingEvent,
	trackOnboardingEvent,
} from '../../../utils/analytics/hiive';

// Components
import CommonLayout from '../../../components/Layouts/Common';
import { SiteGenPreviewSelectableCard } from '../../../components/LivePreview';
import HeartAnimation from './heartAnimation';
import RegeneratingSiteCard from './regeneratingCard';
import Animate from '../../../components/Animate';
import { SiteGenStateHandler } from '../../../components/StateHandlers';

// Misc
import {
	ACTION_SITEGEN_HOMEPAGE_FAVORITED,
	ACTION_SITEGEN_HOMEPAGE_REGENERATED,
	ACTION_SITEGEN_HOMEPAGE_SELECTED,
	ACTION_SITEGEN_SITE_GENERATION_TIME,
} from '../../../utils/analytics/hiive/constants';
import { SITEGEN_FLOW } from '../../../data/flows/constants';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

const SiteGenPreview = () => {
	const [ homepages, setHomepages ] = useState( false );
	const [ isRegenerating, setIsRegenerating ] = useState( false );
	const [ isPreviewLoading, setIsPreviewLoading ] = useState( false );
	const [ globalStyles, setGlobalStyles ] = useState( false );

	const navigate = useNavigate();
	const prevSiteGenErrorStatus = useRef();

	const { currentData, nextStep, siteGenErrorStatus } = useSelect(
		( select ) => {
			return {
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				nextStep: select( nfdOnboardingStore ).getNextStep(),
				siteGenErrorStatus:
					select( nfdOnboardingStore ).getSiteGenErrorStatus(),
			};
		}
	);

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setCurrentOnboardingData,
		updateInitialize,
		setHideFooterNav,
		updateSiteGenErrorStatus,
		setIsHeaderNavigationEnabled,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setHideFooterNav( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		updateInitialize( true );
		setIsHeaderNavigationEnabled( false );
	}, [] );

	useEffect( () => {
		if (
			prevSiteGenErrorStatus.current === true &&
			siteGenErrorStatus === false
		) {
			loadHomepages();
			loadGlobalStyles();
		}
		prevSiteGenErrorStatus.current = siteGenErrorStatus;
	}, [ siteGenErrorStatus ] );

	const loadHomepages = async () => {
		setIsPreviewLoading( true );
		if ( ! isEmpty( currentData.sitegen.homepages.data ) ) {
			setHomepages( currentData.sitegen.homepages.data );
			setIsPreviewLoading( false );
			trackSiteGenerationTime();
			return;
		}
		if ( currentData.sitegen.siteDetails?.prompt === '' ) {
			setIsPreviewLoading( false );
			return;
		}

		const response = await getHomepages(
			currentData.sitegen.siteDetails.prompt
		);

		if ( response.error ) {
			setIsPreviewLoading( false );
			updateSiteGenErrorStatus( true );
			return;
		}

		currentData.sitegen.homepages.data = response.body;
		setHomepages( response.body );
		setCurrentOnboardingData( currentData );
		setIsPreviewLoading( false );
		trackSiteGenerationTime();
	};

	const trackSiteGenerationTime = () => {
		if ( window.nfdOnboarding.siteGenTimerInterval ) {
			clearInterval( window.nfdOnboarding.siteGenTimerInterval );
			trackOnboardingEvent(
				new OnboardingEvent(
					ACTION_SITEGEN_SITE_GENERATION_TIME,
					window.nfdOnboarding.siteGenTime,
					{
						source: SITEGEN_FLOW,
					}
				)
			);
		}
	};

	const loadGlobalStyles = async () => {
		const globalStylesResponse = await getGlobalStyles();
		if ( globalStylesResponse.error ) {
			setIsPreviewLoading( false );
			return;
		}
		setGlobalStyles( globalStylesResponse.body );
	};

	useEffect( () => {
		loadHomepages();
		loadGlobalStyles();
	}, [] );

	const handlePreview = ( slug, position ) => {
		if ( ! ( slug in homepages ) ) {
			return false;
		}
		currentData.sitegen.homepages.active = homepages[ slug ];
		currentData.sitegen.skipCache = false;
		setCurrentOnboardingData( currentData );
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_SITEGEN_HOMEPAGE_SELECTED, slug, {
				position,
				source: SITEGEN_FLOW,
			} )
		);
		navigate( nextStep.path );
	};

	const scrollSelectionIntoView = () => {
		if (
			document.getElementsByClassName(
				'nfd-onboarding-step--site-gen__preview__note'
			)
		) {
			document
				.getElementsByClassName(
					'nfd-onboarding-step--site-gen__preview__note'
				)[ 0 ]
				.scrollIntoView( {
					behavior: 'smooth',
					block: 'end',
				} );
		}
	};

	const handleFavorite = ( slug, position ) => {
		if ( ! ( slug in homepages ) ) {
			return;
		}
		const isFavorite = ! homepages[ slug ].isFavorite;
		homepages[ slug ].isFavorite = isFavorite;
		currentData.sitegen.homepages.data = homepages;
		setHomepages( homepages );
		setCurrentOnboardingData( currentData );

		trackOnboardingEvent(
			new OnboardingEvent( ACTION_SITEGEN_HOMEPAGE_FAVORITED, slug, {
				favorite: isFavorite,
				placement: 'preview_grid',
				position,
				source: SITEGEN_FLOW,
			} )
		);
	};

	const handleRegenerate = async ( slug, palette, isFavorite, position ) => {
		scrollSelectionIntoView();
		setIsRegenerating( true );
		if ( ! ( slug in homepages ) ) {
			setIsRegenerating( false );
			return;
		}

		if ( currentData.sitegen.siteDetails?.prompt === '' ) {
			setIsRegenerating( false );
			return;
		}

		const response = await regenerateHomepage(
			currentData.sitegen.siteDetails.prompt,
			slug,
			palette,
			isFavorite
		);

		if ( response.error ) {
			setIsRegenerating( false );
			return;
		}

		const regeneratedHomepage = response.body;
		homepages[ regeneratedHomepage.slug ] = regeneratedHomepage;
		currentData.sitegen.homepages.data = homepages;
		setHomepages( homepages );
		setCurrentOnboardingData( currentData );
		setIsRegenerating( false );
		trackOnboardingEvent(
			new OnboardingEvent( ACTION_SITEGEN_HOMEPAGE_REGENERATED, slug, {
				position,
				source: SITEGEN_FLOW,
				placement: 'preview_grid',
			} )
		);
	};

	const buildPreviews = () => {
		if ( ! ( homepages && globalStyles ) || isPreviewLoading ) {
			return (
				<RegeneratingSiteCard count={ 3 } isRegenerating={ false } />
			);
		}

		return Object.keys( homepages ).map( ( slug, idx ) => {
			const data = homepages[ slug ];
			const newPreviewSettings = cloneDeep( globalStyles[ 0 ] );
			newPreviewSettings.settings.color.palette = data.color.palette;
			const body =
				data.styles?.blocks[ 0 ]?.[ 'core/body' ]?.typography
					?.fontFamily;
			const headings =
				data.styles?.blocks[ 0 ]?.[ 'core/heading' ]?.typography
					?.fontFamily;
			if ( newPreviewSettings.styles.typography && body ) {
				newPreviewSettings.styles.typography.fontFamily = body;
			}
			if (
				newPreviewSettings.styles.blocks[ 'core/heading' ].typography &&
				headings
			) {
				newPreviewSettings.styles.blocks[
					'core/heading'
				].typography.fontFamily = headings;
			}

			let blockGrammar = '';
			[ 'header', 'content', 'footer' ].forEach( ( part ) => {
				if ( part in data ) {
					blockGrammar += data[ part ];
				}
			} );
			return (
				<SiteGenPreviewSelectableCard
					key={ idx }
					blockGrammar={ blockGrammar }
					previewSettings={ newPreviewSettings }
					slug={ slug }
					position={ idx + 1 }
					title={ data.title }
					isFavorite={ data.isFavorite }
					palette={ data.color }
					styling={ 'custom' }
					overlay={ true }
					tabIndex="0"
					role="button"
					handleFavorite={ handleFavorite }
					handleRegenerate={ handleRegenerate }
					handlePreview={ handlePreview }
					isRegenerating={ isRegenerating }
				/>
			);
		} );
	};

	const content = getContents();

	return (
		<SiteGenStateHandler>
			<CommonLayout className="nfd-onboarding-step--site-gen__preview">
				<div className="nfd-onboarding-step--site-gen__preview__container">
					{ ! isPreviewLoading && (
						<Animate type={ 'fade-in' }>
							<div className="nfd-onboarding-step--site-gen__preview__container__heading">
								<p className="nfd-onboarding-step--site-gen__preview__container__heading__text">
									{ content.heading }
								</p>
							</div>
							<div className="nfd-onboarding-step--site-gen__preview__container__sub-heading">
								<p className="nfd-onboarding-step--site-gen__preview__container__sub-heading__text">
									{ content.subheading }
								</p>
							</div>
						</Animate>
					) }
				</div>
				<div className="nfd-onboarding-step--site-gen__preview__options">
					{ buildPreviews() }
					{ isRegenerating && (
						<RegeneratingSiteCard
							count={ 1 }
							isRegenerating={ true }
						/>
					) }
				</div>
				<div className="nfd-onboarding-step--site-gen__preview__note">
					<HeartAnimation />
					<span>{ content.favouriteNote }</span>
				</div>
			</CommonLayout>
		</SiteGenStateHandler>
	);
};

export default SiteGenPreview;
