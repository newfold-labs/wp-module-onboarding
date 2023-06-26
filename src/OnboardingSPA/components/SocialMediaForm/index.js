import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import Tooltip from './../Tooltip';
import urlValidator from './urlValidator';

const SocialMediaForm = ( {
	socialData,
	setSocialData,
	isSocialFormOpen,
	setIsSocialFormOpen,
} ) => {
	const [ facebook, setFacebook ] = useState( '' );
	const [ twitter, setTwitter ] = useState( '' );
	const [ instagram, setInstagram ] = useState( '' );
	const [ youtube, setYouTube ] = useState( '' );
	const [ linkedin, setLinkedIn ] = useState( '' );
	const [ yelp, setYelp ] = useState( '' );
	const [ tiktok, setTikTok ] = useState( '' );

	const [ activeError, setActiveError ] = useState( [] );

	const SocialMediaSites = {
		FACEBOOK: 'facebook',
		TWITTER: 'twitter',
		INSTAGRAM: 'instagram',
		YOUTUBE: 'youtube',
		LINKEDIN: 'linkedin',
		YELP: 'yelp',
		TIKTOK: 'tiktok',
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

	const handleOnBlur = ( e ) => {
		let value = e.target.value;
		const triggerID = e.target.id;
		value = urlValidator( triggerID, value, activeError, setActiveError );
		saveData( value, triggerID );
	};

	const handleChange = ( e ) => {
		const value = e.target.value;
		const triggerID = e.target.id;
		saveData( value, triggerID );
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
			<div
				role="button"
				tabIndex={ 0 }
				onKeyDown={ handleAccordion }
				className="social-form__top-row"
				onClick={ handleAccordion }
			>
				<div className="social-form__top-row_heading">
					{ __( 'Social Media', 'wp-module-onboarding' ) }
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
