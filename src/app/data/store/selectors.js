import { selectors as runtimeSelectors } from './slices/runtime';
import { selectors as inputSelectors } from './slices/input';
import { selectors as sitegenSelectors } from './slices/sitegen';

const selectors = {
	...runtimeSelectors,
	...inputSelectors,
	...sitegenSelectors,
};

export default selectors;
