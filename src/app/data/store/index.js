import { createReduxStore, register } from '@wordpress/data';
import actions from './actions';
import selectors from './selectors';
import reducer from './reducer';
import { dbSyncService as inputSliceDbSyncService } from './slices/input';
import { dbSyncService as sitegenSliceDbSyncService } from './slices/sitegen';
import { dbSyncService as blueprintsSliceDbSyncService } from './slices/blueprints';

const STORE_NAME = 'newfold/onboarding';
const STORE_CONFIG = {
	reducer,
	actions,
	selectors,
};

export const nfdOnboardingStore = createReduxStore( STORE_NAME, STORE_CONFIG );
register( nfdOnboardingStore );

/**
 * Initialize the store-db sync services.
 */
export function initializeStoreDbSyncServices() {
	inputSliceDbSyncService();
	sitegenSliceDbSyncService();
	blueprintsSliceDbSyncService();
}
