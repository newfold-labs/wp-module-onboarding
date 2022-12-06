import { onboardingRestBase, wpRestBase } from '../../../constants';

export const onboardingRestURL = ( api ) => {
	return (
		`${ onboardingRestBase }/${ api }` +
		( window.nfdOnboarding?.currentFlow
			? `&flow=${ window.nfdOnboarding.currentFlow }`
			: '' )
	);
};

export const wpRestURL = ( api ) => {
	return `${ wpRestBase }/${ api }`;
};
