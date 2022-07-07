import { resolve } from './resolve.js';
import { apiBase } from '../../../constants';

import apiFetch from '@wordpress/api-fetch';

const baseAPI = `${window.location.protocol}//${window.location.host}/index.php${apiBase}`;

export async function getSettings() {
    return await resolve(apiFetch({ url: `${baseAPI}settings` }).then());
}

export async function setSettings(data) {
    return await resolve(apiFetch({ url: `${baseAPI}settings`, method: 'POST', data }).then());
}