import {
	AdminBarCheck,
	DarkBGCheck,
	LightBGCheck,
} from '../wp-module-support/siteGen.cy';
import { apiList, migrationConnection } from '../wp-module-support/MockApi.cy';
import { flow } from 'lodash';

const waitTime = 60000;
const customCommandTimeout = 20000;

describe( 'SiteGen Fork Step', function () {
	before( () => {
		cy.wait( 10000 );
		cy.visit( 'wp-admin/?page=nfd-onboarding#/wp-setup/step/fork' );
	} );

	it( 'Verify Migration Event Reporting on Fork Step shows once', () => {
		cy.get( 'div[data-flow="migration"]', {
			timeout: customCommandTimeout,
		} )
			.scrollIntoView()
			.should( 'exist' );
		let migrateEventsCounts = 0;
		cy.intercept(
			'POST',
			'**/index.php?rest_route=%2Fnewfold-onboarding%2Fv1%2Fevents*'
		).as( 'fork-migrate-event' );
		cy.get( 'div[data-flow="migration"]', {
			timeout: customCommandTimeout,
		} )
			.scrollIntoView()
			.click();

		cy.get( '.white-label-migration', { timeout: customCommandTimeout } )
			.scrollIntoView()
			.should( 'exist' );
		cy.wait( '@fork-migrate-event', { timeout: customCommandTimeout } )
			.then( ( interception ) => {
				expect( interception.response.statusCode ).to.eq( 202 );
				const payload = interception.request.body;
				payload.forEach( ( body ) => {
					if (
						body.data.hasOwnProperty( 'flow' ) &&
						body.data.flow == 'MIGRATE'
					) {
						migrateEventsCounts++;
					}
				} );
			} )
			.then( () => {
				expect( migrateEventsCounts ).to.equal( 1 );
			} );
	} );
} );
