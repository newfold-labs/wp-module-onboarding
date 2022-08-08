import { resolve } from './resolve.js';
import { baseAPI } from './commonAPI';

import apiFetch from '@wordpress/api-fetch';

export async function getFlow() {
    return await resolve(apiFetch({ url: `${baseAPI}flow`}).then());
}

export async function setFlow(data) {
    return await resolve(apiFetch({ url: `${baseAPI}flow`, method: 'POST', data}).then());
}
