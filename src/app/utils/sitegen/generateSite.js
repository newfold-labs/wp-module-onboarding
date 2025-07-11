import { generateSiteMeta, generateHomePages, generateSitePages } from '.';

const generateSite = async ( retryMode ) => {
	// Generate site meta
	const siteMeta = await generateSiteMeta();

	// Not in retryMode and site meta fails
	if ( ! retryMode && ! siteMeta ) {
		return false;
	}

	// Determine whether to use fallback for homepages
	let useFallback = false;

	// In retryMode and site meta fails -> use fallback
	if ( retryMode && ! siteMeta ) {
		useFallback = true;
	}

	// In either mode and site meta passes -> no fallback (default false)
	const homePages = await generateHomePages( useFallback );
	if ( ! homePages ) {
		return false;
	}

	// Generate the rest of the site pages.
	await generateSitePages();

	return true;
};

export default generateSite;
