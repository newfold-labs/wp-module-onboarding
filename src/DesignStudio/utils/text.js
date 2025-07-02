/**
 * Capitalizes the first letter of each word in a string
 *
 * @param {string} str String to capitalize
 * @return {string} Capitalized string
 */
export const ucwords = ( str ) => {
	if ( ! str ) {
		return '';
	}

	return str
		.split( ' ' )
		.map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase() )
		.join( ' ' );
};
