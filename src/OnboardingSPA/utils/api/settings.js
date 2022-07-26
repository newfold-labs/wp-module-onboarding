import { resolve } from './resolve.js';
import { baseAPI } from './commonAPI';

import apiFetch from '@wordpress/api-fetch';

export async function getSettings() {
    return await resolve(apiFetch({ url: `${baseAPI}settings` }).then());
}

export async function setSettings(data) {
    return await resolve(apiFetch({ url: `${baseAPI}settings`, method: 'POST', data }).then());
}
