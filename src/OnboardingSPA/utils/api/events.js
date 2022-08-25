import apiFetch from '@wordpress/api-fetch';

import { onboardingRestURL } from './common';

class Event {
	constructor( eventSlug, eventData = {} ) {
		this.eventSlug = eventSlug;
		this.eventData = eventData;
	}

	send() {
		apiFetch( {
			url: onboardingRestURL( 'events' ),
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
