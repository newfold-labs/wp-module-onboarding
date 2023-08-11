import { memo } from '@wordpress/element';

import HeaderEnd from './components/HeaderEnd';

/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @return {WPComponent} Header
 */
const Header = () => {
	return (
		<div className="nfd-onboarding-header">
			<div className="nfd-onboarding-header__center">
				{ /* Centered Header Slot */ }
			</div>
			<div className="nfd-onboarding-header__end">
				<HeaderEnd />
			</div>
		</div>
	);
};

export default memo( Header );
