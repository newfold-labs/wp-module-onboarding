/// <reference types="Cypress" />

import {
	AdminBarCheck,
	DarkBGCheck,
	LightBGCheck,
} from '../wp-module-support/siteGen.cy';
import { apiList, migrationConnection } from '../wp-module-support/MockApi.cy';
import { APIList, EventsAPI } from '../wp-module-support/EventsApi.cy';

// Set a constant wait time for actions that need to wait for responses
const waitTime = 60000;

describe( 'SiteGen Fork Step', function () {
	// Run before any tests, setting the initial conditions for the WordPress environment
	before( () => {
		// Clean up the option for onboarding flow
		cy.exec(
			'wp option delete nfd_module_onboarding_flow --path="/Users/arun.sh/Desktop/LocalWP Sites/cypress-testing/app/public"'
		);

		// Set the site capabilities to enable AI SiteGen and access to AI
		cy.exec(
			`wp option set _transient_nfd_site_capabilities '{"hasAISiteGen": true, "canAccessAI": true}' --format=json  --path="/Users/arun.sh/Desktop/LocalWP Sites/cypress-testing/app/public"`
		);

		// Set a long timeout for the transient site capabilities
		cy.exec(
			`wp option set _transient_timeout_nfd_site_capabilities 4102444800 --path="/Users/arun.sh/Desktop/LocalWP Sites/cypress-testing/app/public"`
		);

		// Wait for any background processes to complete
		cy.wait( 10000 );

		// Visit the fork step of the onboarding page
		cy.visit( 'wp-admin/?page=nfd-onboarding#/wp-setup/step/fork' );
	} );

	// Test the visibility of the header admin bar
	it( 'Check for the header admin bar', () => {
		AdminBarCheck();
	} );

	// Test for the default light background
	it( 'Check for the default light background', () => {
		LightBGCheck();
	} );

	// Test for the dark background
	it( 'Check for the dark background', () => {
		DarkBGCheck();
	} );

	// Verify the heading title text and visibility
	it( 'Check for the heading and the title', () => {
		cy.get( '.nfd-onboarding-step__heading__title' )
			.should( 'be.visible' )
			.and( 'have.text', 'Welcome to WordPress' );
	} );

	// Verify the subheading visibility
	it( 'Check for the subheading', () => {
		cy.get( '.nfd-onboarding-step__heading__subtitle' ).should(
			'be.visible'
		);
	} );

	// Check that there are exactly 3 container options available
	it( 'Check the number of container options available', () => {
		cy.get( '.nfd-onboarding-sitegen-options__option' )
			.should( 'be.visible' )
			.and( 'have.length', 3 );
	} );

	// Test selecting different container options
	it( 'Check for selection of different container options', () => {
		const className = '.nfd-onboarding-sitegen-options__option';

		cy.get( className ).each( ( $element ) => {
			const dataSlugText = $element.attr( 'data-flow' );
			if ( dataSlugText === 'sitebuild' ) {
				// Click on the option and verify the URL
				$element.trigger( 'click' );
				cy.url().should(
					'include',
					'#/wp-setup/step/get-started/welcome',
					{ timeout: 10000 }
				);

				// Go back and wait for the options to reload
				cy.go( 'back' );
				cy.get( className, { timeout: waitTime } );
			}
		} );
	} );

	// Test the AI SiteGen flow
	it( 'Check the AI Sitegen flow', () => {
		cy.get( '.nfd-onboarding-sitegen-options__option--large' )
			.should( 'be.visible' )
			.trigger( 'click' );

		// Verify the URL for the AI SiteGen flow
		cy.url().should( 'include', '#/sitegen/step/site-details', {
			timeout: 10000,
		} );

		// Go back to the previous page
		cy.go( 'back' );
	} );

	// Verify that "Import your WP account" opens the transfer site link
	it( 'Verify by default import your WP account leads to transfer site link', () => {
		cy.window().then( ( win ) => {
			// Spy on the window open method to ensure redirection
			cy.spy( win, 'open' ).as( 'windowOpen' );
		} );

		// Click on the migration option
		cy.get( '[data-flow=migration]' ).scrollIntoView().click();

		// Verify the window open event was called
		cy.get( '@windowOpen' ).should( 'be.called' );
	} );

	// Verify that import site leads to the migration process when capability is set
	it( 'Verify Import site leads to migration process initiation screen when can migrate capability is set', () => {
		// Update the site capabilities to allow migration
		cy.exec(
			`wp option update _transient_nfd_site_capabilities '{"hasAISiteGen": true, "canAccessAI": true, "canMigrateSite": true}' --format=json --path="/Users/arun.sh/Desktop/LocalWP Sites/cypress-testing/app/public"`,
			{ timeout: 20000 }
		);

		// Reload the page to apply the new settings
		cy.reload();

		// Intercept the migration connection API call
		cy.intercept( apiList.migrateConnect, ( req ) => {
			migrationConnection( req );
		} ).as( 'migrateCall' );

		// Click on the migration option and verify the events and UI updates
		cy.get( '[data-flow=migration]', { timeout: waitTime } )
			.scrollIntoView()
			.click();
		EventsAPI(
			'fork_option_selected_migrate',
			'MIGRATE',
			APIList.events_api_general_onb,
			1
		);

		// Verify that the migration UI elements are visible
		cy.get( '.nfd-onboarding-step__heading__title', {
			timeout: waitTime,
		} ).should( 'exist' );
		cy.get(
			'.nfd-onboarding-step--site-gen__migration--container__loader',
			{ timeout: waitTime }
		).should( 'exist' );
		cy.get(
			'.nfd-onboarding-step--site-gen__migration--container__importtext'
		).should( 'exist' );

		// Re-check for admin bar and background consistency
		AdminBarCheck();
		LightBGCheck();
		DarkBGCheck();

		// Wait for the migration API call to complete
		cy.wait( '@migrateCall', { timeout: waitTime } );
	} );

	// Verify the successful migration connection request and redirection
	it( 'Verify migration connection request is successful and redirection happens', () => {
		cy.url().should( 'contain', 'app.instawp.io/migrate' );
	} );
} );
