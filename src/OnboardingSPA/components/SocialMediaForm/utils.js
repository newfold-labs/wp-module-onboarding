// eslint-disable-next-line import/no-extraneous-dependencies
import { transform } from 'lodash';

const socialMediaStoreToStateMap = {
	facebook_site: 'facebook',
	twitter_site: 'twitter',
	instagram_url: 'instagram',
	youtube_url: 'youtube',
	linkedin_url: 'linkedin',
	yelp_url: 'yelp',
	tiktok_url: 'tiktok',
};

export const socialMediaStoreToState = ( socialMediaStore ) => {
	return transform( socialMediaStoreToStateMap, ( result, value, key ) => {
		const url =
			socialMediaStore[ key ] ||
			socialMediaStore?.other_social_urls[ key ];
		if ( url ) {
			result[ value ] = url;
		}
	} );
};
