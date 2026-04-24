import { actions as runtimeActions } from './slices/runtime';
import { actions as inputActions } from './slices/input';
import { actions as sitegenActions } from './slices/sitegen';
import { actions as logogenActions } from './slices/logogen';

export const actions = {
	...runtimeActions,
	...inputActions,
	...sitegenActions,
	...logogenActions,
};

export default actions;
