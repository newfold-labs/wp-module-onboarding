import { useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import Tooltip from './../Tooltip';
import getContents from './contents';
import urlValidator from './urlValidator';
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

	const { addNavigationCallback, removeNavigationCallback } =
		useDispatch( nfdOnboardingStore );

	const SocialMediaSites = {
		FACEBOOK: 'facebook',
		TWITTER: 'twitter',
		INSTAGRAM: 'instagram',
		YOUTUBE: 'youtube',
		LINKEDIN: 'linkedin',
		YELP: 'yelp',
		TIKTOK: 'tiktok',
	};

	const SocialMediaSitesErrorTypes = {
		facebook: 'none',
		twitter: 'none',
		instagram: 'none',
		youtube: 'none',
		linkedin: 'none',
		yelp: 'none',
		tiktok: 'none',
	};

	const SocialMediaStates = {
		FACEBOOK: facebook,
		TWITTER: twitter,
		INSTAGRAM: instagram,
		YOUTUBE: youtube,
		LINKEDIN: linkedin,
		YELP: yelp,
		TIKTOK: tiktok,
	};

	const socialMediaDB = {
		facebook_site: facebook,
		twitter_site: twitter,
		instagram_url: instagram,
		youtube_url: youtube,
		linkedin_url: linkedin,
		other_social_urls: {
			yelp_url: yelp,
			tiktok_url: tiktok,
		},
	};

	const ERROR_TYPES = {
		NONE: 'none',
		AD_LINK_ERROR: 'ad-link-error',
		INVALID_LINK_ERROR: 'invalid-link-error',
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

	const handleAccordion = () => {
		setIsSocialFormOpen( ! isSocialFormOpen );
	};

	const navigationCallback = ( callback ) => {
		setShowModal( true );
		setModalCallback( () => callback );
	};

	const saveData = ( value, triggerID ) => {
		switch ( triggerID ) {
			case SocialMediaSites.FACEBOOK:
				setFacebook( value );
				socialMediaDB.facebook_site = value;
				break;
			case SocialMediaSites.TWITTER:
				setTwitter( value );
				socialMediaDB.twitter_site = value;
				break;
			case SocialMediaSites.INSTAGRAM:
				setInstagram( value );
				socialMediaDB.instagram_url = value;
				break;
			case SocialMediaSites.YOUTUBE:
				setYouTube( value );
				socialMediaDB.youtube_url = value;
				break;
			case SocialMediaSites.LINKEDIN:
				setLinkedIn( value );
				socialMediaDB.linkedin_url = value;
				break;
			case SocialMediaSites.YELP:
				setYelp( value );
				socialMediaDB.other_social_urls.yelp_url = value;
				break;
			case SocialMediaSites.TIKTOK:
				setTikTok( value );
				socialMediaDB.other_social_urls.tiktok_url = value;
				break;
		}
		setSocialData( socialMediaDB );
	};

	const getErrorType = () => {
		let error = ERROR_TYPES.NONE;
		for ( const key in activeErrorTypes ) {
			if ( activeErrorTypes[ key ] !== ERROR_TYPES.NONE )
				error = activeErrorTypes[ key ];
		}
		return error;
	};

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

	const handleChange = ( e ) => {
		const value = e.target.value;
		const triggerID = e.target.id;
		saveData( value, triggerID );
	};

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

	const showErrorMessage = ( socialMediaSite ) => {
		switch ( socialMediaSite ) {
			case SocialMediaSites.TWITTER:
				return `Please enter a valid ${ socialMediaSite } URL / username`;
			default:
				return `Please enter a valid ${ socialMediaSite } URL`;
		}
	};

	function toTitleCase( str ) {
		return str.replace( /\w\S*/g, function ( txt ) {
			return (
				txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase()
			);
		} );
	}

	function buildSocialBoxes() {
		const socialBoxes = [];
		for ( const social in SocialMediaSites ) {
			socialBoxes.push(
				<div key={ SocialMediaSites[ social ] }>
					<label
						htmlFor={ SocialMediaSites[ social ] }
						className={ `social-form__label social-form__label-${ SocialMediaSites[ social ] }` }
					>
						<div
							className="social-form__label_icon"
							style={ {
								backgroundImage: `var(--${ SocialMediaSites[ social ] }-icon)`,
							} }
						/>
						<div className="social-form__label_name">
							{ toTitleCase( SocialMediaSites[ social ] ) }
						</div>
					</label>
					<Tooltip
						content={
							activeError.includes( SocialMediaSites[ social ] )
								? showErrorMessage( SocialMediaSites[ social ] )
								: 'hide'
						}
						direction="top"
					>
						<input
							className={ `${
								activeError.includes(
									SocialMediaSites[ social ]
								)
									? 'social-form__box-error'
									: 'social-form__box'
							}` }
							type="url"
							id={ `${ SocialMediaSites[ social ] }` }
							value={ SocialMediaStates[ social ] }
							onChange={ ( value ) => {
								handleChange( value );
							} }
							onBlur={ ( e ) => handleOnBlur( e ) }
						/>
					</Tooltip>
				</div>
			);
		}
		return socialBoxes;
	}

	return (
		<div className="social-form">
			{ showModal && handleErrorModals() }
			<div
				role="button"
				tabIndex={ 0 }
				onKeyDown={ handleAccordion }
				className="social-form__top-row"
				onClick={ handleAccordion }
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
