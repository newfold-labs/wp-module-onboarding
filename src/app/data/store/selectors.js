import { selectors as runtimeSelectors } from './slices/runtime';
import { selectors as sitegenSelectors } from './slices/sitegen';

const selectors = {
	...runtimeSelectors,
	...sitegenSelectors,
};

export default selectors;
