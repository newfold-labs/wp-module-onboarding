/**
 * Format raw SSE data into a readable result string for the task list.
 *
 * @param {string} taskKey - The task key (e.g. 'site_type', 'keywords').
 * @param {*}      raw     - The raw data from the SSE event.
 * @return {string} A human-readable result string.
 */
export default function formatTaskResult( taskKey, raw ) {
	if ( taskKey === 'site_type' && typeof raw === 'string' ) {
		return raw.charAt( 0 ).toUpperCase() + raw.slice( 1 );
	}

	try {
		const data = typeof raw === 'string' ? JSON.parse( raw ) : raw;

		if ( taskKey === 'keywords' && Array.isArray( data ) ) {
			return data.join( ', ' );
		}
		if ( taskKey === 'sitemap' && Array.isArray( data ) ) {
			return data.map( ( p ) => p.title ?? p ).join( ', ' );
		}
		if ( taskKey === 'brand_identity' && typeof data === 'object' ) {
			return data.brand_name ?? JSON.stringify( data );
		}
	} catch {
		// Not JSON — use the raw string as-is.
	}
	return raw;
}
