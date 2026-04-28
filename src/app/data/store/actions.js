import { actions as runtimeActions } from './slices/runtime';
import { actions as inputActions } from './slices/input';
import { actions as sitegenActions } from './slices/sitegen';

export const actions = {
	...runtimeActions,
	...inputActions,
	...sitegenActions,
};

export default actions;
