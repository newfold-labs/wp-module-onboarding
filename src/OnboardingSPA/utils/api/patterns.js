import { resolve } from './resolve';
import { onboardingRestURL } from './common';

import apiFetch from '@wordpress/api-fetch';

export async function getPatterns(data = '') {
    return await resolve(
        apiFetch({ url: onboardingRestURL(`patterns/${data}`) }).then()
    );
}
