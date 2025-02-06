import { IntakeStep } from './Intake';
import { InfoStep } from './Info';
import { DesignStep } from './Design';

const STEPS = {
	start: {
		path: '/',
		order: 1,
		Component: IntakeStep,
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
	IntakeStep,
	InfoStep,
	DesignStep,
};
