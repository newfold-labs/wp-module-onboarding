// <reference types="Cypress" />

import { AdminBarCheck, BackButtonCheck, DarkBGCheck, DisabledNextButton, LightBGCheck, ProgressBarCheck, SkipButtonCheck } from '../wp-module-support/siteGen.cy';

describe( 'SiteGen Site Logo Step', function() {
	before( () => {
		cy.visit(
			'wp-admin/?page=nfd-onboarding#/sitegen/step/site-logo'
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
		ProgressBarCheck( '42.8571%' );
	} );

	it( 'Check for back button and go back', () => {
		BackButtonCheck( 'sitegen/step/site-logo' );
	} );

	it( 'Check if the heading is visible', () => {
		cy.get( '.ai-heading' ).should( 'be.visible' );
	} );

	it( 'Check for the skip button and click', () => {
		SkipButtonCheck( 'sitegen/step/site-logo' );
	} );

	it( 'Check if the Next Button is disabled when there is no logo', () => {
		DisabledNextButton();
	} );

	it( 'Check if Image gets uploaded', () => {
		const sampleLogoPath = `vendor/newfold-labs/wp-module-onboarding/tests/cypress/fixtures/image.png`;
		const LogoPreviewClass = '.nfd-onboarding-image-uploader--with-text__site_logo__preview';
		if (
			cy.get( '.nfd-onboarding-button--site-gen-next--disabled' )
				.should( 'be.visible' )
		) {
			cy.get( LogoPreviewClass )
				.should( 'not.exist' );
		}
		cy.get( 'input[type=file]', { timeout: 10000 } )
			.should( 'exist' )
			.selectFile( sampleLogoPath, { force: true } )
			.then( () => {
				cy.wait( 1000 );
				cy.get( LogoPreviewClass, { timeout: 10000 } ).should( 'be.visible' );
				cy.get( '.nfd-onboarding-image-uploader--with-text__site_logo__preview__reset__button' )
					.scrollIntoView()
					.should( 'be.visible' );
			} );
	} );

	it.skip( 'Check if the Next Button is enabled and go next', () => {
		cy.get( '.nfd-onboarding-button--site-gen-next' )
			.should( 'not.be.disabled' )
			.click();
		cy.url().should( 'not.contain', 'sitegen/step/site-logo' );
	} );
} );
