import { setupSiteNavigationMenu } from '@/utils/api';

/**
 * Generate the site navigation menu.
 *
 * @return {boolean} True if successful, false otherwise.
 */
const generateSiteNavigationMenu = async () => {
	const response = await setupSiteNavigationMenu();
	if ( response.error ) {
		return false;
	}

	return true;
};

export default generateSiteNavigationMenu;
