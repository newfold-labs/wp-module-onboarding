import { selectors as runtimeSelectors } from './slices/runtime';
import { selectors as inputSelectors } from './slices/input';
import { selectors as sitegenSelectors } from './slices/sitegen';
import { selectors as appSelectors } from './slices/app';

const selectors = {
	...runtimeSelectors,
	...inputSelectors,
	...sitegenSelectors,
	...appSelectors,
};

export default selectors;
