import { restRoute } from '../constants';
import { resolve } from '../utils/resolve';

import apiFetch from '@wordpress/api-fetch';

export async function getEditorTourStatus() {
	return await resolve(
		apiFetch( {
			url: `${ restRoute }sitegen/editortour`,
		} ).then()
	);
}

export async function updateEditorTourStatus() {
	return await resolve(
		apiFetch( {
			url: `${ restRoute }sitegen/editortour/update`,
			method: 'POST',
			data: { status: false },
		} ).then()
	);
}
