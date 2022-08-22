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
    const { previousStep, nextStep, currentData } = useSelect(
        (select) => {
            return {
                previousStep: select(nfdOnboardingStore).getPreviousStep(),
                nextStep: select(nfdOnboardingStore).getNextStep(),
                currentData: select(nfdOnboardingStore).getCurrentOnboardingFlowData(),
            };
        },
        []
    );

    const isFirstStep = null === previousStep || false === previousStep;
    const isLastStep = null === nextStep || false === nextStep;


    async function syncSocialSettingsFinish(currentData) {
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
          currentData.isComplete = new Date().getTime();

            // If Social Data is changed then sync it
            if (path?.includes('basic-info')) {
                const socialData = await syncSocialSettingsFinish(currentData);

                // If Social Data is changed then Sync that also to the store
                if (socialData && currentData?.data)
                    currentData.data.socialData = socialData;
            }
            setFlow(currentData);
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
                   onClick={(e) => saveData(location.pathname, currentData)} >
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
