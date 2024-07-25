// <reference types="Cypress" />

import {
	AdminBarCheck,
	DarkBGCheck,
	ExperienceDetails,
	LightBGCheck,
	ProgressBarCheck,
} from '../wp-module-support/siteGen.cy';
import {
	apiList,
	siteGenMockAll,
	homePagesMock,
} from '../wp-module-support/MockApi.cy';

describe( 'SiteGen Experience & Site Building Step', function () {
	before( () => {
		cy.visit(
			'wp-admin/index.php?page=nfd-onboarding#/sitegen/step/experience'
		);
		cy.intercept( apiList.sitegen, ( req ) => {
			siteGenMockAll( req );
		} ).as( 'sitegenCalls' );

		cy.intercept( apiList.homepages, ( req ) => {
			homePagesMock( req );
		} ).as( 'homePageCall' );
		cy.wait( 20000 );
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
		ProgressBarCheck( '50%' );
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
	
	it( 'Check if Back button is not visible' , () => {
		cy.get( '.nfd-onboarding-button--dark' , { timeout : 20000 } ).should( 'not.be.visible' )
	} )

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
