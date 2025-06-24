import { ForkStep } from './Fork';
import { IntakeStep } from './Intake';
import { LogoStep } from './Logo';
import { GeneratingStep } from './Generating';
import { PreviewsStep } from './Previews';
import { CanvasStep } from './Canvas';
import { MigrationStep } from './Migration';
import { withStepValidation } from '../components/Step/StepValidationWrapper';

const STEPS = {
	fork: {
		path: '/',
		order: 10,
		isRequired: true,
		Component: withStepValidation( ForkStep, 'fork' ),
	},
	intake: {
		path: '/intake',
		order: 20,
		isRequired: true,
		Component: withStepValidation( IntakeStep, 'intake' ),
	},
	logo: {
		path: '/logo',
		order: 30,
		isRequired: true,
		Component: withStepValidation( LogoStep, 'logo' ),
	},
	generating: {
		path: '/generating',
		order: 50,
		isRequired: true,
		Component: withStepValidation( GeneratingStep, 'generating' ),
	},
	previews: {
		path: '/previews',
		order: 60,
		isRequired: true,
		Component: withStepValidation( PreviewsStep, 'previews' ),
	},
	design: {
		path: '/canvas',
		order: 70,
		isRequired: true,
		Component: withStepValidation( CanvasStep, 'design' ),
	},
	migration: {
		path: '/migration',
		order: 80,
		isRequired: false,
		Component: withStepValidation( MigrationStep, 'migration' ),
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
	MigrationStep,
};
