/**
 * Whether the current location indicates a migration entry deep link (SSO / Account Manager).
 *
 * @return {boolean} True when the URL query or hash targets the migration flow.
 */
export function isMigrationDeepLink() {
	if ( typeof window === 'undefined' ) {
		return false;
	}

	const params = new URLSearchParams( window.location.search );
	if ( params.get( 'flow' ) === 'migration' ) {
		return true;
	}

	const hash = ( window.location.hash || '' ).replace( /^#\/?/, '' ).toLowerCase();
	if ( ! hash ) {
		return false;
	}

	if ( hash === 'migration' || hash.startsWith( 'migration/' ) ) {
		return true;
	}

	return hash.includes( 'migration' );
}
