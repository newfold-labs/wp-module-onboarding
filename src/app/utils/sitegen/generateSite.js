import { generateSiteMeta, generateHomePages, generateSitePages, generateSiteNavigationMenu } from '.';

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

	// Generate the rest of the site pages.
	await generateSitePages();

	// Generate the site navigation menu.
	await generateSiteNavigationMenu();

	return true;
};

export default generateSite;
