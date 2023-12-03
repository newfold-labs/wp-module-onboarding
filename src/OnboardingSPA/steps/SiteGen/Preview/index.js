import CommonLayout from '../../../components/Layouts/Common';

import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from '@wordpress/element';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import LivePreviewSiteGenCard from '../../../components/LivePreview/SiteGenCard';

import getContents from './contents';
import getHomepages from '../../../data/homepages/getHomepages';

const SiteGenPreview = () => {
	const navigate = useNavigate();
	const [ homepages, setHomepages ] = useState();
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setCurrentOnboardingData,
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
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );

		const homepagesResponse = getHomepages();
		currentData.sitegen.homepages.data = homepagesResponse;
		setCurrentOnboardingData( currentData );

		const homePagesObject = {};

		homepagesResponse.forEach( ( homepage ) => {
			homePagesObject[ homepage.slug ] = homepage;
		} );
		setHomepages( homePagesObject );
	}, [] );

	const handleFavorite = ( slug ) => {
		if ( ! ( slug in homepages ) ) {
			return false;
		}
		homepages[ slug ].favorite = ! homepages[ slug ].favorite;
		currentData.sitegen.homepages.data = homepages;
		setCurrentOnboardingData( currentData );
	};

	const handlePreview = ( slug ) => {
		if ( ! ( slug in homepages ) ) {
			return false;
		}
		homepages[ slug ].active = ! homepages[ slug ].active;
		currentData.sitegen.homepages.active = homepages[ slug ];
		setCurrentOnboardingData( currentData );
		navigate( nextStep.path );
	};

	const content = getContents();

	return (
		<CommonLayout
			isCentered
			className="nfd-onboarding-step--site-gen__preview"
		>
			<div className="nfd-onboarding-step--site-gen__preview__context">
				<p className="nfd-onboarding-step--site-gen__preview__context__heading">
					{ content.heading }
				</p>
				<div className="nfd-onboarding-step--site-gen__preview__context__subheading">
					{ content.subheading }
				</div>
			</div>
			<div className="nfd-onboarding-step--site-gen__preview__live_previews">
				{ homepages &&
					Object.keys( homepages ).map( ( homepage ) => {
						const data = homepages[ homepage ];
						return (
							<LivePreviewSiteGenCard
								key={ homepage }
								viewportWidth={ 1300 }
								slug={ homepage }
								title={ data.title }
								isFavorite={ data.favorite }
								skeletonLoadingTime={ 0 }
								styling={ 'custom' }
								blockGrammer={ data.content }
								onFavorite={ handleFavorite }
								onPreview={ handlePreview }
							/>
						);
					} ) }
			</div>
			<div className="nfd-onboarding-step--site-gen__preview__favorite-info">
				<div className="nfd-onboarding-step--site-gen__preview__favorite-info__icon"></div>
				<p className="nfd-onboarding-step--site-gen__preview__favorite-info__text">
					{ content.favoriteInfo }
				</p>
			</div>
		</CommonLayout>
	);
};

export default SiteGenPreview;
