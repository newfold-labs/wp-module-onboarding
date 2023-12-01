/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-alert */
import CommonLayout from '../../../components/Layouts/Common';

import { useEffect } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as nfdOnboardingStore } from '../../../store';
import { HEADER_SITEGEN } from '../../../../constants';

import { SiteGenLivePreview } from '../../../components/LivePreview';
//import SiteGenPlaceholder from '../../../components/SiteGenPlaceholder';
import getContents from './contents';
import { pattern } from './pattern';
import { ReactComponent as FavouriteIcon } from '../../../static/icons/sitegen/heart-stroked.svg';

const SiteGenPreview = () => {
	const {
		setIsHeaderEnabled,
		setSidebarActiveView,
		setHeaderActiveView,
		setDrawerActiveView,
	} = useDispatch( nfdOnboardingStore );

	useEffect( () => {
		setIsHeaderEnabled( true );
		setSidebarActiveView( false );
		setHeaderActiveView( HEADER_SITEGEN );
		setDrawerActiveView( false );
	} );

	const onWishlistClick = () => {
		//	alert( 'wishlist' );
	};

	const onRegenerateClick = () => {
		// alert( 'regenerate' );
	};

	const buildPreviews = () => {
		const designs = [ pattern, pattern, pattern ];

		const navigate = useNavigate();
		const { nextStep } = useSelect( ( select ) => {
			return {
				nextStep: select( nfdOnboardingStore ).getNextStep(),
			};
		} );

		return designs.map( ( design, idx ) => {
			return (
				<SiteGenLivePreview
					key={ idx }
					blockGrammer={ design }
					styling={ 'custom' }
					overlay={ true }
					onClick={ () => {
						navigate( nextStep.path );
					} }
					onKeyDown={ ( event ) => {
						if ( event.key === 'Enter' ) {
							navigate( nextStep.path );
						}
					} }
					onWishlistClick={ onWishlistClick }
					onRegenerateClick={ onRegenerateClick }
					tabIndex="0"
					role="button"
				/>
			);
		} );
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
				<FavouriteIcon />
				<span>{ content.favouriteNote }</span>
			</div>
		</CommonLayout>
	);
};

export default SiteGenPreview;
