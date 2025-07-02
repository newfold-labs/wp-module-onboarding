/**
 * Resolves a promise and returns the body and error.
 *
 * @param {Promise} promise
 * @return {Object} resolved
 */
async function resolve( promise ) {
	const resolved = {
		body: null,
		error: null,
	};

	try {
		resolved.body = await promise;
	} catch ( error ) {
		resolved.error = error;
	}

	return resolved;
}

export default resolve;
