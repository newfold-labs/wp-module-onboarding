
const SocialMediaSites = {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    YOUTUBE: 'youtube',
    LINKEDIN: 'linkedin',
    YELP: 'yelp',
    TIKTOK: 'tiktok',
}

const validationExemption = new Set(["twitter", "instagram", "youtube"]);

let errorsDup;
let setErrorsDup;

const displayErrors = ( categ, isError ) => {
    if(isError){
        if ( !errorsDup.includes( categ ) ) {
            setErrorsDup( [ ...errorsDup, categ ]);
        }
    } else {
        var errorsFiltered = errorsDup.filter( function( ele ) { return ele !== categ } );
        setErrorsDup(errorsFiltered);
    }
}

const handleCommonValidation = ( categ, url ) => {

    let isError = true;
    let wwwExp = /.*www\./gi;
    let protocolExp = /https?:\/\//gi;
    let urlExp = /((https?:\/\/(?:www\.|(?!www)))?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let wwwRegex = new RegExp(wwwExp);
    let protocolRegex = new RegExp(protocolExp);
    let urlRegex = new RegExp(urlExp);
    
    let urlExtract = url.match(urlRegex);
    if( urlExtract ) {
        let finalUrl = urlExtract[0];
        // Check if the link has the 'www.' prefix in it
        let iswwwValid = urlExtract[0].match(wwwRegex);
        // Check if the link has the 'https://' prefix in it
        let isProtocolValid = urlExtract[0].match(protocolRegex);

        if( !iswwwValid && !isProtocolValid ) {
            finalUrl = 'https://www.' + finalUrl;
        }
        else if( !iswwwValid && isProtocolValid ){
            finalUrl = finalUrl.replace(/https?:\/\//gi, "https://www.");
        }
        else if ( iswwwValid && !isProtocolValid ){
            finalUrl = 'https://' + finalUrl;
        }
        isError = false;
        url = finalUrl;
    }

    displayErrors( categ, isError );
    return url;
}

const isValidHandle = (handle) => {
    return handle.match(`^@?[A-Za-z0-9_]{1,25}$`) ? true : false;
}

const handleTwitterValidation = ( url ) => {
    if( isValidHandle(url) ) {
        if( url.charAt(0) === '@' )
            url = url.substr(1);
        url = 'https://www.twitter.com/' + url;
    } else {
        url = handleCommonValidation( SocialMediaSites.TWITTER, url);
    }
    return url;
}

const handleInstagramValidation = ( url ) => {
    if( isValidHandle(url) ) {
        if( url.charAt(0) === '@' )
            url = url.substr(1);
        url = 'https://www.instagram.com/' + url;
    } else {
        url = handleCommonValidation( SocialMediaSites.INSTAGRAM, url);
    }
    return url;
}

const handleYouTubeValidation = ( url ) => {
    if( isValidHandle(url) ) {
        url = 'https://www.youtube.com/' + url;
    } else {
        url = handleCommonValidation( SocialMediaSites.YOUTUBE, url);
    }
    return url;
}

const urlValidator = ( categ, url, errors, setErrors ) => {
    if( url === '' )
        return url;
        
    errorsDup = errors;
    setErrorsDup = setErrors;

    // Skip urlValidation for some sites
    if(!validationExemption.has(categ))
        url = handleCommonValidation( categ, url);
    console.log("ran till here");
    switch ( categ ) {
        case SocialMediaSites.FACEBOOK: 
            break;
        case SocialMediaSites.TWITTER: 
            url = handleTwitterValidation(url);
            break;
        case SocialMediaSites.INSTAGRAM: 
            url = handleInstagramValidation(url);
            break;
        case SocialMediaSites.YOUTUBE: 
            url = handleYouTubeValidation(url);
            break;
        case SocialMediaSites.LINKEDIN: 
            
            break;
        case SocialMediaSites.YELP: 
            
            break;
        case SocialMediaSites.TIKTOK: 
            
            break;
    }

    return url;
}

export default urlValidator;
