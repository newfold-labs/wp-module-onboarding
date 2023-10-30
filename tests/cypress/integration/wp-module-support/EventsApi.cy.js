export const APIList = {
    'get_started_experience' : 'http://localhost:8882/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=wp-setup&_locale=user',
    'get_started_experience_ecomm' : 'http://localhost:8882/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=ecommerce&_locale=user',
    'top_priority' : 'http://localhost:8882/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=wp-setup&_locale=user',
    'site_primary' : 'http://localhost:8882/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=wp-setup&_locale=user',
    'site_primary_ecomm' : 'http://localhost:8882/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&flow=ecommerce&_locale=user'
}

export const EventsAPI = ( events_name, card_val, api_name ) => {
    cy.intercept( api_name ).as( 'events' );
    cy.wait( '@events' ).then( ( requestObject ) => {
    const responseBody = requestObject.request.body;
    const responseData1 = responseBody[ 0 ].data;
    if(events_name == 'experience_level'){
        if ( events_name in responseData1 ) {
            expect( responseData1.experience_level ).equal(
                card_val
            );
        } else {
            const responseData2 = responseBody[ 1 ].data;
            if ( events_name in responseData2 ) {
                expect( responseData2.experience_level ).equal(
                    card_val
                );
            }
        }
    };
    if(events_name == 'top_priority'){
        if ( events_name in responseData1 ) {
            expect( responseData1.top_priority ).equal(
                card_val
            );
        } else {
            const responseData2 = responseBody[ 1 ].data;
            if ( events_name in responseData2 ) {
                expect( responseData2.top_priority ).equal(
                    card_val
                );
            }
        }
    };

    if(events_name == 'primary_type'){
        if ( events_name in responseData1 ) {
            expect( responseData1.primary_type ).equal(
                card_val
            );
        } else {
            const responseData2 = responseBody[ 1 ].data;
            if ( events_name in responseData2 ) {
                expect( responseData2.primary_type ).equal(
                    card_val
                );
            }
        }
    };
    });
};
