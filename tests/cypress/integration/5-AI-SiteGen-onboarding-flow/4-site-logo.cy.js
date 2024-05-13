// <reference types="Cypress" />

import {
	AdminBarCheck,
	BackButtonCheck,
	DarkBGCheck,
	DisabledNextButton,
	LightBGCheck,
	ProgressBarCheck,
	SkipButtonCheck,
} from '../wp-module-support/siteGen.cy';
import {
	apiList,
	siteGenMockAll,
	homePagesMock,
} from '../wp-module-support/MockApi.cy';

describe.skip( 'SiteGen Site Logo Step', function () {
	before( () => {
		cy.intercept( apiList.sitegen, ( req ) => {
			siteGenMockAll( req );
		} ).as( 'sitegenCalls' );

		cy.intercept( apiList.homepages, ( req ) => {
			homePagesMock( req );
		} ).as( 'homePageCall' );
		cy.visit( 'wp-admin/?page=nfd-onboarding#/sitegen/step/site-logo' );
		cy.wait( '@sitegenCalls', { timeout: 60000 } );
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

	it.skip( 'Check for back button and go back', () => {
		BackButtonCheck( 'sitegen/step/site-logo' );
	} );

	it( 'Check if the heading is visible', () => {
		cy.get( '.ai-heading', { timeout: 20000 } ).should( 'be.visible' );
	} );

	it( 'Check for the skip button', () => {
		SkipButtonCheck();
	} );

	it( 'Check if the Next Button is disabled when there is no logo', () => {
		DisabledNextButton();
	} );

	it.skip( 'Check if Image gets uploaded', () => {
		const sampleLogoPath = `vendor/newfold-labs/wp-module-onboarding/tests/cypress/fixtures/image.png`;
		const LogoPreviewClass =
			'.nfd-onboarding-image-uploader--with-text__site_logo__preview';
		if (
			cy
				.get( '.nfd-onboarding-button--site-gen-next--disabled' )
				.should( 'be.visible' )
		) {
			cy.get( LogoPreviewClass ).should( 'not.exist' );
		}
		cy.get( 'input[type=file]', { timeout: 240000 } )
			.should( 'exist' )
			.selectFile( sampleLogoPath, { force: true } )
			.then( () => {
				cy.wait( 2000 );
				cy.get( LogoPreviewClass, { timeout: 120000 } ).should(
					'be.visible'
				);
				cy.get(
					'.nfd-onboarding-image-uploader--with-text__site_logo__preview__reset__button'
				)
					.scrollIntoView()
					.should( 'be.visible' );
			} );
		cy.get( '.nfd-onboarding-button--site-gen-next' ).should(
			'not.be.disabled'
		);
	} );

	it.skip( 'Check if the Next Button is enabled and go next', () => {
		cy.get( '.nfd-onboarding-button--site-gen-next' )
			.should( 'not.be.disabled' )
			.click();
		cy.url().should( 'not.contain', 'sitegen/step/site-logo' );
	} );
} );
