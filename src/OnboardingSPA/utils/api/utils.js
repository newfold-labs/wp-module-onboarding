/**
 * Retries a given API function until the specified retry count is reached.
 *
 * @param {Function} func       - The API function to be retried. It should return a promise.
 * @param {number}   retryCount - The number of times to retry the function before giving up.
 * @return {Promise<any|boolean>} - Resolves with the data returned by the API function if successful, or `false` if all retries fail.
 */
export async function functionRetryHandler( func, retryCount ) {
	let attempts = 0;
	while ( attempts < retryCount ) {
		try {
			const data = await func();
			attempts++;
			if ( data.error === null ) {
				return data;
			}
		} catch ( error ) {
			attempts++;
			// eslint-disable-next-line no-console
			console.error( 'Failed to retrieve data', error );

			if ( attempts >= retryCount ) {
				return false;
			}
		}
	}
	return false;
}
