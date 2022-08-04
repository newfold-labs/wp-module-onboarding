import { Button, ButtonGroup } from '@wordpress/components';
import { Icon, chevronLeft, chevronRight } from '@wordpress/icons';
import { useLocation, useNavigate } from 'react-router-dom';

import { __ } from '@wordpress/i18n';
import { store as nfdOnboardingStore } from '../../store';
import { useSelect } from '@wordpress/data';

/**
 * Back step Navigation button.
 * @param {*} param0
 * @returns
 */
const Back = ({ path }) => {
	const navigate = useNavigate();
	const navigateBack = () => navigate(path, { state: { origin: 'header' } });
	return (
		<Button className= "navigation-buttons navigation-buttons_back" 
				onClick={navigateBack} 
				variant="secondary">
			<Icon icon={chevronLeft} />
			{__('Back', 'wp-module-onboarding')}
		</Button>
	);
};

/**
 * Next step naigation button
 * @param {*} param0
 * @returns
 */
const Next = ({ path }) => {
	/* [TODO]: some sense of isStepComplete to enable/disable */
	const navigate = useNavigate();
	const navigateNext = () => navigate(path, { state: { origin: 'header' } });
	return (
		<Button
			onClick={navigateNext}
			variant="primary"
			className="navigation-buttons navigation-buttons_next">
			{__('Next', 'wp-module-onboarding')}
			<Icon icon={chevronRight} />
		</Button>
	);
};

/**
 * Finish step navigation button.
 * @returns
 */
const Finish = () => (
	<Button 
		href="index.php"
		className="navigation-buttons navigation-buttons_finish" 
		variant="primary">
		{__('Finish', 'wp-module-onboarding')}
		<Icon icon={chevronRight} />
	</Button>
);

/**
 * Step buttons presented in Header.
 * @returns
 */
const StepNavigation = () => {
	const location = useLocation();
	const { previousStep, nextStep } = useSelect(
		(select) => {
			return {
				previousStep: select(nfdOnboardingStore).getPreviousStep(),
				nextStep: select(nfdOnboardingStore).getNextStep(),
			};
		},
		[location.pathname]
	);
	const isFirstStep = null === previousStep || false === previousStep;
	const isLastStep = null === nextStep || false === nextStep;
	return (
		<div className="nfd-onboarding-header__step-navigation">
			<ButtonGroup style={{ display: 'flex', columnGap: '0.5rem' }}>
				{isFirstStep ? null : <Back path={previousStep.path} />}
				{isLastStep ? <Finish /> : <Next path={nextStep.path} />}
			</ButtonGroup>
		</div>
	);
};

export default StepNavigation;
