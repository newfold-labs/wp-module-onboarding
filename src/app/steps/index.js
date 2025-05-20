import { ForkStep } from './Fork';
import { IntakeStep } from './Intake';
import { LogoStep } from './Logo';
import { GeneratingStep } from './Generating';
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
	generating: {
		path: '/generating',
		order: 50,
		isRequired: true,
		Component: GeneratingStep,
	},
	design: {
		path: '/design',
		order: 60,
		isRequired: true,
		Component: DesignStep,
	},
	migration: {
		path: '/migration',
		order: 70,
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
