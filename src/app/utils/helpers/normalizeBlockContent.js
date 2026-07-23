import { parse, serialize } from '@wordpress/blocks';

/**
 * Round-trip block markup through the WordPress block parser/serializer so that
 * attribute, class, and style ordering match what the editor produces on save.
 * This prevents "Block contains unexpected or invalid content" warnings on
 * AI-generated pages. If parsing fails for any reason, the original raw content
 * is returned so a malformed string can't block page creation.
 *
 * @param {string} rawContent Raw block markup string.
 * @return {string} Normalized block markup, or the original input on failure.
 */
const normalizeBlockContent = ( rawContent ) => {
	if ( ! rawContent ) {
		return rawContent;
	}
	try {
		const blocks = parse( rawContent );
		if ( ! blocks?.length ) {
			throw new Error( 'parse() returned no blocks' );
		}
		const serialized = serialize( blocks );
		if ( ! serialized ) {
			throw new Error( 'serialize() returned empty output' );
		}
		return serialized;
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.warn( '[SiteGen] Failed to normalize block content:', error );
		return rawContent;
	}
};

export default normalizeBlockContent;
