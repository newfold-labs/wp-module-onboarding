import { combineReducers } from '@wordpress/data';
import { runtime } from './slices/runtime';
import { sitegen } from './slices/sitegen';

export default combineReducers( {
	runtime,
	sitegen,
} );
