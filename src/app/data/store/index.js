import { createReduxStore, register } from '@wordpress/data';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';

const STORE_NAME = 'newfold/onboarding';
const STORE_CONFIG = {
	reducer,
	actions,
	selectors,
};

export const nfdOnboardingStore = createReduxStore( STORE_NAME, STORE_CONFIG );
register( nfdOnboardingStore );
