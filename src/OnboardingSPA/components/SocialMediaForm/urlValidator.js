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

// Common Validation for all links
const handleCommonValidation = ( url, result ) => {
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

	// Check if it is a Shortend URL
	if ( url.match( adRegex ) ) {
		// If it is short url add the protocol prefix to save the data
		const iswwwValid = url.match( wwwRegex );
		const isProtocolValid = url.match( protocolRegex );
		if ( ! iswwwValid && ! isProtocolValid ) {
			url = 'https://www.' + url;
		}
		result.error = ERROR_TYPES.AD_LINK_ERROR;
		result.url = url;
		return result;
	}

	// Check if it is a Valid URL
	const urlExtract = url.match( urlRegex );
	if ( ! urlExtract ) {
		result.error = ERROR_TYPES.INVALID_LINK_ERROR;
		result.url = url;
		return result;
	}

	let finalUrl = urlExtract[ 0 ];
	// Check if the link has the 'www.' prefix in it
	const iswwwValid = urlExtract[ 0 ].match( wwwRegex );
	// Check if the link has the 'https://' prefix in it
	const isProtocolValid = urlExtract[ 0 ].match( protocolRegex );

	// Check if the URL is https secure
	if ( finalUrl.match( new RegExp( /http:/gi ) ) )
		finalUrl = finalUrl.replace( /http:/gi, 'https:' );

	// Check if the URL has valid prefixes
	if ( ! iswwwValid && ! isProtocolValid ) {
		finalUrl = 'https://www.' + finalUrl;
	} else if ( ! iswwwValid && isProtocolValid ) {
		finalUrl = finalUrl.replace( /https?:\/\//gi, 'https://www.' );
	} else if ( iswwwValid && ! isProtocolValid ) {
		finalUrl = 'https://' + finalUrl;
	}

	result.url = finalUrl;
	result.error = ERROR_TYPES.NONE;
	return result;
};

// Specific Site based Validation
const isValidHandle = ( handle ) => {
	return handle.match( `^@?[A-Za-z0-9_]{1,25}$` ) ? true : false;
};

const handleTwitterValidation = ( url, result ) => {
	if ( isValidHandle( url ) ) {
		// Strips the @ and adds the prefix link
		if ( url.charAt( 0 ) === '@' ) url = url.substr( 1 );
		result.url = 'https://www.twitter.com/' + url;
		return result;
	}
	// If the user provides a link and not the handle
	return handleCommonValidation( url, result );
};

const handleInstagramValidation = ( url, result ) => {
	if ( isValidHandle( url ) ) {
		// Strips the @ and adds the prefix link
		if ( url.charAt( 0 ) === '@' ) url = url.substr( 1 );
		result.url = 'https://www.instagram.com/' + url;
		return result;
	}
	return handleCommonValidation( url, result );
};

const handleYouTubeValidation = ( url, result ) => {
	if ( isValidHandle( url ) ) {
		result.url = 'https://www.youtube.com/' + url;
		return result;
	}
	return handleCommonValidation( url, result );
};

const urlValidator = ( categ, url ) => {
	const result = {
		url,
		error: ERROR_TYPES.NONE,
	};
	if ( url === '' ) return result;

	// Skip urlValidation for some sites with specific checks
	if ( ! validationExemption.has( categ ) )
		return handleCommonValidation( url, result );

	switch ( categ ) {
		case SocialMediaSites.TWITTER:
			return handleTwitterValidation( url, result );
		case SocialMediaSites.INSTAGRAM:
			return handleInstagramValidation( url, result );
		case SocialMediaSites.YOUTUBE:
			return handleYouTubeValidation( url, result );
	}
};

export default urlValidator;
