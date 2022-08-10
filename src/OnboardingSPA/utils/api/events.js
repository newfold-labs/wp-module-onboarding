import apiFetch from '@wordpress/api-fetch';
import { onboardingRestBase } from '../../../constants';

class Event {
	constructor( eventSlug, eventData = {} ) {
		this.eventSlug = eventSlug;
		this.eventData = eventData;
	}

	send() {
		apiFetch( {
			url: `${ onboardingRestBase }/events`,
			method: 'POST',
			data: {
				slug: this.eventSlug,
				data: this.eventData,
			},
		} ).catch( ( error ) => {
			console.error( error );
		} );
	}
}

export default Event;
