import { generateSiteMeta, generateHomePages } from '.';

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

	return true;
};

export default generateSite;
