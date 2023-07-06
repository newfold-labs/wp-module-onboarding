// eslint-disable-next-line import/no-extraneous-dependencies
import { orderBy, filter } from 'lodash';

export const injectInAllSteps = ( allSteps, conditionalSteps ) => {
	const updates = removeFromAllSteps( allSteps, conditionalSteps );
	const steps = [ ...conditionalSteps ];
	return {
		allSteps: orderBy(
			updates.allSteps.concat( steps ),
			[ 'priority' ],
			[ 'asc' ]
		),
	};
};

export const removeFromAllSteps = ( allSteps, conditionalSteps ) => {
	const conditionalStepsPaths = new Set(
		conditionalSteps.map( ( a ) => a.path )
	);
	return {
		allSteps: filter(
			allSteps,
			( allStep ) => ! conditionalStepsPaths.has( allStep.path )
		),
	};
};
