import CommonLayout from '../../../components/Layouts/Common';

import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';
import { useNavigate } from 'react-router-dom';

import { SiteGenPreviewSelectableCard } from '../../../components/LivePreview';
import getContents from './contents';
import HeartAnimation from './heartAnimation';
import RegeneratingSiteCard from './regeneratingCard';
import { getHomepages, regenerateHomepage } from '../../../utils/api/siteGen';
import { getGlobalStyles } from '../../../utils/api/themes';
// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep, isEmpty } from 'lodash';

const SiteGenPreview = () => {
	const navigate = useNavigate();
	const [ homepages, setHomepages ] = useState( false );
	const [ isRegenerating, setIsRegenerating ] = useState( false );
	const [ isPreviewLoading, setIsPreviewLoading ] = useState( false );
	const [ globalStyles, setGlobalStyles ] = useState( false );

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setCurrentOnboardingData,
		updateInitialize,
		setHideFooterNav,
	} = useDispatch( nfdOnboardingStore );

	const { currentData, nextStep } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
			nextStep: select( nfdOnboardingStore ).getNextStep(),
		};
	} );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setHideFooterNav( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
		updateInitialize( true );
	}, [ currentData ] );

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

	useEffect( () => {
		loadHomepages();
		loadGlobalStyles();
	}, [] );

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
					<RegeneratingSiteCard count={ 1 } isRegenerating={ true } />
				) }
			</div>
			<div className="nfd-onboarding-step--site-gen__preview__note">
				<HeartAnimation />
				<span>{ content.favouriteNote }</span>
			</div>
		</CommonLayout>
	);
};

export default SiteGenPreview;
