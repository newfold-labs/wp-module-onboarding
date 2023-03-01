import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { useLocation, useNavigate } from 'react-router-dom';

import { setFlow } from '../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../store';
import { getSettings, setSettings } from '../../utils/api/settings';
import { wpAdminPage, bluehostDashboardPage } from '../../../constants';

/**
 * Interface Text Inputs with standard design.
 *
 * @returns
 */
const SkipButton = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { previousStep, nextStep, flowData } = useSelect(
        (select) => {
            return {
                previousStep: select(nfdOnboardingStore).getPreviousStep(),
                nextStep: select(nfdOnboardingStore).getNextStep(),
                flowData: select(nfdOnboardingStore).getCurrentOnboardingFlowData(),
            };
        },
        []
    );

    const isFirstStep = null === previousStep || false === previousStep;
    const isLastStep = null === nextStep || false === nextStep;


    async function syncSocialSettingsFinish(flowData) {
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
        // Redirect to Admin Page for normal customers 
        // and Bluehost Dashboard for ecommerce customers
        const exitLink = exitToWordpressForEcommerce() ? bluehostDashboardPage : wpAdminPage;
        window.location.replace(exitLink);
    }

    function skipStep() {
       if (isLastStep) 
       {
           return (
               <Button className="skip-button"
                   onClick={(e) => saveData(location.pathname, flowData)} >
                    {__('Skip this Step', 'wp-module-onboarding')}
                </Button>
           );
       }
       else {
           return (
               <Button className="skip-button"
                   onClick={(e) => navigate(nextStep.path)} >
                   {__('Skip this Step', 'wp-module-onboarding')}
               </Button>
           );
       }
    }
   
    return skipStep();
};


/*
 * check if this is the last step 
 */
const exitToWordpressForEcommerce = () => {
    if (window.nfdOnboarding.currentFlow == 'ecommerce') {
        return true;
    }
    return false;
}
export default SkipButton;
