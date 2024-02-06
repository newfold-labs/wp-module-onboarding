// <reference types="Cypress" />

import { AdminBarCheck, DarkBGCheck, LightBGCheck, OptionsDetails } from "../wp-module-support/siteGen.cy";

describe( 'SiteGen Fork Step', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/wp-setup/step/fork'
		);
	} );

    it( 'Check for the header admin bar', () => {
        AdminBarCheck();
    } );

    it( 'Check for the existing dark background', () => {
		DarkBGCheck();
	} );

    it( 'Check for the light background', () => {
        LightBGCheck();
    } );

    it( 'Check for the heading and the title', () => {
        cy.get( '.nfd-onboarding-step__heading__title' )
            .should('be.visible')
            .should('have.text', 'Welcome to WordPress');
    } );

    it ( 'Check for the subheading', () => {
        cy.get( '.nfd-onboarding-step__heading__subtitle' ).should('be.visible');
    } );

    it ( 'Check the number of container options available', () => {
        cy.get( '.nfd-onboarding-sitegen-options__container__options' )
            .should( 'be.visible' )
            .should('have.length', 3);
    } );

    it( 'Check for selection of different container options', () => {
        let options = 0;
        const className = '.nfd-onboarding-sitegen-options__container__options';
        const arr = cy.get( className );
		arr.each( () => {
            if(options == 0){
                OptionsDetails(className,'Build it myself',options);
                cy.url().should('include', 'get-started/welcome',{
                    timeout: 10000,
                } );
                cy.go('back');
            };
            if(options == 1){
                OptionsDetails(className,'AI Website Creator',options);
                cy.url().should('include', 'sitegen/step/welcome',{
                    timeout: 10000,
                } );
                cy.go('back');
            };
            if(options == 2){
                OptionsDetails(className, 'Hire a Pro',options);
            };
            options+=1;

        });
    });

    it( 'Check for the import your WP account link at the bottom', () => {
        cy.get( '.nfd-onboarding-step--site-gen__fork__importsite' )
            .scrollIntoView()
            .should('exist')
            .should('contain', 'Already have a WordPress site')
            .should('have.attr', 'href', 'https://my.bluehost.com/cgi/services/migration');
    } );
});
