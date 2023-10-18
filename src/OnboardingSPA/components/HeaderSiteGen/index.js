import { memo } from '@wordpress/element';

import StepNavigation from './step-navigation';
/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @return {WPComponent} Header
 */
const Header = () => {
	return (
		<div className="nfd-onboarding-header">
				<StepNavigation />
		</div>
	);
};

export default memo( Header );
