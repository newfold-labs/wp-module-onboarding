/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { nfdOnboardingStore } from '@/data/store';
import { logoSrcForBrand } from './brandAssets';

/**
 * Header brand logo and link for the current host brand.
 *
 * @return {JSX.Element|null} Brand logo link, or null when brand name is missing.
 */
export default function BrandLogo() {
	const { name, url, brand } = useSelect( ( select ) => {
		const runtime = select( nfdOnboardingStore ).getRuntimeSlice();
		const currentBrand =
			runtime?.currentBrand ?? window.nfdOnboarding?.runtime?.currentBrand ?? {};

		return {
			name: currentBrand.name ?? '',
			url: currentBrand.url ?? '#',
			brand: currentBrand.brand ?? 'bluehost',
		};
	}, [] );

	if ( ! name ) {
		return null;
	}

	const logoSrc = logoSrcForBrand( brand );
	// translators: %s is the brand display name (e.g. Bluehost, HostGator).
	const alt = sprintf( __( '%s logo', 'wp-module-onboarding' ), name );

	return (
		<a href={ url } target="_blank" rel="noopener noreferrer">
			<img src={ logoSrc } alt={ alt } className="nfd-h-7 nfd-w-auto" />
		</a>
	);
}
