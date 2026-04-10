import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { aiPlatformBase } from '@/data/constants';
import { onboardingRestURL } from '@/utils/api/onboarding';
const SITEGEN_URL = `${ aiPlatformBase }/api/v1/sitegen`;

const JSON_HEADERS = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

/**
 * Perform an authenticated handshake with the AI platform to obtain a site_id.
 *
 * @param {string} domain The site domain.
 * @return {Promise<Object>} Response containing site_id.
 */
export async function handshake() {
	const response = await apiFetch( {
		url: onboardingRestURL( 'sitegen/handshake' ),
		method: 'POST',
	} );

	if ( ! response?.site_id ) {
		throw new Error( `Handshake failed: ${ response?.error ?? 'Unknown error' }` );
	}

	return response;
}

/**
 * Evaluate the user's prompt via the intake agent.
 * Returns { understanding, is_complete, questions }.
 *
 * @param {string}     siteId       The site_id from handshake.
 * @param {string}     prompt       The original user prompt.
 * @param {Array|null} conversation Optional conversation history [{role, content}].
 * @return {Promise<Object>} Intake result.
 */
/**
 * Start the intake SSE stream. Returns the raw Response for stream reading.
 *
 * @param {string}      siteId       The site_id from handshake.
 * @param {string}      prompt       The original user prompt.
 * @param {Array|null}  conversation Optional conversation history [{role, content}].
 * @param {AbortSignal} signal       Optional AbortController signal for cancellation.
 * @return {Promise<Response>} Raw fetch Response with readable SSE body.
 */
export async function intake( siteId, prompt, conversation = null, signal ) {
	const body = {
		site_id: siteId,
		site_prompt: prompt,
	};

	if ( conversation && conversation.length ) {
		body.conversation = conversation;
	}

	const response = await fetch( `${ SITEGEN_URL }/intake`, {
		method: 'POST',
		headers: JSON_HEADERS,
		body: JSON.stringify( body ),
		signal,
	} );

	if ( ! response.ok ) {
		throw new Error( `Intake request failed: ${ response.status }` );
	}

	return response.json();
}

/**
 * Start site generation. Returns the raw Response so the caller can read
 * the SSE stream from response.body.
 *
 * @param {string}      siteId       The site_id from handshake.
 * @param {string}      prompt       The user's site prompt.
 * @param {AbortSignal} signal       AbortController signal for cancellation.
 * @param {Array|null}  conversation Optional conversation history [{role, content}].
 * @return {Promise<Response>} Raw fetch Response with readable SSE body.
 */
export async function startGeneration( siteId, prompt, signal, conversation = null ) {
	const body = {
		site_id: siteId,
		site_prompt: prompt,
	};

	if ( conversation && conversation.length ) {
		body.conversation = conversation;
	}

	const response = await fetch( `${ SITEGEN_URL }/generate`, {
		method: 'POST',
		headers: JSON_HEADERS,
		signal,
		body: JSON.stringify( body ),
	} );

	if ( ! response.ok ) {
		throw new Error( `Generation request failed: ${ response.status }` );
	}

	return response;
}

/**
 * Read an SSE stream from a fetch Response and invoke a callback for each event.
 *
 * SSE format:
 *   event: <name>\n
 *   data: <payload>\n
 *   \n
 *
 * @param {Response} response A fetch Response whose body is an SSE stream.
 * @param {Function} onEvent  Called with { event: string, data: string } for each event.
 * @return {Promise<void>} Resolves when stream ends.
 */
export async function streamSSE( response, onEvent ) {
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = '';
	let currentEvent = '';
	let dataLines = [];

	const flush = () => {
		if ( currentEvent || dataLines.length ) {
			onEvent( {
				event: currentEvent,
				data: dataLines.join( '\n' ),
			} );
			currentEvent = '';
			dataLines = [];
		}
	};

	// eslint-disable-next-line no-constant-condition
	while ( true ) {
		const { done, value } = await reader.read();

		if ( done ) {
			break;
		}

		buffer += decoder.decode( value, { stream: true } );

		// Normalise \r\n and lone \r to \n before splitting.
		buffer = buffer.replace( /\r\n/g, '\n' ).replace( /\r/g, '\n' );

		const lines = buffer.split( '\n' );
		// Keep the last (possibly incomplete) line in the buffer.
		buffer = lines.pop();

		for ( const line of lines ) {
			if ( line.startsWith( 'event:' ) ) {
				currentEvent = line.slice( 6 ).trim();
			} else if ( line.startsWith( 'data:' ) ) {
				dataLines.push( line.slice( 5 ).trim() );
			} else if ( line === '' ) {
				flush();
			}
		}
	}

	// Flush any remaining event that wasn't terminated by a blank line.
	flush();
}
