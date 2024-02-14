// <reference types="Cypress" />

import { AdminBarCheck, BackButtonCheck, DarkBGCheck, ProgressBarCheck } from "../wp-module-support/siteGen.cy";

describe( 'SiteGen Site Editor Step', function () {
    before( () => {
        cy.visit(
            'wp-admin/index.php?page=nfd-onboarding#/sitegen/step/editor'
        );
        cy.wait(5000);
    } );

    it( 'Check for the header admin bar', () => {
        AdminBarCheck();
    } );

    it( 'Check for the existing dark background', () => {
        DarkBGCheck();
    } );

    it( 'Check if we cannot change to light background', () => {
        cy.get('.nfd-onboarding-toggle__theme__button__dark')
            .should('not.exist');
        cy.get( '.nfd-onboarding-sitegen-light' ).should('not.exist');
    } );

    it( 'Check the Progress Bar Value', () => {
        ProgressBarCheck('87.5%');
    });

    it( 'Check if the sidebar is closed upon landing', () => {
        cy.get('nfd-onboarding-sidebar__panel is-open').should('not.exist');
    } );

    it( 'Check for back button and go back', () => {
        BackButtonCheck('sitegen/step/editor');
        cy.visit('wp-admin/index.php?page=nfd-onboarding#/sitegen/step/editor');
        cy.timeout(10000);
    } );

    // it( 'Check if rename functionality works as expected', () => {

    // } );

    // it( 'Check for favouriting a theme and it appears everywhere', () => {

    // } );

    // it( 'Check regenerating a newer theme', () => {

    // } );

});
