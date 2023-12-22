/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import CommonLayout from '../../../components/Layouts/Common';

import { useEffect, useState, useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import { SiteGenLivePreview } from '../../../components/LivePreview';
import getContents from './contents';
import HeartAnimation from './heartAnimation';
import RegeneratingSiteCard from './regeneratingCard';
import {
	getHomePagePreviews,
	getRegeneratedHomePagePreviews,
} from '../../../utils/api/siteGen';
import { getGlobalStyles } from '../../../utils/api/themes';

const SiteGenPreview = () => {
	const [ homepages, setHomepages ] = useState( { active: {}, data: [] } );
	const [ isRegenerating, setIsRegenerating ] = useState( false );
	const [ isPreviewLoading, setIsPreviewLoading ] = useState( false );
	const [ globalStyles, setGlobalStyles ] = useState( [] );

	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setCurrentOnboardingData,
	} = useDispatch( nfdOnboardingStore );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
	}, [ currentData ] );

	useEffect( () => {
		const fetchHomePagesPatterns = async () => {
			setIsPreviewLoading( true );
			if ( currentData.sitegen.siteDetails?.prompt !== '' ) {
				try {
					const response = await getHomePagePreviews(
						currentData.sitegen.siteDetails.prompt,
						false
					);
					setHomepages( { ...homepages, data: response.body } ); // Update the local state with the response data
					currentData.sitegen.homepages.data = response.body;
					setCurrentOnboardingData( currentData );
					setIsPreviewLoading( false );
				} catch ( error ) {
					setIsPreviewLoading( false );
					console.error( 'Error fetching data:', error );
				}
			}
		};

		fetchHomePagesPatterns();
		loadGlobalStyles();
	}, [] );

	const loadGlobalStyles = async () => {
		const globalStylesResponse = await getGlobalStyles();
		setGlobalStyles( globalStylesResponse.body );
	};

	const handleFavorite = ( slug ) => {
		const homepagesList = currentData.sitegen.homepages.data;

		if ( homepagesList && homepagesList.length > 0 ) {
			homepagesList.forEach( ( homepageObj ) => {
				if ( homepageObj.slug === slug ) {
					homepageObj.isFavourited = ! homepageObj.isFavourited; // Toggle the isFavourited property
				}
			} );
			setCurrentOnboardingData( { ...currentData } ); // Create a new object to ensure state updates
		}
	};

	const handleRegenerate = async ( slug, colorPalattes ) => {
		setIsRegenerating( true );
		if ( ! ( slug in homepages.data ) ) {
			if ( currentData.sitegen.siteDetails?.prompt !== '' ) {
				try {
					const response = await getRegeneratedHomePagePreviews(
						currentData.sitegen.siteDetails.prompt,
						true,
						slug,
						colorPalattes
					);
					setHomepages( { ...homepages.data, data: response.body } ); // Update the local state with the response data
					currentData.sitegen.homepages.data = response.body;
					setCurrentOnboardingData( currentData );
					setIsRegenerating( false );
				} catch ( error ) {
					setIsRegenerating( false );
					console.error( 'Error fetching data:', error );
				}
			}
		}
	};

	// Define the createPreviewSettings function inside your component
	const createPreviewSettings = ( palette ) => {
		let settings = {};
		if ( globalStyles.length > 0 ) {
			settings = JSON.parse( JSON.stringify( globalStyles[ 0 ] ) );
			settings.settings.color.palette = palette;
		}
		return settings;
	};

	// Use useMemo to memoize the previewSettings
	const previewSettings = useMemo( () => {
		return homepages.data.map( ( homepage ) =>
			createPreviewSettings( homepage.color.palette )
		);
	}, [ homepages.data, globalStyles ] );

	const buildPreviews = () => {
		if ( isPreviewLoading ) {
			return (
				<RegeneratingSiteCard count={ 3 } isRegenerating={ false } />
			);
		}

		const designs = isRegenerating
			? [
					<RegeneratingSiteCard
						count={ 1 }
						isRegenerating={ isRegenerating }
					/>,
			  ]
			: [];
		designs.push(
			homepages.data &&
				homepages.data.map( ( homepage, idx ) => {
					let newPreviewSettings = {};
					if ( globalStyles.length > 0 ) {
						newPreviewSettings = JSON.parse(
							JSON.stringify( globalStyles && globalStyles[ 0 ] )
						);
						newPreviewSettings.settings.color.palette =
							homepage.color.palette;
					}
					const isPreviewSettingsEmpty =
						Object.keys( previewSettings[ idx ] ).length === 0;
					if ( ! isPreviewSettingsEmpty ) {
						return (
							<SiteGenLivePreview
								key={ idx }
								blockGrammer={ homepage.content }
								styling={ 'custom' }
								overlay={ true }
								onRegenerateClick={ handleRegenerate }
								tabIndex="0"
								role="button"
								designObject={ homepage }
								handleFavorite={ handleFavorite }
								previewSettings={ previewSettings[ idx ] }
							/>
						);
					}
					// Optionally return null or some other placeholder if newPreviewSettings is empty
					return null;
				} )
		);

		return designs;
	};

	const content = getContents();

	return (
		<CommonLayout className="nfd-onboarding-step--site-gen__preview">
			{ /* <SiteGenPlaceholder heading={ 'Previews' } /> */ }
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
			</div>
			<div className="nfd-onboarding-step--site-gen__preview__note">
				<HeartAnimation />
				<span>{ content.favouriteNote }</span>
			</div>
		</CommonLayout>
	);
};

export default SiteGenPreview;
