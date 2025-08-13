import { ForkStep } from './Fork';
import { IntakeStep } from './Intake';
import { LogoStep } from './Logo';
import { GeneratingStep } from './Generating';
import { PreviewsStep } from './Previews';
import { CanvasStep } from './Canvas';
import { BlueprintsStep } from './Blueprints';
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
		order: 40,
		isRequired: true,
		Component: GeneratingStep,
	},
	previews: {
		path: '/previews',
		order: 50,
		isRequired: true,
		Component: PreviewsStep,
	},
	design: {
		path: '/canvas',
		order: 60,
		isRequired: true,
		Component: CanvasStep,
	},
	blueprints: {
		path: '/blueprints',
		order: 70,
		isRequired: false,
		Component: BlueprintsStep,
	},
	migration: {
		path: '/migration',
		order: 80,
		isRequired: false,
		Component: MigrationStep,
	},
};

export {
	STEPS,
	ForkStep,
	IntakeStep,
	LogoStep,
	GeneratingStep,
	PreviewsStep,
	CanvasStep,
	BlueprintsStep,
	MigrationStep,
};
