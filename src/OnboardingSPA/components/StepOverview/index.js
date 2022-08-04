import Accordion from '../Accordion';
import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../store';
import { useLocation } from 'react-router-dom';
import { useSelect } from '@wordpress/data';
/**
 * TEMPORARY component for rendering step details.
 *
 * [TODO]: Remove this component when no longer necessary.
 *
 * @returns
 */
const StepOverview = () => {
	const location = useLocation();
	const { currentStep } = useSelect(
		(select) => {
			return {
				currentStep: select(nfdOnboardingStore).getCurrentStep(),
			};
		},
		[location.pathname]
	);

	return (
		<div className="nfd-onboarding-overview">
			<div className="nfd-onboarding-overview__header">
				<div className="nfd-onboarding-overview__header-icon">
					<Icon
						icon={currentStep.Icon}
						size={64}
						style={{ fill: 'var(--nfd-onboarding-primary)' }}
					/>
				</div>
				<div>
					<h2 className="nfd-onboarding-overview__header-heading">
						{currentStep.heading}
					</h2>
					<strong className="nfd-onboarding-overview__header-subheading">
						{currentStep.subheading}
					</strong>
				</div>
			</div>
			<br />
			<Accordion summary={__('Learn More', 'wp-module-onboarding')}>
				<p>{currentStep.description}</p>
			</Accordion>
		</div>
	);
};

export default StepOverview;
