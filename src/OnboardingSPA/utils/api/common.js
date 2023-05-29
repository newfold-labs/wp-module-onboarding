import { onboardingRestBase, wpRestBase, installerRestBase } from '../../../constants';

export const onboardingRestURL = ( api ) => {
	return (
		`${ onboardingRestBase }/${ api }` +
		( window.nfdOnboarding?.currentFlow
			? `&flow=${ window.nfdOnboarding.currentFlow }`
			: '' )
	);
};

export const installerRestURL = ( api ) => {
	return (
		`${ installerRestBase }/${ api }`
	);
};

export const wpRestURL = ( api ) => {
	return `${ wpRestBase }/${ api }`;
};
