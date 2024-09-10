// API routes for different events in the onboarding flow
export const APIList = {
	events_api_general_onb:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&_locale=user',
	events_api_ecomm:
		'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents%2Fbatch&_locale=user',
};

// Function to handle event validation from the API response
export const EventsAPI = (
	events_name,
	card_val,
	api_name,
	expectedEventsCount
) => {
	let actualEventsCount = 0;

	// Intercept the API request for events
	cy.intercept( api_name ).as( 'events' );

	// Wait for the intercepted request and process the response
	cy.wait( '@events', { timeout: 15000 } )
		.then( ( requestObject ) => {
			const responseBody = requestObject.request.body;
			const responseData1 = responseBody[ 0 ].data;

			// Check the event type and validate the corresponding value
			if ( events_name === 'experience_level' ) {
				if ( events_name in responseData1 ) {
					expect( responseData1.experience_level ).to.equal(
						card_val
					);
				} else {
					const responseData2 = responseBody[ 1 ].data;
					if ( events_name in responseData2 ) {
						expect( responseData2.experience_level ).to.equal(
							card_val
						);
					}
				}
			}

			if ( events_name === 'top_priority' ) {
				if ( events_name in responseData1 ) {
					expect( responseData1.top_priority ).to.equal( card_val );
				} else {
					const responseData2 = responseBody[ 1 ].data;
					if ( events_name in responseData2 ) {
						expect( responseData2.top_priority ).to.equal(
							card_val
						);
					}
				}
			}

			if ( events_name === 'primary_type' ) {
				if ( events_name in responseData1 ) {
					expect( responseData1.primary_type ).to.equal( card_val );
				} else {
					const responseData2 = responseBody[ 1 ].data;
					if ( events_name in responseData2 ) {
						expect( responseData2.primary_type ).to.equal(
							card_val
						);
					}
				}
			}

			if ( events_name === 'secondary_type' ) {
				if ( events_name in responseData1 ) {
					expect( responseData1.secondary_type ).to.equal( card_val );
				} else {
					const responseData2 = responseBody[ 1 ].data;
					if ( events_name in responseData2 ) {
						expect( responseData2.secondary_type ).to.equal(
							card_val
						);
					}
				}
			}

			// Special case for migration option selection
			if ( events_name === 'fork_option_selected_migrate' ) {
				expect( requestObject.response.statusCode ).to.eq( 202 );

				// Count the number of migration events in the response
				responseBody.forEach( ( body ) => {
					if (
						body.data.hasOwnProperty( 'flow' ) &&
						body.data.flow === 'MIGRATE'
					) {
						actualEventsCount++;
					}
				} );
			}
		} )
		.then( () => {
			// Verify that the actual number of events matches the expected count
			expect( actualEventsCount ).to.equal( expectedEventsCount );
		} );
};

// Function to validate basic information in the API response
export const BasicInfoAPI = (
	events_name,
	label_key = [],
	actual_values = []
) => {
	// Wait for the events API to be intercepted
	cy.wait( '@events' ).then( ( requestObject ) => {
		const requestBody = requestObject.request.body;

		// Iterate through the labels and verify their corresponding values
		label_key.forEach( ( labels, index ) => {
			if ( labels === 'logo_added' ) {
				// Validate if the action is logo added
				expect( requestBody[ index ].action ).to.eq( 'logo_added' );
			} else {
				const requestBodyData = requestBody[ index ].data;

				// Check for basic info and validate label_key for certain events
				if ( index === 0 && events_name === 'basic_info' ) {
					expect( requestBodyData.label_key ).to.be.oneOf( [
						'chapter',
						'top_priority',
					] );
				} else {
					// Validate the label_key and corresponding value
					expect( requestBodyData.label_key ).to.eq( labels );
					expect( requestBodyData[ labels ] ).to.eq(
						actual_values[ index ]
					);
				}
			}
		} );
	} );
};

// Function to validate site features in the API response
export const SiteFeaturesAPI = ( label_key_value, features = [] ) => {
	let index = 0;

	// Wait for the events API to be intercepted
	cy.wait( '@events' ).then( ( requestObject ) => {
		const requestBody = requestObject.request.body;

		// Verify that the action is 'feature_added'
		expect( requestBody[ index ].action ).to.eq( 'feature_added' );

		// Iterate through the request body and validate the feature values
		requestBody.forEach( () => {
			const requestBodyData = requestBody[ index ].data;

			// Validate the label_key and its corresponding value for each feature
			expect( requestBodyData.label_key ).to.eq( label_key_value );
			expect( requestBodyData[ label_key_value ] ).to.eq(
				features[ index ]
			);

			// Increment index for the next feature
			index += 1;
		} );
	} );
};
