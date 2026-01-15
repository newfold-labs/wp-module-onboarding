import { actions as runtimeActions } from './slices/runtime';
import { actions as inputActions } from './slices/input';
import { actions as sitegenActions } from './slices/sitegen';
import { actions as logogenActions } from './slices/logogen';
import { actions as blueprintsActions } from './slices/blueprints';

export const actions = {
	...runtimeActions,
	...inputActions,
	...sitegenActions,
	...logogenActions,
	...blueprintsActions,
};

export default actions;
