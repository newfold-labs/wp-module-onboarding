import { actions as runtimeActions } from './slices/runtime';
import { actions as sitegenActions } from './slices/sitegen';

export const actions = {
	...runtimeActions,
	...sitegenActions,
};

export default actions;
