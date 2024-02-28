// <reference types="Cypress" />

import { GetPluginId } from "./pluginID.cy";

export const SocialMediaTextValidations = ( URL, ToolTipText, ModalHeaderText ) => {
    const NextButton = '.navigation-buttons_next';
    const socialTest = '#facebook';
    if ( cy.get(socialTest).should( 'exist' ) ) {
        cy.get(socialTest).clear({force: true});
        cy.wait(200);
        cy.get(socialTest).type( URL );
        cy.wait(200);
        cy.get('#twitter').focus();
        cy.wait(200);
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
            cy.wait(200);
            cy.get(NextButton).click();
            cy.get( '.components-modal__content' ).should('be.visible');
            cy.get( '.components-modal__header-heading' ).should('have.text', ModalHeaderText);
        };
        cy.get('.components-button-group.nfd-onboarding-etw__buttons > .components-button.is-secondary').click();
        cy.wait(200);
        cy.get(NextButton).click();
        cy.wait(200);
        cy.get('.components-modal__header button', {timeout: 10000}).click()
        cy.wait(200);
        cy.get(NextButton).click();
        cy.wait(200);
        cy.get('.components-button-group.nfd-onboarding-etw__buttons > .components-button.is-primary').click();
        cy.wait(200);
        cy.url().should('not.contain', 'wp-setup/step/basic-info');
        cy.wait(200);
        cy.go('back');
        cy.get( '.nfd-onboarding-drawer__toggle-button', { timeout: 10000 } ).click();
        cy.wait(200);
    }
};
