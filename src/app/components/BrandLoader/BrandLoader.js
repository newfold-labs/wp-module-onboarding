import { useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import bluehostLogo from '../../../Brands/bluehost/step-loader-logo.svg';
import hostgatorLogo from '../../../Brands/hostgator/step-loader-logo.svg';
import crazyDomainsLogo from '../../../Brands/crazy-domains/step-loader-logo.svg';
import networksolutionsLogo from '../../../Brands/networksolutions/step-loader-logo.svg';
import wordpressLogo from '../../../Brands/wordpress/step-loader-logo.svg';
import './BrandLoader.scss';
import vodienLogo from '../../../Brands/vodien/logo.svg';

/**
 * BrandLoader component - displays brand-specific loading animation
 *
 * @param {Object} props        Component props
 * @param {string} props.width  Width of the loader (default: '120px')
 * @param {string} props.height Height of the loader (default: '120px')
 * @param {string} props.alt    Alt text for the loader image
 * @return {JSX.Element} Brand loader component
 */
const BrandLoader = ( { width = '120px', height = '120px', alt = 'Loading animation' } ) => {
	const brandName = useSelect( ( select ) => {
		return select( nfdOnboardingStore ).getBrandName();
	}, [] );

	if ( ! brandName ) {
		return null;
	}
	const normalizedBrand = brandName.toLowerCase().replace( / /g, '-' );

	// Map brand names to their imported logos
	const brandLogoMap = {
		bluehost: bluehostLogo,
		'bluehost-india': bluehostLogo,
		hostgator: hostgatorLogo,
		'hostgator-us': hostgatorLogo,
		'hostgator-br': hostgatorLogo,
		'crazy-domains': crazyDomainsLogo,
		'network-solutions': networksolutionsLogo,
		vodien: vodienLogo,
		wordpress: wordpressLogo,
	};

	const logoUrl = brandLogoMap[ normalizedBrand ] || wordpressLogo;

	return (
		<div
			className="brand-loader"
			role="img"
			aria-label={ alt }
			style={ {
				width,
				height,
				backgroundImage: `url(${ logoUrl })`,
			} }
		/>
	);
};

export default BrandLoader;
