export async function resolve( promise ) {
	const resolved = {
		body: null,
		error: null,
	};

	try {
		resolved.body = await promise;
	} catch ( e ) {
		resolved.error = e;
	}

	return resolved;
}

export function addUrlParams( urlStr, params = '' ) {
	if ( ! urlStr ) return urlStr;
	if ( urlStr.includes( '?' ) ) {
		urlStr = `${ urlStr }&${ params }`;
	} else {
		urlStr = `${ urlStr }?${ params }`;
	}
	return urlStr;
}
