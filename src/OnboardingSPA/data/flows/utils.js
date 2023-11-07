// eslint-disable-next-line import/no-extraneous-dependencies
import { filter } from 'lodash';
import { stepDesignThemeStylesPreview } from '../../steps/DesignThemeStyles/Preview/step';

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
