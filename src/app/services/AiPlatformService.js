import { fetchEventSource } from '@microsoft/fetch-event-source';
import { select, dispatch } from '@wordpress/data';
import { nfdOnboardingStore } from '@/data/store';
import { resolve } from '@/utils/helpers';

class AiPlatformService {
	static baseUrl = 'https://ai-platform.on-forge.com/api/v1/sitegen';
	// static baseUrl = 'https://ai-platform.test/api/v1/sitegen';

	static async getSiteId() {
		const siteId = select( nfdOnboardingStore ).getSiteId();
		if ( siteId ) {
			return siteId;
		}

		const siteUrl = select( nfdOnboardingStore ).getSiteUrl();

		const data = await this.request( '/handshake', {
			body: { domain: siteUrl },
		} );

		if ( ! data.site_id ) {
			return false;
		}

		dispatch( nfdOnboardingStore ).setSiteId( data.site_id );
		return data.site_id;
	}

	static async generateSite( { onEvent, onError, onClose } ) {
		const siteId = await this.getSiteId();
		if ( ! siteId ) {
			onError( new Error( 'Site ID not found' ) );
			return false;
		}

		const prompt = select( nfdOnboardingStore ).getPrompt();
		const bluPrompt = select( nfdOnboardingStore ).getBluPrompt();

		const sitePrompt = prompt || bluPrompt;

		const endpoint = this.baseUrl + '/generate';
		const method = 'POST';
		const headers = {
			'Content-Type': 'application/json',
			'Accept': 'text/event-stream',
		};
		const body = JSON.stringify( {
			site_id: siteId,
			site_prompt: sitePrompt,
		} );
		return await fetchEventSource( endpoint, {
			method,
			headers,
			body,
			onmessage: ( response ) => onEvent( response ),
			onerror: ( error ) => onError( error ),
			onClose: () => onClose(),
		} );
	}

	static async request( endpoint, options = {} ) {
		const { method = 'POST', body = null } = options;

		const { body: response, error } = await resolve(
			fetch( this.baseUrl + endpoint, {
				method,
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: body ? JSON.stringify( body ) : null,
			} )
		);

		if ( error ) {
			throw new Error( error.message );
		}

		return await response.json();
	}
}

export default AiPlatformService;
