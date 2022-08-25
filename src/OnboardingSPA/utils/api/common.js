import { onboardingRestBase } from '../../../constants';

export const onboardingRestURL = (api) => {
     return (`${ onboardingRestBase }/${ api }` + ( window.nfdOnboarding?.currentFlow ? `&flow=${window.nfdOnboarding.currentFlow}` : ''));
}
