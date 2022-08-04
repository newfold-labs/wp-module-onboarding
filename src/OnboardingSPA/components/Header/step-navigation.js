import { useSelect } from '@wordpress/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@wordpress/components';
import { Icon, chevronLeft, chevronRight } from '@wordpress/icons';

import { __ } from '@wordpress/i18n';
import { setFlow } from '../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../store';
import { adminPage } from '../../utils/api/commonAPI';
import { getSettings, setSettings } from '../../utils/api/settings';

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

async function syncSocialSettingsFinish( currentData ) {
	const initialData = await getSettings();
	const result = await setSettings(currentData?.data?.socialData);
	if (result?.error != null) {
		console.error('Unable to Save Social Data!');
		return initialData?.body;
	}
	return result?.body;
}

async function saveData(path, currentData) {

	if (currentData) {

		// If Social Data is changed then sync it
		if (path?.includes('basic-info')) {
			const socialData = await syncSocialSettingsFinish(currentData);

			// If Social Data is changed then Sync that also to the store
			if (socialData && currentData?.data)
				currentData.data.socialData = socialData;
		}
		setFlow(currentData);
	}
	//Redirect to Admin Page
	window.location.replace(adminPage);
}

/**
 * Finish step navigation button.
 * @returns
 */
const Finish = ({ path, currentData, saveData }) => (
	<Button
		onClick={(e) => saveData(path, currentData)}
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
	const { previousStep, nextStep, currentData } = useSelect(
		(select) => {
			return {
				nextStep: select(nfdOnboardingStore).getNextStep(),
				previousStep: select(nfdOnboardingStore).getPreviousStep(),
				currentData: select(nfdOnboardingStore).getCurrentOnboardingData(),
			};
		},
		[location.pathname]
	);
	const isFirstStep = null === previousStep || false === previousStep;
	const isLastStep = null === nextStep || false === nextStep;
	const exitToWordpressLink = exitToWordpressForEcommerce() ? 'index.php?page=bluehost' : 'index.php';
	return (
		<div className="nfd-onboarding-header__step-navigation">
			<ButtonGroup style={{ display: 'flex', columnGap: '0.5rem' }}>
				{isFirstStep ? null : <Back path={previousStep.path} />}
				{isLastStep ? <Finish path={location.pathname} currentData={currentData} saveData={saveData}/> : <Next path={nextStep.path} />}
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
