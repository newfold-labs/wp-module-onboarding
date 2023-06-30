// eslint-disable-next-line import/no-extraneous-dependencies
import { orderBy, filter } from 'lodash';
import { conditionalSteps } from '../../../data/routes/';

export const addColorAndTypographyRoutes = (
	allSteps,
) => {
	const updates = removeColorAndTypographyRoutes(
		allSteps,
	);
	const steps = [
		conditionalSteps[0],
		conditionalSteps[1],
	];
	return {
		allSteps: orderBy(
			updates.allSteps.concat( steps ),
			[ 'priority' ],
			[ 'asc' ]
		),
	};
};

export const removeColorAndTypographyRoutes = (
	allSteps,
) => {
	return {
		allSteps: filter(
			allSteps,
			( allStep ) =>
				! allStep.path.includes( conditionalSteps[0].path ) &&
				! allStep.path.includes(
					conditionalSteps[1].path
				)
		),
	};
};
