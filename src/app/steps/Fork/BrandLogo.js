import bluehostLogo from '@/assets/bluehost-logo.svg';
import networkSolutionsLogo from '@/assets/web-logo.svg';

// Brand configuration object
const BRAND_CONFIG = {
	bluehost: {
		logo: bluehostLogo,
		name: 'Bluehost',
	},
	web: {
		logo: networkSolutionsLogo,
		name: 'Network Solutions',
	},
};

const BrandLogo = () => {
	const brandName = window.NewfoldRuntime?.plugin?.brand;
	// Get brand config or fallback to bluehost
	const brand = BRAND_CONFIG[ brandName ] || BRAND_CONFIG.bluehost;

	return (
		<img
			src={ brand.logo }
			alt={ brand.name }
			className="nfd-w-[90px] nfd-h-auto mobile:nfd-w-[70px]"
		/>
	);
};

export default BrandLogo;
