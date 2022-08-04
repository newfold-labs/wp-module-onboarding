import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { useLocation, useNavigate } from 'react-router-dom';

import { store as nfdOnboardingStore } from '../../store';

/**
 * Interface Text Inputs with standard design.
 *
 * @returns
 */
const SkipButton = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { previousStep, nextStep } = useSelect(
        (select) => {
            return {
                previousStep: select(nfdOnboardingStore).getPreviousStep(),
                nextStep: select(nfdOnboardingStore).getNextStep(),
            };
        },
        []
    );

    const isFirstStep = null === previousStep || false === previousStep;
    const isLastStep = null === nextStep || false === nextStep;

    function skipStep() {
       if (isLastStep) 
       {
           return (
               <Button className="skip-button" href="index.php">
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

export default SkipButton;
