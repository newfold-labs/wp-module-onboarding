// <reference types="Cypress" />

import {
	AdminBarCheck,
	DarkBGCheck,
	ExperienceDetails,
	LightBGCheck,
	ProgressBarCheck,
} from '../wp-module-support/siteGen.cy';

describe( 'SiteGen Experience & Site Building Step', function () {
	before( () => {
		cy.visit(
			'wp-admin/index.php?page=nfd-onboarding#/sitegen/step/experience'
		);
		cy.wait( 5000 );
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
		ProgressBarCheck( '57.1429%' );
	} );

	it( 'Check for the existence & the count of experience level cards', () => {
		cy.get( '.nfd-sg-experience-level' ).should( 'be.visible' );
		cy.get( '.nfd-sg-loader' ).should( 'be.visible' );
		cy.get( '.nfd-sg-card' ).should( 'be.visible' );
		cy.get( '.nfd__option_heading_subheading__wrapper' ).should(
			'have.length',
			3
		);
	} );

	it( 'Check each experience cards', () => {
		const className = '.nfd__option_heading_subheading__wrapper';
		let options = 0;
		const arr = cy.get( className );
		arr.each( () => {
			if ( options == 0 ) {
				ExperienceDetails( className, 'Beginner', options );
			}
			if ( options == 1 ) {
				ExperienceDetails( className, 'Intermediate', options );
			}
			if ( options == 2 ) {
				ExperienceDetails( className, 'Expert', options );
			}
			options += 1;
		} );
	} );
} );
