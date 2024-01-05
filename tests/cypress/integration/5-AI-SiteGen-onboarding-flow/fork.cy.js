// <reference types="Cypress" />

describe( 'SiteGen Fork Step', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/fork'
		);
	} );

    it( 'Check for the header admin bar', () => {
        cy.get( '.nfd-onboarding-header__admin-bar' ).should('be.visible');
    } );

	it( 'Check for the existing dark background', () => {
		cy.wait( 2000 );
		// When the page loads, it should have dark background by default
        cy.get('.nfd-onboarding-sitegen-dark').should('be.visible');
	} );

    it( 'Check for the light background', () => {
        cy.get( '.nfd-onboarding-toggle__theme__button__dark' )
            .should( 'exist' )
            .click();
        cy.get( '.nfd-onboarding-sitegen-light' ).should('be.visible');
        // Now changing the background back to dark
        cy.get( '.nfd-onboarding-toggle__theme__button__light' )
            .should( 'exist' )
            .click();
        cy.get('.nfd-onboarding-sitegen-dark').should('be.visible');
    } );

    it( 'Check for the heading and the title', () => {
        cy.get( '.nfd-onboarding-step__heading__title' )
            .should('be.visible')
            .should('have.text', 'Welcome to WordPress');
    } );

    it ( 'Check for the subheading', () => {
        cy.get( '.nfd-onboarding-step__heading__subtitle' ).should('be.visible');
    } );

    it( 'Check for the import your WP account link at the bottom', () => {
        cy.get( '.nfd-onboarding-step--site-gen__fork__importsite' )
            .scrollIntoView()
            .should('exist')
            .should('contain', 'Already have a WordPress site')
            .should('have.attr', 'href', 'https://my.bluehost.com/cgi/services/migration');
    } );

});