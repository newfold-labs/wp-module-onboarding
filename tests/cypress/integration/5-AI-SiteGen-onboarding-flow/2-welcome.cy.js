// <reference types="Cypress" />

import {
	AdminBarCheck,
	BackButtonCheck,
	DarkBGCheck,
	LightBGCheck,
	ProgressBarCheck,
} from '../wp-module-support/siteGen.cy';

describe( 'SiteGen Welcome Step', function () {
	// before( () => {
	// 	cy.visit( 'wp-admin/?page=nfd-onboarding#/sitegen/step/welcome' );
	// } );

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
		ProgressBarCheck( '0%' );
	} );

	it.skip( 'Check for back button and go back', () => {
		BackButtonCheck( 'sitegen/step/welcome' );
	} );

	it.skip( 'Check if the orb is visible', () => {
		cy.get(
			'.nfd-onboarding-step--site-gen__welcome__container__orb'
		).should( 'be.visible' );
	} );

	it.skip( 'Check for the heading title', () => {
		cy.get(
			'.nfd-onboarding-step--site-gen__welcome__container__heading__text'
		)
			.should( 'be.visible' )
			.contains( 'WordPress' );
	} );

	it.skip( 'Check for the subheading title', () => {
		cy.get(
			'.nfd-onboarding-step--site-gen__welcome__container__sub-heading'
		).should( 'exist' );
		cy.get(
			'.nfd-onboarding-step--site-gen__welcome__container__sub-heading__text'
		)
			.should( 'be.visible' )
			.contains( 'AI' );
	} );

	it.skip( 'Check the Get Started button', () => {
		cy.get( '.nfd-onboarding-button--site-gen-next' )
			.should( 'be.visible' )
			.should( 'have.text', 'Get Started' )
			.click();
		cy.wait( 2000 );
		cy.url().should( 'not.contain', 'sitegen/step/welcome' );
	} );
} );
