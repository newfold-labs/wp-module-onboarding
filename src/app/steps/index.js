import { ForkStep } from './Fork';
import { IntakeStep } from './Intake';
import { DreamAndDecideStep } from './DreamAndDecide';
import { DesignStep } from './Design';
import { MigrationStep } from './Migration';

const STEPS = {
	intro: {
		path: '/',
		order: 10,
		Component: ForkStep,
	},
	intake: {
		path: '/intake',
		order: 20,
		Component: IntakeStep,
	},
	decide: {
		path: '/decide',
		order: 30,
		Component: DreamAndDecideStep,
	},
	design: {
		path: '/design',
		order: 40,
		Component: DesignStep,
	},
	migration: {
		path: '/migration',
		order: 50,
		Component: MigrationStep,
	},
};

export {
	STEPS,
	ForkStep,
	IntakeStep,
	DreamAndDecideStep,
	DesignStep,
	MigrationStep,
};
