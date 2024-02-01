// <reference types="Cypress" />

import { AdminBarCheck, BackButtonCheck, DarkBGCheck, ExperienceDetails, LightBGChcek, ProgressBarCheck} from "../wp-module-support/siteGen.cy";

describe( 'SiteGen Experience & Site Building Step', function () {
	before( () => {
		cy.visit(
			'wp-admin/index.php?page=nfd-onboarding#/sitegen/step/experience'
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
        ProgressBarCheck('50%');
    });

    it( 'Check for back button and go back', () => {
        BackButtonCheck('sitegen/step/experience');
    } );

    it( 'Check for the existence & the count of experience level cards', () => {
        cy.get( '.nfd-sg-experience-level' ).should('be.visible');
        cy.get( '.nfd-sg-loader' ).should('be.visible');
        cy.get( '.nfd-sg-card' ).should('be.visible');
        cy.get( '.nfd-sg-card__data__option' ).should('have.length',3)
    } );

    it( 'Check and click each experience cards', () => {
        const className = '.nfd-sg-card__data__option'
        let options = 0;
        const arr = cy.get( className );
		arr.each( () => {
            if(options == 0){
                ExperienceDetails(className,'Beginner',options);
            };
            if(options == 1){
                ExperienceDetails(className,'Used it some',options);
            };
            if(options == 2){
                ExperienceDetails(className, 'Expert',options);
            };
            options+=1;
        });
    } );

    it( 'Check for the existence of skip button and click', () => {
        cy.get( '.nfd-sg-card__skip' )
            .scrollIntoView()
            .should('be.visible')
            .click();
        cy.url().should('not.contain', 'sitegen/step/experience');
    } );
});
