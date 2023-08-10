import { ERROR_TYPES } from './utils';

const SocialMediaSites = {
	FACEBOOK: 'facebook',
	TWITTER: 'twitter',
	INSTAGRAM: 'instagram',
	YOUTUBE: 'youtube',
	LINKEDIN: 'linkedin',
	YELP: 'yelp',
	TIKTOK: 'tiktok',
};

// Don't do standard validation for them
const validationExemption = new Set( [ 'twitter', 'instagram', 'youtube' ] );

// Local copies to prevent unnecessary passing as params
let errorsDup;
let setErrorsDup;
let errorTypesDup;
let setErrorTypesDup;

// Adds error to a certain message.
const displayErrors = ( categ, isError ) => {
	if ( isError ) {
		if ( ! errorsDup.includes( categ ) ) {
			setErrorsDup( [ ...errorsDup, categ ] );
		}
	} else {
		const errorsFiltered = errorsDup.filter( function ( ele ) {
			return ele !== categ;
		} );
		setErrorsDup( errorsFiltered );
	}
};

// Common Validation for all links
const handleCommonValidation = ( categ, url ) => {
	let isError = true;
	const wwwExp = /.*www\./gi;
	const protocolExp = /https?:\/\//gi;
	// This checks for short ad-links
	const adLinks =
		/goo\.gl.*|bit\.ly.*|buff\.ly.*|tinyurl\.com.*|bl\.ink.*|short\.io.*|ow\.ly.*|is\.gd.*|adf\.ly.*|bit\.do.*|t\.co.*|clk\.sh.*|gplinks\.in.*|tiny\.cc.*|wp\.me.*/gi;
	// This is a basic complete url check
	const urlExp =
		/((https?:\/\/(?:www\.|(?!www)))?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
	const adRegex = new RegExp( adLinks );
	const wwwRegex = new RegExp( wwwExp );
	const protocolRegex = new RegExp( protocolExp );
	const urlRegex = new RegExp( urlExp );

	if ( ! url.match( adRegex ) ) {
		const urlExtract = url.match( urlRegex );
		if ( urlExtract ) {
			let finalUrl = urlExtract[ 0 ];
			// Check if the link has the 'www.' prefix in it
			const iswwwValid = urlExtract[ 0 ].match( wwwRegex );
			// Check if the link has the 'https://' prefix in it
			const isProtocolValid = urlExtract[ 0 ].match( protocolRegex );

			if ( finalUrl.match( new RegExp( /http:/gi ) ) )
				finalUrl = finalUrl.replace( /http:/gi, 'https:' );

			if ( ! iswwwValid && ! isProtocolValid ) {
				finalUrl = 'https://www.' + finalUrl;
			} else if ( ! iswwwValid && isProtocolValid ) {
				finalUrl = finalUrl.replace( /https?:\/\//gi, 'https://www.' );
			} else if ( iswwwValid && ! isProtocolValid ) {
				finalUrl = 'https://' + finalUrl;
			}
			isError = false;
			url = finalUrl;
			errorTypesDup[ categ ] = ERROR_TYPES.NONE;
			setErrorTypesDup( errorTypesDup );
		} else {
			errorTypesDup[ categ ] = ERROR_TYPES.INVALID_LINK_ERROR;
			setErrorTypesDup( errorTypesDup );
		}
	} else {
		// If it is short url add the protocol prefix to save the data
		const iswwwValid = url.match( wwwRegex );
		const isProtocolValid = url.match( protocolRegex );
		if ( ! iswwwValid && ! isProtocolValid ) {
			url = 'https://www.' + url;
		}
		errorTypesDup[ categ ] = ERROR_TYPES.AD_LINK_ERROR;
		setErrorTypesDup( errorTypesDup );
	}
	displayErrors( categ, isError );
	return url;
};

// Specific Site based Validation
const isValidHandle = ( handle ) => {
	return handle.match( `^@?[A-Za-z0-9_]{1,25}$` ) ? true : false;
};

const handleTwitterValidation = ( url ) => {
	if ( isValidHandle( url ) ) {
		// Strips the @ and adds the prefix link
		if ( url.charAt( 0 ) === '@' ) url = url.substr( 1 );
		return 'https://www.twitter.com/' + url;
	}
	return handleCommonValidation( SocialMediaSites.TWITTER, url );
};

const handleInstagramValidation = ( url ) => {
	if ( isValidHandle( url ) ) {
		// Strips the @ and adds the prefix link
		if ( url.charAt( 0 ) === '@' ) url = url.substr( 1 );
		return 'https://www.instagram.com/' + url;
	}
	return handleCommonValidation( SocialMediaSites.INSTAGRAM, url );
};

const handleYouTubeValidation = ( url ) => {
	if ( isValidHandle( url ) ) {
		return 'https://www.youtube.com/' + url;
	}
	return handleCommonValidation( SocialMediaSites.YOUTUBE, url );
};

const urlValidator = (
	categ,
	url,
	errors,
	setErrors,
	errorTypes,
	setErrorTypes
) => {
	let res;
	errorsDup = errors;
	setErrorsDup = setErrors;
	errorTypesDup = errorTypes;
	setErrorTypesDup = setErrorTypes;

	if ( url === '' ) {
		errorTypesDup[ categ ] = ERROR_TYPES.NONE;
		setErrorTypesDup( errorTypesDup );
		displayErrors( categ, false );
		return url;
	}

	// Skip urlValidation for some sites with specific checks
	if ( ! validationExemption.has( categ ) )
		res = handleCommonValidation( categ, url );
	switch ( categ ) {
		case SocialMediaSites.TWITTER:
			res = handleTwitterValidation( url );
			break;
		case SocialMediaSites.INSTAGRAM:
			res = handleInstagramValidation( url );
			break;
		case SocialMediaSites.YOUTUBE:
			res = handleYouTubeValidation( url );
			break;
	}
	return res;
};

export default urlValidator;
