import * as actions from './actions';
import * as selectors from './selectors';

import { createReduxStore, register } from '@wordpress/data';

import { STORE_NAME } from './constants';
import { controls } from '@wordpress/data-controls';
import reducer from './reducer';

export const nfdOnboardingStoreConfig = {
	reducer,
	actions,
	selectors,
};

export const store = createReduxStore(STORE_NAME, nfdOnboardingStoreConfig);
register(store);
