// eslint-disable-next-line import/no-extraneous-dependencies
import { orderBy, filter } from 'lodash';
import { conditionalSteps } from '../../../data/routes/';

export const addColorAndTypographyRoutes = (
	routes,
	allSteps,
	designSteps
) => {
	const updates = removeColorAndTypographyRoutes(
		routes,
		allSteps,
		designSteps
	);
	const steps = [
		conditionalSteps.designColors,
		conditionalSteps.designTypography,
	];
	return {
		routes: orderBy(
			updates.routes.concat( steps ),
			[ 'priority' ],
			[ 'asc' ]
		),
		allSteps: orderBy(
			updates.allSteps.concat( steps ),
			[ 'priority' ],
			[ 'asc' ]
		),
		designSteps: orderBy(
			updates.designSteps.concat( steps ),
			[ 'priority' ],
			[ 'asc' ]
		),
	};
};

export const removeColorAndTypographyRoutes = (
	routes,
	allSteps,
	designSteps
) => {
	return {
		routes: filter(
			routes,
			( route ) =>
				! route.path.includes( conditionalSteps.designColors.path ) &&
				! route.path.includes( conditionalSteps.designTypography.path )
		),
		allSteps: filter(
			allSteps,
			( allStep ) =>
				! allStep.path.includes( conditionalSteps.designColors.path ) &&
				! allStep.path.includes(
					conditionalSteps.designTypography.path
				)
		),
		designSteps: filter(
			designSteps,
			( designStep ) =>
				! designStep.path.includes(
					conditionalSteps.designColors.path
				) &&
				! designStep.path.includes(
					conditionalSteps.designTypography.path
				)
		),
	};
};
