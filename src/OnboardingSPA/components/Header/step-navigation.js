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
		<Button onClick={navigateBack} variant="secondary" icon={chevronLeft}>
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
			// disabled={true}
			style={{ padding: '6px' }}
		>
			{__('Next', 'wp-module-onboarding')}
			<Icon icon={chevronRight} style={{ marginLeft: '8px' }} />
		</Button>
	);
};

/**
 * Finish step navigation button.
 * @returns
 */
const Finish = ({ path }) => (
	<Button variant="primary" href={path}>
		{__('Finish', 'wp-module-onboarding')}
		<Icon icon={chevronRight} style={{ marginLeft: '8px' }} />
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
	const isLastStep = null === nextStep || false === nextStep || exitToWordpressForEcommerce();
	const exitToWordpressLink = exitToWordpressForEcommerce() ? 'index.php?page=bluehost' : 'index.php';
	return (
		<div className="nfd-onboarding-header__step-navigation">
			<ButtonGroup style={{ display: 'flex', columnGap: '0.5rem' }}>
				{isFirstStep ? null : <Back path={previousStep.path} />}
				{isLastStep ? <Finish path={exitToWordpressLink} /> : <Next path={nextStep.path} />}
			</ButtonGroup>
		</div>
	);
};

/*
 * check if this is the last step 
 */
const exitToWordpressForEcommerce = () => {
	if( window.nfdOnboarding.currentFlow == 'ecommerce' && 
		String(window.nfdOnboarding.previousStepID).includes('/step/basic-info') ) {
		return true;
	}
	return false;
}
export default StepNavigation;
