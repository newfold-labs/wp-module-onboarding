import { StartStep } from './Start';
import { InfoStep } from './Info';
import { DesignStep } from './Design';

const STEPS = {
	start: {
		path: '/',
		order: 1,
		Component: StartStep,
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
	StartStep,
	InfoStep,
	DesignStep,
};
