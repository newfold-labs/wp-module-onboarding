import { actions as runtimeActions } from './slices/runtime';
import { actions as inputActions } from './slices/input';

export const actions = {
	...runtimeActions,
	...inputActions,
};

export default actions;
