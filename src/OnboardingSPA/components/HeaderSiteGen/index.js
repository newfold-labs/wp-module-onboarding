import { memo } from '@wordpress/element';

import StepNavigation from './step-navigation';

const Header = () => {
	return (
		<div className="nfd-onboarding-header">
			<StepNavigation />
		</div>
	);
};

export default memo( Header );
