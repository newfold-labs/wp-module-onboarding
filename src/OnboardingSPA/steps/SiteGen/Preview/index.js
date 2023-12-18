/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import CommonLayout from '../../../components/Layouts/Common';

import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import { SiteGenLivePreview } from '../../../components/LivePreview';
import getContents from './contents';
import HeartAnimation from './heartAnimation';
import RegeneratingSiteCard from './regeneratingCard';
import { getHomePagePreviews } from '../../../utils/api/siteGen';

const SiteGenPreview = () => {
	const [ homepages, setHomepages ] = useState( { active: {}, data: [] } );
	const [ isRegenerating, setIsRegenerating ] = useState( false );
	const [ isPreviewLoading, setIsPreviewLoading ] = useState( false );

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
					// console.error( 'Error fetching data:', error );
				}
			}
		};

		fetchHomePagesPatterns();
	}, [] );

	const onRegenerateClick = () => {
		setIsRegenerating( true );
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
				homepages.data.map( ( design, idx ) => {
					return (
						<SiteGenLivePreview
							key={ idx }
							blockGrammer={ design.content }
							styling={ 'custom' }
							overlay={ true }
							onRegenerateClick={ onRegenerateClick }
							tabIndex="0"
							role="button"
							designObject={ design }
							handleFavorite={ handleFavorite }
						/>
					);
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
