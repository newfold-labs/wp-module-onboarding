// <reference types="Cypress" />

import { AdminBarCheck, BackButtonCheck, DarkBGCheck, LightBGCheck, ProgressBarCheck} from "../wp-module-support/siteGen.cy";

describe( 'SiteGen Site Details Step', function () {
    before( () => {
        cy.visit(
            'wp-admin/index.php?page=nfd-onboarding#/sitegen/step/site-details'
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

    it( 'Check the Progress Bar Value', () => {
        ProgressBarCheck('12.5%');
    });

    it( 'Check if the Next Button is disabled when no prompt is entered', () => {
        cy.get( '.nfd-onboarding-button--site-gen-next--disabled' ).should('be.visible');
    } );

    it( 'Check for back button and go back', () => {
        BackButtonCheck('sitegen/step/site-details');
    } );

    it( 'Check for the header to be visible', () => {
        cy.get( '.ai-heading' ).should('be.visible');
    } );

    it( 'Check for the placeholder text & input box hint to be visible before the prompt', () => {
        cy.get('.nfd-sg-input-box__field')
            .should('have.attr', 'placeholder', 'I want a site for my company that sells…');
        cy.get( '.nfd-sg-input-box__hint' ).should('be.visible');
    } );

    it( 'Enter the prompt and see the box-info progress', () => {
        cy.get('.nfd-sg-input-box__field').type('I have a Yoga Studio called Asana,located in Cocoa Beach, Florida. We prioritize sustainibility ');
        cy.get('.nfd-sg-input-box__info-icon')
            .should('be.visible')
            .should('have.length',3);
        cy.get( '.nfd-onboarding-button--site-gen-next--disabled' ).should('be.visible');
        cy.get('.nfd-sg-input-box__field').type('and source our yoga mats from co-consious suppliers here in the USA. ');
        cy.get('.nfd-sg-input-box__info-icon--selected')
            .should('be.visible')
            .should('have.length', 2);
        cy.get('.nfd-sg-input-box__field').type('In addition to our classes, we also provide a curated selection of yoga attire and access');
        cy.get('.nfd-sg-input-box__info-icon--selected')
            .should('be.visible')
            .should('have.length', 3);
        cy.get('.nfd-sg-site-details--next-btn')
            .should('be.visible')
            .click();
        cy.url().should('not.contain','sitegen/step/site-details');
    } );
});
