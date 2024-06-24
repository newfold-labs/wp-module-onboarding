import {
	onboardingRestBase,
	wpRestBase,
	installerRestBase,
	migrateRestBase,
} from '../../../constants';

export const onboardingRestURL = ( api, includeFlow = true ) => {
	return (
		`${ onboardingRestBase }/${ api }` +
		( includeFlow && window.nfdOnboarding?.currentFlow
			? `&flow=${ window.nfdOnboarding.currentFlow }`
			: '' )
	);
};

export const installerRestURL = ( api ) => {
	return `${ installerRestBase }/${ api }`;
};

export const migrateRestURL = ( api ) => {
	return `${ migrateRestBase }/${ api }`;
};

export const wpRestURL = ( api ) => {
	return `${ wpRestBase }/${ api }`;
};
