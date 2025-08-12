import { combineReducers } from '@wordpress/data';
import { runtime } from './slices/runtime';
import { input } from './slices/input';
import { sitegen } from './slices/sitegen';
import { blueprints } from './slices/blueprints';

export default combineReducers( {
	runtime,
	input,
	sitegen,
	blueprints,
} );
