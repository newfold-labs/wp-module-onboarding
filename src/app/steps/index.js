import { IntroStep } from './Intro';
import { IntakeStep } from './Intake';
import { DreamAndDecideStep } from './DreamAndDecide';
import { DesignStep } from './Design';

const STEPS = {
	intro: {
		path: '/',
		order: 1,
		Component: IntroStep,
	},
	intake: {
		path: '/intake',
		order: 2,
		Component: IntakeStep,
	},
	decide: {
		path: '/decide',
		order: 3,
		Component: DreamAndDecideStep,
	},
	design: {
		path: '/design',
		order: 4,
		Component: DesignStep,
	},
};

export {
	STEPS,
	IntroStep,
	IntakeStep,
	DreamAndDecideStep,
	DesignStep,
};
