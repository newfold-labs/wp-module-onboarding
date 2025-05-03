// API routes for a single Event in Onboarding
const SingleEventsAPIURL =
	'/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents&_locale=user';

// Function to handle event validation from the API responses
export const SingleEventsAPI = (actionValue, keyName, keyValue) => {
	let foundValidEvent = false;
	const requests = []; // Array to store intercepted requests

	// Intercept the API request for Single Event
	cy.intercept(SingleEventsAPIURL).as('events');

	// Wait for all the requests to be made (We need to wait for multiple requests)
	cy.wait('@events', { timeout: 10000 }).then((interception) => {
		requests.push(interception);
	});

	cy.wait('@events', { timeout: 10000 }).then((interception) => {
		requests.push(interception);
	});

	cy.wait('@events', { timeout: 10000 }).then((interception) => {
		requests.push(interception);
	});

	// Loop and find the event you are looking for
	cy.wrap(requests)
		.each((request) => {
			// Access the request body or payload
			const payload = request.request.body;
			expect(request.response.statusCode).to.eq(202);
			if (
				payload &&
				payload.action === actionValue &&
				payload.data.label_key === keyName &&
				payload.data[keyName] === keyValue
			) {
				foundValidEvent = true;
			}
		})
		.then(() => {
			expect(foundValidEvent).to.equal(true);
		});
};
