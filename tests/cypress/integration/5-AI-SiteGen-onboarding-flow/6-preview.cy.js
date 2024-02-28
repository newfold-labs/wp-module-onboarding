// <reference types="Cypress" />

import { AdminBarCheck, BackButtonCheck, DarkBGCheck, LightBGCheck, ProgressBarCheck } from "../wp-module-support/siteGen.cy";

describe( 'SiteGen Site Preview Step', function () {
    before( () => {
        cy.visit(
            'wp-admin/index.php?page=nfd-onboarding#/sitegen/step/preview'
        );
        cy.wait(5000);
    } );

    it.skip( 'Check for the header admin bar', () => {
        AdminBarCheck();
    } );

    it.skip( 'Check for the existing dark background', () => {
        DarkBGCheck();
    } );

    it.skip( 'Check for the light background', () => {
        LightBGCheck();
    } );

    it.skip( 'Check the Progress Bar Value', () => {
        ProgressBarCheck('75%');
    });

    it.skip( 'Check for back button and go back', () => {
        BackButtonCheck('sitegen/step/preview');
        cy.visit('wp-admin/index.php?page=nfd-onboarding#/sitegen/step/preview');
        cy.reload();
    } );

    it.skip( 'Check for by default 3 versions should be there', () => {
        cy.get('.live-preview-sitegen--selectable-card', {timeout:20000})
            .should('be.visible')
            .should('have.length', 3);
    } );

    it.skip( 'Check for the favourited theme versions', () => {
        cy.get('g[clip-path="url(#heart-filled_svg__a)"]').should('not.exist');  // when no fav theme is selected
        cy.get( '.live-preview-sitegen--selectable-card__live-preview-container-buttons__button__icon' )
            .eq(0)
            .scrollIntoView()
            .should('be.visible')
            .click();
        cy.get('g[clip-path="url(#heart-filled_svg__a)"]' , {timeout:10000} )
            .should('exist');
        cy.get('.live-preview-sitegen--selectable-card__live-preview-container__overlay')
            .eq(0)
            .scrollIntoView()
            .click();
        cy.reload();
        cy.wait(5000);
        cy.get('g[clip-path="url(#heart-filled_svg__a)"]' , {timeout:10000} )
            .should('exist');
        cy.go('back');
        cy.reload();
    } );

    it.skip( 'Check for regenerating the new theme versions', () => {
        cy.get('[aria-label="Regenerate Content"]', {timeout:10000})
            .eq(2)
            .scrollIntoView()
            .click();
        cy.wait(3000);
        cy.get('.live-preview-sitegen--selectable-card')
            .should('be.visible')
            .should('have.length', 4);
    } );

    it.skip( 'Check for the preview note at the bottom', () => {
        cy.get('.nfd-onboarding-step--site-gen__preview__note')
            .scrollIntoView()
            .should('be.visible');
        cy.get('g[id="State\\=Active"]').should('exist');
        cy.get('.nfd-onboarding-step--site-gen__preview__note span').scrollIntoView().contains('Favorite');
    } );

    it.skip( 'Select any theme and go forward to the next step', () => {
        cy.get('.live-preview-sitegen--selectable-card')
            .eq(0)
            .scrollIntoView()
            .click();
        cy.wait(5000);
        cy.url().should('not.contain', 'sitegen/step/preview');
    } );
});
