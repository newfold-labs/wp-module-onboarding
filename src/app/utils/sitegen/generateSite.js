import { generateSiteMeta, generateHomePages, generateSitePages } from '.';

const generateSite = async () => {
	// Generate site meta
	const siteMeta = await generateSiteMeta();
	if ( ! siteMeta ) {
		return false;
	}

	// Generate home pages
	const homePages = await generateHomePages();
	if ( ! homePages ) {
		return false;
	}

	/**
	 * Fire and forget: Generate the rest of the site pages.
	 * This operation can take a while and it results don't impact the state of the application.
	 */
	generateSitePages().catch( () => {} );

	return true;
};

export default generateSite;
