import { resolve } from './resolve.js';
import { defaultAPI } from './commonAPI';

import apiFetch from '@wordpress/api-fetch';

function readFileDataAsBase64(file) {
    return new Promise((resolve, reject) => {
        // Create file reader
        let reader = new FileReader()

        // Register event listeners
        reader.addEventListener("loadend", e => resolve(e.target.result))
        reader.addEventListener("error", reject)

        // Read file
        reader.readAsArrayBuffer(file)
    })
}

export async function uploadImage(file) {

    const data = await readFileDataAsBase64(file);

    let headers = {};
    headers['Content-Type'] = "image/png";
    headers['Content-Disposition'] = "attachment; filename=" + file.name;

    return await resolve(apiFetch({
        url: `${defaultAPI}?rest_route=/wp/v2/media`,
        method: 'POST',
        headers,
        body: data
    }));
} 

