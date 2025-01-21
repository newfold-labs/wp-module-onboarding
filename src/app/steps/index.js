import { WelcomeStep } from './Welcome';
import { InfoStep } from './Info';
import { DesignStep } from './Design';

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
	design: {
		path: '/design',
		order: 3,
		Component: DesignStep,
	},
};

export {
	STEPS,
	WelcomeStep,
	InfoStep,
	DesignStep,
};
