import { actions as runtimeActions } from './slices/runtime';
import { actions as inputActions } from './slices/input';
import { actions as sitegenActions } from './slices/sitegen';
import { actions as appActions } from './slices/app';

export const actions = {
	...runtimeActions,
	...inputActions,
	...sitegenActions,
	...appActions,
};

export default actions;
