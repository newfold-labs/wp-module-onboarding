// <reference types="Cypress" />

export const AdminBarCheck = () => {
    cy.get( '.nfd-onboarding-header__admin-bar' ).should('be.visible');
};

export const DarkBGCheck =  () => {
    cy.wait( 2000 );
    // When the page loads, it should have dark background by default
    cy.get('.nfd-onboarding-sitegen-dark').should('be.visible');
};

export const LightBGChcek = () => {
    cy.get( '.nfd-onboarding-toggle__theme__button__dark' )
        .should( 'exist' )
        .click();
    cy.get( '.nfd-onboarding-sitegen-light' ).should('be.visible');
    // Now changing the background back to dark
    cy.get( '.nfd-onboarding-toggle__theme__button__light' )
        .should( 'exist' )
        .click();
    cy.get('.nfd-onboarding-sitegen-dark').should('be.visible');
};
