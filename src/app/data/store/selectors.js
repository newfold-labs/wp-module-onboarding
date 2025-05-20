import { selectors as runtimeSelectors } from './slices/runtime';
import { selectors as inputSelectors } from './slices/input';

const selectors = {
	...runtimeSelectors,
	...inputSelectors,
};

export default selectors;
