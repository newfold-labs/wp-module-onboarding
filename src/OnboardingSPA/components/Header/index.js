import { memo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useLocation } from 'react-router-dom';

import HeaderEnd from './components/HeaderEnd';
import ExitToWordPress from '../ExitToWordPress';
import { store as nfdOnboardingStore } from '../../store';

/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @return {WPComponent} Header
 */
const Header = () => {
	const location = useLocation();

	const { firstStep } = useSelect( ( select ) => {
		return {
			firstStep: select( nfdOnboardingStore ).getFirstStep(),
		};
	}, [] );

	const isGettingStarted = firstStep?.path === location?.pathname;
	return (
		<div className="nfd-onboarding-header">
			<div className="nfd-onboarding-header__start">
				{ isGettingStarted ? (
					<ExitToWordPress origin="header-first-step" />
				) : null }
			</div>
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
