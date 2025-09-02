/**
 * Simple in-memory cache for design studio data
 */

const cache = new Map();

/**
 * Set cache entry
 *
 * @param {string} key   - Cache key
 * @param {*}      value - Value to cache
 */
export function setCache( key, value ) {
	cache.set( key, {
		data: value,
		timestamp: Date.now(),
	} );
}

/**
 * Get cache entry
 *
 * @param {string} key - Cache key
 * @param {number} ttl - Time to live in milliseconds (default: 10 minutes)
 * @return {*|null} Cached value or null if not found/expired
 */
export function getCache( key, ttl = 10 * 60 * 1000 ) {
	const entry = cache.get( key );

	if ( ! entry ) {
		return null;
	}

	// Check if expired
	if ( Date.now() - entry.timestamp > ttl ) {
		cache.delete( key );
		return null;
	}

	return entry.data;
}

/**
 * Clear all cache
 */
export function clearCache() {
	cache.clear();
}

/**
 * Generate a simple cache key for color palettes
 *
 * @param {number} page    - Page number
 * @param {number} perPage - Items per page
 * @return {string} Cache key
 */
export function colorPaletteKey( page = 1, perPage = 10 ) {
	return `color-palettes-${ page }-${ perPage }`;
}

/**
 * Generate a simple cache key for font pairings
 *
 * @param {number} page    - Page number
 * @param {number} perPage - Items per page
 * @return {string} Cache key
 */
export function fontPairingsKey( page = 1, perPage = 10 ) {
	return `font-pairings-${ page }-${ perPage }`;
}
