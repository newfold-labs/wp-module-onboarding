import { actions as runtimeActions } from './slices/runtime';
import { actions as inputActions } from './slices/input';
import { actions as sitegenActions } from './slices/sitegen';
import { actions as blueprintsActions } from './slices/blueprints';

export const actions = {
	...runtimeActions,
	...inputActions,
	...sitegenActions,
	...blueprintsActions,
};

export default actions;
