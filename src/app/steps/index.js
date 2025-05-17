import { ForkStep } from './Fork';
import { IntakeStep } from './Intake';
import { LogoStep } from './Logo';
import { DesignStep } from './Design';
import { MigrationStep } from './Migration';

const STEPS = {
	fork: {
		path: '/',
		order: 10,
		isRequired: true,
		Component: ForkStep,
	},
	intake: {
		path: '/intake',
		order: 20,
		isRequired: true,
		Component: IntakeStep,
	},
	logo: {
		path: '/logo',
		order: 30,
		isRequired: true,
		Component: LogoStep,
	},
	design: {
		path: '/design',
		order: 40,
		isRequired: true,
		Component: DesignStep,
	},
	migration: {
		path: '/migration',
		order: 50,
		isRequired: false,
		Component: MigrationStep,
	},
};

export {
	STEPS,
	ForkStep,
	IntakeStep,
	LogoStep,
	DesignStep,
	MigrationStep,
};
