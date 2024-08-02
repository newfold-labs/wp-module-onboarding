// <reference types="Cypress" />

import {
	AdminBarCheck,
	BackButtonCheck,
	DarkBGCheck,
	LightBGCheck,
	ProgressBarCheck,
} from '../wp-module-support/siteGen.cy';

describe( 'SiteGen Site Details Step', function () {
	before( () => {
		cy.visit(
			'wp-admin/index.php?page=nfd-onboarding#/sitegen/step/site-details'
		);
	} );

	it( 'Check for the header admin bar', () => {
		AdminBarCheck();
	} );

	it( 'Check for the default light background', () => {
		LightBGCheck();
	} );

	it( 'Check for the dark background', () => {
		DarkBGCheck();
	} );

	it( 'Check the Progress Bar Value', () => {
		ProgressBarCheck( '0%' );
	} );

	it( 'Check if the Next Button is disabled when no prompt is entered', () => {
		cy.get( '.nfd-onboarding-button--site-gen-next--disabled' ).should(
			'be.visible'
		);
	} );

	it( 'Check for the header to be visible', () => {
		cy.get( '.ai-heading' ).should( 'be.visible' );
	} );

	it( 'Check for the placeholder text & input box hint to be visible before the prompt', () => {
		cy.get( '.nfd-sg-input-box__field' ).should(
			'have.attr',
			'placeholder',
			'Bean There Café - A cozy, sustainable coffee shop in Asheville, North Carolina, focused on fair-trade coffee and local pastries. Their site will feature their menu, special events, and a blog on coffee culture.'
		);
		cy.get( '.nfd-sg-input-box__hint' ).should( 'be.visible' );
	});
	
	it.skip( 'Check for back button and go back', () => {
		BackButtonCheck( 'sitegen/step/site-details' );
	} );

	it( 'Enter the prompt and see the box-info progress', () => {
		cy.get( '.nfd-sg-input-box__field' ).type(
			'I have a Yoga Studio called Asana,located in Cocoa Beach, Florida. We prioritize sustainibility '
		);
		cy.get( '.nfd-onboarding-button--site-gen-next' ).should(
			'be.visible'
		);
		cy.get( '.nfd-sg-input-box__field' ).type(
			'and source our yoga mats from co-consious suppliers here in the USA. '
		);
		cy.get( '.nfd-sg-input-box__field' ).type(
			'In addition to our classes, we also provide a curated selection of yoga attire and access'
		);
	} );

	it( 'Check if the Next Button is enabled and click Next', () => {
		cy.get( '.nfd-sg-site-details--next-btn' )
			.should( 'be.visible' )
			.click();
		cy.url().should( 'not.contain', 'sitegen/step/site-details' );
	} );
} );
