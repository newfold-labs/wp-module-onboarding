/**
 * Set webpack's public path (default is root directory of URI resource) to Plugin's build directory.
 * This helps lazy-loading work correctly. This value is set in `/includes/Data.php` in Data::runtime().
 */
import { runtimeDataObjectIsMounted } from './onboarding';

const webpackPublicPath = () => {
	if ( runtimeDataObjectIsMounted() ) {
		// eslint-disable-next-line camelcase, no-undef
		__webpack_public_path__ = window.nfdOnboarding.runtime.buildUrl;
	}
};

export default webpackPublicPath;
