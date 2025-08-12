import { selectors as runtimeSelectors } from './slices/runtime';
import { selectors as inputSelectors } from './slices/input';
import { selectors as sitegenSelectors } from './slices/sitegen';
import { selectors as blueprintsSelectors } from './slices/blueprints';

const selectors = {
	...runtimeSelectors,
	...inputSelectors,
	...sitegenSelectors,
	...blueprintsSelectors,
};

export default selectors;
