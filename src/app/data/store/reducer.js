import { combineReducers } from '@wordpress/data';

export function runtime( state = {}, action ) {
	switch ( action.type ) {
		case 'SET_RUNTIME':
			return {
				...state,
				...action.runtime,
			};
		case 'SET_INSTAWP_MIGRATION_URL':
			return {
				...state,
				currentBrand: {
					...state.currentBrand,
					migrationInfo: {
						...state.currentBrand.migrationInfo,
						instaWpMigrationUrl: action.instaWpMigrationUrl,
					},
				},
			};
	}

	return state;
}

export default combineReducers( {
	runtime,
} );
