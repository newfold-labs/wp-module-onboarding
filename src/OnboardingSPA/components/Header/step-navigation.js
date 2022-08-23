import { useSelect } from '@wordpress/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@wordpress/components';
import { Icon, chevronLeft, chevronRight } from '@wordpress/icons';

import { __ } from '@wordpress/i18n';
import { setFlow } from '../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../store';
import { getSettings, setSettings } from '../../utils/api/settings';
import { wpAdminPage, bluehostDashboardPage } from '../../../constants';

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

async function syncSocialSettingsFinish( flowData ) {
	const initialData = await getSettings();
	const result = await setSettings(flowData?.data?.socialData);
	if (result?.error != null) {
		console.error('Unable to Save Social Data!');
		return initialData?.body;
	}
	return result?.body;
}

async function saveData(path, flowData) {

	if (flowData) {
          flowData.isComplete = new Date().getTime();
		// If Social Data is changed then sync it
		if (path?.includes('basic-info')) {
			const socialData = await syncSocialSettingsFinish(flowData);

			// If Social Data is changed then Sync that also to the store
			if (socialData && flowData?.data)
				flowData.data.socialData = socialData;
		}
		setFlow(flowData);
	}
	//Redirect to Admin Page for normal customers 
	// and Bluehost Dashboard for ecommerce customers
	const exitLink = exitToWordpressForEcommerce() ? bluehostDashboardPage : wpAdminPage;
	window.location.replace(exitLink);
}

/**
 * Finish step navigation button.
 * @returns
 */
const Finish = ({ path, flowData, saveData }) => (
	<Button
		onClick={(e) => saveData(path, flowData)}
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
	const { previousStep, nextStep, flowData } = useSelect(
		(select) => {
			return {
				nextStep: select(nfdOnboardingStore).getNextStep(),
				previousStep: select(nfdOnboardingStore).getPreviousStep(),
				flowData: select(nfdOnboardingStore).getOnboardingFlowData(),
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
				{isLastStep ? <Finish path={location.pathname} flowData={flowData} saveData={saveData}/> : <Next path={nextStep.path} />}
			</ButtonGroup>
		</div>
	);
};

/*
 * check if this is the last step 
 */
const exitToWordpressForEcommerce = () => {
	if( window.nfdOnboarding.currentFlow == 'ecommerce' ) {
		return true;
	}
	return false;
}
export default StepNavigation;
