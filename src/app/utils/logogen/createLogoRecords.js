import { nfdOnboardingStore } from '@/data/store';
import { dispatch, select } from '@wordpress/data';
import { LOGOGEN_STATES } from '@/utils/logogen';

/**
 * Create the logo records for the store.
 *
 * @param {number} count The number of records to create.
 * @return {void}
 */
const createLogoRecords = ( count = 3 ) => {
	const Record = {
		status: LOGOGEN_STATES.RECEIVED,
		reference_id: null,
		style: null,
		src: null,
		selected_src: null,
	};

	const records = [];

	for ( let i = 0; i < count; i++ ) {
		records.push( { ...Record } );
	}

	// Add the records to the store
	const storedRecords = select( nfdOnboardingStore ).getLogos();
	dispatch( nfdOnboardingStore ).setLogos( [ ...storedRecords, ...records ] );
};

export default createLogoRecords;
