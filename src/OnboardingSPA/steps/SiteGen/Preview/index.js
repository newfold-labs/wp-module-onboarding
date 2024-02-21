import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep, isEmpty } from 'lodash';

import CommonLayout from '../../../components/Layouts/Common';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN, MAX_RETRIES_SITE_GEN } from '../../../../constants';
import { SiteGenPreviewSelectableCard } from '../../../components/LivePreview';
import getContents from './contents';
import HeartAnimation from './heartAnimation';
import RegeneratingSiteCard from './regeneratingCard';
import {
	getHomepages,
	regenerateHomepage,
	generateSiteGenMeta,
	getSiteGenIdentifiers,
} from '../../../utils/api/siteGen';
import { getGlobalStyles } from '../../../utils/api/themes';
import SitegenAiStateHandler from '../../../components/StateHandlers/SitegenAi';

const SiteGenPreview = () => {
	const navigate = useNavigate();
	const [ homepages, setHomepages ] = useState( false );
	const [ isRegenerating, setIsRegenerating ] = useState( false );
	const [ isPreviewLoading, setIsPreviewLoading ] = useState( false );
	const [ isMetaApiSuccess, setIsMetaApiSuccess ] = useState( false );
	const [ globalStyles, setGlobalStyles ] = useState( false );
	const [ failedApi, setFailedApi ] = useState( [] );

	const prevSiteGenErrorStatus = useRef();

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setCurrentOnboardingData,
		updateInitialize,
		setHideFooterNav,
		updateSiteGenErrorStatus,
	} = useDispatch( nfdOnboardingStore );

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

	useEffect( () => {
		setIsHeaderEnabled( true );
		setHideFooterNav( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		updateInitialize( true );
	}, [ currentData ] );

	useEffect( () => {
		generateSiteGenData();
	}, [] );

	useEffect( () => {
		if ( isMetaApiSuccess ) {
			loadHomepages();
			loadGlobalStyles();
		}
	}, [ isMetaApiSuccess ] );

	useEffect( () => {
		if (
			prevSiteGenErrorStatus.current === true &&
			siteGenErrorStatus === false
		) {
			if ( ! isMetaApiSuccess ) {
				generateSiteGenData();
			} else {
				loadHomepages();
				loadGlobalStyles();
			}
		}
		prevSiteGenErrorStatus.current = siteGenErrorStatus;
	}, [ siteGenErrorStatus ] );

	async function performSiteGenMetaGeneration(
		siteInfo,
		identifier,
		skipCache,
		retryCount = 1
	) {
		try {
			const data = await generateSiteGenMeta(
				siteInfo,
				identifier,
				skipCache
			);
			if ( data.body !== null ) {
				currentData.sitegen.siteGenMetaStatus.currentStatus += 1;
				if (
					currentData.sitegen.siteGenMetaStatus.currentStatus ===
					currentData.sitegen.siteGenMetaStatus.totalCount
				) {
					currentData.sitegen.skipCache = false;
					setIsMetaApiSuccess( true );
				}
				setCurrentOnboardingData( currentData );
			}
		} catch ( err ) {
			if ( retryCount < MAX_RETRIES_SITE_GEN ) {
				performSiteGenMetaGeneration(
					siteInfo,
					identifier,
					skipCache,
					retryCount + 1
				);
			} else {
				setFailedApi( ( prevState ) => {
					if ( ! prevState.includes( identifier ) ) {
						return [ ...prevState, identifier ];
					}
					return prevState;
				} );
				currentData.sitegen.siteGenErrorStatus = true;
				updateSiteGenErrorStatus( true );
				setIsPreviewLoading( false );
			}
		}
	}

	async function generateSiteGenData() {
		setIsPreviewLoading( true );
		// Start the API Requests when the loader is shown.

		let identifiers;
		if ( Array.isArray( failedApi ) && failedApi.length > 0 ) {
			identifiers = failedApi;
			setFailedApi( [] );
		} else {
			identifiers = await getSiteGenIdentifiers();
			identifiers = identifiers.body;

			const midIndex = Math.floor( identifiers.length / 2 );
			identifiers = identifiers.slice( midIndex, identifiers.length );
			currentData.sitegen.siteGenMetaStatus.currentStatus = midIndex;
		}

		setCurrentOnboardingData( currentData );
		const siteInfo = {
			site_description: currentData.sitegen?.siteDetails?.prompt,
		};

		const skipCache = currentData.sitegen?.skipCache;

		// Iterate over Identifiers and fire Requests!
		identifiers.forEach( ( identifier ) => {
			performSiteGenMetaGeneration( siteInfo, identifier, skipCache );
		} );
	}

	const loadHomepages = async () => {
		setIsPreviewLoading( true );
		if ( ! isEmpty( currentData.sitegen.homepages.data ) ) {
			setHomepages( currentData.sitegen.homepages.data );
			setIsPreviewLoading( false );
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
	};

	const loadGlobalStyles = async () => {
		const globalStylesResponse = await getGlobalStyles();
		if ( globalStylesResponse.error ) {
			setIsPreviewLoading( false );
			return;
		}
		setGlobalStyles( globalStylesResponse.body );
	};

	const handlePreview = ( slug ) => {
		if ( ! ( slug in homepages ) ) {
			return false;
		}
		currentData.sitegen.homepages.active = homepages[ slug ];
		currentData.sitegen.skipCache = false;
		setCurrentOnboardingData( currentData );
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

	const handleFavorite = ( slug ) => {
		if ( ! ( slug in homepages ) ) {
			return;
		}
		const isFavorite = ! homepages[ slug ].isFavorite;
		homepages[ slug ].isFavorite = isFavorite;
		currentData.sitegen.homepages.data = homepages;
		setHomepages( homepages );
		setCurrentOnboardingData( currentData );
	};

	const handleRegenerate = async ( slug, palette, isFavorite ) => {
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
		<SitegenAiStateHandler>
			<CommonLayout className="nfd-onboarding-step--site-gen__preview">
				<div className="nfd-onboarding-step--site-gen__preview__container">
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
		</SitegenAiStateHandler>
	);
};

export default SiteGenPreview;
