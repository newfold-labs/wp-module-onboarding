// eslint-disable-next-line import/no-extraneous-dependencies
import { filter } from 'lodash';
import { stepDesignThemeStylesPreview } from '../../steps/DesignThemeStyles/Preview/step';
import { stepSiteGenMigration } from '../../steps/SiteGen/Migration/step';

export const injectInAllSteps = ( allSteps, conditionalSteps ) => {
	const updates = removeFromAllSteps( allSteps, conditionalSteps );
	const steps = [ ...conditionalSteps ];
	return {
		allSteps: addAfter(
			updates.allSteps,
			stepDesignThemeStylesPreview,
			steps
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

export const addAfter = ( steps, stepOne, stepTwo ) => {
	const position = steps.findIndex( ( step ) => {
		return step.path === stepOne.path;
	} );
	steps.splice( position + 1, 0, ...stepTwo );
	return steps;
};

export const addAfterChapter = ( chapters, chapterOne, chapterTwo ) => {
	const position = chapters.findIndex( ( chapter ) => {
		return chapter.id === chapterOne.id;
	} );
	chapters.splice( position + 1, 0, chapterTwo );
	return chapters;
};

export const validateFlow = ( brandConfig, flow ) => {
	const enabledFlows = brandConfig?.enabled_flows ?? {};
	if ( ! ( flow in enabledFlows ) || enabledFlows[ flow ] !== true ) {
		return false;
	}
	return true;
};

export const removeFromTopSteps = ( topSteps, conditionalSteps ) => {
	const conditionalStepsPaths = new Set(
		conditionalSteps.map( ( a ) => a.path )
	);

	return {
		topSteps: filter(
			topSteps,
			( topStep ) => ! conditionalStepsPaths.has( topStep.path )
		),
	};
};

export const removeFromRoutes = ( routes, conditionalSteps ) => {
	const conditionalStepsPaths = new Set(
		conditionalSteps.map( ( a ) => a.path )
	);

	return {
		routes: filter(
			routes,
			( route ) => ! conditionalStepsPaths.has( route.path )
		),
	};
};

export const injectMigrationStep = ( allSteps, targetStep ) => {
	return {
		allSteps: addAfter( allSteps, targetStep, [ stepSiteGenMigration ] ),
	};
};

export const removeStep = ( steps, stepToRemove ) => {
	const position = steps.findIndex(
		( step ) => step.path === stepToRemove.path
	);
	if ( position !== -1 ) {
		steps.splice( position, 1 );
	}
	return steps;
};

export const addToRoutes = ( routes, newStep, afterStep ) => {
	const index = routes.findIndex(
		( route ) => route.path === afterStep.path
	);
	if ( index !== -1 ) {
		// Insert newStep into routes after the specified afterStep
		routes.splice( index + 1, 0, newStep );
	}
	return {
		routes,
	};
};
