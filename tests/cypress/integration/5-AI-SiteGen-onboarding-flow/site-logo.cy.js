// <reference types="Cypress" />

import { AdminBarCheck, BackButtonCheck, DarkBGCheck, DisabledNextButton, LightBGChcek, ProgressBarCheck, SkipButtonCheck } from "../wp-module-support/siteGen.cy";

describe( 'SiteGen Fork Step', function () {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/sitgen/step/site-logo'
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
        ProgressBarCheck('33.3333%');
    });

    it( 'Check for back button and go back', () => {
        BackButtonCheck('sitgen/step/site-logo');
    } );

    it( 'Check if the heading is visible', () => {
        cy.get('.ai-heading').should('be.visible');
    } );

    it( 'Check for the skip button and click', () => {
        SkipButtonCheck('sitgen/step/site-logo');
    } );

    it( 'Check if the Next Button is disabled when there is no logo', () => {
        DisabledNextButton();
    } );

    it( 'Check if Image gets uploaded and Next button is enabled', () => {
        const sampleLogoPath = `vendor/newfold-labs/wp-module-onboarding/tests/cypress/fixtures/image.png`;
        const LogoPreviewClass = '.nfd-onboarding-image-uploader--with-text__site_logo__preview';
        if(
            cy.get('.nfd-onboarding-button--site-gen-next--disabled')
                .should('be.visible')
                ){
                    cy.get(LogoPreviewClass)
                        .should('not.exist');
        };
        cy.get('input[type=file]', { timeout: 10000 })
            .should('exist')
            .selectFile( sampleLogoPath ,  {force: true} )
				.then( () => {
					cy.wait( 1000 );
					cy.get(LogoPreviewClass, { timeout: 10000 } ).should( 'be.visible' );
					cy.get( '.nfd-onboarding-image-uploader--with-text__site_logo__preview__reset__button' )
                        .scrollIntoView()
						.should( 'be.visible' );
				} );
    });

});
