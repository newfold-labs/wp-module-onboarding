import { WelcomeStep } from './Welcome';
import { InfoStep } from './Info';

const STEPS = {
	welcome: {
		path: '/',
		order: 1,
		Component: WelcomeStep,
	},
	info: {
		path: '/info',
		order: 2,
		Component: InfoStep,
	},
};

export { STEPS, WelcomeStep, InfoStep };
