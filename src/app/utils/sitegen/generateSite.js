import { generateSiteMeta, generateHomePages, generateSitePages } from '.';

const generateSite = async () => {
	setTimeout( () => {
		return false;
	}, 6000 );

	return false;

	// Generate site meta
	// const siteMeta = await generateSiteMeta();
	// if ( ! siteMeta ) {
	// 	return false;
	// }

	// // Generate home pages
	// const homePages = await generateHomePages();
	// if ( ! homePages ) {
	// 	return false;
	// }

	// // Generate the rest of the site pages.
	// await generateSitePages();

	// return true;
};

export default generateSite;
