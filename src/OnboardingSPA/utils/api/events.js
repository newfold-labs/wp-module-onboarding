import apiFetch from '@wordpress/api-fetch';
import { apiBase } from '../../../constants';

class Event {
     constructor(eventSlug, eventData = {}) {
          this.eventSlug = eventSlug;
          this.eventData = eventData;
     }

     send() {
          apiFetch({
               url: `${window.location.protocol}//${window.location.host}/index.php${apiBase}events`,
               method: 'POST',
               data: {
                    slug: this.eventSlug,
                    data: this.eventData
               }
          })
     }
}

export default Event
