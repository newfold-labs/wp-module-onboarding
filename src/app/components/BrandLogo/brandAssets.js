import bluehostLogo from '../../../Brands/bluehost/bluehost-logo.svg';
import hostgatorLogo from '../../../Brands/hostgator/logo.svg';
import crazyDomainsLogo from '../../../Brands/crazy-domains/logo.svg';
import networksolutionsLogo from '../../../Brands/networksolutions/logo.svg';
import wordpressLogo from '../../../Brands/wordpress/logo.svg';
import newfoldLogo from '../../../Brands/newfold/logo.svg';

/**
 * @type {Record<string, string>}
 */
export const LOGOS_BY_DIR = {
	bluehost: bluehostLogo,
	hostgator: hostgatorLogo,
	'crazy-domains': crazyDomainsLogo,
	networksolutions: networksolutionsLogo,
	wordpress: wordpressLogo,
	newfold: newfoldLogo,
};

/**
 * Resolve brand slug for logo assets from runtime / host plugin.
 *
 * @param {Record<string, string>} currentBrand Localized currentBrand payload.
 * @return {string} Registry-style brand slug.
 */
export function brandSlugFromRuntime( currentBrand = {} ) {
	if ( currentBrand.brand ) {
		return currentBrand.brand;
	}

	const hostBrand = window.NewfoldRuntime?.plugin?.brand;
	if ( typeof hostBrand === 'string' && hostBrand.length > 0 ) {
		return hostBrand;
	}

	return 'wordpress';
}

/**
 * Brand slug → asset directory under src/Brands/.
 *
 * @param {string} brandSlug Brand registry slug from runtime.
 * @return {string} Directory name under src/Brands/ for static assets.
 */
export function assetDirForBrand( brandSlug ) {
	if ( ! brandSlug ) {
		return 'wordpress';
	}
	if ( brandSlug.startsWith( 'bluehost' ) ) {
		return 'bluehost';
	}
	if ( brandSlug.startsWith( 'hostgator' ) ) {
		return 'hostgator';
	}
	if ( brandSlug === 'crazy-domains' ) {
		return 'crazy-domains';
	}
	if ( brandSlug === 'webcom' || brandSlug.startsWith( 'network' ) ) {
		return 'networksolutions';
	}
	return 'wordpress';
}

/**
 * @param {string} brandSlug Brand registry slug from runtime.
 * @return {string} Bundled logo URL for webpack.
 */
export function logoSrcForBrand( brandSlug ) {
	const dir = assetDirForBrand( brandSlug );
	return LOGOS_BY_DIR[ dir ] ?? LOGOS_BY_DIR.wordpress;
}
