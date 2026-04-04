import { useSelect } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import bluehostLogo from '../../../Brands/bluehost/bluehost-logo.svg';
import hostgatorLogo from '../../../Brands/hostgator/logo.svg';
import crazyDomainsLogo from '../../../Brands/crazy-domains/logo.svg';
import networksolutionsLogo from '../../../Brands/networksolutions/logo.svg';
import vodienLogo from '../../../Brands/vodien/logo.svg';
import wordpressLogo from '../../../Brands/wordpress/logo.svg';

// Map brand names to their imported logos
const brandLogoMap = {
	bluehost: bluehostLogo,
	'bluehost-india': bluehostLogo,
	hostgator: hostgatorLogo,
	'hostgator-us': hostgatorLogo,
	'hostgator-br': hostgatorLogo,
	'crazy-domains': crazyDomainsLogo,
	webcom: networksolutionsLogo,
	wordpress: wordpressLogo,
	vodien: vodienLogo,
};

/**
 * BrandLogo component - displays brand-specific logos
 *
 * @return {JSX.Element|null} Brand logo component
 */
const BrandLogo = () => {
	const { brandId, brandName } = useSelect(
		( select ) => {
			const store = select( nfdOnboardingStore );
			return {
				brandId: store.getBrandId(),
				brandName: store.getBrandName(),
			};
		},
		[]
	);

	if ( ! brandId ) {
		return null;
	}

	const logoUrl = brandLogoMap[ brandId ] || wordpressLogo;

	return (
		<img
			src={ logoUrl }
			alt={ `${ brandName } logo` }
			className="nfd-h-10 nfd-w-auto nfd-max-w-[200px] nfd-object-contain"
		/>
	);
};

export default BrandLogo;
