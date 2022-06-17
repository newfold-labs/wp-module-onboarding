import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@wordpress/compose';
import StepNavigation from './step-navigation';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

import { store as nfdOnboardingStore } from '../../store';
import ExitToWordPress from '../ExitToWordPress';

/**
 * Interface header rendered into header render prop in <InterfaceSkeleton />.
 *
 * @returns
 */
const Header = () => {
	const location = useLocation();

	const { firstStep } = useSelect((select) => {
		return {
			firstStep: select(nfdOnboardingStore).getFirstStep(),
		};
	}, []);
	const { previousStep, nextStep } = useSelect(
		(select) => {
			return {
				previousStep: select(nfdOnboardingStore).getPreviousStep(),
				nextStep: select(nfdOnboardingStore).getNextStep(),
			};
		},
		[location.path]
	);
	const isGettingStarted = firstStep?.path === location?.pathname;
	return (
		<div className="nfd-onboarding-header">
			<div className="nfd-onboarding-header__start">
				{isGettingStarted ? (
					<ExitToWordPress origin="header-first-step" />
				) : null}
			</div>
			<div className="nfd-onboarding-header__center">
				{/* Centered Header Slot */}
			</div>
			<div className="nfd-onboarding-header__end">
				<StepNavigation />
			</div>
		</div>
	);
};

export default Header;
