import { resolve } from './resolve.js';
import { apiBase } from '../../../constants';

import apiFetch from '@wordpress/api-fetch';

const baseAPI = `${ window.location.protocol }//${window.location.host}/index.php${apiBase}`;

export async function getFlow() {
    return await resolve(apiFetch({ url: `${baseAPI}flow`}).then());
}

export async function setFlow(data) {
    return await resolve(apiFetch({ url: `${baseAPI}flow`, method: 'POST', data}).then());
}
