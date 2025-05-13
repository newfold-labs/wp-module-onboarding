/**
 * Receives `window.nfdOnboarding` and sets migrated: true.
 *
 * `url` is left to keep __webpack_public_path__ decoupled from store.
 *
 * @param {*} runtime
 * @return {Object} action object
 */
export function setRuntime( runtime ) {
	window.nfdOnboarding = {
		buildUrl: runtime.buildUrl,
		siteUrl: runtime.siteUrl,
		migrated: true,
	};
	return {
		type: 'SET_RUNTIME',
		runtime,
	};
}

export function setInstaWpMigrationUrl( instaWpMigrationUrl ) {
	return {
		type: 'SET_INSTAWP_MIGRATION_URL',
		instaWpMigrationUrl,
	};
}
