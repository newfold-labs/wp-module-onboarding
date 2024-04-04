// <reference types="Cypress" />

export const AdminBarCheck = () => {
	cy.get( '.nfd-onboarding-header__admin-bar', { timeout: 120000 } ).should(
		'be.visible'
	);
};

export const DarkBGCheck = () => {
	cy.wait( 2000 );
	// When the page loads, it should have dark background by default
	cy.get( '.nfd-onboarding-sitegen-dark' ).should( 'be.visible' );
};

export const LightBGCheck = () => {
	cy.get( '.nfd-onboarding-toggle__theme__button__dark' )
		.should( 'exist' )
		.click();
	cy.get( '.nfd-onboarding-sitegen-light' ).should( 'be.visible' );
	// Now changing the background back to dark
	cy.get( '.nfd-onboarding-toggle__theme__button__light' )
		.should( 'exist' )
		.click();
	cy.get( '.nfd-onboarding-sitegen-dark' ).should( 'be.visible' );
};

export const OptionsDetails = ( className, textValue, optionsValue ) => {
	cy.get( className, { timeout: 10000 } )
		.eq( optionsValue )
		.find( '.nfd-onboarding-sitegen-options__container__heading__title' )
		.invoke( 'text' )
		.should( 'contain', textValue );
};

export const ProgressBarCheck = ( WidthPercent ) => {
	cy.get( '.nfd-onboarding-header__progress-bar' ).should( 'be.visible' );
	cy.get( '.nfd-onboarding-header__progress-bar__progress' )
		.invoke( 'attr', 'style' )
		.then( ( styleAttribute ) => {
			const value = styleAttribute.match( /width:\s*([\d.]+%)/ )[ 1 ];
			expect( value ).equal( WidthPercent );
		} );
};

export const BackButtonCheck = ( currURL ) => {
	cy.get( '.nfd-onboarding-button--dark' ).should( 'be.visible' ).click();
	cy.url().should( 'not.contain', currURL );
	cy.go( 'back' );
};

export const SkipButtonCheck = () => {
	cy.get( '.skip-button' ).should( 'be.visible' ).contains( 'Skip for now' );
};

export const DisabledNextButton = () => {
	cy.get( '.nfd-onboarding-button--site-gen-next--disabled' )
		.should( 'be.visible' )
		.contains( 'Next' );
};

export const ExperienceDetails = ( classname, textValue, optionsValue ) => {
	cy.get( classname )
		.eq( optionsValue )
		.find( '.nfd__option_heading_subheading__left_top' )
		.invoke( 'text' )
		.should( 'contain', textValue );
};
