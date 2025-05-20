import { combineReducers } from '@wordpress/data';
import { runtime } from './slices/runtime';
import { input } from './slices/input';

export default combineReducers( {
	runtime,
	input,
} );
