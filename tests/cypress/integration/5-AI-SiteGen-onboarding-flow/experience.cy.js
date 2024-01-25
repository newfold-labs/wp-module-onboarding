// <reference types="Cypress" />

import { AdminBarCheck, BackButtonCheck, DarkBGCheck, LightBGChcek, ProgressBarCheck} from "../wp-module-support/siteGen.cy";

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

    it( 'Check for existence of experience cards', () => {
        cy.get( '.nfd-sg-experience-level' ).should('be.visible');
        cy.get( '.nfd-sg-loader' ).should('be.visible');
        cy.get( '.nfd-sg-card' ).should('be.visible');
    } );
    
});
