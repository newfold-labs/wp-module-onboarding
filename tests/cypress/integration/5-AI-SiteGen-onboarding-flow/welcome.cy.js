// <reference types="Cypress" />

import { AdminBarCheck, BackButtonCheck, DarkBGCheck, LightBGChcek, ProgressBarCheck} from "../wp-module-support/siteGen.cy";

describe( 'SiteGen Welcome Step', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/sitegen/step/welcome'
		);
	} );

    it( 'Check for the header admin bar', () => {
        AdminBarCheck();
    } );

    it( 'Check for the existing dark background', () => {
		DarkBGCheck();
	} );

    it( 'Check for the light background', () => {
        LightBGChcek();
    } );

    it( 'Check the Progress Bar Value', () => {
        ProgressBarCheck('11.1111%');
    });

    it( 'Check for back button and go back', () => {
        BackButtonCheck('sitegen/step/welcome');
    } );

    it( 'Check for the animation', () => {
        cy.get( '.nfd-onboarding-step--site-gen__welcome__container__animation' )
            .should('be.visible');
    } );

    it( 'Check for the heading title', () => {
        cy.get( '.nfd-onboarding-step--site-gen__welcome__container__heading__text' )
            .should('be.visible')
            .contains('WordPress');
    } );

    it( 'Check for the subheading title', () => {
        cy.get('.nfd-onboarding-step--site-gen__welcome__container__sub-heading')
            .should('exist');
        cy.get( '.nfd-onboarding-step--site-gen__welcome__container__sub-heading__text' )
            .should('be.visible')
            .contains('AI');
    } );

    it( 'Check the Get Started button', () => {
        cy.get( '.nfd-onboarding-button--site-gen-next' )
            .should('be.visible')
            .should('have.text','Get Started')
            .click();
        cy.wait(2000);
        cy.url().should('not.contain', 'sitegen/step/welcome');
    } );
});
