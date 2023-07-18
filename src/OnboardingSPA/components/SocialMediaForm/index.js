import { useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import Tooltip from './../Tooltip';
import getContents from './contents';
import urlValidator, { ERROR_TYPES } from './urlValidator';
import SocialMediaModal from './socialMediaModal';
import { store as nfdOnboardingStore } from '../../store';

const SocialMediaForm = ( {
	socialData,
	setSocialData,
	isSocialFormOpen,
	setIsSocialFormOpen,
} ) => {
	const content = getContents();

	const [ facebook, setFacebook ] = useState( '' );
	const [ twitter, setTwitter ] = useState( '' );
	const [ instagram, setInstagram ] = useState( '' );
	const [ youtube, setYouTube ] = useState( '' );
	const [ linkedin, setLinkedIn ] = useState( '' );
	const [ yelp, setYelp ] = useState( '' );
	const [ tiktok, setTikTok ] = useState( '' );

	const [ showModal, setShowModal ] = useState( false );
	const [ modalCallback, setModalCallback ] = useState();
	const [ activeError, setActiveError ] = useState( [] );
	const [ activeErrorTypes, setActiveErrorTypes ] = useState();

	const {
		addNavigationCallback,
		setOnboardingSocialData,
		removeNavigationCallback,
	} = useDispatch( nfdOnboardingStore );

	const SocialMediaSitesErrorTypes = {
		facebook: 'none',
		twitter: 'none',
		instagram: 'none',
		youtube: 'none',
		linkedin: 'none',
		yelp: 'none',
		tiktok: 'none',
	};

	const SocialMedia = {
		FACEBOOK: {
			id: 'facebook',
			value: facebook,
		},
		TWITTER: {
			id: 'twitter',
			value: twitter,
		},
		INSTAGRAM: {
			id: 'instagram',
			value: instagram,
		},
		YOUTUBE: {
			id: 'youtube',
			value: youtube,
		},
		LINKEDIN: {
			id: 'linkedin',
			value: linkedin,
		},
		YELP: {
			id: 'yelp',
			value: yelp,
		},
		TIKTOK: {
			id: 'tiktok',
			value: tiktok,
		},
	};

	useEffect( () => {
		setActiveErrorTypes( SocialMediaSitesErrorTypes );
	}, [] );

	useEffect( () => {
		setFacebook( socialData?.facebook_site ?? '' );
		setTwitter( socialData?.twitter_site ?? '' );
		setInstagram( socialData?.instagram_url ?? '' );
		setYouTube( socialData?.youtube_url ?? '' );
		setLinkedIn( socialData?.linkedin_url ?? '' );
		if (
			socialData &&
			Object.keys( socialData ).includes( 'other_social_urls' )
		) {
			const otherURLS = socialData.other_social_urls;
			if ( Object.keys( otherURLS ).includes( 'yelp_url' ) )
				setYelp( otherURLS.yelp_url ?? '' );

			if ( Object.keys( otherURLS ).includes( 'tiktok_url' ) )
				setTikTok( otherURLS.tiktok_url ?? '' );
		}
	}, [ socialData ] );

	// Convert the first letter to capital
	function toTitleCase( str ) {
		return str.replace( /\w\S*/g, function ( txt ) {
			return (
				txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase()
			);
		} );
	}

	// This runs when user navigates using Next or Back
	const navigationCallback = ( callback ) => {
		setShowModal( true );
		setModalCallback( () => callback );
	};

	// Save the Social Media data into the store
	const saveData = ( value, triggerID ) => {
		switch ( triggerID ) {
			case SocialMedia.FACEBOOK.id:
				setFacebook( value );
				socialData.facebook_site = value;
				break;
			case SocialMedia.TWITTER.id:
				setTwitter( value );
				socialData.twitter_site = value;
				break;
			case SocialMedia.INSTAGRAM.id:
				setInstagram( value );
				socialData.instagram_url = value;
				break;
			case SocialMedia.YOUTUBE.id:
				setYouTube( value );
				socialData.youtube_url = value;
				break;
			case SocialMedia.LINKEDIN.id:
				setLinkedIn( value );
				socialData.linkedin_url = value;
				break;
			case SocialMedia.YELP.id:
				setYelp( value );
				socialData.other_social_urls = {
					...socialData.other_social_urls,
				};
				socialData.other_social_urls.yelp_url = value;
				break;
			case SocialMedia.TIKTOK.id:
				setTikTok( value );
				socialData.other_social_urls = {
					...socialData.other_social_urls,
				};
				socialData.other_social_urls.tiktok_url = value;
				break;
		}
		setOnboardingSocialData( socialData );
		setSocialData( socialData );
	};

	// Find the current latest error in the data
	const getErrorType = () => {
		let error = ERROR_TYPES.NONE;
		for ( const key in activeErrorTypes ) {
			if ( activeErrorTypes[ key ] !== ERROR_TYPES.NONE )
				error = activeErrorTypes[ key ];
		}
		return error;
	};

	// Handle urlValidation when user goes out of focus
	const handleOnBlur = ( e ) => {
		const value = e.target.value;
		const triggerID = e.target.id;
		const res = urlValidator(
			triggerID,
			value,
			activeError,
			setActiveError,
			activeErrorTypes,
			setActiveErrorTypes
		);
		if ( getErrorType() !== ERROR_TYPES.NONE )
			addNavigationCallback( navigationCallback );
		else removeNavigationCallback();
		saveData( res, triggerID );
	};

	// Change data while user types
	const handleChange = ( e ) => {
		const value = e.target.value;
		const triggerID = e.target.id;
		saveData( value, triggerID );
	};

	// Decide Error Modal to be shown according to error
	const handleErrorModals = () => {
		switch ( getErrorType() ) {
			case ERROR_TYPES.AD_LINK_ERROR:
				return (
					<SocialMediaModal
						showModal={ showModal }
						setShowModal={ setShowModal }
						modalTitle={ content.modals.shortUrl.modalTitle }
						modalText={ content.modals.shortUrl.modalText }
						modalSecondaryButtonFunc={ modalCallback }
					/>
				);
			case ERROR_TYPES.INVALID_LINK_ERROR:
				return (
					<SocialMediaModal
						showModal={ showModal }
						setShowModal={ setShowModal }
						modalTitle={ content.modals.invalidUrl.modalTitle }
						modalText={ content.modals.invalidUrl.modalText }
						modalSecondaryButtonFunc={ modalCallback }
					/>
				);
			default:
				return null;
		}
	};

	// Tool tip error message to be shown
	const showErrorMessage = ( socialMediaSite ) => {
		return activeErrorTypes[ socialMediaSite ] === 'ad-link-error'
			? content.errorText.adLinkErrorText
			: content.errorText.invalidLinkErrorText;
	};

	// Render Input Fields
	function buildSocialBoxes() {
		return Object.keys( SocialMedia ).map( ( social ) => {
			return (
				<div key={ SocialMedia[ social ].id }>
					<label
						htmlFor={ SocialMedia[ social ].id }
						className={ `social-form__label social-form__label-${ SocialMedia[ social ].id }` }
					>
						<div
							className="social-form__label_icon"
							style={ {
								backgroundImage: `var(--${ SocialMedia[ social ].id }-icon)`,
							} }
						/>
						<div className="social-form__label_name">
							{ toTitleCase( SocialMedia[ social ].id ) }
						</div>
					</label>
					<Tooltip
						content={
							activeError.includes( SocialMedia[ social ].id )
								? showErrorMessage( SocialMedia[ social ].id )
								: 'hide'
						}
						direction={
							SocialMedia[ social ].id === SocialMedia.TIKTOK.id
								? 'top'
								: 'bottom'
						}
					>
						<input
							className={ `${
								activeError.includes( SocialMedia[ social ].id )
									? 'social-form__box-error'
									: 'social-form__box'
							}` }
							type="url"
							id={ `${ SocialMedia[ social ].id }` }
							value={ SocialMedia[ social ].value }
							onChange={ ( value ) => {
								handleChange( value );
							} }
							onBlur={ ( e ) => handleOnBlur( e ) }
						/>
					</Tooltip>
				</div>
			);
		} );
	}

	return (
		<div className="social-form">
			{ showModal && handleErrorModals() }
			<div
				role="button"
				tabIndex={ 0 }
				onKeyDown={ () => setIsSocialFormOpen( ! isSocialFormOpen ) }
				className="social-form__top-row"
				onClick={ () => setIsSocialFormOpen( ! isSocialFormOpen ) }
			>
				<div className="social-form__top-row_heading">
					{ content.heading }
				</div>
				<div
					className={ `social-form__top-row_icon ${
						isSocialFormOpen
							? 'social-form__top-row_icon_opened'
							: ''
					}` }
				></div>
			</div>
			<form
				className={
					isSocialFormOpen
						? 'social-form__main-active'
						: 'social-form__main-hidden'
				}
			>
				{ buildSocialBoxes() }
			</form>
		</div>
	);
};

export default SocialMediaForm;
