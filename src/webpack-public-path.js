/**
 * Set webpack's public path (default is root directory of URI resource) to Plugin's build directory.
 * This helps lazy-loading work correctly. This value is set in `/includes/Data.php` in Data::runtime().
 */
import { runtimeDataExists } from './constants';

const webpackPublicPath = () => {
	if (runtimeDataExists) {
		__webpack_public_path__ = window.nfdOnboarding.buildUrl;
	}
};

export default webpackPublicPath;
