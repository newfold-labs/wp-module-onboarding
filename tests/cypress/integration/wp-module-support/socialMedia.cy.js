// <reference types="Cypress" />

import { GetPluginId } from "./pluginID.cy";

export const SocialMediaTextValidations = ( URL, ToolTipText, ModalHeaderText ) => {
    const NextButton = '.navigation-buttons_next';
    const socialTest = '#facebook';
    if ( cy.get(socialTest).should( 'exist' ) ) {
        cy.get(socialTest).clear();
        cy.get(socialTest).type( URL );
        cy.get('#twitter').focus();
        if(GetPluginId()=='hostgator'){
            cy.get( '.Tooltip-Tip' , { timeout: 3000 })
            .should('be.visible');
            cy.get(NextButton).click();
            cy.get( '.components-modal__content' ).should('be.visible');
            cy.get( '.components-modal__header-heading' ).should('be.visible');
        }
        else{
            cy.get( '.Tooltip-Tip' , { timeout: 3000 })
            .should('be.visible')
            .should('contain', ToolTipText);
            cy.get(NextButton).click();
            cy.get( '.components-modal__content' ).should('be.visible');
            cy.get( '.components-modal__header-heading' ).should('have.text', ModalHeaderText);
        };
        cy.get(':nth-child(2) > .components-button-group > .is-secondary').click();
        cy.get(NextButton).click();
        cy.get('.components-modal__header button', {timeout: 10000}).click()
        cy.get(NextButton).click();
        cy.get(':nth-child(2) > .components-button-group > .is-primary').click();
        cy.url().should('not.contain', 'wp-setup/step/basic-info');
        cy.go('back');
        cy.get( '.nfd-onboarding-drawer__toggle-button', { timeout: 10000 } ).click();
    }
};
