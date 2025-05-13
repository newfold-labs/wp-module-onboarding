import { ReactComponent as BluehostLogo } from '@/assets/bluehost-logo.svg';

const Header = () => {
	return (
		<header className="nfd-onboarding-header nfd-top-0 nfd-z-20">
			<div className="nfd-onboarding-header-container nfd-flex nfd-justify-between nfd-items-center nfd-min-h-16 nfd-px-6">
				<BluehostLogo id="nfd-onboarding-header-logo" />
			</div>
		</header>
	);
};

export default Header;
