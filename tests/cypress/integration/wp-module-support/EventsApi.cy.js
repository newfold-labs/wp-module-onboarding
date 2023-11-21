import { forEach } from 'lodash';

export const APIList = {
	get_started_experience:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=wp-setup&_locale=user',
	get_started_experience_ecomm:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=ecommerce&_locale=user',
	top_priority:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=wp-setup&_locale=user',
	site_primary:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=wp-setup&_locale=user',
	site_primary_ecomm:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=ecommerce&_locale=user',
	site_secondary:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=wp-setup&_locale=user',
	site_secondary_ecomm:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=ecommerce&_locale=user',
	basic_info_batch:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=wp-setup&_locale=user',
};

export const EventsAPI = ( events_name, card_val, api_name ) => {
	cy.intercept( api_name ).as( 'events' );
	cy.wait( '@events' ).then( ( requestObject ) => {
		const responseBody = requestObject.request.body;
		const responseData1 = responseBody[ 0 ].data;
		if ( events_name == 'experience_level' ) {
			if ( events_name in responseData1 ) {
				expect( responseData1.experience_level ).equal( card_val );
			} else {
				const responseData2 = responseBody[ 1 ].data;
				if ( events_name in responseData2 ) {
					expect( responseData2.experience_level ).equal( card_val );
				}
			}
		}
		if ( events_name == 'top_priority' ) {
			if ( events_name in responseData1 ) {
				expect( responseData1.top_priority ).equal( card_val );
			} else {
				const responseData2 = responseBody[ 1 ].data;
				if ( events_name in responseData2 ) {
					expect( responseData2.top_priority ).equal( card_val );
				}
			}
		}

		if ( events_name == 'primary_type' ) {
			if ( events_name in responseData1 ) {
				expect( responseData1.primary_type ).equal( card_val );
			} else {
				const responseData2 = responseBody[ 1 ].data;
				if ( events_name in responseData2 ) {
					expect( responseData2.primary_type ).equal( card_val );
				}
			}
		}

		if ( events_name == 'secondary_type' ) {
			if ( events_name in responseData1 ) {
				expect( responseData1.secondary_type ).equal( card_val );
			} else {
				const responseData2 = responseBody[ 1 ].data;
				if ( events_name in responseData2 ) {
					expect( responseData2.secondary_type ).equal( card_val );
				}
			}
		}
	} );
};

export const BasicInfoAPI = (
	events_name,
	label_key = [],
	actual_values = []
) => {
	cy.wait( '@events' ).then( ( requestObject ) => {
		const requestBody = requestObject.request.body;

		label_key.forEach( ( labels, index ) => {
			if ( labels == 'logo_added' ) {
				expect( requestBody[ index ].action ).to.eq( 'logo_added' );
			} else {
				const requestBodyData = requestBody[ index ].data;
				if ( index == 0 ) {
					expect( requestBodyData.label_key ).to.oneOf( [
						'chapter',
						'top_priority',
					] );
				} else {
					expect( requestBodyData.label_key ).to.eq( labels );
					expect( requestBodyData[ labels ] ).to.eq(
						actual_values[ index ]
					);
				}
			}
		} );
	} );
};
