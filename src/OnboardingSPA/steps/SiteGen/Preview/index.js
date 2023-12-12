/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import CommonLayout from '../../../components/Layouts/Common';

import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import { SiteGenLivePreview } from '../../../components/LivePreview';
//import SiteGenPlaceholder from '../../../components/SiteGenPlaceholder';
import getContents from './contents';
import { homepageData } from './pattern';
import HeartAnimation from './heartAnimation';
import RegeneratingSiteCard from './regeneratingCard';

import { getHomePagePreviews } from '../../../utils/api/siteGen';

const SiteGenPreview = () => {
	// const [ homepages, setHomepages ] = useState( { active: {}, data: [] } );

	const [ homePagePreviewPatterns, setHomePagePreviewPatterns ] = useState(
		{}
	);
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
		setHomepagesData,
	} = useDispatch( nfdOnboardingStore );

	const { currentData } = useSelect( ( select ) => {
		return {
			currentData:
				select( nfdOnboardingStore ).getCurrentOnboardingData(),
		};
	} );

	useEffect( () => {
		if ( currentData.sitegen.siteDetails?.prompt !== '' ) {
			getHomePagePreviews(
				currentData.sitegen.siteDetails.prompt,
				false
			);
		}
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
	}, [ currentData ] );

	useEffect( () => {
		const fetchHomePagesPatterns = async () => {
			if ( currentData.sitegen.siteDetails?.prompt !== '' ) {
				try {
					const response = await getHomePagePreviews(
						currentData.sitegen.siteDetails.prompt,
						false
					);

					const processedPatterns = {};
					for ( const key in response ) {
						processedPatterns[ key ] = [
							response[ key ]
								.filter( ( item ) => item !== null )
								.join( ' ' ),
						];
					}
					setHomePagePreviewPatterns( processedPatterns );
				} catch ( error ) {
					// Handle or log error
					// console.error( 'Error fetching data:', error );
				}
			}
		};

		fetchHomePagesPatterns();
	}, [] );

	const [ isRegenerating, setIsRegenerating ] = useState( false );

	// console.log( 'HOme pages', JSON.parse( JSON.stringify( homepages ) ) );
	const onRegenerateClick = () => {
		setIsRegenerating( true );
	};

	console.log("home page preview patterns ", homePagePreviewPatterns);
	const buildPreviews = () => {
		const designs = isRegenerating
			? [ <RegeneratingSiteCard progress={ 20 } /> ]
			: [];

		designs.push(
			Object.keys( homePagePreviewPatterns ).map( ( design, idx ) => {
				return (
					<SiteGenLivePreview
						key={ idx }
						blockGrammer={ design }
						styling={ 'custom' }
						overlay={ true }
						onRegenerateClick={ onRegenerateClick }
						tabIndex="0"
						role="button"
						designObject={ design }
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
